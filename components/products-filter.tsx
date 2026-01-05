"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types";

type SortValue = "name-asc" | "price-desc";

export type ProductsFilterProps = {
  categories: Category[];
  className?: string;
};

export default function ProductsFilter({
  categories,
  className,
}: ProductsFilterProps) {
  console.log(categories);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentSort = (searchParams.get("sort") as SortValue | null) ?? null;
  const currentCategory = searchParams.get("category") ?? null;
  const currentQuery = searchParams.get("q") ?? "";

  const [sortInput, setSortInput] = useState<SortValue | "">(
    (currentSort ?? "") as SortValue | ""
  );
  const [categoryInput, setCategoryInput] = useState<string>(
    currentCategory ?? ""
  );
  const [queryInput, setQueryInput] = useState<string>(currentQuery);

  const uniqueCategories: Category[] = useMemo(() => {
    // Normalize possible string values coming from API
    const normalized = categories
      .map((c) =>
        typeof c === "string" ? { slug: String(c), name: String(c) } : c
      )
      .filter((c) => c && typeof c.slug === "string");

    // Deduplicate by slug
    const bySlug = new Map<string, Category>();
    for (const c of normalized as Category[]) {
      if (!bySlug.has(c.slug)) bySlug.set(c.slug, c);
    }

    return Array.from(bySlug.values()).sort((a, b) =>
      String(a.slug).localeCompare(String(b.slug))
    );
  }, [categories]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value && value.length > 0) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    startTransition(() => {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  };

  const clearAll = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("sort");
    next.delete("category");
    next.delete("q");
    startTransition(() => {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
    setSortInput("");
    setCategoryInput("");
    setQueryInput("");
  };

  // Debounce search input and sync to URL as user types
  useEffect(() => {
    const handle = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      if (queryInput && queryInput.length > 0) {
        next.set("q", queryInput);
      } else {
        next.delete("q");
      }
      startTransition(() => {
        const qs = next.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    }, 400);
    return () => clearTimeout(handle);
    // Intentionally only debounce on queryInput changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput]);

  return (
    <section
      aria-label="Filtros de produtos"
      className={`sticky top-0 z-10 rounded-lg border border-black/10 bg-white p-4 h-[calc(100vh-2rem)] overflow-auto ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Buscar</span>
          <input
            type="search"
            inputMode="search"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Pesquisar produtos"
            className="h-9 rounded-md border border-black/15 bg-white px-2 text-sm shadow-sm focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Ordenar</span>
          <select
            value={sortInput}
            onChange={(e) => {
              const v = (e.target.value as SortValue) || "";
              setSortInput(v);
              updateParam("sort", v || null);
            }}
            className="h-9 rounded-md border border-black/15 bg-white px-2 text-sm shadow-sm focus:outline-none"
          >
            <option value="">Sem ordenação</option>
            <option value="name-asc">Nome (A–Z)</option>
            <option value="price-desc">Preço (maior → menor)</option>
          </select>
        </label>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Categorias</legend>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm shadow-sm">
              <input
                type="radio"
                name="category"
                value=""
                checked={!categoryInput}
                onChange={() => {
                  setCategoryInput("");
                  updateParam("category", null);
                }}
              />
              <span>Todas</span>
            </label>

            {uniqueCategories.map((cat) => (
              <label
                key={cat.slug}
                className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.slug}
                  checked={categoryInput === cat.slug}
                  onChange={() => {
                    setCategoryInput(cat.slug);
                    updateParam("category", cat.slug);
                  }}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={clearAll}
            disabled={isPending}
            className="flex-1 rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/70 shadow-sm hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Limpar
          </button>
        </div>
      </div>
    </section>
  );
}
