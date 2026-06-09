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
      className="relative flex min-h-screen flex-col items-center justify-center px-3 pb-20 sm:px-4"
      style={{ paddingTop: NAVBAR_HEIGHT + 24 }}
    >
      <div className="relative mx-auto w-full max-w-7xl animate-fade-in text-center">
        {countriesLine && (
          <p className="mb-3 text-xs font-medium tracking-wide text-teal-200/90 sm:mb-4 sm:text-sm">
            {countriesLine}
          </p>
        )}
        <h1 className="mx-auto max-w-6xl text-2xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:max-w-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-5xl text-sm text-slate-300 sm:mt-6 sm:text-base md:text-lg xl:max-w-6xl">
            {subtitle}
          </p>
        )}
        <p className="mx-auto mt-6 min-h-[1.75rem] text-base font-semibold text-teal-300 sm:mt-8 sm:min-h-[2rem] sm:text-lg md:text-xl">
          {display}
          <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-teal-400 align-middle sm:h-5" />
        </p>
        <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <a
            href="/#services"
            className="rounded-lg bg-teal-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-teal-400 sm:px-6 sm:py-3"
          >
            {en.hero.explore}
          </a>
          <a
            href="/#contact"
            className="rounded-lg border border-white/30 px-5 py-2.5 text-center text-sm font-semibold transition hover:bg-white/10 sm:px-6 sm:py-3"
          >
            {en.hero.quote}
          </a>
        </div>
      </div>
      <a
        href="/#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-teal-300 sm:bottom-8"
        aria-label={en.hero.scroll}
      >
        <ArrowDown size={22} className="sm:h-7 sm:w-7" />
      </a>
    </section>
  );
}
