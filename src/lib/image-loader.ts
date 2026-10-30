import type { ImageLoaderProps } from "next/image";

const REMOTE_MEDIA_HOST = "vomp-media.s3.ap-south-1.amazonaws.com";

// Base URL of the API / media host (e.g. https://dev.api.venueonmyplate.com).
// Admin-uploaded images are stored as root-relative "/uploads/..." paths; in a
// multi-domain deployment the public site must load them from the API host.
// Falls back to same-origin (empty prefix) for single-origin / local setups.
const MEDIA_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const normalized = src.replace(/\\/g, "/").trim();

  // Remote S3 assets — proxy through /media route
  if (normalized.startsWith(`https://${REMOTE_MEDIA_HOST}/`)) {
    const params = new URLSearchParams({ src: normalized, w: String(width) });
    if (quality) params.set("q", String(quality));
    return `/media?${params.toString()}`;
  }

  // Admin-uploaded media stored as root-relative paths. Serve from the API host
  // when configured, otherwise same-origin (resolved by Nginx / rewrites).
  if (normalized.startsWith("/uploads/")) {
    return MEDIA_BASE && MEDIA_BASE !== "/" ? `${MEDIA_BASE}${normalized}` : normalized;
  }

  // Accept uploads paths persisted without a leading slash.
  if (normalized.startsWith("uploads/")) {
    const uploadPath = `/${normalized}`;
    return MEDIA_BASE && MEDIA_BASE !== "/" ? `${MEDIA_BASE}${uploadPath}` : uploadPath;
  }

  // Some admin records may still contain localhost upload URLs. Rewrite those to
  // the configured API host so they render correctly on the public domain.
  if (normalized.startsWith("http://localhost:3200") || normalized.startsWith("http://127.0.0.1:3200")) {
    try {
      const url = new URL(normalized);
      if (url.pathname.startsWith("/uploads/") && MEDIA_BASE && MEDIA_BASE !== "/") {
        return `${MEDIA_BASE}${url.pathname}`;
      }
      return normalized;
    } catch {
      return normalized;
    }
  }

  // Local static assets — return as-is
  if (normalized.startsWith("http://localhost") || normalized.startsWith("http://127.0.0.1")) {
    return normalized;
  }

  return normalized;
}
