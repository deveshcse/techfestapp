export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public errorCode?: string
    ) {
        super(message);
        this.name = "ApiError";
    }

    static badRequest(message = "Bad Request", errorCode = "BAD_REQUEST") {
        return new ApiError(400, message, errorCode);
    }

    static unauthorized(message = "Unauthorized", errorCode = "UNAUTHORIZED") {
        return new ApiError(401, message, errorCode);
    }

    static forbidden(message = "Forbidden", errorCode = "FORBIDDEN") {
        return new ApiError(403, message, errorCode);
    }

    static notFound(message = "Not Found", errorCode = "NOT_FOUND") {
        return new ApiError(404, message, errorCode);
    }

    static conflict(message = "Conflict", errorCode = "CONFLICT") {
        return new ApiError(409, message, errorCode);
    }

    static internal(message = "Internal Server Error", errorCode = "INTERNAL_SERVER_ERROR") {
        return new ApiError(500, message, errorCode);
    }
}
