import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    const isLoggedIn = !!sessionCookie;

    const isOnAuthRoute = pathname.startsWith("/auth");
    const isOnProtectedRoute =
        pathname.startsWith("/participant") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/organizer");

    // 1️⃣ NOT logged in → trying to access protected route
    if (!isLoggedIn && isOnProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 2️⃣ Logged in → trying to access auth routes
    if (isLoggedIn && isOnAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard/user", request.url));
    }

    // 3️⃣ Allow everything else
    return NextResponse.next();
}


export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}