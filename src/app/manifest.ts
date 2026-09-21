import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TS Management Growth LLC",
    short_name: "TS Management",
    description: "Business administration support for Florida businesses. Not legal, tax or accounting advice.",
    start_url: "/",
    display: "standalone",
    background_color: "#050f26",
    theme_color: "#0a1f4d",
    icons: [{ src: "/icon.jpg", sizes: "256x256", type: "image/jpeg", purpose: "any" }],
  };
}
