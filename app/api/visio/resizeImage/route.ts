import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const blob = await req.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;

    let targetWidth = originalWidth;
    let targetHeight = originalHeight;

    // High resolution mode -säännöt:
    // 1. Lyhyin sivu max 768px
    // 2. Pisin sivu max 2000px
    const shortSide = Math.min(originalWidth, originalHeight);
    const longSide = Math.max(originalWidth, originalHeight);

    if (shortSide > 768) {
      const scale = 768 / shortSide;
      targetWidth = Math.round(originalWidth * scale);
      targetHeight = Math.round(originalHeight * scale);
    }

    // Varmista ettei pitkä sivu ylitä 2000px
    if (targetWidth > 2000 || targetHeight > 2000) {
      const scale = 2000 / Math.max(targetWidth, targetHeight);
      targetWidth = Math.round(targetWidth * scale);
      targetHeight = Math.round(targetHeight * scale);
    }

    // Varmista parilliset mitat
    targetWidth = Math.floor(targetWidth / 2) * 2;
    targetHeight = Math.floor(targetHeight / 2) * 2;

    const outputBuffer = await sharp(buffer)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: "inside",
        withoutEnlargement: false,
      })
      .jpeg({
        quality: 85,
        progressive: true,
        force: false,
      })
      .toBuffer();

    // Tarkista maksimikoko (20MB)
    if (outputBuffer.length > 20 * 1024 * 1024) {
      throw new Error("Processed image exceeds maximum size limit of 20MB");
    }

    const base64Image = `data:image/jpeg;base64,${outputBuffer.toString("base64")}`;

    return new NextResponse(base64Image, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          error: "Image processing failed",
          details: error.message,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
