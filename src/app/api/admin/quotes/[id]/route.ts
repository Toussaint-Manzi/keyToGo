import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import { handleApiError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

const statusSchema = z.object({
  status: z.enum(["new", "read", "archived"]),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    const body = statusSchema.parse(await request.json());
    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: { status: body.status },
    });
    return jsonOk(quote);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    await prisma.quoteRequest.delete({ where: { id } });
    return jsonOk({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
