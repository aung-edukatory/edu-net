import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";

import { newsStories } from "./data";

export default function NewsSection() {
  const [leadStory, ...sideStories] = newsStories;

  return (
    <section id="news" className="bg-white py-24">
      <Container>
        <div className="max-w-xl">
          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-4xl">
            School updates and study tips
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="overflow-hidden rounded-[28px] border border-[#dbe3ef] bg-white shadow-[0_18px_48px_rgba(11,35,73,0.08)]">
            <div className="relative h-72">
              <Image
                src={leadStory.image}
                alt={leadStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 py-6">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1ab0c]">
                {leadStory.tag}
              </div>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#0b2349]">
                <Link
                  href={`/news/${leadStory.slug}`}
                  className="transition-colors hover:text-[#f1ab0c]"
                >
                  {leadStory.title}
                </Link>
              </h3>
              <p className="mt-4 text-base leading-8 text-[#60708a]">
                {leadStory.detail}
              </p>
            </div>
          </article>

          <div className="space-y-5">
            {sideStories.map((story) => (
              <article
                key={story.title}
                className="flex gap-4 rounded-[24px] border border-[#dbe3ef] bg-white p-4 shadow-[0_14px_34px_rgba(11,35,73,0.06)]"
              >
                <div className="relative h-28 w-28 flex-none overflow-hidden rounded-[18px]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#f1ab0c]">
                    {story.tag}
                  </div>
                  <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[#0b2349]">
                    <Link
                      href={`/news/${story.slug}`}
                      className="transition-colors hover:text-[#f1ab0c]"
                    >
                      {story.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#62708a]">
                    {story.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
