import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

/**
 * On-demand cache revalidation endpoint.
 * Called by the admin panel after publishing content changes.
 * 
 * POST /api/revalidate
 * Headers: x-revalidate-token: <REVALIDATE_SECRET>
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  const secret = process.env.REVALIDATE_SECRET ?? "vomp_revalidate_2024";

  if (token !== secret) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidateTag("vomp-content");

  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
