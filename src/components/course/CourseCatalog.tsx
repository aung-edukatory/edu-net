import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";

import Container from "@/components/Container";
import BookConsultationButton from "@/components/home/BookConsultationButton";
import { courseTabs, coursesByTab, type CourseTab } from "@/data/courses";
import { getCmsCourseCards } from "@/lib/cms/content";

const categories: Record<CourseTab, { id: string; title: string; description: string }> = {
  GED: {
    id: "ged",
    title: "GED & academic pathways",
    description: "Build your academic foundation, prepare for GED, and take your next step toward university.",
  },
  "Junior Courses": {
    id: "junior",
    title: "Junior language courses",
    description: "English, Thai, and Chinese learning designed for young learners, with weekend options too.",
  },
  "Adult Courses": {
    id: "adult",
    title: "Adult language courses",
    description: "Develop language skills for everyday life and professional communication, with in-person and online options.",
  },
  "Corporate Courses": {
    id: "corporate",
    title: "Corporate language training",
    description: "Explore English and business English programs for teams and organizations, in school or on site.",
  },
};

export default async function CourseCatalog({ kind }: { kind: "courses" | "programs" }) {
  const isPrograms = kind === "programs";
  const heading = isPrograms ? "Programs" : "Courses";
  const itemLabel = isPrograms ? "program" : "course";
  const courses = (await getCmsCourseCards()) ?? coursesByTab;
  const visibleTabs = courseTabs.filter(
    (tab) => (isPrograms ? tab === "GED" : tab !== "GED") && courses[tab]?.length,
  );

  return (
    <main className="bg-white text-[var(--navy)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)] pb-10 pt-8 sm:pb-12">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[var(--navy)]">Home</Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3" />
            <span aria-current="page">{heading}</span>
          </nav>
          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--gold-deep)]">Learn with ELS Pattaya</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">{heading}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              {isPrograms
                ? "Build a stronger academic foundation. Explore our GED and university pathways to find the right next step."
                : "A new language opens new possibilities. Explore language courses for young learners, adults, and organizations."}
            </p>
          </div>
          <nav aria-label={`${heading} categories`} className="mt-8 flex flex-wrap gap-2.5">
            {visibleTabs.map((tab) => (
              <a key={tab} href={`#${categories[tab].id}`} className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--navy)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--navy)]">
                {tab}
                <ArrowDown aria-hidden="true" className="h-3.5 w-3.5 text-[var(--gold-deep)]" />
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="divide-y divide-[var(--border)]">
        {visibleTabs.map((tab, groupIndex) => (
          <section key={tab} id={categories[tab].id} aria-labelledby={`${categories[tab].id}-title`} className="scroll-mt-28 py-12 sm:py-16">
            <div className="mb-7 flex items-start gap-4">
              
              <div>
                <h2 id={`${categories[tab].id}-title`} className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">{categories[tab].title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{categories[tab].description}</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses[tab]?.map((course) => {
                const hasDetail = Boolean(course.href && course.href !== "#");
                return (
                  <article key={course.href ?? course.title} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-shadow hover:shadow-[0_8px_28px_rgba(2,31,61,0.06)]">
                    <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[var(--surface)]">
                      <Image src={course.image} alt={course.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px" className="object-cover object-center" />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold-deep)]">{course.meta}</p>
                      <h3 className="mt-2 text-lg font-bold tracking-[-0.025em]">{course.title}</h3>
                      <p className="mb-6 mt-3 text-sm leading-7 text-[var(--muted)]">{course.detail}</p>
                      <Link href={hasDetail ? course.href! : "/contact-us"} aria-label={`${hasDetail ? `View ${itemLabel}` : "Enquire about"}: ${course.title}`} className="mt-auto inline-flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-sm font-semibold transition-colors hover:text-[var(--gold-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--navy)]">
                        {hasDetail ? `View ${itemLabel}` : `Enquire about this ${itemLabel}`}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </Container>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-12 sm:py-16">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Not sure where to start?</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">Tell us about your learning goals. Our admissions team can help you find the right fit.</p>
          </div>
          <div className="shrink-0"><BookConsultationButton /></div>
        </Container>
      </section>
    </main>
  );
}
