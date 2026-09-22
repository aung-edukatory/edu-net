import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLine,
  FaWhatsapp,
} from "react-icons/fa6";

import Container from "@/components/Container";

import {
  contactDetails,
  footerLinks,
  siteIdentity,
} from "./data";
import Icon from "./Icon";

const socialLinks = [
  {
    label: "Facebook",
    value: contactDetails.facebook,
    href: contactDetails.facebookHref,
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    value: contactDetails.instagram,
    href: contactDetails.instagramHref,
    icon: FaInstagram,
  },
  {
    label: "WhatsApp",
    value: contactDetails.whatsapp,
    href: contactDetails.whatsappHref,
    icon: FaWhatsapp,
  },
  {
    label: "LINE",
    value: contactDetails.line,
    href: contactDetails.lineHref,
    icon: FaLine,
  },
];

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-[var(--navy)] text-white">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-4 rounded-md">
            <Image
              src="/favicon.png"
              alt="ELS Pattaya"
              width={120}
              height={120}
              className="h-[120px] w-[120px]"
              priority
            />
          </div>

          <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--text-inverse-muted)]">
            {siteIdentity.footerSummary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {socialLinks.map(
              ({
                label,
                value,
                href,
                icon: SocialIcon,
              }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label}: ${value}`}
                  title={`${label}: ${value}`}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/90 transition-all hover:-translate-y-0.5 hover:bg-white/14 hover:text-white"
                >
                  <SocialIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              ),
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--gold)]">
            School
          </h2>

          <div className="mt-5 space-y-3 text-sm text-[var(--text-inverse-muted)]">
            {footerLinks.school.map((item) =>
              item.disabled ? (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="block cursor-not-allowed text-white/35"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--gold)]">
            Support
          </h2>

          <div className="mt-5 space-y-3 text-sm text-[var(--text-inverse-muted)]">
            {footerLinks.support.map((item) =>
              item.disabled ? (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="block cursor-not-allowed text-white/35"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--gold)]">
            Contact us
          </h2>

          <div className="mt-5 space-y-4 text-sm text-[var(--text-inverse-muted)]">
            <a
              href={contactDetails.phoneHref}
              className="flex items-start gap-3 transition-colors hover:text-white"
            >
              <Icon
                kind="phone"
                className="mt-0.5 h-4 w-4 flex-none"
              />
              <span>{contactDetails.phone}</span>
            </a>

            <a
              href={contactDetails.emailHref}
              className="flex items-start gap-3 transition-colors hover:text-white"
            >
              <Icon
                kind="mail"
                className="mt-0.5 h-4 w-4 flex-none"
              />
              <span>{contactDetails.email}</span>
            </a>

            <a
              href={contactDetails.locationHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-white"
            >
              <Icon
                kind="pin"
                className="mt-0.5 h-4 w-4 flex-none"
              />
              <span>{contactDetails.locationLong}</span>
            </a>
          </div>
        </div>
      </Container>

      <Container className="border-t border-white/10 py-6">
        <div className="flex flex-col gap-2 text-sm text-[var(--text-inverse-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{siteIdentity.copyright}</p>
          <p>{siteIdentity.footerNote}</p>
        </div>
      </Container>
    </footer>
  );
}