import dedent from "dedent";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";
import sharp from "sharp";
import { z } from "zod";

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

const CarpetTypes = z.object({
  paperYarnRugs: z.boolean(),
  handKnottedRugs: z.boolean(),
  tuftedRugs: z.boolean(),
  outdoorRugs: z.boolean(),
  cottonPaperYarnRugs: z.boolean(),
  woolPaperYarnRugs: z.boolean(),
});

const pricingInfo: Record<GPT4oVersion, PricingInfo> = {
  "gpt-4o": { inputPrice: 5.0, outputPrice: 15.0 },
  "gpt-4o-2024-08-06": { inputPrice: 2.5, outputPrice: 10.0 },
  "gpt-4o-2024-05-13": { inputPrice: 5.0, outputPrice: 15.0 },
};

function calculateTokens(
  width: number,
  height: number,
  detailLevel: DetailLevel
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
  saveProcessedImage: boolean = false
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
      filename
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
      modelVersion = "gtp-4o-2024-08-06",
    } = await req.json();

    if (!image_url || typeof image_url !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing image_url in request body" },
        { status: 400 }
      );
    }

    const processedImageBase64 = await processImage(
      image_url,
      detailLevel as DetailLevel,
      saveProcessedImage
    );

    // const inputTokens = calculateTokens(width, height, detailLevel as DetailLevel);
    // const pricing = pricingInfo[modelVersion as GPT4oVersion];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
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
                Consider the following detailed descriptions when analyzing:
                - paperYarnRugs: Woven paper yarn carpets. Characterized by a flat, smooth surface with a subtle matte sheen. Primarily composed of paper yarn (76-86%) with cotton warp (13-14%). Very thin profile (about 6mm). May have various edge finishes: sewn edges, fringes, cotton borders, or wide paper yarn cotton edging. Available in rectangular, square, or round shapes. Colors tend to be matte and natural-looking due to the paper yarn. Texture appears uniform and tightly woven. Some models, like Big Stripe, may have a pattern resembling outdoor rugs. In these cases, focus on the material texture and edge finish to differentiate.
                - handKnottedRugs: Includes UNI and GRID carpets. Hand-knotted, made of 90% New Zealand wool and 10% cotton. Features natural, undyed sheep wool colors (except black) for environmental friendliness. Low, tight pile with unique color variations. Each corner has removable braided wool fringes. Suitable for both traditional and contemporary settings.
                - tuftedRugs: Tufted wool linen carpets. Characterized by a dense, textured surface with visible tufts. May have a plush or looped pile appearance. Often features subtle patterns or solid colors. The blend of wool and linen can give a unique matte finish with slight variations in texture.
                - outdoorRugs: Woven In/Out carpets made of 100% polypropylene fiber. Characterized by a flat, smooth surface with a distinct synthetic sheen, different from the matte finish of paper yarn rugs. Available only in square or rectangular shapes with thin, precisely finished edges. Colors are more vibrant and saturated compared to paper yarn rugs. May show slight imprints or wrinkles from use. Light colors may appear cooler in sunny areas compared to dark colors.
                - cottonPaperYarnRugs: Includes DUETTO and PICCOLO models. Hand-woven with a unique blend of cotton (70-74%) and paper yarn (26-30%). Features a distinctive three-dimensional, textured surface with a more pronounced weave pattern compared to pure paper yarn rugs. Reversible use design. Characterized by a firmer texture and slightly thicker profile (12-15mm) than paper yarn rugs. Available in various colors, with paper yarn color indicated by a number after the model name.
                - woolPaperYarnRugs: Includes Minore carpet. Hand-woven combining wool and paper yarn. Characterized by a unique three-dimensional surface texture with visible wool and paper yarn combination. Natural, undyed colors with earthy tones. Thicker profile compared to pure paper yarn rugs. May show subtle color variations due to undyed wool.

                Pay close attention to the texture, thickness, and edge finish of the carpet. Paper yarn rugs are typically very thin (6mm) with a matte finish, while cotton-paper yarn rugs are slightly thicker (12-15mm) with a more pronounced texture. Outdoor rugs have a distinct synthetic sheen and thin, precisely finished edges.

                If you're completely unsure or no carpet is visible, you may return all false values, but try to make an educated guess if possible. If multiple carpet types seem plausible, you may set multiple values to true. Consider the texture, pattern, apparent material, thickness, and edge finish of the carpet in your analysis.`,
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
        "{ paperYarnRugs: false, handKnottedRugs: false, tuftedRugs: false, outdoorRugs: false, duetto: false, piccolo: false, minore: false }"
    );

    // Toinen esimerkki ZOD scheeman kanssa
    // const response = await openai.beta.chat.completions.parse({
    //   model: modelVersion,
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: dedent`Analyze the image provided and identify any Woodnotes carpets present. Even if you're not 100% certain, provide your best guess for the carpet types you think are most likely present.
    //           Set the values to true for the carpet types you believe are present, and false for others.
    //           Consider the following descriptions when analyzing:
    //           - paperYarnRugs: Woven paper yarn carpets
    //           - handKnottedRugs: Hand knotted wool carpets
    //           - tuftedRugs: Tufted wool linen carpets
    //           - outdoorRugs: Woven In/Out carpets
    //           - cottonPaperYarnRugs: Woven cotton paper yarn carpets
    //           - woolPaperYarnRugs: Woven wool paper yarn carpets

    //           If you're completely unsure or no carpet is visible, you may return all false values, but try to make an educated guess if possible. If multiple carpet types seem plausible, you may set multiple values to true. Consider the texture, pattern, and apparent material of the carpet in your analysis.`,
    //         },
    //         {
    //           type: "image_url",
    //           image_url: {
    //             url: processedImageBase64,
    //             detail: detailLevel,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    //   response_format: zodResponseFormat(CarpetTypes, "detectedRugTypes"),
    // });

    // const detectedRugTypes = response.choices[0].message.parsed;

    return NextResponse.json(detectedRugTypes);
  } catch (error) {
    console.error("Error in POST /api/visio/", error);
    return Response.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
