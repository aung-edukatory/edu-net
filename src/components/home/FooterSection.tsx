import Container from "@/components/Container";

import {
  contactDetails,
  footerLinks,
  siteIdentity,
  socialLinks,
} from "./data";
import Icon from "./Icon";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-[#0b2349] text-white">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-4 bg-white rounded-md">
            <Image
              src="/els.png"
              alt="ELS Pattaya"
              width={380}
              height={120}
              style={{width:"auto",height:'auto'}}
              priority
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#c9d7ef]">
            {siteIdentity.footerSummary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                aria-label={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/14 hover:text-white"
              >
                <Icon kind={item.icon} className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#ffbf1f]">
            School
          </h2>
          <div className="mt-5 space-y-3 text-sm text-[#d8e3f8]">
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
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#ffbf1f]">
            Support
          </h2>
          <div className="mt-5 space-y-3 text-sm text-[#d8e3f8]">
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
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#ffbf1f]">
            Contact us
          </h2>
          <div className="mt-5 space-y-4 text-sm text-[#d8e3f8]">
            <a
              href={contactDetails.phoneHref}
              className="flex items-start gap-3 transition-colors hover:text-white"
            >
              <Icon kind="phone" className="mt-0.5 h-4 w-4 flex-none" />
              <span>{contactDetails.phone}</span>
            </a>
            <a
              href={contactDetails.emailHref}
              className="flex items-start gap-3 transition-colors hover:text-white"
            >
              <Icon kind="mail" className="mt-0.5 h-4 w-4 flex-none" />
              <span>{contactDetails.email}</span>
            </a>
            <div className="flex items-start gap-3">
              <Icon kind="pin" className="mt-0.5 h-4 w-4 flex-none" />
              <span>{contactDetails.locationLong}</span>
            </div>
          </div>
        </div>
      </Container>

      <Container className="border-t border-white/10 py-6">
        <div className="flex flex-col gap-2 text-sm text-[#b8c9e8] sm:flex-row sm:items-center sm:justify-between">
          <p>{siteIdentity.copyright}</p>
          <p>{siteIdentity.footerNote}</p>
        </div>
      </Container>
    </footer>
  );
}
