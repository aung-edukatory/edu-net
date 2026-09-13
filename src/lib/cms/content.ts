import { getPayload } from "payload";

import config from "@payload-config";
import type { Course, Graduate, Media, News, Partner } from "@/payload-types";
import type { CourseCard, CourseTab } from "@/data/courses";
import type { NewsStory, TestimonialItem } from "@/components/home/data";

export type CmsCourseDetail = {
  slug: string;
  title: string;
  subtitle: string;
  category: CourseTab;
  duration: string;
  image: string;
  overview: string[];
  whoIsThisFor: string[];
  sections: { heading: string; content: string[] }[];
};

export type CmsPartner = { name: string; image: string };
export type CmsGraduateTabs = Record<string, { src: string; alt: string }[]>;

const mediaValue = (value: number | Media) =>
  typeof value === "object" && value.url
    ? { url: value.url, alt: value.alt }
    : null;

async function published<T extends "graduates" | "courses" | "news" | "partners" | "testimonials">(
  collection: T,
) {
  const payload = await getPayload({ config });
  return payload.find({
    collection,
    depth: 1,
    draft: false,
    limit: 200,
    overrideAccess: false,
    pagination: false,
  });
}

export async function getCmsGraduates(): Promise<CmsGraduateTabs | null> {
  try {
    const { docs } = await published("graduates");
    if (!docs.length) return null;
    return (docs as Graduate[]).reduce<CmsGraduateTabs>((years, graduate) => {
      const image = mediaValue(graduate.image);
      if (!image) return years;
      const year = String(graduate.year);
      years[year] ??= [];
      years[year].push({ src: image.url, alt: image.alt });
      return years;
    }, {});
  } catch (error) {
    console.error("Could not load graduates from Payload", error);
    return null;
  }
}

export async function getCmsCourseCards(): Promise<
  Partial<Record<CourseTab, CourseCard[]>> | null
> {
  try {
    const { docs } = await published("courses");
    if (!docs.length) return null;
    return (docs as Course[]).reduce<Partial<Record<CourseTab, CourseCard[]>>>(
      (groups, course) => {
        const image = mediaValue(course.image);
        if (!image) return groups;
        groups[course.category] ??= [];
        groups[course.category]!.push({
          title: course.cardTitle,
          detail: course.cardSummary,
          mentor: "",
          meta: course.cardLabel,
          image: image.url,
          href: course.slug ? `/courses/${course.slug}` : undefined,
        });
        return groups;
      },
      {},
    );
  } catch (error) {
    console.error("Could not load courses from Payload", error);
    return null;
  }
}

function mapCourse(course: Course): CmsCourseDetail | null {
  const image = mediaValue(course.image);
  if (!course.slug || !image) return null;
  return {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle ?? course.cardSummary,
    category: course.category,
    duration: course.duration ?? "",
    image: image.url,
    overview: course.overview?.map(({ paragraph }) => paragraph) ?? [],
    whoIsThisFor: course.audience?.map(({ item }) => item) ?? [],
    sections:
      course.sections?.map((section) => ({
        heading: section.heading,
        content: section.content?.map(({ paragraph }) => paragraph) ?? [],
      })) ?? [],
  };
}

export async function getCmsCourseBySlug(slug: string) {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "courses",
      depth: 1,
      draft: false,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    });
    return docs[0] ? mapCourse(docs[0]) : null;
  } catch (error) {
    console.error("Could not load course from Payload", error);
    return null;
  }
}

const mapNews = (story: News): NewsStory | null => {
  const image = mediaValue(story.coverImage);
  if (!image) return null;
  return {
    slug: story.slug,
    title: story.title,
    detail: story.summary,
    tag: story.tag,
    image: image.url,
    content: story.content.map(({ paragraph }) => paragraph),
  };
};

export async function getCmsNews(): Promise<NewsStory[] | null> {
  try {
    const { docs } = await published("news");
    const stories = (docs as News[])
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      .map(mapNews)
      .filter((story): story is NewsStory => Boolean(story));
    return stories.length ? stories : null;
  } catch (error) {
    console.error("Could not load news from Payload", error);
    return null;
  }
}

export async function getCmsNewsBySlug(slug: string) {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "news",
      depth: 1,
      draft: false,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    });
    return docs[0] ? mapNews(docs[0]) : null;
  } catch (error) {
    console.error("Could not load news article from Payload", error);
    return null;
  }
}

export async function getCmsPartners(): Promise<CmsPartner[] | null> {
  try {
    const { docs } = await published("partners");
    const partners = (docs as Partner[]).flatMap((partner) => {
      const logo = mediaValue(partner.logo);
      return logo ? [{ name: partner.name, image: logo.url }] : [];
    });
    return partners.length ? partners : null;
  } catch (error) {
    console.error("Could not load partners from Payload", error);
    return null;
  }
}

export async function getCmsTestimonials(): Promise<TestimonialItem[] | null> {
  try {
    const { docs } = await published("testimonials");
    return docs.length
      ? docs.map(({ name, role, quote }) => ({ name, role, quote }))
      : null;
  } catch (error) {
    console.error("Could not load testimonials from Payload", error);
    return null;
  }
}
