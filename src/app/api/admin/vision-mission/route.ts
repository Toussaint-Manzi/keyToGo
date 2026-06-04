import { prisma } from "@/lib/prisma";
import { createAdminCollectionHandlers } from "@/lib/admin-route-handler";
import { visionMissionSchema } from "@/lib/validations";

const handlers = createAdminCollectionHandlers(
  prisma.visionMissionItem,
  visionMissionSchema,
);

export const GET = handlers.GET;
export const POST = handlers.POST;
