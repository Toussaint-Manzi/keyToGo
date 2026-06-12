"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { en, NAVBAR_HEIGHT } from "@/lib/public-i18n";

export function HeroSection({
  title,
  subtitle,
  phrases,
  countriesLine,
}: {
  title: string;
  subtitle?: string | null;
  phrases: string[];
  countriesLine?: string | null;
}) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index % phrases.length] ?? "";
    const timeout = setTimeout(
      () => {
        if (!deleting && display.length < phrase.length) {
          setDisplay(phrase.slice(0, display.length + 1));
        } else if (!deleting && display.length === phrase.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && display.length > 0) {
          setDisplay(phrase.slice(0, display.length - 1));
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      },
      deleting ? 40 : 70,
    );
    return () => clearTimeout(timeout);
  }, [display, deleting, index, phrases]);

  return (
    <section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-3 pb-20 sm:px-4"
      style={{ paddingTop: NAVBAR_HEIGHT + 24 }}
    >
      <div className="relative mx-auto w-full max-w-7xl text-center">
        {countriesLine && (
          <div className="mb-5 flex justify-center sm:mb-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-teal-400/25 bg-slate-950/50 px-4 py-1.5 text-xs font-medium tracking-wide text-teal-100/90 backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              {countriesLine}
            </span>
          </div>
        )}

        <h1 className="hero-title mx-auto max-w-6xl text-2xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:max-w-7xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-5 max-w-5xl text-sm leading-relaxed text-slate-300/90 sm:mt-6 sm:text-base md:text-lg xl:max-w-6xl">
            {subtitle}
          </p>
        )}

        <p className="mx-auto mt-6 min-h-7 text-base font-semibold text-teal-300 sm:mt-8 sm:min-h-8 sm:text-lg md:text-xl">
          {display}
          <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-teal-400 align-middle sm:h-5" />
        </p>

        <div className="mx-auto mt-9 flex max-w-md flex-col justify-center gap-3 sm:mt-11 sm:flex-row sm:gap-4">
          <a
            href="/#services"
            className="hero-cta-primary rounded-full px-6 py-3 text-center text-sm font-semibold text-white sm:px-8"
          >
            {en.hero.explore}
          </a>
          <a
            href="/#contact"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center text-sm font-semibold backdrop-blur-sm transition hover:border-teal-400/40 hover:bg-white/10 sm:px-8"
          >
            {en.hero.quote}
          </a>
        </div>
      </div>

      <a
        href="/#services"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-teal-300/80 sm:bottom-8"
        aria-label={en.hero.scroll}
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-teal-400/45 p-1.5">
          <span className="hero-scroll-dot block h-1.5 w-1.5 rounded-full bg-teal-400" />
        </span>
        <ArrowDown size={18} className="opacity-60" />
      </a>
    </section>
  );
}
