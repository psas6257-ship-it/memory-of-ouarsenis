import { createFileRoute } from "@tanstack/react-router";
import { timeline } from "@/data/heritage";
import { Edit3 } from "lucide-react";

export const Route = createFileRoute("/admin/timeline")({
  component: () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>الخط الزمني</h1>
        <p className="text-sm text-white/55 mt-1">{timeline.length} حدثاً تاريخياً</p>
      </div>
      <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
        {timeline.map((t, i) => (
          <div key={i} className="p-4 flex items-start justify-between gap-4 hover:bg-white/[0.02]">
            <div className="flex-1">
              <p className="text-xs text-[var(--gold)] font-semibold">{t.year}</p>
              <p className="font-semibold text-sm mt-0.5">{t.title}</p>
              <p className="text-[11px] text-white/55 mt-1 line-clamp-2">{t.description}</p>
            </div>
            <button className="h-8 w-8 rounded-lg bg-white/5 grid place-items-center shrink-0"><Edit3 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>
    </div>
  ),
});
