import { prisma } from "@/lib/prisma";
import {
  createAdminCollectionHandlers,
} from "@/lib/admin-route-handler";
import { statSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(prisma.stat, statSchema);

export const GET = handlers.GET;
export const POST = handlers.POST;
