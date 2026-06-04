import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { testimonialSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(
  prisma.testimonial,
  testimonialSchema,
);

export const GET = handlers.GET;
export const POST = handlers.POST;
