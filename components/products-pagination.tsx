"use client";
import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ProductsPaginationProps = {
  totalPages: number;
  className?: string;
};

export default function ProductsPagination({
  totalPages,
  className,
}: ProductsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentPage = useMemo(() => {
    const raw = searchParams.get("page");
    const p = raw ? parseInt(raw, 10) : 1;
    if (Number.isNaN(p) || p < 1) return 1;
    if (totalPages && p > totalPages) return totalPages;
    return p;
  }, [searchParams, totalPages]);

  const goToPage = (page: number) => {
    const next = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      // Keep URL clean: drop ?page=1
      next.delete("page");
    } else {
      next.set("page", String(page));
    }
    startTransition(() => {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  };

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  // Build a compact range: first/last with ellipses and up to 5 pages around current
  const visiblePages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const pages: (number | "...")[] = [1];

    if (start > 2) pages.push("...");
    pages.push(...range);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Paginação de produtos"
      className={`sticky bottom-0 z-10 mt-4 rounded-lg border border-black/10 bg-white p-3 shadow-sm ${
        className ?? ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(1)}
            disabled={!canPrev || isPending}
            className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/70 shadow-sm hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Primeira página"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={!canPrev || isPending}
            className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/70 shadow-sm hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Página anterior"
          >
            Anterior
          </button>
        </div>

        <ul className="flex items-center gap-1">
          {visiblePages.map((p, idx) =>
            p === "..." ? (
              <li
                key={`ellipsis-${idx}`}
                className="px-2 text-sm text-black/50 select-none"
                aria-hidden="true"
              >
                …
              </li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => goToPage(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                  className={`h-9 min-w-9 rounded-md border border-black/15 px-3 text-sm shadow-sm ${
                    p === currentPage
                      ? "bg-black text-white"
                      : "bg-white text-black/80 hover:bg-black/5"
                  }`}
                  disabled={isPending}
                >
                  {p}
                </button>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={!canNext || isPending}
            className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/70 shadow-sm hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Próxima página"
          >
            Próxima
          </button>
          <button
            type="button"
            onClick={() => goToPage(totalPages)}
            disabled={!canNext || isPending}
            className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/70 shadow-sm hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Última página"
          >
            »
          </button>
        </div>
      </div>

      <div className="mt-2 text-center text-xs text-black/60">
        Página {currentPage} de {totalPages}
      </div>
    </nav>
  );
}
