import { createFileRoute } from "@tanstack/react-router";
import { mapLocations } from "@/data/heritage";
import { MapPin, Edit3 } from "lucide-react";

export const Route = createFileRoute("/admin/map")({
  component: () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>مواقع الخريطة التراثية</h1>
        <p className="text-sm text-white/55 mt-1">{mapLocations.length} موقعاً</p>
      </div>
      <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
        {mapLocations.map((m) => (
          <div key={m.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--gold)]/15 grid place-items-center"><MapPin className="h-4 w-4 text-[var(--gold)]" /></div>
              <div>
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-[11px] text-white/55">{m.type} · {m.lat.toFixed(3)}, {m.lng.toFixed(3)}</p>
              </div>
            </div>
            <button className="h-8 w-8 rounded-lg bg-white/5 grid place-items-center"><Edit3 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>
    </div>
  ),
});
