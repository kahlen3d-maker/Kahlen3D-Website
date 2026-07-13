import { createHmac } from "crypto";

/**
 * Signiert einen Blob-Pfad, damit nur vom Server erzeugte Download-Links
 * gültig sind (privater Speicher – Dateien sind nicht direkt öffentlich).
 */
export function signPath(pathname: string): string {
  const secret = process.env.BLOB_READ_WRITE_TOKEN || "kahlen3d-fallback-secret";
  return createHmac("sha256", secret).update(pathname).digest("hex").slice(0, 40);
}
