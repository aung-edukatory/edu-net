import Image from "next/image";

import Container from "@/components/Container";

import { teachers } from "./data";
import Icon from "./Icon";

export default function TeachersSection() {
  return (
    <section id="teachers" className="bg-white py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="max-w-xl lg:sticky lg:top-24">
          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-4xl">
            Meet our Team
          </h2>
          <p className="mt-4 text-base leading-8 text-[#60708a]">
            Edukatory teachers bring structure, encouragement, and practical
            feedback into every class so students always know the next step.
          </p>
          <p className="mt-4 text-base leading-8 text-[#60708a]">
            Our school focuses on consistent improvement: attend class, practice
            with purpose, review progress, and build confidence.
          </p>
          {/* <a
            href="#news"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ffbf1f] px-5 py-3 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
          >
            View all
            <Icon kind="arrow" className="h-4 w-4" />
          </a> */}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <article
              key={teacher.name}
              className="group overflow-hidden rounded-[28px] border border-[#dbe3ef] bg-white shadow-[0_18px_48px_rgba(11,35,73,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,35,73,0.14)]"
            >
              <div className="relative h-56 sm:h-60 lg:h-56 overflow-hidden rounded-[28px]">
                <Image
                  src={teacher.image}
                  alt={`Portrait of ${teacher.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(11,35,73,0.7))] rounded-b-[28px]" />
                <div className="absolute bottom-3 left-3 right-3 rounded-[16px] bg-white px-3 py-2 text-[#0b2349] shadow-[0_10px_20px_rgba(11,35,73,0.12)]">
                  <div className="font-black tracking-[-0.03em]">
                    {teacher.name}
                  </div>
                  <div className="mt-1 text-sm text-[#6a7891]">
                    {teacher.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
