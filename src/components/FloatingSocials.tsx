"use client";

import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed right-0 bottom-5 z-50">
      {/*
      |--------------------------------------------------------------------------
      | Social Drawer
      |--------------------------------------------------------------------------
      */}

      <div
        className={`
          group
          flex
          items-center
          transition-transform
          duration-300
          ease-out
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/*
        |--------------------------------------------------------------------------
        | Hide Button
        |--------------------------------------------------------------------------
        */}

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Hide social links"
          title="Hide social links"
          className="
            mr-2
            flex
            size-8
            translate-x-3
            items-center
            justify-center
            rounded-full
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--foreground)]
            opacity-0
            shadow-md
            transition-all
            duration-200
            pointer-events-none

            group-hover:translate-x-0
            group-hover:opacity-100
            group-hover:pointer-events-auto

            group-focus-within:translate-x-0
            group-focus-within:opacity-100
            group-focus-within:pointer-events-auto

            hover:scale-105

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--primary)]
            focus-visible:ring-offset-2
          "
        >
          <FaChevronRight className="size-3" />
        </button>

        {/*
        |--------------------------------------------------------------------------
        | Social Links
        |--------------------------------------------------------------------------
        */}

        <div
          className="
            mr-3
            flex
            flex-col
            gap-2
            rounded-xl
            bg-[var(--surface)]
            p-2
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
                  rounded-lg
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
                <Icon className="size-6" />
              </a>
            );
          })}
        </div>
      </div>

      {/*
      |--------------------------------------------------------------------------
      | Open Drawer Handle
      |--------------------------------------------------------------------------
      */}

      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Show social links"
          title="Show social links"
          className="
            absolute
            right-0
            bottom-0
            flex
            h-12
            w-8
            items-center
            justify-center
            rounded-l-xl
            border
            border-r-0
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--foreground)]
            shadow-lg
            transition-all
            duration-200

            hover:w-10

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--primary)]
            focus-visible:ring-offset-2
          "
        >
          <FaChevronLeft className="size-3" />
        </button>
      ) : null}
    </div>
  );
}