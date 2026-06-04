import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";
import { quoteRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = quoteRequestSchema.parse(await request.json());

    const record = await prisma.quoteRequest.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        company: body.company?.trim() || null,
        phone: body.phone?.trim() || null,
        service: body.service,
        message: body.message.trim(),
      },
    });

    return jsonOk({ id: record.id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
