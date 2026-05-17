import { createFileRoute } from "@tanstack/react-router";
import { ReactNode } from "react";

function SimpleAdmin({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{title}</h1>
        <p className="text-sm text-white/55 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

import { fullStories } from "@/data/heritage";
import { Edit3, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/stories")({
  component: () => (
    <SimpleAdmin title="الحكايات" subtitle={`${fullStories.length} حكاية`}>
      <button className="h-10 px-4 rounded-xl bg-[var(--gold)] text-black text-sm font-semibold flex items-center gap-2">
        <Plus className="h-4 w-4" /> إضافة حكاية
      </button>
      <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
        {fullStories.map((s) => (
          <div key={s.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
            <div className="min-w-0">
              <p className="font-semibold text-sm line-clamp-1">{s.title}</p>
              <p className="text-[11px] text-white/55 mt-0.5">{s.readTime} · {s.category}</p>
            </div>
            <div className="flex gap-1.5">
              <button className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 grid place-items-center"><Edit3 className="h-3.5 w-3.5" /></button>
              <button className="h-8 w-8 rounded-lg bg-red-500/10 text-red-300 grid place-items-center"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </SimpleAdmin>
  ),
});
