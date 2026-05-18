import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function OfflineBanner() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const upd = () => setOff(!navigator.onLine);
    upd();
    window.addEventListener("online", upd);
    window.addEventListener("offline", upd);
    return () => {
      window.removeEventListener("online", upd);
      window.removeEventListener("offline", upd);
    };
  }, []);
  return (
    <AnimatePresence>
      {off && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="fixed top-0 inset-x-0 z-[100] bg-amber-500/95 text-black text-xs font-semibold py-2 px-4 flex items-center justify-center gap-2 backdrop-blur"
        >
          <WifiOff className="h-3.5 w-3.5" />
          أنت غير متصل — يتم عرض المحتوى المخزن
        </motion.div>
      )}
    </AnimatePresence>
  );
}
