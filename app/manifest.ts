import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const name = "Next 16 Server Components";
  return {
    name,
    short_name: "Next16",
    description:
      "A Next.js 16 application demonstrating server components with product data.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
