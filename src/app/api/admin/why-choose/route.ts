import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { whyChooseSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(
  prisma.whyChooseItem,
  whyChooseSchema,
);

export const GET = handlers.GET;
export const POST = handlers.POST;
