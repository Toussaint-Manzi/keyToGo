"use client";

import { BrandLogo } from "@/components/brand-logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { en, type NavSectionId } from "@/lib/public-i18n";

const nav: { id: NavSectionId; label: string }[] = [
  { id: "home", label: en.nav.home },
  { id: "about", label: en.nav.aboutUs },
  { id: "services", label: en.nav.services },
  { id: "industries", label: en.nav.industries },
  { id: "partners", label: en.nav.partners },
  { id: "resources", label: en.nav.resources },
  { id: "contact", label: en.nav.contact },
];

export function SiteHeader({
  activeSection,
  onHero = false,
}: {
  activeSection: NavSectionId;
  onHero?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const surfaceClass = onHero
    ? "border-white/10 bg-slate-900/40 backdrop-blur-md"
    : "border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md";

  const navLinkClass = (isActive: boolean) => {
    const text = onHero
      ? isActive
        ? "text-white"
        : "text-white/70 hover:text-white"
      : isActive
        ? "text-teal-600"
        : "text-slate-600 hover:text-teal-600";

    const underline = onHero ? "after:bg-white" : "after:bg-teal-600";

    return [
      "relative whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors",
      text,
      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:transition-transform after:duration-300 after:ease-out after:content-['']",
      underline,
      isActive ? "after:scale-x-100" : "after:scale-x-0",
    ].join(" ");
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b ${surfaceClass}`}
      style={{ height: 80 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo
          href="/#home"
          variant={onHero ? "inverted" : "default"}
          priority
        />

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className={navLinkClass(isActive)}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/#contact"
            className="ml-1 shrink-0 rounded-lg bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-400 2xl:px-4 2xl:py-2.5"
          >
            {en.nav.requestQuote}
          </a>
        </nav>

        <button
          type="button"
          className={`rounded-lg p-2 xl:hidden ${onHero ? "text-white" : "text-slate-700"}`}
          onClick={() => setOpen(!open)}
          aria-label={en.nav.menuOpen}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className={`absolute top-full right-0 left-0 border-t px-4 py-4 xl:hidden ${
            onHero ? "border-white/20 bg-slate-900/95" : "border-slate-100 bg-white"
          }`}
        >
          <div className="flex flex-col gap-2">
            {nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`${navLinkClass(isActive)} px-3`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="/#contact"
              className="mt-2 rounded-lg bg-teal-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {en.nav.requestQuote}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
