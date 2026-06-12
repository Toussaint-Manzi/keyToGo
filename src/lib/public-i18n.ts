/** English copy for the public website (dashboard stays in English). */
export const en = {
  nav: {
    home: "Home",
    aboutUs: "About Us",
    services: "Services",
    industries: "Industries",
    partners: "Partners",
    contact: "Contact",
    requestQuote: "Request a Quote",
    resources: "Resources",
    menuOpen: "Open menu",
  },
  hero: {
    explore: "Explore our services",
    quote: "Request a quote",
    scroll: "Scroll down",
  },
  sections: {
    servicesTitle: "Our",
    servicesHighlight: "Services",
    servicesSubtitle:
      "Integrated IT, transport, staffing, and professional training solutions for businesses across Canada.",
    industriesTitle: "Industries we",
    industriesHighlight: "serve",
    industriesSubtitle:
      "Deep domain expertise across technology, telecom, healthcare, government, and more.",
    partnersTitle: "Our",
    partnersHighlight: "Partners",
    partnersSubtitle:
      "Trusted technology and service partners for sustainable excellence.",
    aboutTitle: "About",
    aboutHighlight: "Us",
    aboutSubtitle:
      "Vision, mission, leadership, and the values that drive KeyTOGO Group.",
    vision: "Our vision",
    mission: "Our mission",
    leadership: "Leadership team",
    whyTitle: "Why",
    whyHighlight: "KeyTOGO",
    testimonialsTitle: "Testimonials &",
    testimonialsHighlight: "major projects",
    testimonialsSubtitle:
      "What our clients say about working with KeyTOGO Group.",
    resourcesTitle: "Resources &",
    resourcesHighlight: "insights",
    resourcesSubtitle:
      "Articles, whitepapers, and industry reports to help you stay ahead.",
    contactTitle: "Get in",
    contactHighlight: "touch",
    contactSubtitle:
      "Request a free quote. Our team will respond promptly.",
    offices: "Our offices",
    hq: "(HQ)",
    quickLinks: "Quick links",
    servicesLinks: "Services",
    socialMedia: "Social media",
    certifications: "Certifications",
    legal: "Legal",
    contactFooter: "Contact",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    exploreMore: "Explore more",
    watchDemo: "Watch demo",
    visitPlatform: "Visit platform",
    comingSoon: "Coming soon",
  },
  govconnect: {
    productsTitle: "Our platforms",
    productsSubtitle:
      "Two integrated digital government solutions built for modern public-sector operations.",
    eGovTitle: "e-Gov — GovConnect",
    eGovDescription:
      "Digital government platform for streamlined citizen services, case management, and administrative workflows.",
    eHealthTitle: "e-Health Admin",
    eHealthDescription:
      "Healthcare administration platform for clinics, providers, and regional health networks.",
    demoTitle: "e-Health practicum demo",
  },
  quote: {
    success:
      "Thank you! Your request was sent successfully. We will contact you soon.",
    sendAnother: "Send another request",
    fullName: "Full name *",
    email: "Email *",
    company: "Company",
    phone: "Phone",
    service: "Service needed *",
    selectService: "Select a service",
    details: "Project details *",
    detailsPlaceholder:
      "Describe your needs: equipment, software, transport, staffing, timelines...",
    submit: "Submit request",
    error: "Something went wrong. Please try again.",
  },
  footer: {
    rights: "All rights reserved.",
  },
  empty: {
    seed: "Site content is not configured. Run npm run db:seed after setting up PostgreSQL.",
  },
} as const;

/** @deprecated Use `en` — kept briefly for any stale imports */
export const fr = en;

export const NAV_SECTIONS = [
  "home",
  "about",
  "services",
  "industries",
  "partners",
  "contact",
  "resources",
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number];

/** Fixed navbar height for scroll offset (px) */
export const NAVBAR_HEIGHT = 80;
