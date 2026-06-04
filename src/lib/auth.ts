import { timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { normalizeEnvValue } from "@/lib/env";

const COOKIE_NAME = "keytogo_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSecretKey(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "development") {
    return "development-only-auth-secret-32chars";
  }
  throw new Error("AUTH_SECRET must be set (min 32 characters)");
}

function getSecret() {
  return new TextEncoder().encode(getSecretKey());
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const adminEmail = normalizeEnvValue(process.env.ADMIN_EMAIL);
  const adminPassword = normalizeEnvValue(process.env.ADMIN_PASSWORD);

  if (!adminEmail || !adminPassword) {
    return false;
  }

  if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
    return false;
  }

  return safeEqual(password, adminPassword);
}

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin" || typeof payload.email !== "string") {
      return null;
    }
    return { email: payload.email };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
