import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { expertiseSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(
  prisma.expertiseArea,
  expertiseSchema,
);

export const GET = handlers.GET;
export const POST = handlers.POST;
