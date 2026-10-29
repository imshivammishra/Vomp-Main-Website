import type { ImageLoaderProps } from "next/image";

const REMOTE_MEDIA_HOST = "vomp-media.s3.ap-south-1.amazonaws.com";

// Base URL of the API / media host (e.g. https://dev.api.venueonmyplate.com).
// Admin-uploaded images are stored as root-relative "/uploads/..." paths; in a
// multi-domain deployment the public site must load them from the API host.
// Falls back to same-origin (empty prefix) for single-origin / local setups.
const MEDIA_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  // Remote S3 assets — proxy through /media route
  if (src.startsWith(`https://${REMOTE_MEDIA_HOST}/`)) {
    const params = new URLSearchParams({ src, w: String(width) });
    if (quality) params.set("q", String(quality));
    return `/media?${params.toString()}`;
  }

  // Admin-uploaded media stored as root-relative paths. Serve from the API host
  // when configured, otherwise same-origin (resolved by Nginx / rewrites).
  if (src.startsWith("/uploads/")) {
    return MEDIA_BASE && MEDIA_BASE !== "/" ? `${MEDIA_BASE}${src}` : src;
  }

  // Admin-uploaded images served directly from admin panel (localhost:3200/uploads/)
  if (src.startsWith("http://localhost:3200") || src.startsWith("http://127.0.0.1:3200")) {
    return src;
  }

  // Local static assets — return as-is
  if (src.startsWith("http://localhost") || src.startsWith("http://127.0.0.1")) {
    return src;
  }

  return src;
}
