import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { motion } from "framer-motion";
import { Moon, Languages, Type, Download, Bell, Shield, Info, ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-[var(--gold)]" : "bg-white/15"}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md ${on ? "right-0.5" : "right-[calc(100%-1.375rem)]"}`}
      />
    </button>
  );
}

function Settings() {
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState(true);
  const [download, setDownload] = useState(false);
  const [font, setFont] = useState(16);
  const [lang, setLang] = useState<"ar" | "fr" | "en" | "amz">("ar");

  return (
    <div>
      <AppHeader title="الإعدادات" greeting="خصّص تجربتك" />
      <div className="px-5 mt-2 space-y-5 pb-20">
        <Section title="المظهر">
          <Row icon={Moon} label="الوضع الداكن"><Toggle on={dark} onChange={() => setDark(!dark)} /></Row>
          <Row icon={Type} label={`حجم الخطّ: ${font}px`}>
            <input type="range" min={14} max={22} value={font} onChange={(e) => setFont(+e.target.value)} className="accent-[var(--gold)] w-32" />
          </Row>
        </Section>

        <Section title="اللغة">
          <div className="grid grid-cols-4 gap-2 p-2">
            {(["ar", "fr", "en", "amz"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`h-10 rounded-xl text-xs ${lang === l ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40" : "bg-card/40 text-white/60 border border-white/5"}`}
              >
                {l === "ar" ? "العربية" : l === "fr" ? "Français" : l === "en" ? "English" : "ⵜⵎⵣⵗⵜ"}
              </button>
            ))}
          </div>
        </Section>

        <Section title="القراءة والتنزيل">
          <Row icon={Download} label="تنزيل تلقائي للكتب الجديدة"><Toggle on={download} onChange={() => setDownload(!download)} /></Row>
          <Row icon={Bell} label="إشعارات التذكير"><Toggle on={notif} onChange={() => setNotif(!notif)} /></Row>
        </Section>

        <Section title="حول التطبيق">
          <RowLink icon={Shield} label="الخصوصية والشروط" />
          <RowLink icon={Languages} label="المساهمون في المحتوى" />
          <RowLink icon={Info} label="إصدار التطبيق 1.0.0" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] text-[var(--gold)] mb-2 px-1 uppercase tracking-widest">{title}</p>
      <div className="rounded-2xl glass divide-y divide-white/5">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, children }: { icon: any; label: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon className="h-4 w-4 text-white/70" />
      <span className="flex-1 text-sm">{label}</span>
      {children}
    </div>
  );
}

function RowLink({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5">
      <Icon className="h-4 w-4 text-white/70" />
      <span className="flex-1 text-right text-sm">{label}</span>
      <ChevronLeft className="h-4 w-4 text-white/40" />
    </button>
  );
}
