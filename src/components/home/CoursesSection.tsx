"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import Container from "@/components/Container";
import { courseTabs, coursesByTab, type CourseTab } from "@/data/courses";
import Icon from "./Icon";

const hasCourseHref = (href?: string): href is string =>
  Boolean(href && href !== "#");

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<CourseTab>("GED");

  const activeCourses = useMemo(() => coursesByTab[activeTab], [activeTab]);

  return (
    <section id="courses" className="bg-[#f1f5fa] py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-4xl lg:text-5xl">
            CHOOSE YOUR COURSE
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#60708a]">
            Choose the right Edukatory program for your current level, target
            timeline, and next academic goal.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {courseTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-5 py-3 text-sm font-bold transition sm:px-6 ${
                  isActive
                    ? "border-[#0b2349] bg-[#0b2349] text-white shadow-[0_12px_24px_rgba(11,35,73,0.16)]"
                    : "border-[#d6deea] bg-white text-[#60708a] hover:border-[#0b2349] hover:text-[#0b2349]"
                }`}
                aria-pressed={isActive}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <article
              key={course.title}
              className="group overflow-hidden rounded-[28px] border border-[#d9e2ee] bg-white shadow-[0_18px_48px_rgba(11,35,73,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,35,73,0.12)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#f4f7fb] sm:h-60">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-5 top-5 rounded-full bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2349]">
                  {course.meta}
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,35,73,0.02),rgba(11,35,73,0.1)_55%,rgba(11,35,73,0.32))]" />
              </div>

              <div className="px-6 py-7">
                <h3 className="text-xl font-black tracking-[-0.04em] text-[#0b2349]">
                  {course.title}
                </h3>
                <p className="mt-3 min-h-[56px] text-sm leading-7 text-[#61708a]">
                  {course.detail}
                </p>

                {hasCourseHref(course.href) && (
                  <Link
                    href={course.href}
                    className="mt-3 inline-flex items-center gap-3 rounded-full bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
                  >
                    Know more

                    <Icon kind="arrow" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
