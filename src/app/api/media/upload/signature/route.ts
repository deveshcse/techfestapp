import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { generateSignature } from "@/lib/cloudinary";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";

export const GET = withErrorHandler(async (request: NextRequest) => {
    // Ensure user is authorized to update techfest (and thus upload media)
    await authorize(request, "techfest", "update");

    // We can pass parameters if needed (e.g. folder, public_id)
    const folder = "techfests";
    const signatureData = generateSignature({ folder });

    return ApiResponse.success({
        ...signatureData,
        folder,
    });
});
