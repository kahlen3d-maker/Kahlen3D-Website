import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB pro Datei
const ACCEPTED_EXT = new Set([
  "png", "jpg", "jpeg", "gif", "webp", "heic", "heif", "bmp", "tiff",
  "pdf", "stl", "step", "stp", "3mf", "obj", "igs", "iges",
]);
const extOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
};

// Erzeugt für den Browser ein kurzlebiges Upload-Token, damit die Datei
// direkt in den Blob-Speicher geladen wird (umgeht das 4,5-MB-Limit der Funktion).
export async function POST(req: Request): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!ACCEPTED_EXT.has(extOf(pathname))) {
          throw new Error("Dateityp nicht erlaubt");
        }
        return {
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Nichts weiter nötig – die URL wird vom Client an /api/contact übergeben.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "upload_failed" },
      { status: 400 }
    );
  }
}
