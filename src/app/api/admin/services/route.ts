import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { serviceSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(prisma.service, serviceSchema, {
  sortOrder: "asc",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
