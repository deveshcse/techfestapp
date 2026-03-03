import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";
import { idParamSchema } from "@/app/api/_lib/params";

export const DELETE = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string; mediaId: string }> }) => {
    const p = await params;

    const techfestId = parseInt(p.id);
    const mediaId = idParamSchema.safeParse(p.mediaId);

    if (isNaN(techfestId) || !mediaId.success) {
        throw ApiError.badRequest("Invalid ID");
    }

    // Strict authorization
    await authorize(request, "techfest", "update");

    const media = await prisma.media.findUnique({
        where: { id: mediaId.data },
    });

    if (!media) {
        throw ApiError.notFound("Media not found");
    }

    if (media.techFestId !== techfestId) {
        throw ApiError.badRequest("Media does not belong to this TechFest");
    }

    // 1. Delete from Cloudinary
    const resourceType = media.type === "VIDEO" ? "video" : "image";
    await deleteFromCloudinary(media.publicId, resourceType);

    // 2. Delete from DB
    await prisma.media.delete({
        where: { id: mediaId.data },
    });

    return ApiResponse.success({ message: "Media deleted successfully" });
});
