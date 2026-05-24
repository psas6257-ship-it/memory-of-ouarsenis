import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type User = { email: string; name: string; role: "admin" | "user"; avatar?: string; bio?: string };

const ADMIN = { email: "admin@univ.dz", password: "admin123", name: "المشرف", role: "admin" as const };
const KEY = "mom-auth-v1";
const USERS_KEY = "mom-users-v1";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, "name" | "avatar" | "bio">>) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
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

  const updateProfile: AuthCtx["updateProfile"] = (patch) => {
    if (!user) return;
    const next = { ...user, ...patch };
    persist(next);
    // sync name in registered users list too
    try {
      const list: Array<{ email: string; password: string; name: string }> = JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
      );
      const idx = list.findIndex((u) => u.email === user.email);
      if (idx >= 0 && patch.name) {
        list[idx].name = patch.name;
        localStorage.setItem(USERS_KEY, JSON.stringify(list));
      }
    } catch {}
  };

  const changePassword: AuthCtx["changePassword"] = async (oldPassword, newPassword) => {
    if (!user) throw new Error("غير مسجّل");
    await new Promise((r) => setTimeout(r, 300));
    if (user.email === ADMIN.email) throw new Error("لا يمكن تغيير كلمة سر المشرف");
    const list: Array<{ email: string; password: string; name: string }> = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );
    const idx = list.findIndex((u) => u.email === user.email);
    if (idx < 0 || list[idx].password !== oldPassword) throw new Error("كلمة المرور الحالية غير صحيحة");
    if (newPassword.length < 6) throw new Error("كلمة المرور قصيرة جداً");
    list[idx].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, updateProfile, changePassword }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
