import { get } from "@vercel/blob";
import { signPath } from "@/lib/blobSign";

export const runtime = "nodejs";

// Liefert eine private Blob-Datei über einen signierten Link aus.
// Nur Links, die der Server erzeugt hat (gültige Signatur), funktionieren.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get("p") ?? "";
  const sig = searchParams.get("s") ?? "";

  if (!pathname || sig !== signPath(pathname)) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  try {
    const res = await get(pathname, { access: "private" });
    if (!res) return new Response("Nicht gefunden", { status: 404 });
    const filename = pathname.split("/").pop() || "datei";
    return new Response(res.stream as unknown as BodyInit, {
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("Nicht gefunden", { status: 404 });
  }
}
