import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MINT } from "@/data/lore";

export const alt = "POWER SLIME — Thalassa of the house of Pelagos. 1,200 slimes minting on Robinhood.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Bricolage Grotesque ExtraBold, so the card matches the site's type.
// Falls back to the default font if Google Fonts can't be reached at build.
async function display(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&display=swap", {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OG() {
  const [art, font] = await Promise.all([
    readFile(join(process.cwd(), "public/art/pelagos.jpg")),
    display(),
  ]);
  const src = `data:image/jpeg;base64,${art.toString("base64")}`;
  const ff = font ? "Bricolage" : undefined;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(120deg, #06235e 0%, #07120a 70%)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={630} height={630} style={{ objectFit: "cover" }} alt="" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", color: "#effbe4" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#2ec5ff", textTransform: "uppercase" }}>
            Thalassa · House of Pelagos
          </div>
          <div style={{ fontFamily: ff, fontSize: 96, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, color: "#6cff2e", marginTop: 18 }}>
            POWER SLIME
          </div>
          <div style={{ fontFamily: ff, fontSize: 38, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, marginTop: 22 }}>
            Twelve houses. One was eaten. Pick your side.
          </div>
          <div style={{ display: "flex", marginTop: 36 }}>
            <div style={{ display: "flex", fontFamily: ff, fontSize: 30, fontWeight: 800, background: "#6cff2e", color: "#041004", padding: "12px 24px", borderRadius: 22, border: "4px solid #041004" }}>
              {`Minting on ${MINT.chain}`}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] : [] },
  );
}
