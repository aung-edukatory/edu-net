"use client";

import { useState } from "react";

import Image from "next/image";

import Container from "@/components/Container";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const graduateTabs = {
  "2025": [
    {
      src: "/our-ged-graduate/ged-2025/Ariana.png",
      alt: "GED graduate achievement poster for Ariana",
    },
    {
      src: "/our-ged-graduate/ged-2025/Doby.png",
      alt: "GED graduate achievement poster for Doby",
    },
    {
      src: "/our-ged-graduate/ged-2025/Gerson.png",
      alt: "GED graduate achievement poster for Gerson",
    },
    {
      src: "/our-ged-graduate/ged-2025/Jessi.png",
      alt: "GED graduate achievement poster for Jessi",
    },
    {
      src: "/our-ged-graduate/ged-2025/Kayla.png",
      alt: "GED graduate achievement poster for Kayla",
    },
    {
      src: "/our-ged-graduate/ged-2025/KK.png",
      alt: "GED graduate achievement poster for KK",
    },
    {
      src: "/our-ged-graduate/ged-2025/Leon.png",
      alt: "GED graduate achievement poster for Leon",
    },
    {
      src: "/our-ged-graduate/ged-2025/Luis.png",
      alt: "GED graduate achievement poster for Luis",
    },
    {
      src: "/our-ged-graduate/ged-2025/Lukkeaw.png",
      alt: "GED graduate achievement poster for Lukkeaw",
    },
    {
      src: "/our-ged-graduate/ged-2025/Philip.png",
      alt: "GED graduate achievement poster for Philip",
    },
    {
      src: "/our-ged-graduate/ged-2025/Polina.png",
      alt: "GED graduate achievement poster for Polina",
    },
  ],
  "2026": [
    {
      src: "/our-ged-graduate/ged-2026/Arthur.png",
      alt: "GED graduate achievement poster for Arthur",
    },
     {
      src: "/our-ged-graduate/ged-2026/Daria.png",
      alt: "GED graduate achievement poster for Daria",
    },
    {
      src: "/our-ged-graduate/ged-2026/Mo.png",
      alt: "GED graduate achievement poster for Mo",
    },
    {
      src: "/our-ged-graduate/ged-2026/Nikita2.png",
      alt: "GED graduate achievement poster for Nikita",
    },
    {
      src: "/our-ged-graduate/ged-2026/Saxton.png",
      alt: "GED graduate achievement poster for Saxton",
    },
    {
      src: "/our-ged-graduate/ged-2026/Vlad.png",
      alt: "GED graduate achievement poster for Vlad",
    },
    {
      src: "/our-ged-graduate/ged-2026/Yunhu.png",
      alt: "GED graduate achievement poster for Yunhu",
    },
  ],
};
type GraduateYear = keyof typeof graduateTabs;

const visibleSlides = 4;

export default function GedGraduatesSection() {
  const [activeTab, setActiveTab] = useState<GraduateYear>("2025");
  const [currentIndex, setCurrentIndex] = useState(0);
  const gedGraduateImages = graduateTabs[activeTab];

  const maxIndex = Math.max(gedGraduateImages.length - visibleSlides, 0);

  const goToPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? maxIndex : index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index === maxIndex ? 0 : index + 1));
  };

  return (
    <section id="ged-graduates" className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-[#0b2349] sm:text-4xl">
            GED Graduates
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#60708a]">
            A few of our recent GED success stories and achievement highlights.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            {(Object.keys(graduateTabs) as GraduateYear[]).map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  setActiveTab(year);
                  setCurrentIndex(0);
                }}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  activeTab === year
                    ? "bg-[#0b2349] text-white shadow-[0_10px_30px_rgba(11,35,73,0.18)]"
                    : "bg-[#edf2f7] text-[#0b2349] hover:bg-[#dbe5f0]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
              {gedGraduateImages.map((item) => (
                <div key={item.src} className="min-w-full px-3 sm:min-w-1/2 lg:min-w-1/4">
                  <article className="group overflow-hidden rounded-[28px] border border-[#d9e2ee] bg-white shadow-[0_18px_48px_rgba(11,35,73,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,35,73,0.14)]">
                    <div className="relative aspect-[1/1.22] overflow-hidden bg-[#0b2349]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous graduate"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#0b2349] shadow-[0_12px_30px_rgba(11,35,73,0.18)] transition hover:bg-[#0b2349] hover:text-white"
          >
            <ChevronLeft/>
          </button>
          <button
            type="button"
            aria-label="Next graduate"
            onClick={goToNext}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#0b2349] shadow-[0_12px_30px_rgba(11,35,73,0.18)] transition hover:bg-[#0b2349] hover:text-white"
          >
            <ChevronRight/>
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to graduate slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-[#0b2349]" : "w-2.5 bg-[#c8d3e2]"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
