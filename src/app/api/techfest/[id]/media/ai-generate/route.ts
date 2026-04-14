import { NextRequest } from "next/server";
import { authorize } from "@/app/api/_lib/authorize";
import { getIdParam } from "../../../../_lib/params";
import { withErrorHandler } from "@/app/api/_lib/error-handler";
import { ApiResponse } from "@/app/api/_lib/api-response";
import { ApiError } from "@/app/api/_lib/api-error";

export const POST = withErrorHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
    await getIdParam(params);

    // Strict authorization
    await authorize(request, "techfest", "update");

    const { prompt } = await request.json();

    if (!prompt) {
      throw ApiError.badRequest("Prompt is required");
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      throw ApiError.internal("NVIDIA_API_KEY is not configured");
    }

    try {
      const invokeUrl =
        "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium";

      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          cfg_scale: 5,
          aspect_ratio: "16:9",
          seed: 0,
          steps: 50,
          negative_prompt: "",
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`NVIDIA API failed with status ${response.status}: ${errBody}`);
      }

      const responseBody = await response.json();
      
      // Handle both possible response formats: { image: "..." } and { artifacts: [{ base64: "..." }] }
      let base64Image = "";
      
      if (responseBody.image) {
        base64Image = responseBody.image;
      } else if (responseBody.artifacts?.[0]?.base64) {
        base64Image = responseBody.artifacts[0].base64;
      }

      if (!base64Image) {
        console.error("NVIDIA API Response Body keys:", Object.keys(responseBody));
        throw new Error("No image data received from NVIDIA API");
      }

      const imageDataUrl = `data:image/png;base64,${base64Image}`;

      return ApiResponse.success({ dataUrl: imageDataUrl });
    } catch (error: any) {
      console.error("NVIDIA Generation error:", error);
      throw ApiError.internal(
        error.message || "Failed to generate AI image with NVIDIA",
      );
    }
  },
);
