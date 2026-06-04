"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { SiteHeader } from "@/components/public/site-header";

export function PublicSiteShell({ children }: { children: React.ReactNode }) {
  const { activeSection, onHero } = useActiveSection();

  return (
    <>
      <SiteHeader activeSection={activeSection} onHero={onHero} />
      {children}
    </>
  );
}
