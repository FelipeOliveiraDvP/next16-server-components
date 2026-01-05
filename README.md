# Next 16 Server Components Catalog

**Purpose:** A practical demo of Next.js 16 Server Components building a product catalog. It showcases URL-driven filters and pagination, responsive layouts, skeleton loading, a rich product detail page with an image gallery, and basic SEO setup.

## Overview
- **Server Components-first:** The list and detail pages fetch on the server using `searchParams`, ensuring fast, cache-friendly rendering.
- **URL-driven UI:** Filters and pagination update the URL, triggering server re-fetch and keeping pages shareable/bookmarkable.
- **Responsive UX:** Desktop sidebar, mobile/tablet collapsible filters drawer, and simplified pagination on small screens.
- **Product Detail:** Full `Product` interface rendering with gallery, specs, policies, meta, and reviews.
- **Skeletons:** Matching skeletons for catalog and product detail to reduce perceived load time.
- **Basic SEO:** Metadata defaults, `robots.txt`, `sitemap.xml`, and `manifest` via Next metadata routes.

## Features
- **Filters:** Search text, category selection, and sort (name asc, price desc) mapped to DummyJSON API parameters.
- **Pagination:** Compact pager with URL param `page`; mobile/tablet show only Prev/Next.
- **Image Gallery:** Thumbnails, zoom, fullscreen (yet-another-react-lightbox) on the detail page.
- **Accessibility:** Keyboard close for mobile drawer, ARIA labels on interactive elements.
- **Back to Top:** Floating button on the list page to jump to the top.

## Tech Stack
- Next.js 16 (App Router, Server Components)
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- yet-another-react-lightbox (gallery)

## Project Structure
- `app/page.tsx`: Products list with filters, pagination, responsive grid
- `app/[productId]/page.tsx`: Product detail with image gallery and full specs
- `components/products-filter.tsx`: Client filter panel; syncs URL params
- `components/products-pagination.tsx`: Client pagination; responsive controls
- `components/filters-drawer.tsx`: Mobile/tablet drawer wrapper for filters
- `components/back-to-top-button.tsx`: Floating back-to-top control
- `app/loading.tsx`: Catalog skeleton (grid + sidebar)
- `app/[productId]/loading.tsx`: Detail skeleton (gallery + info blocks)
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`: SEO metadata routes
- `app/layout.tsx`: Global styles, fonts, and enhanced metadata

## How It Works
- **Filters & URL:** Client components update `searchParams` using `router.replace`; server pages read params and fetch accordingly.
- **Sorting:** Maps UI values to API (`sortBy`, `order`) for `title` and `price`.
- **Pagination:** `page` and computed `skip/limit` control API paging; URL cleaned by omitting `?page=1`.
- **Responsiveness:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; desktop shows sidebar, mobile uses drawer.

## SEO
- **Metadata:** Title template, canonical, robots, Open Graph, Twitter in `app/layout.tsx`.
- **Robots:** `app/robots.ts` refers to `sitemap.xml`.
- **Sitemap:** `app/sitemap.ts` includes `/` and product detail pages.
- **Manifest:** `app/manifest.ts` provides basic PWA metadata.

Set your site URL via environment variable for absolute links:

```bash
set NEXT_PUBLIC_SITE_URL=https://your-domain.com # Windows PowerShell
# or in .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Place assets in `public/` as needed:
- `public/favicon.ico`
- `public/og.png`

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the catalog.

## Deployment

Deploy anywhere that supports Next.js 16. For Vercel, see the Next.js deployment docs: https://nextjs.org/docs/app/building-your-application/deploying

## Learn More
- Next.js Documentation: https://nextjs.org/docs
- Learn Next.js: https://nextjs.org/learn
- Next.js GitHub: https://github.com/vercel/next.js
