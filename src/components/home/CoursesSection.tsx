"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import Container from "@/components/Container";

type CourseTab = "GED" | "Junior Courses" | "Adult Courses" | "Corporate Courses";
type CourseCard = {
  title: string;
  detail: string;
  mentor: string;
  meta: string;
  image: string;
};

const courseTabs: CourseTab[] = [
  "GED",
  "Junior Courses",
  "Adult Courses",
  "Corporate Courses",
];

const coursesByTab: Record<CourseTab, CourseCard[]> = {
  GED: [
    {
      title: "GED Foundation",
      detail: "4 months 160 hours",
      mentor: "Mr. John",
      meta: "GED",
      image: "/courses/ged/ged-foundation.png",
    },
    {
      title: "GED Fast Track",
      detail: "4 months 200 hours",
      mentor: "Ages 15+ English Level: At least B1",
      meta: "GED",
      image: "/courses/ged/ged-fast-track.png",
    },
    {
      title: "GED Pathway",
      detail: "4 months 240 hours",
      mentor: "Ms. Anna",
      meta: "GED",
      image: "/courses/ged/ged-pathway.png",
    },
     {
      title: "Compelete Pathway",
      detail: "2 months 160 hours",
      mentor: "Ms. Anna",
      meta: "GED",
      image: "/courses/ged/complete-pathway.png",
    },
    {
      title: "Compelete Pathway Plus",
      detail: "2 months 160 hours",
      mentor: "Ms. Anna",
      meta: "GED",
      image: "/courses/ged/complete-pathway-plus.png",
    },
  ],
  "Junior Courses": [
    {
      title: "EDUKIDS ENGLISH ADVENTURE",
      detail: "Fun and interactive English lessons for young learners.",
      mentor: "Ms. Lily",
      meta: "Junior",
      image: "/courses/junior-course/edukids-english-adventure.png",
    },
    {
      title: "EDUKIDS THAI ADVENTURE",
      detail: "Strong foundation in arithmetic and problem-solving.",
      mentor: "Mr. David",
      meta: "Junior",
      image: "/courses/junior-course/edukids-thai-adventure.png",
    },
    {
      title: "EDUKIDS CHINESE ADVENTURE",
      detail: "Strong foundation in arithmetic and problem-solving.",
      mentor: "Mr. David",
      meta: "Junior",
      image: "/courses/junior-course/edukids-chinese-adventure.png",
    },
    {
      title: "EDUKIDS ENGLISH WEEKENDER",
      detail: "Strong foundation in arithmetic and problem-solving.",
      mentor: "Mr. David",
      meta: "Junior",
      image: "/courses/junior-course/edukids-english-weekender.png",
    },
    {
      title: "EDUKIDS THAI WEEKENDER",
      detail: "Strong foundation in arithmetic and problem-solving.",
      mentor: "Mr. David",
      meta: "Junior",
      image: "/courses/junior-course/edukids-thai-weekender.png",
    },
    {
      title: "EDUKIDS CHINESE WEEKENDER",
      detail: "Strong foundation in arithmetic and problem-solving.",
      mentor: "Mr. David",
      meta: "Junior",
      image: "/courses/junior-course/edukids-chinese-weekender.png",
    },
  ],
  "Adult Courses": [
    {
      title: "EDU ENGLISH",
      detail: "Chinese, English (12 Weeks)",
      mentor: "Mr. Alex",
      meta: "Adult",
      image: "/courses/adjust-course/edu-english.png",
    },
    {
      title: "EDU THAI",
      detail: "English, Spanish (1 week)",
      mentor: "Ms. Sophia",
      meta: "Adult",
      image: "/courses/adjust-course/edu-thai.png",
    },
    {
      title: "EDU CHINESE",
      detail: "Chinese, English, German",
      mentor: "Ms. Sophia",
      meta: "Adult",
      image: "/courses/adjust-course/edu-chinese.png",
    },
    {
      title: "EDU BUSINESS ENGLISH",
      detail: "Chinese, English (12 Weeks)",
      mentor: "Ms. Sophia",
      meta: "Adult",
      image: "/courses/adjust-course/edu-business-english.png",
    },
    {
      title: "EDU ENGLISH ON-LINE",
      detail: "English, French, German (20 Weeks)",
      mentor: "Ms. Sophia",
      meta: "Adult",
      image: "/courses/adjust-course/edu-english-online.png",
    },
    {
      title: "EDU BUSINESS ONLINE",
      detail: "Chinese, English, German (24 Weeks)",
      mentor: "Ms. Sophia",
      meta: "Adult",
      image: "/courses/adjust-course/edu-business-online.png",
    },
  ],
  "Corporate Courses": [
    {
      title: "EDUCOR ENGLISH IN-SCHOOL",
      detail: "Customized training programs for company teams.",
      mentor: "Mr. Michael",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-English-In-school.png",
    },
    {
      title: "EDUCOR BUSINESS ENGLISH IN-SCHOOL",
      detail: "Develop leadership and management capabilities.",
      mentor: "Ms. Emma",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-Business-English-In-School.png",
    },
    {
      title: "EDUCOR ENGLISH ON-SITE",
      detail: "Develop leadership and management capabilities.",
      mentor: "Ms. Emma",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-English-On-Site.png",
    },
    {
      title: "EDUCOR BUSINESS ENGLISH ON-SITE",
      detail: "Develop leadership and management capabilities.",
      mentor: "Ms. Emma",
      meta: "Corporate",
      image: "/courses/copoerate-course/EDUCOR-Business-English-On-Site.png",
    },
  ],
};

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
                {/* <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#edf2f7] pt-5 text-sm">
                  <div>
                    <div className="font-bold text-[#0b2349]">
                      {course.mentor}
                    </div>
                    <div className="text-[#7d8aa0]">Lead mentor</div>
                  </div>
                  <div className="flex items-center gap-2 text-[#7d8aa0]">
                    <span className="flex -space-x-2">
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#f4c060]" />
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#7fb4ff]" />
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#9fd18a]" />
                    </span>
                  </div>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
