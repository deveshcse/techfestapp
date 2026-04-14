import dotenv from "dotenv";

dotenv.config();

const invokeUrl = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3-medium";
const apiKey = process.env.NVIDIA_API_KEY;

const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Accept": "application/json",
};

const payload = {
    "prompt": "A futuristic tech festival banner with bright neon colors and digital elements",
    "cfg_scale": 5,
    "aspect_ratio": "16:9",
    "seed": 0,
    "steps": 30,
    "negative_prompt": ""
};

async function testNvidia() {
    try {
        console.log("Invoking NVIDIA AI API...");
        let response = await fetch(invokeUrl, {
            method: "post",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json", ...headers }
        });

        if (response.status != 200) {
            let errBody = await response.text();
            console.error("Invocation failed with status " + response.status + " " + errBody);
            return;
        }

        let response_body = await response.json();
        console.log("Response Keys:", Object.keys(response_body));
        
        if (response_body.artifacts) {
            console.log("Artifacts length:", response_body.artifacts.length);
            console.log("First artifact keys:", Object.keys(response_body.artifacts[0]));
        } else if (response_body.data) {
             console.log("Data length:", response_body.data.length);
             console.log("First data item keys:", Object.keys(response_body.data[0]));
        } else {
             console.log("Full Response Body (partial):", JSON.stringify(response_body).substring(0, 500));
        }

    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

testNvidia();
