import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function generateSignature(params: Record<string, any>) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        { ...params, timestamp },
        process.env.CLOUDINARY_API_SECRET!
    );

    return {
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    };
}

/**
 * Deletes a resource from Cloudinary.
 */
export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" | "raw" = "image") {
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
