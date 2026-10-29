import type { NextConfig } from "next";

const apiInternal = (process.env.API_INTERNAL_URL || "http://localhost:3101").replace(/\/+$/, "");

// `upgrade-insecure-requests` tells the browser to rewrite every HTTP
// subresource (CSS, JS, images) to HTTPS. That is correct behind TLS, but it
// makes the site render as unstyled HTML when it is opened directly over
// HTTP (for example http://<server-ip>:3100). Keep it opt-in so plain-HTTP
// deployments work, and enable it explicitly once HTTPS is configured.
const upgradeInsecureRequests =
  process.env.CSP_UPGRADE_INSECURE_REQUESTS === "1" ? ["upgrade-insecure-requests"] : [];

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' https:",
  "connect-src 'self' https:",
  "frame-src 'none'",
  ...upgradeInsecureRequests,
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const appliedSecurityHeaders =
  process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }, ...securityHeaders]
    : securityHeaders;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["lucide-react"] },

  // Disable webpack persistent filesystem cache to avoid OneDrive EPERM crashes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any, { dev }: { dev: boolean }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },

  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  async rewrites() {
    return [
      // Keep browser traffic same-origin in local development too. In
      // production Nginx answers /api and /uploads before Next.js.
      { source: "/api/:path*", destination: `${apiInternal}/api/:path*` },
      { source: "/uploads/:path*", destination: `${apiInternal}/uploads/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: appliedSecurityHeaders,
      },
      {
        source: "/healthz",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

export default nextConfig;
