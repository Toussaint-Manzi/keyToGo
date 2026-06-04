import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { partnerSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.partner, partnerSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
