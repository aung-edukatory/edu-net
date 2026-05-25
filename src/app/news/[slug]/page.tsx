import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import { getNewsStoryBySlug, newsStories } from "@/components/home/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return newsStories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getNewsStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="bg-white py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Link
          href="/#news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#60708a] transition-colors hover:text-[#0b2349]"
        >
          ← Back to news
        </Link>

        <article className="mt-6 overflow-hidden rounded-[32px] border border-[#dbe3ef] bg-white shadow-[0_24px_60px_rgba(11,35,73,0.08)]">
          <div className="relative h-72 sm:h-80 lg:h-[420px]">
            <Image
              src={story.image}
              alt={story.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1ab0c]">
              {story.tag}
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-4xl">
              {story.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#60708a]">
              {story.detail}
            </p>

            <div className="mt-8 space-y-5 text-base leading-8 text-[#42536d]">
              {story.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
