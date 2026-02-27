import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; mediaId: string }> }
) {
    try {
        const p = await params;

        const techfestId = parseInt(p.id);
        const mediaId = parseInt(p.mediaId);

        if (isNaN(techfestId) || isNaN(mediaId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Strict authorization
        await authorize(request, "techfest", "update");

        const media = await prisma.media.findUnique({
            where: { id: mediaId },
        });

        if (!media) {
            return NextResponse.json({ error: "Media not found" }, { status: 404 });
        }

        if (media.techFestId !== techfestId) {
            return NextResponse.json({ error: "Media does not belong to this TechFest" }, { status: 400 });
        }

        // 1. Delete from Cloudinary
        const resourceType = media.type === "VIDEO" ? "video" : "image";
        await deleteFromCloudinary(media.publicId, resourceType);

        // 2. Delete from DB
        await prisma.media.delete({
            where: { id: mediaId },
        });

        return NextResponse.json({ success: true, message: "Media deleted successfully" });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: error.status || 500 }
        );
    }
}
