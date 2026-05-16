import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import { books } from "@/data/content";
import { Bookmark, Download, Heart, Settings, Globe, Bell, LogOut, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/app/profile")({ component: Profile });

const stats = [
  { label: "مفضّلة", value: 12, icon: Heart },
  { label: "تنزيلات", value: 8, icon: Download },
  { label: "إشارات", value: 24, icon: Bookmark },
];

const items = [
  { icon: Bell, label: "الإشعارات", v: "", to: "/app/notifications" as const },
  { icon: Globe, label: "اللغة", v: "العربية", to: "/app/settings" as const },
  { icon: Download, label: "إدارة التنزيلات", v: "256 م.ب", to: "/app/settings" as const },
  { icon: Settings, label: "الإعدادات", v: "", to: "/app/settings" as const },
];

function Profile() {
  return (
    <div>
      <AppHeader title="حسابي" greeting="مرحباً" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 mt-3"
      >
        <div className="relative rounded-3xl overflow-hidden p-5 glass-strong shadow-luxe">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-30"
            style={{ background: "var(--gold)" }} />
          <div className="relative flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl grid place-items-center text-xl font-bold"
              style={{ background: "linear-gradient(135deg, var(--gold), var(--clay))" }}>
              ز.ج
            </div>
            <div>
              <h2 className="text-lg font-bold">زائر الجبل</h2>
              <p className="text-xs text-white/55">عضو منذ ٢٠٢٦ • محبّ للتراث</p>
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 p-3 text-center">
                <s.icon className="h-4 w-4 mx-auto text-[var(--gold)]" />
                <p className="text-lg font-bold mt-1">{s.value}</p>
                <p className="text-[10px] text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <section className="mt-6 px-5">
        <h3 className="text-sm font-semibold mb-3">قراءاتي الأخيرة</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {books.slice(0, 3).map((b) => (
            <Link key={b.id} to="/book/$id" params={{ id: b.id }} className="shrink-0 w-28">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-luxe">
                <img src={b.cover} alt={b.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-1.5 text-[10px] line-clamp-2 leading-tight">{b.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="rounded-3xl glass overflow-hidden divide-y divide-white/5">
          {items.map((it) => (
            <Link key={it.label} to={it.to} className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/5 grid place-items-center">
                  <it.icon className="h-4 w-4 text-[var(--gold)]" />
                </div>
                <span className="text-sm">{it.label}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                {it.v}
                <ChevronLeft className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
        <button className="mt-4 w-full p-4 rounded-3xl glass flex items-center justify-center gap-2 text-sm text-red-300">
          <LogOut className="h-4 w-4" /> تسجيل الخروج
        </button>
      </section>
    </div>
  );
}
