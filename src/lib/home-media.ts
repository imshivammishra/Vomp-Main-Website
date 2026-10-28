/**
 * Small media helpers shared between the home page and its section components.
 * Kept here so page.tsx stays a thin orchestrator.
 */

export const HERO_VIDEO = "/videos/hero-bg.mp4";
export const HERO_POSTER = "/images/hero-poster.jpg";

export function localMedia(src: string | undefined, fallback: string) {
  return src && src.startsWith("/") ? src : fallback;
}

export function localVideo(src: string | undefined) {
  return src && src.startsWith("/") && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) ? src : HERO_VIDEO;
}
