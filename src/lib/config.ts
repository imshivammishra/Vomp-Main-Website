/**
 * Single source of truth for environment configuration.
 *
 * Every runtime value that comes from .env is declared here with a sensible
 * default. Components and libs should import `getConfig()` from this file
 * instead of reading process.env directly, so credentials live in one place
 * and are easy to audit. Evaluation happens lazily (inside getConfig) so it
 * is safe to import from both server and client components.
 */

export type Config = {
  /** Same-origin API base used by browser submissions. */
  publicApiBase: string;
  /** Private API base used by server-side reads (never exposed to browsers). */
  internalApiBase: string;
  /** Public site URL used for metadata and absolute links. */
  siteUrl: string;
  /** Whether browsers should upgrade insecure requests to HTTPS. */
  cspUpgradeInsecureRequests: boolean;
};

export function getConfig(): Config {
  return {
    publicApiBase: (process.env.NEXT_PUBLIC_API_URL || "/").replace(/\/+$/, ""),
    internalApiBase:
      (process.env.API_INTERNAL_URL || "http://127.0.0.1:3101").replace(/\/+$/, ""),
    siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://venueonmyplate.in").replace(
      /\/$/,
      ""
    ),
    cspUpgradeInsecureRequests: process.env.CSP_UPGRADE_INSECURE_REQUESTS === "1",
  };
}
