import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "شروط الاستخدام — ذاكرة الجبل" },
      { name: "description", content: "شروط استخدام تطبيق ذاكرة الجبل." },
    ],
    links: [{ rel: "canonical", href: "https://memory-of-ouarsenis.lovable.app/terms" }],
  }),
});

function Terms() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto safe-bottom">
        <header className="safe-top px-5 py-4 flex items-center gap-3 sticky top-0 glass-strong z-10">
          <Link to="/" className="h-9 w-9 rounded-full bg-white/10 grid place-items-center"><ArrowRight className="h-4 w-4" /></Link>
          <h1 className="text-lg font-bold">شروط الاستخدام</h1>
        </header>
        <div className="px-6 py-6 text-sm text-white/75 leading-loose space-y-4">
          <p>باستخدامك للتطبيق فإنك توافق على الشروط التالية:</p>
          <h3 className="font-bold text-[var(--gold)]">الاستخدام</h3>
          <p>المحتوى لأغراض تعليمية وثقافية فقط. يُمنع إعادة النشر التجاري دون إذن.</p>
          <h3 className="font-bold text-[var(--gold)]">حقوق الملكية</h3>
          <p>جميع المحتويات محفوظة لأصحابها. التطبيق منصة للحفاظ على التراث.</p>
          <h3 className="font-bold text-[var(--gold)]">الحساب</h3>
          <p>أنت مسؤول عن أمن بيانات حسابك وأي نشاط يصدر منه.</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
