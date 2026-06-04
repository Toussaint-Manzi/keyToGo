import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding KeyTOGO Group Inc. content…");

  await prisma.quoteRequest.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.quoteServiceOption.deleteMany();
  await prisma.project.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.office.deleteMany();
  await prisma.transportOffering.deleteMany();
  await prisma.staffingSkill.deleteMany();
  await prisma.whyChooseItem.deleteMany();
  await prisma.visionMissionItem.deleteMany();
  await prisma.expertiseArea.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.siteSettings.deleteMany();

  await prisma.siteSettings.create({
    data: {
      id: "default",
      companyName: "KeyTOGO Group Inc.",
      legalName: "KeyTOGO Group Inc.",
      tagline:
        "Solutions TI innovantes, transport fiable et placement de personnel — adaptés à votre réussite.",
      heroTitle: "Propulser les entreprises partout au Canada",
      heroSubtitle:
        "Innovation TI, transport fiable et experts en placement — un partenaire de confiance pour votre croissance.",
      heroTypingPhrases: [
        "Solutions TI et automatisation",
        "Infonuagique et cybersécurité",
        "Services de transport",
        "Placement et experts à la demande",
        "Centre de contact et excellence CX",
      ],
      introParagraphs: [
        "Chez KeyTOGO Group Inc., nous envisageons un avenir où les entreprises et les communautés prospèrent grâce à nos solutions TI innovantes, nos services de transport fiables et nos solutions de placement de personnel. Notre équipe de développeurs, consultants TI/RH et chauffeurs offre des produits et services de qualité adaptés à vos besoins.",
        "Nous visons à être le partenaire privilégié de nos clients, reconnus pour notre intégrité, notre excellence et notre engagement envers leur réussite. En combinant technologie, transport et placement, nous aidons les entreprises à atteindre leur plein potentiel.",
      ],
      contactEmail: "contact@keytogo.com",
      contactPhone: "+1 (613) 000-0000",
      contactAddress: "Région de la capitale nationale (Ottawa–Gatineau), Canada",
      countriesLine: "Canada • Clients en Amérique du Nord et en Afrique",
      metaDescription:
        "KeyTOGO Group Inc. — solutions TI, transport et placement au Canada. Automatisation, infonuagique, cybersécurité, transport médical et experts à la demande.",
      footerText: "© 2026 KeyTOGO Group Inc. Tous droits réservés.",
    },
  });

  const stats = [
    { label: "Années d'expertise combinée", value: "15+", sortOrder: 0 },
    { label: "Clients satisfaits", value: "200+", sortOrder: 1 },
    { label: "Projets livrés", value: "500+", sortOrder: 2 },
    { label: "Support disponible", value: "24/7", sortOrder: 3 },
  ];
  for (const s of stats) {
    await prisma.stat.create({ data: { ...s, published: true } });
  }

  const itCategory = await prisma.serviceCategory.create({
    data: {
      slug: "it-solutions",
      name: "IT Solutions",
      description:
        "Cutting-edge technology, automation, cloud, and cybersecurity to drive digital transformation and operational excellence.",
      icon: "Cpu",
      sortOrder: 0,
    },
  });

  const transportCategory = await prisma.serviceCategory.create({
    data: {
      slug: "transport",
      name: "Transport Services",
      description:
        "Safe, reliable, and transparent transport across the Capital Region — from VVIP rides to medical and school services.",
      icon: "Truck",
      sortOrder: 1,
    },
  });

  const staffingCategory = await prisma.serviceCategory.create({
    data: {
      slug: "staffing",
      name: "Staffing Services",
      description:
        "Experts on demand — connect with top-tier talent for IT, contact centers, transport, healthcare, and more.",
      icon: "Users",
      sortOrder: 2,
    },
  });

  const itServices: Array<{
    title: string;
    description: string;
    bulletPoints?: string[];
    icon?: string;
    sortOrder: number;
  }> = [
    {
      title: "Automation",
      description:
        "Accelerate toward an automated future with advanced technologies to reduce costs and scale operations.",
      bulletPoints: [
        "Unleash efficiency with end-to-end automation support",
        "Automation Center of Excellence (CoE) for active investment management",
        "Personalize customer interactions with AI-powered CX",
        "Interactive and assistive automation for contact centers",
        "Platform-agnostic contact center outsourcing on cloud infrastructure",
      ],
      icon: "Workflow",
      sortOrder: 0,
    },
    {
      title: "Cloud Solutions",
      description:
        "React quickly to market changes, manage enterprise workloads, and achieve consistent ROI with the right cloud approach.",
      bulletPoints: [
        "Public, private, or hybrid — SaaS, PaaS, IaaS, and CCaaS guidance",
        "End-to-end cloud migration and optimization",
        "Hybrid cloud clarity — plan, build, and optimize infrastructure",
        "Digital transformation aligned with AI, mobility, big data, and IoT",
      ],
      icon: "Cloud",
      sortOrder: 1,
    },
    {
      title: "Cybersecurity",
      description:
        "Strengthen your security posture with proactive defense, monitoring, and agile response strategies.",
      bulletPoints: [
        "Protection for connected devices, AI, and open-source environments",
        "Cloud Security Operation Center services",
        "Compliance-aware strategies for evolving regulations",
        "Resilient infrastructure against evolving threats",
      ],
      icon: "Shield",
      sortOrder: 2,
    },
  ];

  for (const s of itServices) {
    await prisma.service.create({
      data: { categoryId: itCategory.id, ...s, published: true },
    });
  }

  const transportServices = [
    {
      title: "Pre/Post-paid Taxi Service",
      description:
        "Flexible payment options for hassle-free rides across the Capital Region, including Ottawa and Gatineau.",
      sortOrder: 0,
      icon: "Car",
    },
    {
      title: "VVIP On-Demand Rides",
      description:
        "Premium transportation without advance scheduling — request a ride for a seamless experience.",
      sortOrder: 1,
      icon: "Star",
    },
    {
      title: "Safe Night Out Transportation",
      description:
        "Enjoy your evening worry-free — we drive you and your vehicle home safely and respectfully.",
      sortOrder: 2,
      icon: "Moon",
    },
    {
      title: "Medical & Adapted Transportation",
      description:
        "Comfortable, secure transport for medical visits, therapy, and healthcare appointments with equipped vehicles.",
      sortOrder: 3,
      icon: "HeartPulse",
    },
    {
      title: "School Transportation",
      description:
        "Safe, reliable school runs with flexible scheduling, real-time notifications, and versatile options.",
      sortOrder: 4,
      icon: "GraduationCap",
    },
    {
      title: "Package Delivery — KEYTOGO Express",
      description:
        "Fast, dependable parcel delivery with dedicated vans across Ottawa, Gatineau, and the Capital Region.",
      sortOrder: 5,
      icon: "Package",
    },
  ];

  for (const s of transportServices) {
    await prisma.service.create({
      data: { categoryId: transportCategory.id, ...s, published: true },
    });
  }

  const staffingServices = [
    {
      title: "Experts on Demand",
      description:
        "Flexible scaling with skilled professionals — faster delivery without the cost of a full in-house team.",
      bulletPoints: [
        "Application support & call center management",
        "Cloud computing & contact center software",
        "CRM, cybersecurity, and transport expertise",
        "Content, SEO, social media, and data entry",
      ],
      sortOrder: 0,
      icon: "UserCheck",
    },
    {
      title: "Contact Center Outsourcing",
      description:
        "Platform-agnostic advice for agility, efficiency, cost savings, scalability, and security on cloud foundations.",
      sortOrder: 1,
      icon: "Headphones",
    },
    {
      title: "Talent Matching & Development",
      description:
        "Connect businesses with top-tier talent and support continuous professional growth.",
      sortOrder: 2,
      icon: "TrendingUp",
    },
  ];

  for (const s of staffingServices) {
    await prisma.service.create({
      data: { categoryId: staffingCategory.id, ...s, published: true },
    });
  }

  const expertiseAreas = [
    {
      title: "Manufacturing",
      tagline: "We keep businesses moving forward",
      description:
        "Gig economy, supply chain, and brand loyalty challenges meet cloud solutions that bring teams together, reduce costs, and enhance customer service and operational efficiency.",
      icon: "Factory",
      sortOrder: 0,
    },
    {
      title: "Banking, Financial & Insurance",
      tagline: "We build trust and increase resilience",
      description:
        "We work with payment startups and banks to increase resilience, speed to market, and secure customer data with Cloud Security Operation Center services.",
      icon: "Landmark",
      sortOrder: 1,
    },
    {
      title: "Electronics & Telecom",
      tagline: "We deliver next-gen customer experiences",
      description:
        "Cloud computing helps introduce new services, reduce costs, attract subscribers, and respond to market demands — serving providers in Africa and Canada.",
      icon: "Radio",
      sortOrder: 2,
    },
    {
      title: "Consumer Packaged Goods",
      tagline: "Balance retail and wholesale channels",
      description:
        "End-to-end, cloud-based, lead-generating contact center solutions to help you move forward with confidence amid regulatory and innovation pressures.",
      icon: "ShoppingBag",
      sortOrder: 3,
    },
    {
      title: "Healthcare",
      tagline: "Holistic solutions for better outcomes",
      description:
        "Contact center and cloud solutions for payers, providers, pharma, and labs — reducing costs and supporting multi-site infrastructure seamlessly.",
      icon: "Stethoscope",
      sortOrder: 4,
    },
    {
      title: "Public Sector",
      tagline: "Cost-effective digital services",
      description:
        "Cloud maximizes ROI and helps teams deliver on promises — serving students, subscribers, homeowners, and travelers with positive departmental change.",
      icon: "Building2",
      sortOrder: 5,
    },
    {
      title: "Retail",
      tagline: "Optimize CX for mobile consumers",
      description:
        "Leverage DevOps and the cloud to accelerate innovation and provide burst capacity for seasonal spikes while improving customer experience.",
      icon: "Store",
      sortOrder: 6,
    },
    {
      title: "Travel & Hospitality",
      tagline: "Support the journey digitally and literally",
      description:
        "Cloud and Contact Center as a Service increase access, speed to response, and ensure you always hear the voice of the customer.",
      icon: "Plane",
      sortOrder: 7,
    },
  ];

  for (const area of expertiseAreas) {
    await prisma.expertiseArea.create({ data: { ...area, published: true } });
  }

  const visionItems = [
    {
      pillar: "IT Solutions",
      type: "vision",
      title: "Innovation leader",
      body: "Recognized as an industry leader in IT innovation, developing cutting-edge technologies that drive digital transformation.",
      sortOrder: 0,
    },
    {
      pillar: "IT Solutions",
      type: "vision",
      title: "Unparalleled security",
      body: "Setting the standard for cybersecurity — protected data and resilient infrastructure against evolving threats.",
      sortOrder: 1,
    },
    {
      pillar: "IT Solutions",
      type: "vision",
      title: "Client empowerment",
      body: "Providing tools and expertise to harness technology for competitive advantage and operational excellence.",
      sortOrder: 2,
    },
    {
      pillar: "Transport Services",
      type: "vision",
      title: "Reliability and efficiency",
      body: "The most trusted name in transport — timely deliveries, safe transport, and operational excellence.",
      sortOrder: 3,
    },
    {
      pillar: "Transport Services",
      type: "vision",
      title: "Sustainable mobility",
      body: "Leading sustainable transport practices, reducing carbon footprint and promoting eco-friendly logistics.",
      sortOrder: 4,
    },
    {
      pillar: "Transport Services",
      type: "vision",
      title: "Customer-centric service",
      body: "Exceeding expectations through transparent, responsive, and personalized transport services.",
      sortOrder: 5,
    },
    {
      pillar: "Staffing Services",
      type: "vision",
      title: "Top talent connector",
      body: "The go-to staffing partner for top-tier talent — matching the right candidates with the right opportunities.",
      sortOrder: 6,
    },
    {
      pillar: "Staffing Services",
      type: "vision",
      title: "Employee development",
      body: "A nurturing environment for professional growth where candidates reach their highest potential.",
      sortOrder: 7,
    },
    {
      pillar: "Staffing Services",
      type: "vision",
      title: "Trust and integrity",
      body: "Transparent, ethical staffing practices focused on mutual success.",
      sortOrder: 8,
    },
  ];

  const missionItems = [
    {
      pillar: "IT Solutions",
      type: "mission",
      title: "Innovate and empower",
      body: "Leverage cutting-edge technology to implement innovative IT solutions that enhance efficiency and drive growth.",
      sortOrder: 0,
    },
    {
      pillar: "IT Solutions",
      type: "mission",
      title: "Secure and reliable",
      body: "Robust cybersecurity and reliable IT infrastructure that protect data and support digital transformation.",
      sortOrder: 1,
    },
    {
      pillar: "IT Solutions",
      type: "mission",
      title: "Client-centric approach",
      body: "Personalized IT services tailored to each client, fostering long-term partnerships and satisfaction.",
      sortOrder: 2,
    },
    {
      pillar: "Transport Services",
      type: "mission",
      title: "Efficient and timely",
      body: "Safe, reliable, and timely transport with optimized routes and advanced technology.",
      sortOrder: 3,
    },
    {
      pillar: "Transport Services",
      type: "mission",
      title: "Sustainable practices",
      body: "Eco-friendly practices and technologies that minimize environmental impact.",
      sortOrder: 4,
    },
    {
      pillar: "Transport Services",
      type: "mission",
      title: "Customer focus",
      body: "Responsive, transparent, and professional transport services that exceed expectations.",
      sortOrder: 5,
    },
    {
      pillar: "Staffing Services",
      type: "mission",
      title: "Quality and excellence",
      body: "Comprehensive staffing solutions ensuring the right fit for every role and culture.",
      sortOrder: 6,
    },
    {
      pillar: "Staffing Services",
      type: "mission",
      title: "Development and support",
      body: "Continuous development so candidates and employees excel with the skills they need.",
      sortOrder: 7,
    },
    {
      pillar: "Staffing Services",
      type: "mission",
      title: "Integrity and trust",
      body: "Transparent, ethical, and reliable staffing practices that prioritize mutual growth.",
      sortOrder: 8,
    },
  ];

  for (const item of [...visionItems, ...missionItems]) {
    await prisma.visionMissionItem.create({ data: { ...item, published: true } });
  }

  const whyChoose = [
    {
      section: "transport",
      title: "Well-trained and vetted drivers",
      description:
        "Carefully selected, thoroughly trained drivers — professional, licensed, and committed to your safety and privacy.",
      icon: "UserCheck",
      sortOrder: 0,
    },
    {
      section: "transport",
      title: "Clean and modern vehicles",
      description:
        "Regularly maintained fleet with features for a comfortable, customized journey from pickup to destination.",
      icon: "Car",
      sortOrder: 1,
    },
    {
      section: "transport",
      title: "Fair and transparent pricing",
      description: "Clear, honest pricing with no hidden fees — fair rates for quality service.",
      icon: "BadgeDollarSign",
      sortOrder: 2,
    },
    {
      section: "transport",
      title: "24/7 availability",
      description:
        "Dedicated team available around the clock — drivers, receptionists, and admin staff ready when you need us.",
      icon: "Clock",
      sortOrder: 3,
    },
    {
      section: "general",
      title: "Integrity & excellence",
      description:
        "Your preferred partner known for integrity, excellence, and commitment to your success and growth.",
      icon: "Award",
      sortOrder: 0,
    },
    {
      section: "general",
      title: "Integrated expertise",
      description:
        "Technology, transport, and staffing under one roof — seamless, efficient, and personalized services.",
      icon: "Layers",
      sortOrder: 1,
    },
    {
      section: "general",
      title: "Canada-based, globally minded",
      description:
        "Headquartered in Canada with experience serving clients across North America and Africa.",
      icon: "Globe",
      sortOrder: 2,
    },
  ];

  for (const item of whyChoose) {
    await prisma.whyChooseItem.create({ data: { ...item, published: true } });
  }

  const transportOfferings = [
    {
      title: "Tailored transport for individuals with disabilities",
      description:
        "Reliable, comfortable transportation for ongoing limitations that significantly impact daily life.",
      sortOrder: 0,
    },
    {
      title: "Daily and weekly transport for adults and students",
      description:
        "Safe transport from home to school or other destinations for adults and students with mild disabilities.",
      sortOrder: 1,
    },
    {
      title: "Specialized transport for severe disabilities",
      description:
        "Regular transport from home to specialized establishments for schooling and personalized support.",
      sortOrder: 2,
    },
    {
      title: "On-demand collective transport",
      description:
        "Classic or PRM-adapted on-demand service with collective and tailor-made options for specific needs.",
      sortOrder: 3,
    },
  ];

  for (const o of transportOfferings) {
    await prisma.transportOffering.create({ data: { ...o, published: true } });
  }

  const staffingSkills = [
    "Application support",
    "Call center management",
    "Cloud computing",
    "Contact center software expert",
    "CRM tool expert",
    "Copywriting and content writing",
    "Editing and proofreading",
    "Search Engine Optimization",
    "Social media support and promotion",
    "Data entry",
    "Cyber security",
    "Transport expert",
    "Healthcare expert",
  ];

  for (const [sortOrder, title] of staffingSkills.entries()) {
    await prisma.staffingSkill.create({
      data: { title, sortOrder, published: true },
    });
  }

  await prisma.office.create({
    data: {
      country: "Canada",
      city: "Ottawa–Gatineau",
      address: "Capital Region, Ontario / Quebec",
      phone: "+1 (613) 000-0000",
      email: "contact@keytogo.com",
      isHeadquarters: true,
      sortOrder: 0,
      published: true,
    },
  });

  const quoteOptions = [
    "IT Solutions — Automation",
    "IT Solutions — Cloud",
    "IT Solutions — Cybersecurity",
    "Transport — Taxi / VVIP",
    "Transport — Medical / Adapted",
    "Transport — School",
    "Transport — Package delivery",
    "Staffing — Experts on demand",
    "Staffing — Contact center",
    "Other",
  ];

  for (const [sortOrder, label] of quoteOptions.entries()) {
    await prisma.quoteServiceOption.create({
      data: { label, sortOrder, published: true },
    });
  }

  const partners = [
    { name: "Microsoft", role: "Cloud & productivity partner", sortOrder: 0 },
    { name: "Amazon Web Services", role: "Cloud infrastructure", sortOrder: 1 },
    { name: "Cisco", role: "Networking & security", sortOrder: 2 },
    { name: "VMware", role: "Virtualization", sortOrder: 3 },
    { name: "Fortinet", role: "Cybersecurity", sortOrder: 4 },
    { name: "Veeam", role: "Backup & recovery", sortOrder: 5 },
  ];

  for (const p of partners) {
    await prisma.partner.create({ data: { ...p, published: true } });
  }

  const testimonials = [
    {
      authorName: "Sarah Mitchell",
      authorRole: "Operations Director",
      company: "Regional Healthcare Network",
      content:
        "KeyTOGO transformed our contact center and cloud infrastructure. Response times improved dramatically and our team finally has one partner for IT and staffing.",
      rating: 5,
      sortOrder: 0,
    },
    {
      authorName: "Jean-Pierre Dubois",
      authorRole: "Logistics Manager",
      company: "Capital Region Business Services",
      content:
        "Their transport team is professional, on time, and transparent on pricing. Medical and executive rides have been flawless for our staff.",
      rating: 5,
      sortOrder: 1,
    },
    {
      authorName: "Amina Hassan",
      authorRole: "CTO",
      company: "FinTech Startup, Ottawa",
      content:
        "From automation to cybersecurity, KeyTOGO helped us scale without hiring a full in-house team. Experts on demand was exactly what we needed.",
      rating: 5,
      sortOrder: 2,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: { ...t, published: true } });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
