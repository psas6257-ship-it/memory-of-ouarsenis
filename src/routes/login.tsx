import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";
import { useAuth } from "@/lib/auth";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const u = await login(email.trim(), password);
      navigate({ to: u.role === "admin" ? "/admin" : "/app" });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col px-6 pt-12 pb-8 bg-gradient-to-b from-[oklch(0.18_0.02_50)] to-[oklch(0.13_0.018_45)]">
        <Link to="/" className="h-9 w-9 rounded-full glass-strong grid place-items-center">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            أهلاً بعودتك
          </h1>
          <p className="text-sm text-white/60 mt-2">سجّل الدخول لمتابعة رحلتك في ذاكرة الجبل</p>
        </motion.div>

        <form onSubmit={submit} className="mt-10 space-y-4">
          <Field icon={Mail} placeholder="البريد الإلكتروني" type="email" value={email} onChange={setEmail} />
          <Field icon={Lock} placeholder="كلمة المرور" type="password" value={password} onChange={setPassword} />
          {err && <p className="text-xs text-red-400 text-center">{err}</p>}
          <button
            disabled={busy}
            className="w-full h-12 rounded-2xl bg-[var(--gold)] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-luxe disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "دخول"}
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-xs">
          <Link to="/forgot-password" className="text-white/60 hover:text-[var(--gold)]">نسيت كلمة المرور؟</Link>
          <Link to="/register" className="text-[var(--gold)] font-semibold">إنشاء حساب</Link>
        </div>

        <div className="mt-auto pt-8 text-center">
          <p className="text-[10px] text-white/35">
            حساب الإدارة التجريبي: admin@univ.dz / admin123
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Field({
  icon: Icon, placeholder, type, value, onChange,
}: { icon: any; placeholder: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Icon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 pr-11 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]/50"
      />
    </div>
  );
}
