import { useEffect, useState } from "react";

/** Local CRUD list synced to localStorage with seed fallback. */
export function useLocalList<T extends { id?: string | number }>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(() => {
    if (typeof window === "undefined") return seed;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T[]) : seed;
    } catch { return seed; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(items)); } catch {}
  }, [key, items]);

  const add = (item: T) => setItems((xs) => [{ ...item, id: item.id ?? Date.now() }, ...xs]);
  const update = (id: any, patch: Partial<T>) =>
    setItems((xs) => xs.map((x) => ((x as any).id === id ? { ...x, ...patch } : x)));
  const remove = (id: any) => setItems((xs) => xs.filter((x) => (x as any).id !== id));
  const reset = () => setItems(seed);
  return { items, add, update, remove, reset, setItems };
}
