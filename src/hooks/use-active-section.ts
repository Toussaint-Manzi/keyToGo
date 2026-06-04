"use client";

import { useEffect, useState } from "react";
import type { NavSectionId } from "@/lib/public-i18n";
import { NAV_SECTIONS } from "@/lib/public-i18n";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const sections = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!sections.length) return;

    const heroEl = document.getElementById("home");

    const heroObserver = heroEl
      ? new IntersectionObserver(
          ([entry]) => setOnHero(entry.isIntersecting),
          { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
        )
      : null;

    if (heroEl && heroObserver) heroObserver.observe(heroEl);

    const ratios = new Map<string, number>();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let best: NavSectionId = "home";
        let bestRatio = 0;
        for (const id of NAV_SECTIONS) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }
        if (bestRatio > 0) setActiveSection(best);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-88px 0px -45% 0px",
      },
    );

    for (const el of sections) sectionObserver.observe(el);

    return () => {
      heroObserver?.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return { activeSection, onHero };
}
