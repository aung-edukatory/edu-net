import path from "node:path";

import { getPayload } from "payload";

import config from "@payload-config";
import { graduateTabs } from "@/components/home/GedGraduatesSection";
import { newsStories, partners } from "@/components/home/data";
import { courseDetails, coursesByTab } from "@/data/courses";

const payload = await getPayload({ config });
const root = process.cwd();
const mediaByPath = new Map<string, number>();

async function media(relativePath: string, alt: string) {
  const existing = mediaByPath.get(relativePath);
  if (existing) return existing;
  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.join(root, "public", relativePath.replace(/^\//, "")),
    overrideAccess: true,
  });
  mediaByPath.set(relativePath, created.id);
  return created.id;
}

async function isEmpty(
  collection: "graduates" | "courses" | "news" | "partners",
) {
  const result = await payload.count({ collection, overrideAccess: true });
  return result.totalDocs === 0;
}

if (await isEmpty("graduates")) {
  for (const [year, graduates] of Object.entries(graduateTabs)) {
    for (const [order, graduate] of graduates.entries()) {
      const name = graduate.alt.replace("GED graduate achievement poster for ", "");
      await payload.create({
        collection: "graduates",
        data: {
          name,
          year: Number(year),
          image: await media(graduate.src, graduate.alt),
          order,
          _status: "published",
        },
        draft: false,
        overrideAccess: true,
      });
    }
  }
}

if (await isEmpty("courses")) {
  for (const [category, courses] of Object.entries(coursesByTab)) {
    for (const [order, card] of courses.entries()) {
      const slug = card.href?.split("/").filter(Boolean).at(-1);
      const detail = courseDetails.find((course) => course.slug === slug);
      await payload.create({
        collection: "courses",
        data: {
          title: detail?.title ?? card.title,
          cardTitle: card.title,
          slug,
          category: category as keyof typeof coursesByTab,
          cardLabel: card.meta,
          cardSummary: card.detail,
          image: await media(card.image, `${card.title} course`),
          order,
          subtitle: detail?.subtitle,
          duration: detail?.duration,
          overview: detail?.overview.map((paragraph) => ({ paragraph })),
          audience: detail?.whoIsThisFor.map((item) => ({ item })),
          sections: detail?.sections.map((section) => ({
            heading: section.heading,
            content: section.content.map((paragraph) => ({ paragraph })),
          })),
          _status: "published",
        },
        draft: false,
        overrideAccess: true,
      });
    }
  }
}

if (await isEmpty("news")) {
  for (const [index, story] of newsStories.entries()) {
    await payload.create({
      collection: "news",
      data: {
        title: story.title,
        slug: story.slug,
        tag: story.tag,
        summary: story.detail,
        coverImage: await media(story.image, story.title),
        publishedAt: new Date(Date.UTC(2026, 4, 12 - index)).toISOString(),
        featured: index === 0,
        content: story.content.map((paragraph) => ({ paragraph })),
        seoDescription: story.detail,
        _status: "published",
      },
      draft: false,
      overrideAccess: true,
    });
  }
}

if (await isEmpty("partners")) {
  for (const [order, partner] of partners.entries()) {
    await payload.create({
      collection: "partners",
      data: {
        name: partner.name,
        logo: await media(partner.image, `${partner.name} logo`),
        order,
        _status: "published",
      },
      draft: false,
      overrideAccess: true,
    });
  }
}

payload.logger.info("CMS seed complete.");
process.exit(0);
