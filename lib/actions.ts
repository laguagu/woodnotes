import { DetectedRugTypes } from "@/lib/definitions";

export async function detectRugType(image_url: string): Promise<DetectedRugTypes> {
  const response = await fetch("/api/visio/", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_url: image_url }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message ||
        `HTTP error! Status: ${response.status}`
    );
  }

  const detectedTypes: DetectedRugTypes = await response.json();
  return detectedTypes;
}