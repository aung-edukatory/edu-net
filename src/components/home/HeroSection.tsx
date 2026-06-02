import Image from "next/image";

import Container from "@/components/Container";

import { heroSpotlightActionCards, heroSpotlightLeadCard } from "./data";
import Icon from "./Icon";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f8fc]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,191,31,0.2),transparent_34%),radial-gradient(circle_at_right,rgba(111,148,218,0.32),transparent_38%),linear-gradient(105deg,rgba(8,30,64,0.98)_0%,rgba(12,39,80,0.96)_48%,rgba(27,67,124,0.7)_76%,rgba(105,132,177,0.35)_100%)]" />

      <Container className="relative grid gap-12 pb-28 pt-16 lg:min-h-[660px] lg:grid-cols-[0.9fr_0.86fr] lg:items-center">
        <div className="max-w-2xl text-white">
          <h1 className="mt-6 text-4xl font-black leading-[1.03] tracking-[-0.06em] sm:text-5xl lg:text-5xl xl:text-6xl">
            Unlock Your
            <br />
            Academic Future
            <br />
            with <span className="text-[#ffbf1f]">Structured</span>
            <br />
            <span className="text-[#ffbf1f]">Guidance</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#dce7fb] sm:text-lg">
            From GED preparation to multilingual learning pathways,
            ELS provides structured academic support designed
            for long-term progress — in Pattaya and online.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-[#ffbf1f] px-6 py-4 text-sm font-bold text-[#0b2349] transition-transform hover:-translate-y-0.5"
            >
              <Icon kind="send" className="h-5 w-5" />
              Explore Pathways
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-3 rounded-md border border-white/35 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              <Icon kind="user" className="h-5 w-5" />
              Speak With an Advisor
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative ml-auto h-[520px] w-full max-w-[560px] overflow-hidden rounded-[34px] border border-white/30 bg-white/10 shadow-[0_40px_120px_rgba(11,35,73,0.32)] xl:h-[540px]">
            <Image
              src="/banner.jpg"
              alt="Teacher guiding students in class"
              loading="eager"
              fill
              sizes="(min-width: 1280px) 560px, 450px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,35,73,0.04),rgba(11,35,73,0.28))]" />
          </div>
        </div>
      </Container>

      <Container className="relative -mt-16 pb-12">
        <div className="grid gap-5 rounded-[28px] bg-[#061d3d]/95 p-3 shadow-[0_28px_70px_rgba(11,35,73,0.2)] lg:grid-cols-[1.32fr_repeat(3,1fr)]">
          <a
            href={heroSpotlightLeadCard.href}
            className="min-h-[320px] rounded-[22px] bg-[#102a57] px-7 py-8 text-white no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform visited:text-white hover:-translate-y-1 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf1f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061d3d]"
          >
            <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/15">
              <Icon kind="institution" className="text-white h-7 w-7" />
            </span>
            <p className="flex text-white min-h-[5.25rem] max-w-[17rem] items-center text-2xl font-black uppercase leading-tight tracking-[-0.04em]">
              {heroSpotlightLeadCard.title}
            </p>
            <div className="mt-4 h-0.5 w-14 rounded-full bg-[#ffbf1f]" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#cfe0ff]">
              {heroSpotlightLeadCard.detail}
            </p>
          </a>

          {heroSpotlightActionCards.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={`${item.tone} min-h-[320px] rounded-[22px] px-7 py-8 text-white no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform visited:text-white hover:-translate-y-1 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061d3d]`}
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/15">
                <Icon kind={item.icon} className="h-7 w-7 text-white" />
              </span>
              <h2 className="mt-6 flex min-h-[5.25rem] text-white items-center text-2xl font-black uppercase leading-tight tracking-[-0.04em]">
                {item.title}
              </h2>
              <div className="mt-4 h-0.5 w-14 rounded-full bg-white/55" />
              <p className="mt-6 text-sm leading-7 text-white/90">{item.detail}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
