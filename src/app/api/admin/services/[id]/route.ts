import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { serviceSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.service, serviceSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
