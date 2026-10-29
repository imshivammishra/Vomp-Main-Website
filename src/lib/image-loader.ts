import type { ImageLoaderProps } from "next/image";

const REMOTE_MEDIA_HOST = "vomp-media.s3.ap-south-1.amazonaws.com";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith(`https://${REMOTE_MEDIA_HOST}/`)) {
    const params = new URLSearchParams({
      src,
      w: String(width),
    });
    if (quality) params.set("q", String(quality));
    return `/media?${params.toString()}`;
  }

  // For local images, append width so Next.js considers the loader valid
  if (src.startsWith("/")) {
    const url = new URL(src, "http://localhost");
    url.searchParams.set("w", String(width));
    if (quality) url.searchParams.set("q", String(quality));
    return `${url.pathname}${url.search}`;
  }

  return src;
}
