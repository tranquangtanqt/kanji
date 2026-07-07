export const dynamic = "force-static";

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://the-kanji-map.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      //   disallow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
