import { ReactNode } from "react";

/**
 * Wraps the app in a phone-shaped frame on desktop to keep the native feel.
 * On mobile it disappears and the app goes fullscreen.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center md:p-8 relative overflow-hidden">
      {/* desktop ambient */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] rounded-full blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
      </div>
      <div className="relative w-full md:w-[420px] md:h-[860px] md:max-h-[92vh] md:rounded-[3rem] md:border md:border-white/10 md:shadow-2xl md:overflow-hidden bg-background min-h-screen md:min-h-0 flex flex-col">
        {/* notch on desktop */}
        <div className="hidden md:flex absolute top-2 left-1/2 -translate-x-1/2 z-50 h-7 w-32 rounded-full bg-black items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-zinc-700 mr-2" />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden relative" dir="rtl">
          {children}
        </div>
      </div>
    </div>
  );
}
