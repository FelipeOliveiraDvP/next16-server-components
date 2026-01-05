import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Use site URL from env for absolute URLs
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Next 16 Server Components Example",
    template: "%s | Next 16 Server Components",
  },
  description:
    "A Next.js 16 application demonstrating server components with product data.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Next 16 Server Components Example",
    description:
      "A Next.js 16 application demonstrating server components with product data.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next 16 Server Components Example",
    description:
      "A Next.js 16 application demonstrating server components with product data.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
