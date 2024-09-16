import dedent from "dedent";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = "force-dynamic";

type DetailLevel = "low" | "high" | "auto";
type GPT4oVersion = "gpt-4o" | "gpt-4o-2024-08-06" | "gpt-4o-2024-05-13";

interface PricingInfo {
  inputPrice: number;
  outputPrice: number;
}

const pricingInfo: Record<GPT4oVersion, PricingInfo> = {
  "gpt-4o": { inputPrice: 5.0, outputPrice: 15.0 },
  "gpt-4o-2024-08-06": { inputPrice: 2.5, outputPrice: 10.0 },
  "gpt-4o-2024-05-13": { inputPrice: 5.0, outputPrice: 15.0 },
};

function calculateTokens(
  width: number,
  height: number,
  detailLevel: DetailLevel,
): number {
  if (detailLevel === "low" || detailLevel === "auto") {
    return 85; // Kiinteä kustannus low-tilassa
  }

  // High-tilan laskenta
  const scaledWidth = Math.min(2048, width);
  const scaledHeight = Math.min(2048, height);
  const shortestSide = Math.min(scaledWidth, scaledHeight);
  const scale = 768 / shortestSide;
  const finalWidth = Math.ceil(scaledWidth * scale);
  const finalHeight = Math.ceil(scaledHeight * scale);

  const tilesX = Math.ceil(finalWidth / 512);
  const tilesY = Math.ceil(finalHeight / 512);
  const totalTiles = tilesX * tilesY;

  return 170 * totalTiles + 85;
}

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

  const base64 = `data:image/jpeg;base64,${resizedImage.toString("base64")}`;

  return base64;
}

export async function POST(req: Request, res: Response) {
  try {
    const {
      image_url,
      detailLevel = "high",
      saveProcessedImage = false,
      modelVersion = "gpt-4o-2024-08-06",
    } = await req.json();

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

    // const inputTokens = calculateTokens(width, height, detailLevel as DetailLevel);
    // const pricing = pricingInfo[modelVersion as GPT4oVersion];

    const response = await openai.chat.completions.create({
      model: modelVersion,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: dedent`Analyze the image provided and identify any Woodnotes carpets present. Even if you're not 100% certain, provide your best guess for the carpet types you think are most likely present. 
              Set the values to true for the carpet types you believe are present, and false for others. Use the following JSON format for your 
              response: 
              {
                "paperYarnRugs": false,
                "handKnottedRugs": false,
                "tuftedRugs": false,
                "outdoorRugs": false,
                "cottonPaperYarnRugs": false,
                "woolPaperYarnRugs": false
              }
              Consider the following descriptions when analyzing:
              - paperYarnRugs: Woven paper yarn carpets
              - handKnottedRugs: Hand knotted wool carpets
              - tuftedRugs: Tufted wool linen carpets
              - outdoorRugs: Woven In/Out carpets
              - cottonPaperYarnRugs: Woven cotton paper yarn carpets
              - woolPaperYarnRugs: Woven wool paper yarn carpets

              If you're completely unsure or no carpet is visible, you may return all false values, but try to make an educated guess if possible. If multiple carpet types seem plausible, you may set multiple values to true. Consider the texture, pattern, and apparent material of the carpet in your analysis.`,
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
      response.choices[0].message.content ||
        "{ paperYarnRugs: false, handKnottedRugs: false, tuftedRugs: false, outdoorRugs: false, duetto: false, piccolo: false, minore: false }",
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
