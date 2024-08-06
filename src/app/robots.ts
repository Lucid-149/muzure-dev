import { MetadataRoute } from "next";

const URL = "https://muzuretravel.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/about/terms",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/about/terms/privacy",
      },
    ],
    sitemap: `${URL}/sitemap.xml`,
  };
}
