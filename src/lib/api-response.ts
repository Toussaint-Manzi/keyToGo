import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { formatZodErrors } from "@/lib/validations";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function jsonError(
  message: string,
  status = 400,
  errors?: Record<string, string>,
) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError("Validation failed", 400, formatZodErrors(error));
  }
  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return jsonError("Unauthorized", 401);
  }
  console.error(error);
  return jsonError("Internal server error", 500);
}
