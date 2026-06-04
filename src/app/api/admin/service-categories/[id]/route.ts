import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { serviceCategorySchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(
  prisma.serviceCategory,
  serviceCategorySchema,
);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
