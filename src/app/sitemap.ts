import type { MetadataRoute } from "next";

import { getCmsCourseCards, getCmsNews } from "@/lib/cms/content";

const baseUrl = "https://www.elspattaya.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, news] = await Promise.all([
    getCmsCourseCards(),
    getCmsNews(),
  ]);

  const staticRoutes = [
    "",
    "/about-us",
    "/courses",
    "/programs",
    "/contact-us",
  ];

  const courseRoutes = courses
    ? Object.values(courses)
        .flat()
        .flatMap((course) => (course.href ? [course.href] : []))
    : [
        "/programs/ged-foundation",
        "/programs/ged-fast-track",
        "/programs/ged-pathway",
        "/programs/complete-pathway",
      ];

  const newsRoutes = news
    ? news.map((story) => `/news/${story.slug}`)
    : ["/news/tips-to-grade-high-gpa-in-university-life"];

  const routes = [...staticRoutes, ...courseRoutes, ...newsRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,

    changeFrequency: "weekly",

    priority:
      route === ""
        ? 1
        : route.startsWith("/courses") || route.startsWith("/programs")
          ? 0.9
          : 0.8,
  }));
}
