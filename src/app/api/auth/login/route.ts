import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());
    const valid = await verifyAdminCredentials(body.email, body.password);

    if (!valid) {
      return jsonError("Invalid email or password", 401);
    }

    await createAdminSession(body.email);
    return jsonOk({ email: body.email });
  } catch (error) {
    return handleApiError(error);
  }
}
