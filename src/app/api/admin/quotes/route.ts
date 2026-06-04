import { requireAdminSession } from "@/lib/auth";
import { handleApiError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAdminSession();
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return jsonOk(quotes);
  } catch (error) {
    return handleApiError(error);
  }
}
