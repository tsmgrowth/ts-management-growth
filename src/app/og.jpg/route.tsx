import { ImageResponse } from "next/og";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link-preview card shown when the site is shared in texts, iMessage, WhatsApp, Facebook, LinkedIn, Slack, etc.
// Rendered once at build time and served as a small JPEG (some apps skip preview images over ~300 KB).
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export async function GET() {
  const root = process.cwd();
  const [mark, bold, regular] = await Promise.all([
    readFile(join(root, "src/app/icon.jpg")),
    readFile(join(root, "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
    readFile(join(root, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
  ]);
  const markSrc = `data:image/jpeg;base64,${mark.toString("base64")}`;

  const card = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          padding: "0 80px",
          fontFamily: "Geist",
          color: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #050f26 0%, #0a1f4d 55%, #1449c9 130%)",
        }}
      >
        <div style={{ position: "absolute", right: -140, top: -180, width: 700, height: 700, borderRadius: 700, backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.5) 0%, rgba(56,189,248,0) 65%)" }} />
        <div style={{ position: "absolute", left: -200, bottom: -260, width: 640, height: 640, borderRadius: 640, backgroundImage: "radial-gradient(circle, rgba(31,95,224,0.45) 0%, rgba(31,95,224,0) 65%)" }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={290} height={290} alt="" style={{ borderRadius: 66, boxShadow: "0 30px 80px rgba(20,73,201,0.65)", marginRight: 64 }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", fontSize: 21, fontWeight: 700, letterSpacing: 4, color: "#38bdf8", border: "2px solid rgba(56,189,248,0.55)", background: "rgba(56,189,248,0.14)", padding: "10px 22px", borderRadius: 999 }}>
            BUSINESS ADMINISTRATION  |  FLORIDA
          </div>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, marginTop: 28 }}>TS Management Growth</div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 400, letterSpacing: 12, color: "#c9d1de", marginTop: 8 }}>L L C</div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 400, lineHeight: 1.3, color: "#dbe7ff", marginTop: 26 }}>Business administration that moves with your growth.</div>
        </div>

        <div style={{ position: "absolute", left: 80, bottom: 44, display: "flex", fontSize: 22, color: "#c9d1de", letterSpacing: 1 }}>
          Filings  ·  EIN  ·  Records  ·  Registered Agent
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );

  const jpg = await sharp(Buffer.from(await card.arrayBuffer())).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
