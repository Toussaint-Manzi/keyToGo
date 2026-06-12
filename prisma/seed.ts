import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GOVCONNECT_VIDEO =
  "https://drive.google.com/file/d/1i0AZ00CGJORfU5d2aepbzM_d6-9nbQDO/view?usp=sharing";

async function main() {
  console.log("Seeding KeyTOGO Group Inc. content…");

  await prisma.quoteRequest.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.quoteServiceOption.deleteMany();
  await prisma.project.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.leadershipMember.deleteMany();
  await prisma.productPage.deleteMany();
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
        "Innovative IT solutions, reliable transport, and exceptional staffing — tailored to your success.",
      heroTitle:
        "Driving Business Growth Through Technology, Mobility and Workforce Excellence",
      heroSubtitle:
        "IT innovation, reliable transport, and staffing experts — your trusted partner for growth across Canada.",
      heroTypingPhrases: [
        "IT solutions & govCONNECT",
        "Cloud & cybersecurity",
        "Transport services",
        "Staffing & experts on demand",
        "Contact center excellence",
      ],
      introParagraphs: [
        "At KeyTOGO Group Inc., we envision a future where businesses and communities thrive through innovative IT solutions, reliable transport services, and exceptional staffing. Our team of developers, IT/HR consultants, and transport professionals delivers quality products and services tailored to your needs.",
        "We aim to be our clients' preferred partner — recognized for integrity, excellence, and commitment to their success. By combining technology, mobility, and workforce solutions, we help organizations reach their full potential across North America and Africa.",
      ],
      contactEmail: "contact@keytogo.com",
      contactPhone: "+1 (613) 000-0000",
      contactAddress: "National Capital Region (Ottawa–Gatineau), Canada",
      countriesLine: "Canada • Serving clients across North America & Africa",
      metaDescription:
        "KeyTOGO Group Inc. — IT solutions, transport, and staffing in Canada. govCONNECT, cloud, cybersecurity, medical transport, and experts on demand.",
      footerText: "© 2026 KeyTOGO Group Inc. All rights reserved.",
    },
  });

  const stats = [
    { label: "Years of combined expertise", value: "15+", sortOrder: 0 },
    { label: "Satisfied clients", value: "200+", sortOrder: 1 },
    { label: "Projects delivered", value: "500+", sortOrder: 2 },
    { label: "Support available", value: "24/7", sortOrder: 3 },
  ];
  for (const s of stats) {
    await prisma.stat.create({ data: { ...s, published: true } });
  }

  const itCategory = await prisma.serviceCategory.create({
    data: {
      slug: "it-solutions",
      name: "IT Solutions",
      description:
        "Cutting-edge technology, digital government platforms, cloud, cybersecurity, and managed services for operational excellence.",
      icon: "Cpu",
      sortOrder: 0,
    },
  });

  const transportCategory = await prisma.serviceCategory.create({
    data: {
      slug: "transport",
      name: "Transport Services",
      description:
        "Safe, reliable, and transparent transport — executive rides, medical transport, school services, and logistics.",
      icon: "Truck",
      sortOrder: 1,
    },
  });

  const staffingCategory = await prisma.serviceCategory.create({
    data: {
      slug: "staffing",
      name: "Staffing Services",
      description:
        "Experts on demand — IT, telecom, contact center, and healthcare talent matched to your needs.",
      icon: "Users",
      sortOrder: 2,
    },
  });

  const trainingCategory = await prisma.serviceCategory.create({
    data: {
      slug: "trainings",
      name: "Professional Trainings",
      description:
        "Certifications and partnerships that upskill your teams and strengthen your technology workforce.",
      icon: "GraduationCap",
      sortOrder: 3,
    },
  });

  const itServices = [
    {
      slug: "govconnect",
      title: "govCONNECT",
      description:
        "govCONNECT serves as a gateway between citizens and public institutions, enhancing service delivery through integrated digital government modules.",
      bulletPoints: [
        "eGov — citizen services and administrative workflows",
        "eHealth — healthcare administration for providers and networks",
        "eRevenu — revenue and tax administration (coming soon)",
        "eJustice — justice and legal case management (coming soon)",
      ],
      icon: "Building2",
      ctaLabel: "Explore more",
      ctaHref: "/services/govconnect",
      sortOrder: 0,
    },
    {
      title: "Cloud Solutions",
      description:
        "React quickly to market changes, manage enterprise workloads, and achieve consistent ROI with the right cloud approach.",
      bulletPoints: [
        "Public, private, or hybrid — SaaS, PaaS, IaaS, and CCaaS",
        "End-to-end cloud migration and optimization",
        "Hybrid cloud planning, build, and optimization",
      ],
      icon: "Cloud",
      sortOrder: 1,
    },
    {
      title: "Cybersecurity",
      description:
        "Strengthen your security posture with proactive defense, monitoring, and agile response strategies.",
      bulletPoints: [
        "Cloud Security Operation Center services",
        "Compliance-aware strategies for evolving regulations",
        "Resilient infrastructure against evolving threats",
      ],
      icon: "Shield",
      sortOrder: 2,
    },
    {
      title: "Contact Center Solutions",
      description:
        "Platform-agnostic contact center outsourcing and CX automation on modern cloud infrastructure.",
      bulletPoints: [
        "AI-powered customer experience",
        "Interactive and assistive automation",
        "Omnichannel support and analytics",
      ],
      icon: "Headphones",
      sortOrder: 3,
    },
    {
      title: "Network Infrastructure",
      description:
        "Design, deploy, and manage resilient network infrastructure for enterprises and public-sector organizations.",
      bulletPoints: [
        "LAN/WAN design and implementation",
        "SD-WAN and hybrid connectivity",
        "Monitoring, optimization, and support",
      ],
      icon: "Network",
      sortOrder: 4,
    },
    {
      title: "Managed Services",
      description:
        "Proactive IT management, monitoring, and support so your teams can focus on strategic priorities.",
      bulletPoints: [
        "24/7 infrastructure monitoring",
        "Help desk and application support",
        "Patch management and lifecycle services",
      ],
      icon: "Settings",
      sortOrder: 5,
    },
  ];

  for (const s of itServices) {
    await prisma.service.create({
      data: { categoryId: itCategory.id, ...s, published: true },
    });
  }

  const transportServices = [
    {
      title: "Executive Transportation",
      description:
        "Premium executive and VVIP transportation with professional drivers and modern, comfortable vehicles.",
      sortOrder: 0,
      icon: "Star",
    },
    {
      title: "Medical Transportation",
      description:
        "Comfortable, secure transport for medical visits, therapy, and healthcare appointments with equipped vehicles.",
      sortOrder: 1,
      icon: "HeartPulse",
    },
    {
      title: "School Transportation",
      description:
        "Safe, reliable school runs with flexible scheduling, real-time notifications, and versatile options.",
      sortOrder: 2,
      icon: "GraduationCap",
    },
    {
      title: "Logistics & Courier",
      description:
        "Fast, dependable parcel and logistics delivery across Ottawa, Gatineau, and the Capital Region.",
      sortOrder: 3,
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
      title: "IT Staffing",
      description:
        "Skilled developers, architects, and IT professionals to scale your technology teams on demand.",
      sortOrder: 0,
      icon: "Cpu",
    },
    {
      title: "Telecom Experts",
      description:
        "Network engineers, telecom specialists, and infrastructure experts for carriers and enterprises.",
      sortOrder: 1,
      icon: "Radio",
    },
    {
      title: "Contact Center Staffing",
      description:
        "Agents, supervisors, and CX specialists for outsourced and in-house contact center operations.",
      sortOrder: 2,
      icon: "Headphones",
    },
    {
      title: "Healthcare Staffing",
      description:
        "Clinical and administrative healthcare professionals for providers, labs, and regional networks.",
      sortOrder: 3,
      icon: "Stethoscope",
    },
  ];

  for (const s of staffingServices) {
    await prisma.service.create({
      data: { categoryId: staffingCategory.id, ...s, published: true },
    });
  }

  const trainingServices = [
    {
      title: "Industry Certifications",
      description:
        "Prepare your teams for industry-recognized credentials across cloud, cybersecurity, and enterprise technology.",
      bulletPoints: [
        "Cloud and cybersecurity certifications",
        "Infrastructure and networking credentials",
        "Contact center and CX specialist certifications",
      ],
      sortOrder: 0,
      icon: "Award",
    },
    {
      title: "Training Partnerships",
      description:
        "Leverage our vendor and academic partnerships to deliver accredited programs aligned with your technology roadmap.",
      bulletPoints: [
        "Microsoft, AWS, and Cisco-aligned training paths",
        "Telecom and contact center partner programs",
        "Co-branded learning tracks for client teams",
      ],
      sortOrder: 1,
      icon: "Layers",
    },
    {
      title: "Corporate Learning Programs",
      description:
        "Custom workshops, bootcamps, and continuous learning plans designed around your teams, roles, and delivery goals.",
      bulletPoints: [
        "Custom corporate learning programs",
        "Leadership and digital transformation workshops",
        "Role-based upskilling and practicum-style delivery",
      ],
      sortOrder: 2,
      icon: "GraduationCap",
    },
  ];

  for (const s of trainingServices) {
    await prisma.service.create({
      data: { categoryId: trainingCategory.id, ...s, published: true },
    });
  }

  await prisma.productPage.create({
    data: {
      slug: "govconnect",
      title: "govCONNECT",
      subtitle: "Digital government & healthcare administration platforms",
      description:
        "govCONNECT serves as a gateway between citizens and public institutions, enhancing service delivery by enabling citizens to seamlessly access and engage with government departments and agencies. Simultaneously, it equips public sector agents with digital tools to efficiently manage, prioritize, and process incoming requests promoting transparency, responsiveness, and equitable service delivery.",
      videoUrl: GOVCONNECT_VIDEO,
      products: [
        {
          key: "egov",
          title: "eGov",
          description:
            "Digital government platform for streamlined citizen services, case management, and administrative workflows.",
          href: "https://egov-admin.keytogogroup.ca/",
          hasDemo: false,
          external: true,
        },
        {
          key: "ehealth",
          title: "eHealth",
          description:
            "Healthcare administration platform for clinics, providers, and regional health networks.",
          href: "https://ehealth-admin.keytogogroup.ca/",
          hasDemo: true,
          external: true,
        },
        {
          key: "erevenu",
          title: "eRevenu",
          description:
            "Revenue and tax administration module for modern public finance operations.",
          comingSoon: true,
        },
        {
          key: "ejustice",
          title: "eJustice",
          description:
            "Justice and legal case management module for courts and public legal institutions.",
          comingSoon: true,
        },
      ],
      published: true,
    },
  });

  const industries = [
    {
      title: "IT",
      tagline: "Technology-driven transformation",
      description:
        "Cloud, automation, cybersecurity, and managed services for enterprises modernizing their technology footprint.",
      icon: "Cpu",
      sortOrder: 0,
    },
    {
      title: "Telecom",
      tagline: "Next-gen connectivity",
      description:
        "Network infrastructure, contact center, and telecom expertise for carriers and service providers in Canada and Africa.",
      icon: "Radio",
      sortOrder: 1,
    },
    {
      title: "Healthcare",
      tagline: "Better outcomes through technology",
      description:
        "e-Health platforms, medical transport, and healthcare staffing for payers, providers, and regional networks.",
      icon: "Stethoscope",
      sortOrder: 2,
    },
    {
      title: "Government",
      tagline: "Digital public services",
      description:
        "govCONNECT and cloud solutions helping government agencies deliver cost-effective, citizen-centric digital services.",
      icon: "Building2",
      sortOrder: 3,
    },
    {
      title: "Banking & Insurance",
      tagline: "Trust and resilience",
      description:
        "Secure cloud, contact center, and cybersecurity solutions for financial institutions and insurers.",
      icon: "Landmark",
      sortOrder: 4,
    },
    {
      title: "Manufacturing",
      tagline: "Operational efficiency",
      description:
        "Automation, supply chain technology, and staffing solutions that keep manufacturing operations moving forward.",
      icon: "Factory",
      sortOrder: 5,
    },
  ];

  for (const area of industries) {
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
      pillar: "Transport Services",
      type: "vision",
      title: "Reliability and efficiency",
      body: "The most trusted name in transport — timely deliveries, safe transport, and operational excellence.",
      sortOrder: 1,
    },
    {
      pillar: "Staffing Services",
      type: "vision",
      title: "Top talent connector",
      body: "The go-to staffing partner for top-tier talent — matching the right candidates with the right opportunities.",
      sortOrder: 2,
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
      pillar: "Transport Services",
      type: "mission",
      title: "Efficient and timely",
      body: "Safe, reliable, and timely transport with optimized routes and advanced technology.",
      sortOrder: 1,
    },
    {
      pillar: "Staffing Services",
      type: "mission",
      title: "Quality and excellence",
      body: "Comprehensive staffing solutions ensuring the right fit for every role and culture.",
      sortOrder: 2,
    },
  ];

  for (const item of [...visionItems, ...missionItems]) {
    await prisma.visionMissionItem.create({
      data: { ...item, published: true },
    });
  }

  const leadership = [
    { role: "CEO", title: "Chief Executive Officer", sortOrder: 0 },
    { role: "COO", title: "Chief Operation Officer", sortOrder: 1 },
    { role: "CFO", title: "Chief Finance Officer", sortOrder: 2 },
    { role: "CAO", title: "Chief Admin Officer", sortOrder: 3 },
  ];

  for (const member of leadership) {
    await prisma.leadershipMember.create({
      data: { ...member, published: true },
    });
  }

  const whyChoose = [
    {
      section: "general",
      title: "15+ years experience",
      description:
        "Over fifteen years of combined expertise across IT, transport, and staffing for Canadian and international clients.",
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
      title: "24/7 support",
      description:
        "Dedicated teams available around the clock — ready when you need us for critical operations.",
      icon: "Clock",
      sortOrder: 2,
    },
    {
      section: "general",
      title: "Canada-based",
      description:
        "Headquartered in Canada with deep understanding of local business and regulatory requirements.",
      icon: "MapPin",
      sortOrder: 3,
    },
    {
      section: "general",
      title: "North America & Africa coverage",
      description:
        "Serving clients across North America and Africa with proven delivery in diverse markets.",
      icon: "Globe",
      sortOrder: 4,
    },
  ];

  for (const item of whyChoose) {
    await prisma.whyChooseItem.create({ data: { ...item, published: true } });
  }

  const resources = [
    // Blog
    {
      title: "Staff Augmentation vs Full-Time Hiring",
      category: "Blog",
      excerpt:
        "When to scale with on-demand experts versus building permanent in-house teams.",
      href: "https://dev.to/t/staffing",
      sortOrder: 0,
    },
    {
      title: "Building High-Performance Remote Teams",
      category: "Blog",
      excerpt:
        "Practices for distributed collaboration, accountability, and delivery velocity.",
      href: "https://medium.com/tag/remote-work",
      sortOrder: 1,
    },
    {
      title: "Modern IT Staffing Strategies for Growing Companies",
      category: "Blog",
      excerpt:
        "How mid-market firms balance contractors, partners, and core hires.",
      href: "https://hackernoon.com/c/technology",
      sortOrder: 2,
    },
    // Whitepapers
    {
      title: "Cloud Migration Best Practices",
      category: "Whitepapers",
      excerpt:
        "A structured approach to planning, migrating, and optimizing cloud workloads.",
      href: "https://medium.com/tag/cloud-computing",
      sortOrder: 3,
    },
    {
      title: "Hybrid Cloud Architecture Patterns",
      category: "Whitepapers",
      excerpt:
        "Design patterns for secure, scalable hybrid and multi-cloud deployments.",
      href: "https://dev.to/t/cloud",
      sortOrder: 4,
    },
    {
      title: "Cybersecurity Framework for Cloud-Native Organizations",
      category: "Whitepapers",
      excerpt:
        "Layered security controls for modern cloud and SaaS environments.",
      href: "https://dev.to/t/security",
      sortOrder: 5,
    },
    // Industry Reports
    {
      title: "Medical Transportation Compliance in Canada",
      category: "Industry Reports",
      excerpt:
        "Key regulatory and operational considerations for healthcare transport providers.",
      href: "https://medium.com/tag/healthcare",
      sortOrder: 6,
    },
    {
      title: "Digital Transformation in Healthcare",
      category: "Industry Reports",
      excerpt:
        "How providers are modernizing operations, data, and patient experience.",
      href: "https://dev.to/t/healthcare",
      sortOrder: 7,
    },
    {
      title: "Public Sector Digital Services Outlook",
      category: "Industry Reports",
      excerpt:
        "Trends in e-government platforms, citizen services, and operational efficiency.",
      href: "https://medium.com/tag/government",
      sortOrder: 8,
    },
    // Technology Trends
    {
      title: "How AI is Transforming Contact Centers",
      category: "Technology Trends",
      excerpt:
        "Practical ways AI is reshaping customer experience and agent productivity.",
      href: "https://dev.to/t/ai",
      sortOrder: 9,
    },
    {
      title: "10 Cloud Computing Trends to Watch",
      category: "Technology Trends",
      excerpt:
        "Emerging patterns in infrastructure, automation, and platform engineering.",
      href: "https://medium.com/tag/artificial-intelligence",
      sortOrder: 10,
    },
    {
      title: "The Future of Customer Experience Automation",
      category: "Technology Trends",
      excerpt:
        "CX automation, conversational AI, and omnichannel orchestration.",
      href: "https://dev.to/t/automation",
      sortOrder: 11,
    },
    // Telecom Insights
    {
      title: "5G Rollout Strategies for Telecom Providers",
      category: "Telecom Insights",
      excerpt:
        "Infrastructure, staffing, and CX considerations for next-generation networks.",
      href: "https://dev.to/t/5g",
      sortOrder: 12,
    },
    {
      title: "Modernizing Telecom Infrastructure",
      category: "Telecom Insights",
      excerpt:
        "Network virtualization, edge computing, and operational resilience.",
      href: "https://medium.com/tag/telecommunications",
      sortOrder: 13,
    },
    {
      title: "Contact Center Evolution in Telecom",
      category: "Telecom Insights",
      excerpt:
        "How carriers are upgrading support operations for digital-first subscribers.",
      href: "https://dev.to/t/telecommunications",
      sortOrder: 14,
    },
  ];

  for (const r of resources) {
    await prisma.resource.create({ data: { ...r, published: true } });
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
    "IT Solutions — govCONNECT",
    "IT Solutions — Cloud",
    "IT Solutions — Cybersecurity",
    "IT Solutions — Contact Center",
    "Transport — Executive",
    "Transport — Medical",
    "Transport — School",
    "Transport — Logistics & Courier",
    "Staffing — IT",
    "Staffing — Healthcare",
    "Training — Industry Certifications",
    "Training — Training Partnerships",
    "Training — Corporate Learning Programs",
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
        "From govCONNECT to cybersecurity, KeyTOGO helped us scale without hiring a full in-house team. Experts on demand was exactly what we needed.",
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
