import { destroyAdminSession } from "@/lib/auth";
import { jsonOk } from "@/lib/api-response";

export async function POST() {
  await destroyAdminSession();
  return jsonOk(null);
}
