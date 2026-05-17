import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/notifications")({ component: NotifAdmin });

function NotifAdmin() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>مركز الإشعارات</h1>
        <p className="text-sm text-white/55 mt-1">أرسل إشعاراً جديداً للمستخدمين</p>
      </div>
      <div className="space-y-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان الإشعار" className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-3 text-sm outline-none" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="نص الإشعار..." className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none resize-none" />
        <button onClick={() => { setSent(true); setTimeout(() => setSent(false), 2000); setTitle(""); setBody(""); }} className="h-10 px-4 rounded-xl bg-[var(--gold)] text-black text-sm font-semibold flex items-center gap-2">
          <Send className="h-4 w-4" /> {sent ? "تم الإرسال ✓" : "إرسال"}
        </button>
      </div>
    </div>
  );
}
