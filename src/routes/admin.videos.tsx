import { createFileRoute } from "@tanstack/react-router";
import { videos } from "@/data/content";
import { Play, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/videos")({
  component: () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>الفيديوهات</h1>
        <p className="text-sm text-white/55 mt-1">{videos.length} فيديو</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((v) => (
          <div key={v.id} className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="relative aspect-video">
              <img src={v.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/30 grid place-items-center">
                <Play className="h-7 w-7 text-white" fill="white" />
              </div>
              <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/70 px-1.5 py-0.5 rounded">{v.duration}</span>
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold line-clamp-1">{v.title}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-white/50">{v.category}</span>
                <button className="h-6 w-6 rounded-md bg-red-500/10 text-red-300 grid place-items-center"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
