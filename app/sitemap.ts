import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Homepage
  const entries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
  ];

  try {
    const res = await fetch("https://dummyjson.com/products?limit=100", {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data?.products)) {
      for (const p of data.products) {
        const updated = p?.meta?.updatedAt || p?.meta?.createdAt;
        entries.push({
          url: `${baseUrl}/${p.id}`,
          lastModified: updated ? new Date(updated) : new Date(),
        });
      }
    }
  } catch {
    // If external fetch fails, return minimal entries
  }

  return entries;
}
