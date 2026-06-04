import { prisma } from "@/lib/prisma";
import { createAdminItemHandlers } from "@/lib/admin-route-handler";
import { visionMissionSchema } from "@/lib/validations";

const handlers = createAdminItemHandlers(
  prisma.visionMissionItem,
  visionMissionSchema,
);

export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
