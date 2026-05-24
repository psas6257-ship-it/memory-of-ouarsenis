import { useEffect } from "react";
import { toast } from "sonner";

export function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Detect Lovable preview iframes / dev — never register there
    const inIframe = (() => { try { return window.self !== window.top; } catch { return true; } })();
    const isPreview =
      location.hostname.includes("lovableproject.com") ||
      location.hostname.includes("id-preview--") ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";
    const isDev = (import.meta as any).env?.DEV === true;

    if (inIframe || isPreview || isDev) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
      return;
    }

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        // Check for updates periodically
        setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              toast("نسخة جديدة متاحة", {
                description: "اضغط للتحديث",
                action: { label: "تحديث", onClick: () => sw.postMessage({ type: "SKIP_WAITING" }) },
                duration: 10000,
              });
            }
          });
        });
      })
      .catch(() => {});
  }, []);
  return null;
}
