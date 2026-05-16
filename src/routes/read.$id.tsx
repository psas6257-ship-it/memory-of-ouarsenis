import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { books } from "@/data/content";
import { ArrowRight, Download, Bookmark, Sun } from "lucide-react";

export const Route = createFileRoute("/read/$id")({ component: Reader });

function Reader() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id) ?? books[0];

  return (
    <PhoneFrame>
      <div className="relative flex-1 flex flex-col bg-black">
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 z-30 safe-top px-4 py-3 flex items-center justify-between glass-strong">
          <button onClick={() => navigate({ to: "/book/$id", params: { id } })} className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="text-center">
            <p className="text-xs font-semibold line-clamp-1 max-w-[200px]">{book.title}</p>
            <p className="text-[10px] text-white/50">قراءة</p>
          </div>
          <div className="flex gap-1.5">
            <button className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={`${book.pdf}#view=FitH`}
          className="flex-1 w-full border-0 mt-16"
          title={book.title}
        />

        {/* Bottom bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 safe-bottom p-3 glass-strong">
          <div className="flex items-center gap-3">
            <a href={book.pdf} download className="h-10 px-4 rounded-xl bg-[var(--gold)] text-black text-xs font-semibold flex items-center gap-2">
              <Download className="h-3.5 w-3.5" /> تنزيل
            </a>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/3 rounded-full" style={{ background: "var(--gold)" }} />
            </div>
            <span className="text-[11px] text-white/60 tabular-nums">1 / {book.pages}</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
