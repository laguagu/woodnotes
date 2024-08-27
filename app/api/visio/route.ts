import OpenAI from "openai";
import dedent from "dedent";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = "force-dynamic";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const image = data.image_url;
    if (!image) {
      return Response.json({
        message: "Can't find image in req.body",
        status: 400,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: dedent`Analyze the image provided and identify any Woodnotes rugs present. Even if you're not 100% certain, provide your best guess for the rug type(s) you think are most likely present. 
              Set the values to true for the rug types you believe are present, and false for others. Use the following JSON format for your 
              response: { paperYarnRugs: false, handKnottedRugs: false, tuftedRugs: false, outdoorRugs: false, duetto: false, piccolo: false, minore: false }. 
              If you're completely unsure or no rug is visible, you may return all false values, but try to make an educated guess if possible. If multiple rug types seem plausible, you may set multiple values to true.`,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
                detail: "auto",
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
    return Response.json(detectedRugTypes);
  } catch (error) {
    console.error("Error in POST /api/visio/", error);
    return Response.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
