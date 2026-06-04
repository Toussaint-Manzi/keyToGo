import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { partnerSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(prisma.partner, partnerSchema);

export const GET = handlers.GET;
export const POST = handlers.POST;
