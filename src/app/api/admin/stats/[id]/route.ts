import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { statSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.stat, statSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
