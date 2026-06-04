import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { whyChooseSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.whyChooseItem, whyChooseSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
