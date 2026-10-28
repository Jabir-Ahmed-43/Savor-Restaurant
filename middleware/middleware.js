// middleware.js
import { NextResponse } from "next/server";
// Import your auth validation logic here, e.g., getToken from NextAuth or your custom session verifier

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // 1. Define protected admin routes
  const isAdminRoute = path.startsWith("/admin");

  if (isAdminRoute) {
    // 2. Extract the session cookie (Adjust this based on your specific auth setup)
    const sessionCookie = request.cookies.get("next-auth.session-token")?.value;

    if (!sessionCookie) {
      // Not logged in -> Redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Verify the user's role (Example implementation)
    // You will need to decode the token or check the session data to ensure role === "admin"
    try {
      const sessionData = JSON.parse(atob(sessionCookie.split(".")[1])); // Example generic JWT decode

      if (sessionData.role !== "admin") {
        // Logged in, but NOT an admin -> Redirect to storefront or profile
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// 4. Configure which paths the middleware runs on
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/checkout/:path*"],
};
