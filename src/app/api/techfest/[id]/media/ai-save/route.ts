import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";
import { MediaType } from "@/features/techfest/types/media.types";
import { getIdParam } from "../../../../_lib/params";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";
import { cloudinary } from "@/lib/cloudinary";

export const POST = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const techfestId = await getIdParam(params);

    // Strict authorization
    await authorize(request, "techfest", "update");

    const { dataUrl } = await request.json();

    if (!dataUrl || !dataUrl.startsWith("data:image")) {
        throw ApiError.badRequest("Valid image data URL is required");
    }

    try {
        // 1. Convert Data URL to Buffer
        const base64Data = dataUrl.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");

        // 2. Upload to Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "techfests",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        // 3. Save to Database
        const media = await prisma.media.create({
            data: {
                publicId: uploadResult.public_id,
                url: uploadResult.secure_url,
                type: MediaType.IMAGE,
                caption: "BANNER",
                techFestId: techfestId,
            },
        });

        return ApiResponse.success(media);
    } catch (error: any) {
        console.error("AI Save error:", error);
        throw ApiError.internal(error.message || "Failed to save AI image");
    }
});
