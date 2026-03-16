import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit , checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompts are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse ("Free trial has ended.", {status:403});
    }

    const response = await replicate.run(
      "wavespeedai/wan-2.1-t2v-480p",
      {
        input: {
          prompt: prompt,
          num_frames: 81,
          guide_scale: 5.0,
        }
      }
    );

    if(!isPro){
      await increaseApiLimit();
    }

    // Wan 2.1 returns a FileOutput object (newer Replicate SDK).
    // The old zeroscope returned an array of URL strings like ["https://...mp4"]
    // and the frontend expects response[0] as the video src.
    let videoUrl: string;

    if (typeof response === "string") {
      // Older SDK versions return a plain URL string
      videoUrl = response;
    } else if (response && typeof (response as any).url === "function") {
      // Newer SDK returns FileOutput with .url() method
      videoUrl = (response as any).url();
    } else if (Array.isArray(response)) {
      // Some models return an array of URLs
      videoUrl = String(response[0]);
    } else {
      // Fallback: coerce to string
      videoUrl = String(response);
    }

    // Return as array to match the old zeroscope response format
    return NextResponse.json([videoUrl]);
  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};