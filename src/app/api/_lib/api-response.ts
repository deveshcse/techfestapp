import { NextResponse } from "next/server";

export class ApiResponse {
    static success<T>(data: T, status = 200) {
        return NextResponse.json(
            {
                success: true,
                data,
            },
            { status }
        );
    }

    static error(message: string, status = 500, errorCode?: string) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    message,
                    code: errorCode,
                },
            },
            { status }
        );
    }
}
