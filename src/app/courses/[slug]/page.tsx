import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import { courseDetails, coursesByTab } from "@/data/courses";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return courseDetails.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;

  const course = courseDetails.find((item) => item.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found | Edukatory",
    };
  }

  return {
    title: `${course.title} | Edukatory Language School`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;

  const course = courseDetails.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  const otherGedCourses = coursesByTab.GED.filter(
    (item) => item.href !== `/courses/${slug}`
  );

  return (
    <main className="bg-white">
      <section className="bg-[#f1f5fa] py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0f8b8d]">
                {course.category}
              </p>

              <h1 className="text-4xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-5xl">
                {course.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-[#60708a]">
                {course.subtitle}
              </p>

              {course.duration && (
                <div className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0b2349] shadow-sm">
                  Duration: {course.duration}
                </div>
              )}
            </div>

            <div className="relative h-80 sm:h-105">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#0b2349]">
              Program Overview
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-[#60708a]">
              {course.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {course.whoIsThisFor?.length > 0 && (
        <section className="bg-[#f1f5fa] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[#0b2349]">
                Who Is This Program For?
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {course.whoIsThisFor.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#d9e2ee] bg-white p-5 text-sm leading-7 text-[#60708a] shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {course.sections?.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl space-y-10">
              {course.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-black tracking-[-0.04em] text-[#0b2349]">
                    {section.heading}
                  </h2>

                  <div className="mt-5 space-y-4 text-base leading-8 text-[#60708a]">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-[#f1f5fa] py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0f8b8d]">
                GED Programs
              </p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[#0b2349]">
                Other GED Courses
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#60708a]">
              Explore related GED pathways designed for different levels of
              readiness, support, and university progression goals.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {otherGedCourses.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-3xl border border-[#d9e2ee] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden rounded-2xl bg-[#f6f9fc]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-3 transition duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0f8b8d]">
                  {item.meta}
                </p>
                <h3 className="mt-2 text-lg font-black text-[#0b2349]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#60708a]">
                  {item.detail}
                </p>
                <span className="mt-5 inline-flex text-sm font-bold text-[#0b2349] transition group-hover:text-[#0f8b8d]">
                  Know more →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
