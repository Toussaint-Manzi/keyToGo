import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { expertiseSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.expertiseArea, expertiseSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
