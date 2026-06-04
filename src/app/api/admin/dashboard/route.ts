import { requireAdminSession } from "@/lib/auth";
import { adminDashboardStats } from "@/lib/admin-route-handler";
import { handleApiError, jsonOk } from "@/lib/api-response";

export async function GET() {
  try {
    const stats = await adminDashboardStats();
    return jsonOk(stats);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function HEAD() {
  try {
    await requireAdminSession();
    return new Response(null, { status: 200 });
  } catch {
    return new Response(null, { status: 401 });
  }
}
