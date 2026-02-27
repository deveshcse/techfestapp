import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { generateSignature } from "@/lib/cloudinary";

export async function GET(
    request: NextRequest,
) {
    try {
        // Ensure user is authorized to update techfest (and thus upload media)
        await authorize(request, "techfest", "update");

        // We can pass parameters if needed (e.g. folder, public_id)
        const folder = "techfests";
        const signatureData = generateSignature({ folder });

        return NextResponse.json({
            success: true,
            data: {
                ...signatureData,
                folder,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message || "Failed to generate signature" },
                { status: 500 }
            );
        }
    }
}
