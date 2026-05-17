import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>الإعدادات العامة</h1>
        <p className="text-sm text-white/55 mt-1">إعدادات المنصة والـ SEO والـ PWA</p>
      </div>

      {[
        { title: "هوية التطبيق", rows: [["الاسم", "ذاكرة الجبل — Memory of the Mountain"], ["الوصف", "تجربة رقمية غامرة لتراث منطقة الونشريس"]] },
        { title: "SEO والميتاداتا", rows: [["عنوان الصفحة", "ذاكرة الجبل — Memory of the Mountain"], ["الكلمات المفتاحية", "تراث، الونشريس، تيسمسيلت، حكايات"]] },
        { title: "PWA", rows: [["نوع العرض", "standalone"], ["لون السمة", "#1a1410"]] },
        { title: "السمات والقراءة", rows: [["الافتراضي", "الوضع الداكن"], ["الخط", "Tajawal · Cormorant"]] },
      ].map((s) => (
        <div key={s.title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <h2 className="font-semibold text-sm mb-3 text-[var(--gold)]">{s.title}</h2>
          <div className="space-y-3">
            {s.rows.map(([label, value]) => (
              <div key={label}>
                <p className="text-[11px] text-white/50 mb-1">{label}</p>
                <input defaultValue={value} className="w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm outline-none" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="h-11 px-6 rounded-xl bg-[var(--gold)] text-black font-semibold text-sm">حفظ التغييرات</button>
    </div>
  ),
});
