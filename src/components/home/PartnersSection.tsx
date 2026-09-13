import Image from "next/image";

import Container from "@/components/Container";

import { partners } from "./data";

export default function PartnersSection({ items = partners }: { items?: typeof partners }) {
  return (
    <section className="bg-[var(--surface)] py-12">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((partner) => (
          <div
            key={partner.name}
            className="flex items-center justify-center rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(2,31,61,0.06)]"
          >
            <div className="relative h-20 w-full max-w-[150px]">
              <Image
                src={partner.image}
                alt={partner.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
