import Image from "next/image";

import Container from "@/components/Container";

import { heroSpotlightActionCards, heroSpotlightLeadCard } from "./data";
import Icon from "./Icon";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f8fc]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,191,31,0.18),transparent_35%),radial-gradient(circle_at_right,rgba(77,118,255,0.2),transparent_34%),linear-gradient(105deg,rgba(11,35,73,0.96)_0%,rgba(11,35,73,0.92)_42%,rgba(11,35,73,0.22)_72%,rgba(11,35,73,0.04)_100%)]" />

      <Container className="relative grid gap-12 pb-28 pt-16 lg:min-h-[640px] lg:grid-cols-[0.95fr_0.78fr] lg:items-center">
        <div className="max-w-xl text-white">
          <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Unlock
            <br />
            your academic future with
            <br />
            expert guidance
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-[#dce7fb] sm:text-lg">
            From GED preparation to multilingual courses, Edukatory offers
            personalized, results-driven programs for every age and level — in
            Pattaya and online.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#courses"
              className="inline-flex items-center justify-center rounded-md bg-[#ffbf1f] px-6 py-4 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
            >
              Explore programs
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/16"
            >
              Talk to advisor
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative ml-auto h-[520px] max-w-[450px] overflow-hidden rounded-[38px] border border-white/15 bg-white/10 shadow-[0_40px_120px_rgba(11,35,73,0.32)]">
            <Image
               src="/banner.jpg"
              alt="Edukatory school placeholder"
              loading='eager'
              fill
              sizes="450px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,35,73,0.04),rgba(11,35,73,0.28))]" />
          </div>
        </div>
      </Container>

      <Container className="relative -mt-16 pb-12">
        <div className="grid gap-4 rounded-[28px] bg-[#0e254c] p-4 shadow-[0_28px_70px_rgba(11,35,73,0.16)] lg:grid-cols-[1.35fr_repeat(3,0.88fr)]">
          <article className="rounded-[22px] bg-[#102a57] px-6 py-7 text-white sm:px-7">
            <p className="max-w-[11rem] text-2xl font-black leading-tight tracking-[-0.04em]">
              {heroSpotlightLeadCard.title}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#cfe0ff]">
              {heroSpotlightLeadCard.detail}
            </p>
          </article>

          {heroSpotlightActionCards.map((item) => (
            <article
              key={item.title}
              className={`${item.tone} rounded-[22px] px-6 py-7 text-white`}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Icon kind={item.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-black tracking-[-0.04em]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-white/90">{item.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
