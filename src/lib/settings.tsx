import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AppSettings = {
  theme: "dark" | "light";
  fontSize: number;        // 14..22
  notifications: boolean;
  autoDownload: boolean;
  reduceMotion: boolean;
};

const DEFAULTS: AppSettings = {
  theme: "dark",
  fontSize: 16,
  notifications: true,
  autoDownload: false,
  reduceMotion: false,
};

const KEY = "mom-settings-v1";

type Ctx = AppSettings & {
  update: <K extends keyof AppSettings>(k: K, v: AppSettings[K]) => void;
  reset: () => void;
};

const SettingsCtx = createContext<Ctx | null>(null);

function applyToDom(s: AppSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("light", s.theme === "light");
  root.classList.toggle("dark", s.theme === "dark");
  root.style.setProperty("--app-font-size", `${s.fontSize}px`);
  root.style.setProperty("--motion-scale", s.reduceMotion ? "0" : "1");
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<AppSettings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const next = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
      setS(next);
      applyToDom(next);
    } catch {
      applyToDom(DEFAULTS);
    }
  }, []);

  const update: Ctx["update"] = (k, v) => {
    setS((prev) => {
      const next = { ...prev, [k]: v };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      applyToDom(next);
      return next;
    });
  };

  const reset = () => {
    setS(DEFAULTS);
    try { localStorage.removeItem(KEY); } catch {}
    applyToDom(DEFAULTS);
  };

  return <SettingsCtx.Provider value={{ ...s, update, reset }}>{children}</SettingsCtx.Provider>;
}

export function useSettings() {
  const c = useContext(SettingsCtx);
  if (!c) throw new Error("useSettings must be used inside SettingsProvider");
  return c;
}
