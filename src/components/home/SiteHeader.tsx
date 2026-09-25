"use client";

import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";

import Container from "@/components/Container";

import BookConsultationButton from "./BookConsultationButton";
import { navigation } from "./data";

export default function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [hash, setHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();

    window.addEventListener(
      "hashchange",
      updateHash,
    );
    window.addEventListener(
      "popstate",
      updateHash,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateHash,
      );

      window.removeEventListener(
        "popstate",
        updateHash,
      );
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, searchParams]);

  const currentCourse = searchParams.get("course");

  const isItemActive = (href: string) => {
    const target = new URL(
      href,
      "https://elspattaya.com",
    );

    const targetPathname = target.pathname;
    const targetCourse =
      target.searchParams.get("course");
    const targetHash = target.hash;

    // Home should only be active on the plain "/".
    if (
      targetPathname === "/" &&
      !targetCourse &&
      !targetHash
    ) {
      return (
        pathname === "/" &&
        !currentCourse &&
        !hash
      );
    }

    // Navigation items such as:
    // /?course=ged#courses
    // /?course=junior#courses
    if (targetCourse) {
      return (
        pathname === targetPathname &&
        currentCourse === targetCourse &&
        (!targetHash || hash === targetHash)
      );
    }

    // Hash-only navigation item.
    if (targetHash) {
      return (
        pathname === targetPathname &&
        hash === targetHash
      );
    }

    // Normal pages such as /about-us.
    return (
      pathname === targetPathname ||
      (
        targetPathname !== "/" &&
        pathname.startsWith(
          `${targetPathname}/`,
        )
      )
    );
  };

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof navigation)[number],
  ) => {
    if (
      (
        item.label === "Programs" ||
        item.label === "Courses"
      ) &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const section =
        document.getElementById("courses");

      const bounds =
        section?.getBoundingClientRect();

      const headerBottom =
        event.currentTarget
          .closest("header")
          ?.getBoundingClientRect()
          .bottom ?? 0;

      // Switch tabs in place when the visitor
      // is already in this section.
      if (
        bounds &&
        bounds.top <= headerBottom &&
        bounds.bottom > headerBottom
      ) {
        event.preventDefault();

        const target = new URL(
          item.href,
          window.location.href,
        );

        if (
          target.href !==
          window.location.href
        ) {
          window.history.pushState(
            null,
            "",
            target.href,
          );

          setHash(target.hash);
        }
      }

      window.dispatchEvent(
        new Event(
          item.label === "Courses"
            ? "els:show-junior"
            : "els:show-ged",
        ),
      );
    }

    setMobileMenuOpen(false);
  };

  const navigationLinkClass = (
    isActive: boolean,
  ) => `
    relative
    py-2
    transition-colors
    duration-300

    after:absolute
    after:bottom-0
    after:left-1/2
    after:h-[2px]
    after:-translate-x-1/2
    after:rounded-full
    after:bg-[var(--navy)]
    after:transition-all
    after:duration-300

    hover:text-[var(--navy)]
    hover:after:w-full

    ${
      isActive
        ? "text-[var(--navy)] after:w-full"
        : "after:w-0"
    }
  `;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 shadow-sm backdrop-blur">
      <Container>
        {/* Main Header */}
        <div className="flex h-[88px] items-center justify-between lg:h-auto lg:py-1">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-4"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >
            <Image
              src="/newlogo.png"
              alt="ELS Pattaya"
              width={85}
              height={85}
              style={{
                width: 85,
                height: 85,
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--muted)] lg:flex">
            {navigation.map((item) => {
              const isActive =
                isItemActive(item.href);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) =>
                    handleNavigationClick(
                      event,
                      item,
                    )
                  }
                  className={navigationLinkClass(
                    isActive,
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Consultation */}
          <div className="hidden lg:block">
            <BookConsultationButton />
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                (current) => !current,
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[var(--navy)] transition-colors hover:bg-black/5 lg:hidden"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              /* Close icon */
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[var(--border)] pb-6 pt-3 lg:hidden">
            <nav className="flex flex-col text-base font-semibold text-[var(--muted)]">
              {navigation.map((item) => {
                const isActive =
                  isItemActive(item.href);

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(event) =>
                      handleNavigationClick(
                        event,
                        item,
                      )
                    }
                    className={`
                      border-b
                      border-[var(--border)]
                      py-4
                      transition-colors
                      last:border-b-0
                      hover:text-[var(--navy)]

                      ${
                        isActive
                          ? "text-[var(--navy)]"
                          : ""
                      }
                    `}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}

                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[var(--navy)]" />
                      )}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile Consultation Button */}
            <div className="mt-5">
              <BookConsultationButton />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}