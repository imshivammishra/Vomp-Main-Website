import type { ImageLoaderProps } from "next/image";

const REMOTE_MEDIA_HOST = "vomp-media.s3.ap-south-1.amazonaws.com";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  // Remote S3 assets — proxy through /media route
  if (src.startsWith(`https://${REMOTE_MEDIA_HOST}/`)) {
    const params = new URLSearchParams({ src, w: String(width) });
    if (quality) params.set("q", String(quality));
    return `/media?${params.toString()}`;
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
