"use client";

import Image from "next/image";
import { HeroSection } from "@/components/public/hero-section";

export function HeroShell({
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
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(20,184,166,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex justify-center opacity-[0.07]">
        <Image
          src="/images/logo-2.png"
          alt=""
          width={480}
          height={480}
          className="max-h-[50vh] w-auto object-contain"
          aria-hidden
        />
      </div>
      <HeroSection
        title={title}
        subtitle={subtitle}
        phrases={phrases}
        countriesLine={countriesLine}
      />
    </div>
  );
}
