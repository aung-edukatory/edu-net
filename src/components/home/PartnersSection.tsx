import Image from "next/image";

import Container from "@/components/Container";

import { partners } from "./data";

export default function PartnersSection() {
  return (
    <section className="bg-[#f1f5fa] py-12">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex items-center justify-center rounded-[24px] border border-[#dbe3ef] bg-white p-5 shadow-[0_16px_40px_rgba(11,35,73,0.06)]"
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
