import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function getAuthenticatedUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return null;
    }

    return session.user;
}

export function unauthorizedResponse(message = "Unauthorized") {
    return NextResponse.json(
        { error: message },
        { status: 401 }
    );
}

export function badRequestResponse(message: string) {
    return NextResponse.json(
        { error: message },
        { status: 400 }
    );
}

export function notFoundResponse(message = "Resource not found") {
    return NextResponse.json(
        { error: message },
        { status: 404 }
    );
}

export function serverErrorResponse(message = "Internal server error") {
    return NextResponse.json(
        { error: message },
        { status: 500 }
    );
}
