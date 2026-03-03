import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./api-error";
import { ApiResponse } from "./api-response";

type ApiHandler = (
    request: NextRequest,
    context: any
) => Promise<NextResponse> | NextResponse;

export function withErrorHandler(handler: ApiHandler) {
    return async (request: NextRequest, context: any) => {
        try {
            return await handler(request, context);
        } catch (error) {
            if (error instanceof ApiError) {
                return ApiResponse.error(error.message, error.statusCode, error.errorCode);
            }

            if (error instanceof NextResponse) {
                return error;
            }

            if (error instanceof Response) {
                return new NextResponse(error.body, {
                    status: error.status,
                    statusText: error.statusText,
                    headers: error.headers,
                });
            }

            // Handle Zod Errors (if they leak through)
            if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
                return ApiResponse.error("Validation failed", 400, "VALIDATION_ERROR");
            }

            console.error("Unhandled API Error:", error);

            return ApiResponse.error(
                process.env.NODE_ENV === "development"
                    ? String(error)
                    : "Internal Server Error",
                500,
                "INTERNAL_SERVER_ERROR"
            );
        }
    };
}
