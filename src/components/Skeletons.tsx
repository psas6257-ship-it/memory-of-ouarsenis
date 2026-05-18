export function BookCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3 animate-pulse">
      <div className="aspect-[2/3] rounded-xl bg-white/5" />
      <div className="mt-3 h-3 rounded bg-white/10 w-3/4" />
      <div className="mt-2 h-2.5 rounded bg-white/5 w-1/2" />
    </div>
  );
}
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse">
      <div className="h-14 w-14 rounded-xl bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-3 rounded bg-white/10 w-2/3" />
        <div className="h-2.5 rounded bg-white/5 w-1/3" />
      </div>
    </div>
  );
}
export function EmptyState({ title, hint, icon: Icon }: { title: string; hint?: string; icon?: any }) {
  return (
    <div className="text-center py-16 px-6">
      {Icon && <Icon className="h-10 w-10 mx-auto text-white/30 mb-3" />}
      <p className="text-sm font-semibold text-white/80">{title}</p>
      {hint && <p className="text-xs text-white/50 mt-1">{hint}</p>}
    </div>
  );
}
