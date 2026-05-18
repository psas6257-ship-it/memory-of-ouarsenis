import { useEffect } from "react";

export function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // Guard against Lovable preview iframes
    const inIframe = (() => { try { return window.self !== window.top; } catch { return true; } })();
    const isPreview = location.hostname.includes("lovableproject.com") || location.hostname.includes("id-preview--");
    if (inIframe || isPreview) {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
