import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { officeSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.office, officeSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
