/** French copy for the public website (dashboard stays in English). */
export const fr = {
  nav: {
    home: "Accueil",
    services: "Services",
    expertise: "Expertise",
    partners: "Partenaires",
    testimonials: "Témoignages",
    vision: "Vision",
    contact: "Contact",
    cta: "Demander un devis",
    menuOpen: "Ouvrir le menu",
  },
  hero: {
    explore: "Découvrir nos services",
    quote: "Demander un devis",
    scroll: "Défiler vers le bas",
  },
  sections: {
    servicesTitle: "Nos",
    servicesHighlight: "Services",
    servicesSubtitle:
      "Solutions intégrées en TI, transport et placement de personnel pour les entreprises canadiennes.",
    expertiseTitle: "Domaines d'",
    expertiseHighlight: "expertise",
    partnersTitle: "Nos",
    partnersHighlight: "Partenaires",
    partnersSubtitle:
      "Partenaires technologiques et de services de confiance pour une excellence durable.",
    testimonialsTitle: "Témoignages",
    testimonialsHighlight: "clients",
    testimonialsSubtitle:
      "Ce que nos clients disent de leur collaboration avec KeyTOGO Group.",
    visionTitle: "Vision &",
    visionHighlight: "Mission",
    vision: "Notre vision",
    mission: "Notre mission",
    whyTitle: "Pourquoi choisir",
    whyHighlight: "KeyTOGO",
    staffingTitle: "Compétences en placement de personnel",
    contactTitle: "Nous",
    contactHighlight: "contacter",
    contactSubtitle:
      "Demandez un devis gratuit. Notre équipe vous répondra rapidement.",
    offices: "Nos bureaux",
    hq: "(Siège)",
    quickLinks: "Liens rapides",
    contactFooter: "Coordonnées",
  },
  quote: {
    success:
      "Merci ! Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.",
    sendAnother: "Envoyer une autre demande",
    fullName: "Nom complet *",
    email: "Courriel *",
    company: "Entreprise",
    phone: "Téléphone",
    service: "Service souhaité *",
    selectService: "Sélectionnez un service",
    details: "Détails du projet *",
    detailsPlaceholder:
      "Décrivez vos besoins : équipements, logiciels, transport, placement, délais...",
    submit: "Envoyer ma demande",
    error: "Une erreur est survenue. Veuillez réessayer.",
  },
  footer: {
    rights: "Tous droits réservés.",
  },
  empty: {
    seed: "Le contenu du site n'est pas configuré. Exécutez npm run db:seed après la configuration de PostgreSQL.",
  },
} as const;

export const NAV_SECTIONS = [
  "home",
  "services",
  "expertise",
  "partners",
  "testimonials",
  "about",
  "contact",
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number];

/** Fixed navbar height for scroll offset (px) */
export const NAVBAR_HEIGHT = 80;
