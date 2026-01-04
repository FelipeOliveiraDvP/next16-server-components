import { Category, Product, ProductListResponse } from "@/types";
import ProductCard from "./product-card";
import ProductsFilter from "@/components/products-filter";
import ProductsPagination from "@/components/products-pagination";

type SortValue = "name-asc" | "price-desc";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  // Read URL params controlled by the filter & pagination components
  const q = (sp.q as string) ?? "";
  const category = (sp.category as string) ?? "";
  const sort = (sp.sort as SortValue) ?? "";
  const pageParam = Number((sp.page as string) ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  // Allow overriding via URL (optional), else default to 10
  const limitParam = Number((sp.limit as string) ?? "");
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 10;
  const skip = (page - 1) * limit;

  // Map UI sort values to API sortBy/order
  const getSortParams = (s: SortValue | "") => {
    switch (s) {
      case "name-asc":
        return { sortBy: "title", order: "asc" as const };
      case "price-desc":
        return { sortBy: "price", order: "desc" as const };
      default:
        return null;
    }
  };

  const sortParams = getSortParams(sort);

  // Build endpoint based on filters
  let baseUrl = "https://dummyjson.com/products";
  const urlSearch = new URLSearchParams();

  // Choose resource path according to filter type
  if (category) {
    baseUrl = `${baseUrl}/category/${encodeURIComponent(category)}`;
  } else if (q) {
    baseUrl = `${baseUrl}/search`;
    urlSearch.set("q", q);
  }

  // Pagination params
  urlSearch.set("limit", String(limit));
  urlSearch.set("skip", String(skip));

  // Sorting params (if any)
  if (sortParams) {
    urlSearch.set("sortBy", sortParams.sortBy);
    urlSearch.set("order", sortParams.order);
  }

  const productsUrl = `${baseUrl}?${urlSearch.toString()}`;

  const [productsRes, categoriesRes] = await Promise.all([
    fetch(productsUrl, { cache: "no-store" }),
    fetch("https://dummyjson.com/products/categories", { cache: "no-store" }),
  ]);

  const data: ProductListResponse = await productsRes.json();
  const categories: Category[] = await categoriesRes.json();

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / limit));

  return (
    <main>
      <div className="grid grid-cols-3 container mx-auto px-4 py-8 gap-6">
        <ProductsFilter categories={categories} />
        <div className="flex flex-col space-y-4 col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <ProductsPagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
