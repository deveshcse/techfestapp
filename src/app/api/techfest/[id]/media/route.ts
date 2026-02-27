import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import prisma from "@/lib/prisma";
import { MediaType } from "@/features/techfest/types/media.types";
import { getIdParam } from "../../../_lib/params";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const techfestId = await getIdParam(params);

        // Publicly readable if techfest is published, otherwise check update permission
        const techfest = await prisma.techFest.findUnique({
            where: { id: techfestId },
            select: { published: true },
        });

        if (!techfest) {
            return NextResponse.json({ error: "TechFest not found" }, { status: 404 });
        }

        if (!techfest.published) {
            await authorize(request, "techfest", "read");
        }

        const media = await prisma.media.findMany({
            where: { techFestId: techfestId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: media });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: error.status || 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const techfestId = await getIdParam(params);

        // Strict authorization
        await authorize(request, "techfest", "update");

        const body = await request.json();
        const { publicId, url, thumbnail, type, caption } = body;

        if (!publicId || !url || !type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

        return NextResponse.json({ success: true, data: media });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: error.status || 500 }
        );
    }
}
