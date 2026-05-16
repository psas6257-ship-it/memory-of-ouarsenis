import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const h = (e: any) => {
      e.preventDefault();
      setDeferred(e);
      if (!sessionStorage.getItem("install-dismissed")) setShow(true);
    };
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setShow(false);
  };

  const dismiss = () => {
    sessionStorage.setItem("install-dismissed", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-32 inset-x-4 z-50 glass-strong shadow-luxe rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-xl bg-[var(--gold)]/20 grid place-items-center">
            <Download className="h-4 w-4 text-[var(--gold)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">ثبّت التطبيق</p>
            <p className="text-[11px] text-white/60">للوصول بضغطة واحدة من شاشتك</p>
          </div>
          <button onClick={install} className="h-9 px-4 rounded-xl bg-[var(--gold)] text-background text-xs font-bold">ثبّت</button>
          <button onClick={dismiss} className="h-8 w-8 grid place-items-center text-white/50"><X className="h-4 w-4" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
