import type { MetadataRoute } from "next";

const baseUrl = "https://www.elspattaya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about-us",
    "/courses/ged-foundation",
    "/courses/ged-fast-track",
    "/courses/ged-pathway",
    "/courses/complete-pathway",
    "/news/tips-to-grade-high-gpa-in-university-life",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.startsWith("/courses") ? 0.9 : 0.8,
  }));
}