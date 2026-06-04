import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { officeSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(prisma.office, officeSchema);

export const GET = handlers.GET;
export const POST = handlers.POST;
