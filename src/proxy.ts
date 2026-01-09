
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import next from "next";


const protectedRoutes = [
    "/participant/:path*",
    "/admin/:path*",
    "/organizer/:path*",
]

export function proxy(request: NextRequest) {

    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/auth/signup", request.url));
    }

    const { nextUrl } = request;
    console.log("pathname", nextUrl.pathname);
    const response = NextResponse.next();
    const isLoggedIn = !!sessionCookie;
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");


    //console log above variables
    console.log("isLoggedIn", isLoggedIn);
    console.log("isProtectedRoute", isOnProtectedRoute);
    console.log("isOnAuthRoute", isOnAuthRoute);

    if (isOnProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isOnAuthRoute && isLoggedIn) {
        
        return NextResponse.redirect(new URL("/participant", request.url));
    }

    return response;
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}