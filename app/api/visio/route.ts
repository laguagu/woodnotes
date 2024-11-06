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

type CarpetTypesType = z.infer<typeof CarpetTypes>;

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
      modelVersion = "ft:gpt-4o-2024-08-06:personal:woodnotes-6-11-2024:AQbfjWX4",
      // modelVersion = "ft:gpt-4o-2024-08-06:personal:woodnotes-dataset2-marraskuus:AQa7BrSA",
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

    console.log("Kutsuttu tekoälyä aika:", new Date().toLocaleString());

    // Lisätään Promise.race timeoutin kanssa
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API call timeout")), 30000);
    });

    const apiCallPromise = openai.chat.completions.create({
      model: modelVersion,
      // model: "gpt-4o-2024-08-06",
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
                - outdoorRugs: Woven In/Out carpets made of 100% polypropylene fiber. Key characteristics:
                  1. Distinctive synthetic sheen, more pronounced than paper yarn rugs
                  2. Very thin profile (4-6mm) with a flat, smooth surface
                  3. Only available in square or rectangular shapes
                  4. Edges have a narrow (2.5cm) polypropylene edging, precisely finished
                  5. Colors are more vibrant and saturated compared to natural fiber rugs
                  6. May show slight imprints or wrinkles from use
                  7. Light colors may appear cooler in sunny areas compared to dark colors
                  8. Texture is uniform but may lack the natural variations seen in paper or wool rugs
                  9. Often marketed as "In/Out" carpets, suitable for both indoor and outdoor use
                  10. Maximum size is 3m width and 10m length
                  11. If the rug is clearly situated in an outdoor setting (e.g., on a terrace, balcony, or garden), it is very likely to be an outdoor rug
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
      response_format: { type: "json_object" },
      temperature: 0,
    });

    const response = (await Promise.race([
      apiCallPromise,
      timeoutPromise,
    ])) as OpenAI.Chat.Completions.ChatCompletion;

    let detectedRugTypes: CarpetTypesType;

    try {
      const parsedResponse = JSON.parse(
        response.choices[0].message.content || "{}",
      );

      // Validoi ja muunna vastaus käyttäen Zod-skeemaa
      detectedRugTypes = CarpetTypes.parse(parsedResponse);
    } catch (error) {
      console.error("Error parsing or validating JSON:", error);
      // Jos validointi epäonnistuu, aseta oletusarvot
      detectedRugTypes = {
        paperYarnRugs: false,
        handKnottedRugs: false,
        tuftedRugs: false,
        outdoorRugs: false,
        cottonPaperYarnRugs: false,
        woolPaperYarnRugs: false,
      };
    }

    return NextResponse.json(detectedRugTypes);
  } catch (error) {
    console.error("Error in POST /api/visio/", error);

    // Tarkempi virheen käsittely
    if (error instanceof Error) {
      if (error.message === "API call timeout") {
        return NextResponse.json(
          { message: "Request timeout - model response took too long" },
          { status: 504 },
        );
      }
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
