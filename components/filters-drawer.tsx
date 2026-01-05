"use client";
import { useEffect, useState } from "react";
import ProductsFilter from "./products-filter";
import { Category } from "@/types";

type FiltersDrawerProps = {
  categories: Category[];
};

export default function FiltersDrawer({ categories }: FiltersDrawerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="lg:hidden">
      <div className="p-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="h-9 rounded-md border border-black/15 bg-white px-3 text-sm font-medium shadow-sm hover:bg-black/5"
        >
          Filtros
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de produtos"
          className="fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-black/10 p-3">
              <span className="text-sm font-medium">Filtros</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar filtros"
                className="rounded-md border border-black/15 bg-white px-3 py-1 text-sm shadow-sm hover:bg-black/5"
              >
                Fechar
              </button>
            </div>

            <div className="p-3 h-[calc(100vh-3rem)] overflow-y-auto">
              {/* ProductsFilter is non-sticky on mobile; sticky applies only on lg via its own classes */}
              <ProductsFilter categories={categories} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
