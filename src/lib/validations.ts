import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().email("Enter a valid email address"),
  company: z.string().max(200).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(20, "Please describe your needs (at least 20 characters)")
    .max(5000),
});

export const siteSettingsSchema = z.object({
  companyName: z.string().min(1).max(200),
  legalName: z.string().max(200).optional().nullable(),
  tagline: z.string().max(500).optional().nullable(),
  heroTitle: z.string().min(1).max(300),
  heroSubtitle: z.string().max(500).optional().nullable(),
  heroTypingPhrases: z.array(z.string().min(1)).min(1),
  introParagraphs: z.array(z.string().min(1)).min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().max(40).optional().nullable(),
  contactAddress: z.string().max(300).optional().nullable(),
  countriesLine: z.string().max(300).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  footerText: z.string().max(300).optional().nullable(),
});

export const statSchema = z.object({
  label: z.string().min(1).max(120),
  value: z.string().min(1).max(40),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const serviceCategorySchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  name: z.string().min(1).max(120),
  description: z.string().min(1).max(5000),
  icon: z.string().max(80).optional().nullable(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const serviceSchema = z.object({
  categoryId: z.string().min(1),
  slug: z
    .string()
    .max(80)
    .regex(/^[a-z0-9-]*$/, "Slug must be lowercase letters, numbers, and hyphens")
    .optional()
    .nullable(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(10000),
  bulletPoints: z.array(z.string()).optional().nullable(),
  icon: z.string().max(80).optional().nullable(),
  ctaLabel: z.string().max(80).optional().nullable(),
  ctaHref: z.string().max(300).optional().nullable(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const expertiseSchema = z.object({
  title: z.string().min(1).max(200),
  tagline: z.string().max(300).optional().nullable(),
  description: z.string().min(1).max(10000),
  icon: z.string().max(80).optional().nullable(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const visionMissionSchema = z.object({
  pillar: z.string().min(1).max(120),
  type: z.enum(["vision", "mission"]),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(5000),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const whyChooseSchema = z.object({
  section: z.string().min(1).max(80),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  icon: z.string().max(80).optional().nullable(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const partnerSchema = z.object({
  name: z.string().min(1).max(200),
  logoUrl: z.string().max(500).optional().nullable(),
  role: z.string().max(200).optional().nullable(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const testimonialSchema = z.object({
  authorName: z.string().min(1).max(120),
  authorRole: z.string().max(200).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  content: z.string().min(1).max(5000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export const officeSchema = z.object({
  country: z.string().min(1).max(120),
  city: z.string().max(120).optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  isHeadquarters: z.boolean(),
  sortOrder: z.number().int().min(0),
  published: z.boolean(),
});

export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
