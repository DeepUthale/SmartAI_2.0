import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { increaseApiLimit , checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Map old resolutions to DALL-E 3 supported sizes
const RESOLUTION_MAP: Record<string, "1024x1024" | "1792x1024" | "1024x1792"> = {
  "256x256": "1024x1024",
  "512x512": "1024x1024",
  "1024x1024": "1024x1024",
  "1792x1024": "1792x1024",
  "1024x1792": "1024x1792",
};

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "1024x1024" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has ended.", { status: 403 });
    }

    const count = parseInt(amount, 10);
    const size = RESOLUTION_MAP[resolution] || "1024x1024";

    // DALL-E 3 only supports n=1, so we make parallel requests for multiple images
    const imagePromises = Array.from({ length: count }, () =>
      openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size,
        quality: "standard",
      })
    );

    const responses = await Promise.all(imagePromises);
    const images = responses.flatMap((response) => response.data);

    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(images);

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};