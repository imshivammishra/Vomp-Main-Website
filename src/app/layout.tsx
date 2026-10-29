import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

const body = localFont({
  src: "../../public/fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Venue On My Plate — Find a venue worthy of your occasion",
    template: "%s | Venue On My Plate",
  },
  description:
    "Discover exceptional wedding and celebration venues across India. Curated palaces, resorts, lawns and ballrooms — plus a personal shortlist on request.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    siteName: "Venue On My Plate",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    title: "Venue On My Plate — Find a venue worthy of your occasion",
    description:
      "Discover exceptional wedding and celebration venues across India. Curated palaces, resorts, lawns and ballrooms.",
    images: [{ url: `${SITE_URL}/images/og-cover.svg`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/images/brand-logo-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#5c0a20",
};

const homeScrollReset = `(function () {
  try {
    if (location.pathname !== "/" || location.hash) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    window.addEventListener("load", function () {
      if (!location.hash) window.scrollTo(0, 0);
    }, { once: true });
  } catch (_) {}
})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={body.variable}>
      <body className="min-h-screen">
        <Script id="home-scroll-reset" strategy="beforeInteractive">
          {homeScrollReset}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
