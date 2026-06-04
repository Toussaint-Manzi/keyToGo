import { requireAdminSession } from "@/lib/auth";
import { revalidatePublicCache } from "@/lib/admin-crud";
import { handleApiError, jsonOk } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAdminSession();
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminSession();
    const body = siteSettingsSchema.parse(await request.json());

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      create: { id: "default", ...body },
      update: body,
    });

    revalidatePublicCache();
    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
