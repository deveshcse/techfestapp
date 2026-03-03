import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";
import { MediaType } from "@/features/techfest/types/media.types";
import { getIdParam } from "../../../_lib/params";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";

export const GET = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const techfestId = await getIdParam(params);

    // Publicly readable if techfest is published, otherwise check update permission
    const techfest = await prisma.techFest.findUnique({
        where: { id: techfestId },
        select: { published: true },
    });

    if (!techfest) {
        throw ApiError.notFound("TechFest not found");
    }

    if (!techfest.published) {
        await authorize(request, "techfest", "read");
    }

    const media = await prisma.media.findMany({
        where: { techFestId: techfestId },
        orderBy: { createdAt: "desc" },
    });

    return ApiResponse.success(media);
});

export const POST = withErrorHandler(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const techfestId = await getIdParam(params);

    // Strict authorization
    await authorize(request, "techfest", "update");

    const body = await request.json();
    const { publicId, url, thumbnail, type, caption } = body;

    if (!publicId || !url || !type) {
        throw ApiError.badRequest("Missing required fields");
    }

    const media = await prisma.media.create({
        data: {
            publicId,
            url,
            thumbnail,
            type: type as MediaType,
            caption,
            techFestId: techfestId,
        },
    });

    return ApiResponse.success(media);
});
