import type { Metadata } from "next";
import {
  Camera,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import Container from "@/components/Container";
import { contactDetails } from "@/components/home/data";

export const metadata: Metadata = {
  title: "Contact Us | ELS Pattaya",
  description:
    "Contact ELS Pattaya for GED preparation, English language courses, and academic pathway advice.",
  alternates: { canonical: "/contact-us" },
};

const contactMethods = [
  {
    label: "Call us",
    value: contactDetails.phone,
    href: contactDetails.phoneHref,
    icon: Phone,
  },
  {
    label: "Email us",
    value: contactDetails.email,
    href: contactDetails.emailHref,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: contactDetails.whatsapp,
    href: contactDetails.whatsappHref,
    icon: MessageCircle,
  },
  {
    label: "Facebook",
    value: contactDetails.facebook,
    href: contactDetails.facebookHref,
    icon: Users,
  },
];

export default function ContactUsPage() {
  return (
    <main className="bg-[#f5f8fc]">
      <section className="bg-[#0b2349] px-6 py-18 text-white sm:py-24">
        <Container className="max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ffbf1f]">
            Contact ELS Pattaya
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
            Let&apos;s plan your learning journey
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#c9d7ef] sm:text-lg">
            Talk to our team about GED preparation, English courses, and the
            right academic pathway for you.
          </p>
        </Container>
      </section>

      <Container className="grid gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <section aria-labelledby="contact-details-heading">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0f8b8d]">
            Get in touch
          </p>
          <h2
            id="contact-details-heading"
            className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#0b2349]"
          >
            We&apos;re here to help
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactMethods.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-start gap-4 rounded-2xl border border-[#dfe6f0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#99acc8] hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf0fa] text-[#0b2349] transition-colors group-hover:bg-[#0b2349] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#60708a]">
                    {label}
                  </span>
                  <span className="mt-1 block break-words font-bold text-[#0b2349]">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <aside className="rounded-3xl bg-white p-7 shadow-[0_16px_45px_rgba(11,35,73,0.1)] ring-1 ring-[#dfe6f0] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0f8b8d]">
            Visit our school
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[#0b2349]">
            ELS Pattaya
          </h2>

          <a
            href={contactDetails.locationHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex gap-4 rounded-xl bg-[#f5f8fc] p-4 transition-colors hover:bg-[#eaf0fa]"
          >
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0b2349]" aria-hidden="true" />
            <span className="text-sm font-medium leading-6 text-[#45566f]">
              {contactDetails.locationLong}
            </span>
          </a>

          <div className="mt-5 flex items-start gap-4 text-sm text-[#45566f]">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#0b2349]" aria-hidden="true" />
            <span>
              <span className="block font-bold text-[#0b2349]">Opening hours</span>
              <span className="mt-1 block">{contactDetails.hours}</span>
            </span>
          </div>

          <a
            href={contactDetails.locationHref}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#ffbf1f] px-5 py-3 text-sm font-black text-[#0b2349] transition-transform hover:-translate-y-0.5"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Get directions
          </a>
        </aside>
      </Container>
    </main>
  );
}
