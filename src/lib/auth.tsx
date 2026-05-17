import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type User = { email: string; name: string; role: "admin" | "user" };

const ADMIN = { email: "admin@univ.dz", password: "admin123", name: "المشرف", role: "admin" as const };
const KEY = "mom-auth-v1";
const USERS_KEY = "mom-users-v1";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  };

  const login: AuthCtx["login"] = async (email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    if (email === ADMIN.email && password === ADMIN.password) {
      const u: User = { email: ADMIN.email, name: ADMIN.name, role: "admin" };
      persist(u);
      return u;
    }
    const list: Array<{ email: string; password: string; name: string }> = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );
    const found = list.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("بيانات الدخول غير صحيحة");
    const u: User = { email: found.email, name: found.name, role: "user" };
    persist(u);
    return u;
  };

  const register: AuthCtx["register"] = async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 400));
    const list: Array<{ email: string; password: string; name: string }> = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );
    if (list.some((u) => u.email === email)) throw new Error("البريد مسجّل سابقاً");
    list.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
    const u: User = { email, name, role: "user" };
    persist(u);
    return u;
  };

  const logout = () => persist(null);

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
