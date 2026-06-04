import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { serviceCategorySchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(
  prisma.serviceCategory,
  serviceCategorySchema,
);

export const GET = handlers.GET;
export const POST = handlers.POST;
