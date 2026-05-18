import { createFileRoute } from "@tanstack/react-router";
import { books as seed } from "@/data/content";
import { Search, Plus, Edit3, Trash2, Download, ExternalLink, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useLocalList } from "@/lib/use-local-list";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/books")({ component: BooksAdmin });

function BooksAdmin() {
  const [q, setQ] = useState("");
  const filtered = books.filter((b) => b.title.includes(q) || b.category.includes(q));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>الكتب والمخطوطات</h1>
          <p className="text-sm text-white/55 mt-1">{books.length} عنصراً في المكتبة</p>
        </div>
        <button className="h-10 px-4 rounded-xl bg-[var(--gold)] text-black text-sm font-semibold flex items-center gap-2 w-fit">
          <Plus className="h-4 w-4" /> إضافة كتاب
        </button>
      </div>

      <div className="flex items-center gap-2 px-3 h-11 rounded-xl bg-white/5 border border-white/10 max-w-md">
        <Search className="h-4 w-4 text-white/40" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالعنوان أو التصنيف..." className="bg-transparent text-sm flex-1 outline-none placeholder:text-white/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((b) => (
          <div key={b.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4">
            <img src={b.cover} alt="" className="h-24 w-20 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[var(--gold)]">{b.category} · {b.year}</p>
              <h3 className="font-bold text-sm mt-0.5 line-clamp-2">{b.title}</h3>
              <p className="text-[11px] text-white/55 mt-1">{b.author}</p>
              <p className="text-[10px] text-white/40 mt-1">{b.pages} صفحة</p>
              <div className="flex gap-1.5 mt-3">
                <button className="h-8 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] flex items-center gap-1">
                  <Edit3 className="h-3 w-3" /> تعديل
                </button>
                {b.pdf && (
                  <a href={b.pdf} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 grid place-items-center">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {b.pdf && (
                  <a href={b.pdf} download className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 grid place-items-center">
                    <Download className="h-3 w-3" />
                  </a>
                )}
                <button className="h-8 w-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 grid place-items-center">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
