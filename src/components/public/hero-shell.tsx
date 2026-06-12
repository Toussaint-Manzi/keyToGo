"use client";

import { HeroBackground } from "@/components/public/hero-background";
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
    <div className="relative min-h-screen overflow-hidden text-white">
      <HeroBackground />

      <HeroSection
        title={title}
        subtitle={subtitle}
        phrases={phrases}
        countriesLine={countriesLine}
      />
    </div>
  );
}
