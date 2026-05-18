/**
 * طبقة API موحدة — جاهزة للربط مع باك-أند حقيقي لاحقاً.
 * استبدل المحتوى الداخلي بـ fetch(`${BASE}/...`) دون لمس الواجهات.
 */
import { books as localBooks, videos as localVideos, type Book } from "@/data/content";
import { fullStories as localStories, figures as localFigures, timeline as localTimeline, mapLocations as localMap } from "@/data/heritage";

export const BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const DELAY = 280;
const wait = <T,>(v: T): Promise<T> => new Promise((r) => setTimeout(() => r(v), DELAY));

async function tryFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  } catch {
    return wait(fallback);
  }
}

export const api = {
  // Library
  getBooks: () => tryFetch<Book[]>("/books", localBooks),
  getBook: (id: string) => tryFetch<Book | undefined>(`/books/${id}`, localBooks.find((b) => b.id === id)),
  getVideos: () => tryFetch("/videos", localVideos),
  // Heritage
  getStories: () => tryFetch("/stories", localStories),
  getFigures: () => tryFetch("/figures", localFigures),
  getTimeline: () => tryFetch("/timeline", localTimeline),
  getMapLocations: () => tryFetch("/map", localMap),
  // Auth — placeholder (real auth lives in src/lib/auth.tsx)
  login: async (email: string, password: string) =>
    wait({ ok: true, email, name: email.split("@")[0], role: email.includes("admin") ? "admin" : "user" }),
  forgotPassword: async (email: string) => {
    console.info("[api.forgotPassword]", email);
    return wait({ ok: true });
  },
  resetPassword: async (token: string, password: string) => {
    console.info("[api.resetPassword]", token, password.length);
    return wait({ ok: true });
  },
  // Universal search
  search: async (q: string) => {
    const t = q.trim().toLowerCase();
    if (!t) return wait({ books: [], videos: [], stories: [], figures: [] });
    return wait({
      books: localBooks.filter((b) => b.title.toLowerCase().includes(t) || b.description.toLowerCase().includes(t)),
      videos: localVideos.filter((v) => v.title.toLowerCase().includes(t) || v.category.toLowerCase().includes(t)),
      stories: localStories.filter((s: any) => s.title.toLowerCase().includes(t) || (s.subtitle || "").toLowerCase().includes(t)),
      figures: localFigures.filter((f) => f.name.toLowerCase().includes(t) || f.title.toLowerCase().includes(t)),
    });
  },
};

export type Api = typeof api;
