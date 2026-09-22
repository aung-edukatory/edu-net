import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { contactDetails } from "./home/data";



const socials = [
  {
    name: "Instagram",
    href: contactDetails.instagramHref,
    icon: FaInstagram,
    className:
      "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
  },
  {
    name: "Facebook",
    href: contactDetails.facebookHref,
    icon: FaFacebookF,
    className: "bg-[#1877F2]",
  },
  {
    name: "WhatsApp",
    href: contactDetails.whatsappHref,
    icon: FaWhatsapp,
    className: "bg-[#25D366]",
  },
  {
    name: "LINE",
    href: contactDetails.lineHref,
    icon: SiLine,
    className: "bg-[#06C755]",
  },
];

export function FloatingSocials() {
  return (
    <div
      className="
        fixed
        right-3
        bottom-20
        z-50
        flex
        flex-col
        gap-1.5
        rounded-md
        bg-white
        p-1.5
        shadow-lg
      "
    >
      {socials.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className={`
              flex
              size-9
              items-center
              justify-center
              rounded-md
              text-white
              transition-transform
              duration-200
              hover:scale-110
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              ${social.className}
            `}
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}