export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "settings" | "stats" | "services" | "expertise" | "partners" | "testimonials" | "vision" | "why" | "offices" | "quotes";
};

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "home" },
  { label: "Site settings", href: "/dashboard/settings", icon: "settings" },
  { label: "Statistics", href: "/dashboard/stats", icon: "stats" },
  { label: "Services", href: "/dashboard/services", icon: "services" },
  { label: "Expertise", href: "/dashboard/expertise", icon: "expertise" },
  { label: "Partners", href: "/dashboard/partners", icon: "partners" },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: "testimonials" },
  { label: "Vision & Mission", href: "/dashboard/vision-mission", icon: "vision" },
  { label: "Why choose us", href: "/dashboard/why-choose", icon: "why" },
  { label: "Offices", href: "/dashboard/offices", icon: "offices" },
  { label: "Quote requests", href: "/dashboard/quotes", icon: "quotes" },
];

export const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/settings": "Site settings",
  "/dashboard/stats": "Statistics",
  "/dashboard/services": "Services",
  "/dashboard/expertise": "Expertise",
  "/dashboard/partners": "Partners",
  "/dashboard/testimonials": "Testimonials",
  "/dashboard/vision-mission": "Vision & Mission",
  "/dashboard/why-choose": "Why choose us",
  "/dashboard/offices": "Offices",
  "/dashboard/quotes": "Quote requests",
};
