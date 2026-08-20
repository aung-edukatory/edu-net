import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";

import BookConsultationButton from "./BookConsultationButton";
import { navigation } from "./data";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe6f0] bg-white/95 shadow-sm backdrop-blur">
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

        <nav className="flex flex-wrap items-center gap-5 text-sm font-semibold text-[#45566f]">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-[#0b2349]"
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
