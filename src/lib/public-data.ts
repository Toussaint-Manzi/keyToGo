import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const PUBLIC_CACHE_TAG = "public-content";

async function fetchPublicContent() {
  const [
    settings,
    stats,
    categories,
    expertise,
    visionMission,
    whyChoose,
    staffingSkills,
    transportOfferings,
    offices,
    quoteOptions,
    partners,
    testimonials,
  ] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
    prisma.stat.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.serviceCategory.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      include: {
        services: {
          where: { published: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
    prisma.expertiseArea.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.visionMissionItem.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.whyChooseItem.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.staffingSkill.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.transportOffering.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.office.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.quoteServiceOption.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.partner.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return {
    settings,
    stats,
    categories,
    expertise,
    visionMission,
    whyChoose,
    staffingSkills,
    transportOfferings,
    offices,
    quoteOptions,
    partners,
    testimonials,
  };
}

export const getPublicContent = unstable_cache(
  fetchPublicContent,
  ["public-content"],
  { revalidate: 300, tags: [PUBLIC_CACHE_TAG] },
);

export type PublicContent = Awaited<ReturnType<typeof getPublicContent>>;
