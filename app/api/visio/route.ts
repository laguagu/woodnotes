import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import OpenAI from "openai";
import dedent from "dedent";
import fs from "fs/promises";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = "force-dynamic";

type DetailLevel = "low" | "high" | "auto";

async function processImage(
  input: Buffer | string,
  detailLevel: DetailLevel,
  saveProcessedImage: boolean = false,
): Promise<string> {
  let buffer: Buffer;

  if (typeof input === "string") {
    const base64Data = input.replace(/^data:image\/\w+;base64,/, "");
    buffer = Buffer.from(base64Data, "base64");
  } else {
    buffer = input;
  }

  let targetWidth: number, targetHeight: number;

  if (detailLevel === "low" || detailLevel === "auto") {
    targetWidth = targetHeight = 512;
  } else {
    const metadata = await sharp(buffer).metadata();
    const { width = 0, height = 0 } = metadata;

    const maxDimension = 2000;
    const minDimension = 768;

    const aspectRatio = width / height;

    if (width > height) {
      targetWidth = Math.min(maxDimension, width);
      targetHeight = Math.round(targetWidth / aspectRatio);
      if (targetHeight < minDimension) {
        targetHeight = minDimension;
        targetWidth = Math.round(targetHeight * aspectRatio);
      }
    } else {
      targetHeight = Math.min(maxDimension, height);
      targetWidth = Math.round(targetHeight * aspectRatio);
      if (targetWidth < minDimension) {
        targetWidth = minDimension;
        targetHeight = Math.round(targetWidth / aspectRatio);
      }
    }
  }

  const resizedImage = await sharp(buffer)
    .resize(targetWidth, targetHeight, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer();

  if (saveProcessedImage) {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const filename = `processed_image_${timestamp}.jpg`;
    const savePath = path.join(
      process.cwd(),
      "public",
      "processed_images",
      filename,
    );
    await fs.writeFile(savePath, resizedImage);
    console.log(`Processed image saved to: ${savePath}`);
  }

  return `data:image/jpeg;base64,${resizedImage.toString("base64")}`;
}

export async function POST(req: Request, res: Response) {
  try {
    const { image_url, detailLevel, saveProcessedImage } = await req.json();
    console.log("REq tiedot", detailLevel, saveProcessedImage);

    if (!image_url || typeof image_url !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing image_url in request body" },
        { status: 400 },
      );
    }

    const processedImageBase64 = await processImage(
      image_url,
      detailLevel as DetailLevel,
      saveProcessedImage,
    );
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: dedent`Analyze the image provided and identify any Woodnotes rugs present. Even if you're not 100% certain, provide your best guess for the rug type you think are most likely present. 
              Set the values to true for the rug types you believe are present, and false for others. Use the following JSON format for your 
              response: { paperYarnRugs: false, handKnottedRugs: false, tuftedRugs: false, outdoorRugs: false, duetto: false, piccolo: false, minore: false }. 
              If you're completely unsure or no rug is visible, you may return all false values, but try to make an educated guess if possible. If multiple rug types seem plausible, you may set multiple values to true.`,
            },
            {
              type: "image_url",
              image_url: {
                url: processedImageBase64,
                detail: detailLevel,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const detectedRugTypes = JSON.parse(
      response.choices[0].message.content || "{}",
    );

    return NextResponse.json(detectedRugTypes);
  } catch (error) {
    console.error("Error in POST /api/visio/", error);
    return Response.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
