import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_KEY = process.env.SESSION_KEY;

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname === "/favicon.ico" ||
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_KEY as string);

  if (request.nextUrl.pathname.startsWith("/onboarding")) {
    if (session?.value) {
      try {
        const parsedSession = JSON.parse(session.value);
        if (Date.now() <= parsedSession.expiresAt) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        console.error("Error parsing session in middleware:", error);
      }
    }
    return NextResponse.next();
  }

  if (!session?.value) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  try {
    const parsedSession = JSON.parse(session.value);
    if (Date.now() > parsedSession.expiresAt) {
      const response = NextResponse.redirect(
        new URL("/onboarding", request.url)
      );
      response.cookies.delete(SESSION_KEY as string);
      return response;
    }
  } catch (error) {
    console.error("Error validating session in middleware:", error);
    const response = NextResponse.redirect(new URL("/onboarding", request.url));
    response.cookies.delete(SESSION_KEY as string);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|manifest.webmanifest|[^/]+\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|mp3|woff|woff2|ttf|otf|css|js)).*)",
  ],
};
