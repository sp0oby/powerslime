import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Power Slime",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#07120a",
    theme_color: "#07120a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.jpg", sizes: "400x400", type: "image/jpeg" },
    ],
  };
}
