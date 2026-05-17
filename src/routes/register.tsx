import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";
import { useAuth } from "@/lib/auth";
import { Mail, Lock, User as UserIcon, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return setErr("كلمة المرور قصيرة (6 أحرف على الأقل)");
    setErr("");
    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate({ to: "/app" });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col px-6 pt-12 pb-8 bg-gradient-to-b from-[oklch(0.18_0.02_50)] to-[oklch(0.13_0.018_45)]">
        <Link to="/login" className="h-9 w-9 rounded-full glass-strong grid place-items-center">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            انضمّ إلى الذاكرة
          </h1>
          <p className="text-sm text-white/60 mt-2">أنشئ حسابك واحفظ تقدمك في القراءة والاستماع</p>
        </motion.div>
        <form onSubmit={submit} className="mt-10 space-y-4">
          <Field icon={UserIcon} placeholder="الاسم الكامل" type="text" value={name} onChange={setName} />
          <Field icon={Mail} placeholder="البريد الإلكتروني" type="email" value={email} onChange={setEmail} />
          <Field icon={Lock} placeholder="كلمة المرور" type="password" value={password} onChange={setPassword} />
          {err && <p className="text-xs text-red-400 text-center">{err}</p>}
          <button disabled={busy} className="w-full h-12 rounded-2xl bg-[var(--gold)] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-luxe disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "إنشاء حساب"}
          </button>
        </form>
        <p className="text-center text-xs text-white/55 mt-6">
          لديك حساب؟ <Link to="/login" className="text-[var(--gold)] font-semibold">دخول</Link>
        </p>
      </div>
    </PhoneFrame>
  );
}

function Field({ icon: Icon, placeholder, type, value, onChange }: any) {
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
