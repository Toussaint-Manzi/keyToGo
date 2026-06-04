import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "keytogo_admin_session";

function resolveAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "development") {
    return "development-only-auth-secret-32chars";
  }
  return null;
}

async function isValidSession(token: string) {
  const secret = resolveAuthSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return payload.role === "admin";
  } catch {
    return false;
  }
}

function redirectAdminToDashboard(pathname: string, request: NextRequest) {
  const next = pathname.replace(/^\/admin/, "/dashboard");
  return NextResponse.redirect(new URL(next, request.url));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return redirectAdminToDashboard(pathname, request);
  }

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (pathname === "/dashboard/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token && (await isValidSession(token))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await isValidSession(token))) {
    const login = new URL("/dashboard/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
