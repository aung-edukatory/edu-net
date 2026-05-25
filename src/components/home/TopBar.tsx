import Container from "@/components/Container";

import { contactDetails } from "./data";
import Icon from "./Icon";

export default function TopBar() {
  return (
    <div className="bg-[#0b2349] text-white">
      <Container className="flex flex-col gap-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-white/75">
          <span className="inline-flex items-center gap-2">
            <Icon kind="clock" className="h-4 w-4" />
            {contactDetails.hours}
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon kind="pin" className="h-4 w-4" />
            {contactDetails.locationShort}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-white/90">
          <a
            href={contactDetails.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-[#ffbf1f]"
          >
            <Icon kind="phone" className="h-4 w-4" />
            {contactDetails.phone}
          </a>
          <a
            href={contactDetails.emailHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-[#ffbf1f]"
          >
            <Icon kind="mail" className="h-4 w-4" />
            {contactDetails.email}
          </a>
        </div>
      </Container>
    </div>
  );
}
