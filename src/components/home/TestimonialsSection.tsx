"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import Container from "@/components/Container";

import { testimonials } from "./data";

const AUTOPLAY_DELAY = 4500;
const DESKTOP_ITEMS_PER_SLIDE = 2;
const MOBILE_ITEMS_PER_SLIDE = 1;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function subscribeToDesktopBreakpoint(callback: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopBreakpointSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getDesktopBreakpointServerSnapshot() {
  return false;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopBreakpoint,
    getDesktopBreakpointSnapshot,
    getDesktopBreakpointServerSnapshot
  );
  const itemsPerSlide = isDesktop
    ? DESKTOP_ITEMS_PER_SLIDE
    : MOBILE_ITEMS_PER_SLIDE;
  const slides: Array<(typeof testimonials)[number][]> = [];

  for (let index = 0; index < testimonials.length; index += itemsPerSlide) {
    slides.push(testimonials.slice(index, index + itemsPerSlide));
  }

  const lastSlideIndex = Math.max(slides.length - 1, 0);
  const currentSlideIndex = Math.min(activeIndex, lastSlideIndex);

  useEffect(() => {
    if (isPaused || lastSlideIndex === 0) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        Math.min(current, lastSlideIndex) >= lastSlideIndex
          ? 0
          : Math.min(current, lastSlideIndex) + 1
      );
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused, lastSlideIndex]);

  const handlePrevious = () => {
    setActiveIndex((current) =>
      Math.min(current, lastSlideIndex) === 0
        ? lastSlideIndex
        : Math.min(current, lastSlideIndex) - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      Math.min(current, lastSlideIndex) >= lastSlideIndex
        ? 0
        : Math.min(current, lastSlideIndex) + 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#0e274f] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,191,31,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">
              Why families choose Edukatory
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition duration-300 hover:-translate-x-0.5 hover:bg-white hover:text-[#0b2349]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition duration-300 hover:translate-x-0.5 hover:bg-white hover:text-[#0b2349]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="relative mt-10 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${currentSlideIndex * 100}%)`,
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="w-full shrink-0">
                <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
                  {slide.map((item, itemIndex) => (
                    <article
                      key={`${item.name}-${item.role}-${slideIndex}-${itemIndex}`}
                      className="flex h-full min-h-[360px] flex-col rounded-[28px] border border-white/10 bg-white/8 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:min-h-[340px] lg:min-h-[320px]"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ffbf1f] text-[#0b2349]">
                        <Quote className="h-5 w-5 fill-current" />
                      </div>
                      <p className="mt-5 flex-1 text-base leading-8 text-[#dbe6fb]">
                        {item.quote}
                      </p>
                      <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/16 text-sm font-black uppercase tracking-[0.16em]">
                          {item.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <div>
                          <div className="font-black tracking-[-0.03em]">
                            {item.name}
                          </div>
                          <div className="text-sm text-[#b9cae8]">
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {lastSlideIndex > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: slides.length }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlideIndex === index
                    ? "w-8 bg-[#ffbf1f]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
