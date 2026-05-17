import { createFileRoute } from "@tanstack/react-router";
import { audioTracks } from "@/data/heritage";
import { Music, Edit3, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/media")({
  component: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>مكتبة الصوت</h1>
          <p className="text-sm text-white/55 mt-1">{audioTracks.length} مقطعاً صوتياً</p>
        </div>
        <button className="h-10 px-4 rounded-xl bg-[var(--gold)] text-black text-sm font-semibold flex items-center gap-2">
          <Plus className="h-4 w-4" /> رفع صوت
        </button>
      </div>
      <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
        {audioTracks.map((a) => (
          <div key={a.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-rose-500/20 grid place-items-center"><Music className="h-4 w-4" /></div>
              <div>
                <p className="font-semibold text-sm">{a.title}</p>
                <p className="text-[11px] text-white/55">{a.narrator} · {a.duration}</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="h-8 w-8 rounded-lg bg-white/5 grid place-items-center"><Edit3 className="h-3.5 w-3.5" /></button>
              <button className="h-8 w-8 rounded-lg bg-red-500/10 text-red-300 grid place-items-center"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
