"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";

import BookConsultationButton from "./BookConsultationButton";
import { navigation } from "./data";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 shadow-sm backdrop-blur">
      <Container className="flex flex-col gap-6 py-1 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/newlogo.png"
            alt="ELS Pattaya"
            width={85}
            height={85}
            style={{ width: 85, height: 85 }}
            priority
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-5 text-sm font-semibold text-[var(--muted)]">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => {
                if (
                  (item.label === "Programs" || item.label === "Courses") &&
                  !event.ctrlKey &&
                  !event.metaKey &&
                  !event.shiftKey &&
                  !event.altKey
                ) {
                  const section = document.getElementById("courses");
                  const bounds = section?.getBoundingClientRect();
                  const headerBottom =
                    event.currentTarget.closest("header")?.getBoundingClientRect().bottom ?? 0;

                  // Switch tabs in place when the visitor is already in this section.
                  if (bounds && bounds.top <= headerBottom && bounds.bottom > headerBottom) {
                    event.preventDefault();
                    const target = new URL(item.href, window.location.href);
                    if (target.href !== window.location.href) {
                      window.history.pushState(null, "", target.href);
                    }
                  }

                  window.dispatchEvent(
                    new Event(
                      item.label === "Courses" ? "els:show-junior" : "els:show-ged",
                    ),
                  );
                }
              }}
              className="transition-colors hover:text-[var(--navy)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <BookConsultationButton />
      </Container>
    </header>
  );
}
