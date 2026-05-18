import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — ذاكرة الجبل" },
      { name: "description", content: "سياسة الخصوصية وحماية البيانات في تطبيق ذاكرة الجبل." },
    ],
    links: [{ rel: "canonical", href: "https://memory-of-ouarsenis.lovable.app/privacy" }],
  }),
});

function Privacy() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto safe-bottom">
        <header className="safe-top px-5 py-4 flex items-center gap-3 sticky top-0 glass-strong z-10">
          <Link to="/" className="h-9 w-9 rounded-full bg-white/10 grid place-items-center"><ArrowRight className="h-4 w-4" /></Link>
          <h1 className="text-lg font-bold">سياسة الخصوصية</h1>
        </header>
        <div className="px-6 py-6 text-sm text-white/75 leading-loose space-y-4">
          <p>نحن نحترم خصوصية مستخدمينا ولا نجمع أي بيانات شخصية إلا ما يلزم لتشغيل التطبيق.</p>
          <h3 className="font-bold text-[var(--gold)]">البيانات التي نجمعها</h3>
          <p>البريد الإلكتروني والاسم عند التسجيل، وإحصائيات استخدام مجهولة الهوية لتحسين الخدمة.</p>
          <h3 className="font-bold text-[var(--gold)]">التخزين المحلي</h3>
          <p>نستخدم تخزين المتصفح لحفظ التفضيلات والإشارات المرجعية ومواقع القراءة.</p>
          <h3 className="font-bold text-[var(--gold)]">حقوقك</h3>
          <p>يمكنك حذف حسابك وبياناتك في أي وقت من إعدادات التطبيق.</p>
          <p className="text-xs text-white/50 mt-8">آخر تحديث: 2026</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
