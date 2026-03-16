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
      "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
      {
        input: {
          prompt: prompt,
          model_version: "stereo-melody-large",
          duration: 8,
        }
      }
    );

    if(!isPro){
      await increaseApiLimit();
    }

    // MusicGen returns a FileOutput object (newer Replicate SDK).
    // The old Riffusion returned { audio: "url", spectrogram: "url" }
    // and the frontend expects response.audio - so we match that shape.
    let audioUrl: string;

    if (typeof response === "string") {
      // Older SDK versions return a plain URL string
      audioUrl = response;
    } else if (response && typeof (response as any).url === "function") {
      // Newer SDK returns FileOutput with .url() method
      audioUrl = (response as any).url();
    } else {
      // Fallback: coerce to string
      audioUrl = String(response);
    }

    return NextResponse.json({ audio: audioUrl });
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};