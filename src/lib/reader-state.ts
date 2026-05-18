// PDF reader persistence — bookmarks, night mode, last page
const KEY = "mom-reader-v1";
type State = { bookmarks: Record<string, number[]>; pages: Record<string, number>; night: boolean };

function read(): State {
  try {
    return { bookmarks: {}, pages: {}, night: false, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { bookmarks: {}, pages: {}, night: false };
  }
}
function write(s: State) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }

export const reader = {
  getPage: (id: string) => read().pages[id] || 1,
  setPage: (id: string, p: number) => { const s = read(); s.pages[id] = p; write(s); },
  getBookmarks: (id: string) => read().bookmarks[id] || [],
  toggleBookmark: (id: string, p: number) => {
    const s = read();
    const list = new Set(s.bookmarks[id] || []);
    list.has(p) ? list.delete(p) : list.add(p);
    s.bookmarks[id] = [...list].sort((a, b) => a - b);
    write(s);
    return s.bookmarks[id];
  },
  getNight: () => read().night,
  setNight: (n: boolean) => { const s = read(); s.night = n; write(s); },
};
