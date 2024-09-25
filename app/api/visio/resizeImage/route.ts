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

    let resizedImage = sharp(buffer);

    // Preserve aspect ratio while fitting within 2048x2048
    if (originalWidth > 2048 || originalHeight > 2048) {
      resizedImage = resizedImage.resize({
        width: 2048,
        height: 2048,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    const outputBuffer = await resizedImage
      .webp({ quality: 90, effort: 6 })
      .toBuffer();

    const base64Image = `data:image/webp;base64,${outputBuffer.toString("base64")}`;

    return new NextResponse(base64Image, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 },
    );
  }
}
