import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ArrowRight, Mountain } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "حول التطبيق — ذاكرة الجبل" },
      { name: "description", content: "تعرّف على مشروع ذاكرة الجبل: منصة رقمية لتراث منطقة الونشريس." },
      { property: "og:title", content: "حول التطبيق — ذاكرة الجبل" },
      { property: "og:description", content: "منصة رقمية فاخرة لتراث الونشريس." },
    ],
    links: [{ rel: "canonical", href: "https://memory-of-ouarsenis.lovable.app/about" }],
  }),
});

function About() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto safe-bottom">
        <header className="safe-top px-5 py-4 flex items-center gap-3 sticky top-0 glass-strong z-10">
          <Link to="/" className="h-9 w-9 rounded-full bg-white/10 grid place-items-center"><ArrowRight className="h-4 w-4" /></Link>
          <h1 className="text-lg font-bold">حول التطبيق</h1>
        </header>
        <div className="px-6 pb-10">
          <div className="my-8 flex items-center justify-center">
            <div className="h-20 w-20 rounded-3xl grid place-items-center" style={{ background: "linear-gradient(135deg, var(--gold), var(--clay))" }}>
              <Mountain className="h-10 w-10 text-black/70" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gradient-gold" style={{ fontFamily: "var(--font-display)" }}>ذاكرة الجبل</h2>
          <p className="text-sm text-white/70 leading-loose mt-6">
            مشروع رقمي يهدف إلى صون التراث الثقافي والأدبي لمنطقة الونشريس وتقديمه بشكل تفاعلي وفاخر،
            يجمع بين الكتب الأكاديمية، الحكايات الشعبية، الشخصيات التراثية، الأماكن، والتسجيلات الصوتية والمرئية.
          </p>
          <h3 className="text-sm font-bold mt-8 text-[var(--gold)]">رؤيتنا</h3>
          <p className="text-sm text-white/70 leading-loose mt-2">جعل التراث الجزائري في متناول كل أبنائه عبر تجربة سينمائية على هواتفهم.</p>
          <h3 className="text-sm font-bold mt-8 text-[var(--gold)]">الفريق</h3>
          <p className="text-sm text-white/70 leading-loose mt-2">مجموعة من الباحثين والمصممين والمطورين المتطوعين لخدمة الذاكرة الجماعية.</p>
        </div>
      </div>
    </PhoneFrame>
  );
}
