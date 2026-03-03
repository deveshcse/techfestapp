import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ApiError } from "./api-error";

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
    throw ApiError.unauthorized(message);
}

export function badRequestResponse(message: string) {
    throw ApiError.badRequest(message);
}

export function notFoundResponse(message = "Resource not found") {
    throw ApiError.notFound(message);
}

export function serverErrorResponse(message = "Internal server error") {
    throw ApiError.internal(message);
}
