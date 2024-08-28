import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const blob = await req.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    const resizedImage = await sharp(buffer)
      .resize({
        width: 1280,
        height: 720,
        withoutEnlargement: true,
        fit: "inside",
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    const base64Image = `data:image/jpeg;base64,${resizedImage.toString("base64")}`;
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
