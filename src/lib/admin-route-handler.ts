import { requireAdminSession } from "@/lib/auth";
import { revalidatePublicCache } from "@/lib/admin-crud";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";
import type { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaDelegate = {
  findMany: (args?: any) => Promise<unknown[]>;
  create: (args: any) => Promise<unknown>;
  update: (args: any) => Promise<unknown>;
  delete: (args: any) => Promise<unknown>;
};

export function createAdminCollectionHandlers<T extends z.ZodType>(
  delegate: PrismaDelegate,
  schema: T,
  orderBy: object = { sortOrder: "asc" },
) {
  return {
    async GET() {
      try {
        await requireAdminSession();
        const items = await delegate.findMany({ orderBy });
        return jsonOk(items);
      } catch (error) {
        return handleApiError(error);
      }
    },
    async POST(request: Request) {
      try {
        await requireAdminSession();
        const body = schema.parse(await request.json());
        const item = await delegate.create({ data: body });
        revalidatePublicCache();
        return jsonOk(item, { status: 201 });
      } catch (error) {
        return handleApiError(error);
      }
    },
  };
}

export function createAdminItemHandlers<T extends z.ZodType>(
  delegate: PrismaDelegate,
  schema: T,
) {
  return {
    async PUT(
      request: Request,
      context: { params: Promise<{ id: string }> },
    ) {
      try {
        await requireAdminSession();
        const { id } = await context.params;
        const body = schema.parse(await request.json());
        const item = await delegate.update({ where: { id }, data: body });
        revalidatePublicCache();
        return jsonOk(item);
      } catch (error) {
        return handleApiError(error);
      }
    },
    async DELETE(
      _request: Request,
      context: { params: Promise<{ id: string }> },
    ) {
      try {
        await requireAdminSession();
        const { id } = await context.params;
        await delegate.delete({ where: { id } });
        revalidatePublicCache();
        return jsonOk({ id });
      } catch (error) {
        return handleApiError(error);
      }
    },
  };
}

export async function adminDashboardStats() {
  await requireAdminSession();
  const { prisma } = await import("@/lib/prisma");
  const [
    quotesNew,
    servicesCount,
    expertiseCount,
    officesCount,
  ] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: "new" } }),
    prisma.service.count(),
    prisma.expertiseArea.count(),
    prisma.office.count(),
  ]);
  return { quotesNew, servicesCount, expertiseCount, officesCount };
}
