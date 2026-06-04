"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { fr, type NavSectionId } from "@/lib/public-i18n";

const nav: { id: NavSectionId; label: string }[] = [
  { id: "services", label: fr.nav.services },
  { id: "expertise", label: fr.nav.expertise },
  { id: "partners", label: fr.nav.partners },
  { id: "testimonials", label: fr.nav.testimonials },
  { id: "about", label: fr.nav.vision },
  { id: "contact", label: fr.nav.contact },
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

  const linkBase = onHero
    ? "text-sm font-medium transition-colors"
    : "text-sm font-medium transition-colors";

  const linkInactive = onHero
    ? "text-white/70 hover:text-white"
    : "text-slate-600 hover:text-teal-600";

  const linkActive = onHero
    ? "rounded-lg bg-white/15 px-3 py-2 text-white"
    : "rounded-lg bg-teal-50 px-3 py-2 text-teal-700";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b ${surfaceClass}`}
      style={{ height: 80 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo
          href="#home"
          variant={onHero ? "inverted" : "default"}
          priority
        />

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="ml-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-400"
          >
            {fr.nav.cta}
          </a>
        </nav>

        <button
          type="button"
          className={`rounded-lg p-2 lg:hidden ${onHero ? "text-white" : "text-slate-700"}`}
          onClick={() => setOpen(!open)}
          aria-label={fr.nav.menuOpen}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className={`absolute top-full right-0 left-0 border-t px-4 py-4 lg:hidden ${
            onHero ? "border-white/20 bg-slate-900/95" : "border-slate-100 bg-white"
          }`}
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`rounded-lg px-3 py-2.5 text-sm ${
                    isActive
                      ? onHero
                        ? "bg-white/15 font-semibold text-white"
                        : "bg-teal-50 font-semibold text-teal-700"
                      : onHero
                        ? "text-slate-200"
                        : "text-slate-700"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              className="mt-2 rounded-lg bg-teal-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {fr.nav.cta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
