import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { testimonialSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(prisma.testimonial, testimonialSchema);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
