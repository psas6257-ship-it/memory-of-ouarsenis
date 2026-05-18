import { toast } from "sonner";
import { track } from "./analytics";

export async function shareContent(opts: { title: string; text?: string; url?: string }) {
  const url = opts.url || (typeof window !== "undefined" ? window.location.href : "");
  track("share", { title: opts.title, url });
  try {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      await (navigator as any).share({ title: opts.title, text: opts.text, url });
      return true;
    }
    await navigator.clipboard.writeText(`${opts.title}\n${url}`);
    toast.success("تم نسخ الرابط");
    return true;
  } catch {
    return false;
  }
}
