// Lightweight analytics — replace with real provider later.
type EventName =
  | "page_view"
  | "book_open"
  | "book_read"
  | "story_open"
  | "video_play"
  | "search"
  | "login"
  | "register"
  | "share";

export function track(event: EventName, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, data, ts: Date.now(), path: window.location.pathname };
  // eslint-disable-next-line no-console
  console.info("[analytics]", event, payload);
  try {
    const list = JSON.parse(localStorage.getItem("mom-events") || "[]");
    list.push(payload);
    localStorage.setItem("mom-events", JSON.stringify(list.slice(-200)));
  } catch {}
}
