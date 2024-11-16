import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // Define restricted paths
  const restrictedPaths = ["/new-product", "/edit-product"];

  // Check if the current route is a restricted path
  const isRestrictedPath = restrictedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If trying to access a restricted path without a token, redirect to /sign-in
  if (isRestrictedPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user has a token and tries to access /sign-in, redirect them to home page
  if (request.nextUrl.pathname === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed for other routes
  return NextResponse.next();
}

export const config = {
  // Apply middleware only to specific routes to avoid affecting all pages
  matcher: ["/sign-in", "/new-product", "/edit-product"],
};
