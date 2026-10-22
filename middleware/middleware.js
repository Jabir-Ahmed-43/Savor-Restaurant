// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // NextAuth creates a cookie named "next-auth.session-token" in development,
  // and "__Secure-next-auth.session-token" in production (HTTPS).
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // If the user does not have a token, instantly bounce them to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If they have a token, let them proceed to the protected route
  return NextResponse.next();
}

// The matcher defines exactly which routes trigger this check
export const config = {
  matcher: ["/profile", "/checkout", "/admin/:path*"],
};
