"use client";

import axios from "axios";
import * as z from "zod";
import { Sparkles, VideoIcon } from "lucide-react";

import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      else toast.error("Something went wrong");
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into a cinematic video."
        icon={VideoIcon}
        iconColor="text-orange-400"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="rounded-2xl border border-border bg-card p-4 focus-within:border-orange-500/40 transition-colors flex items-center gap-3">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        className="border-0 bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent text-foreground placeholder:text-muted-foreground/50 text-sm px-0"
                        disabled={isLoading}
                        placeholder="A clown fish swimming gracefully around a vibrant coral reef…"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-9 px-5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-0 rounded-xl text-xs font-semibold gap-x-1.5 shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-px disabled:opacity-50 disabled:translate-y-0 shrink-0"
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {isLoading ? "Generating…" : "Generate"}
              </Button>
            </div>
          </form>
        </Form>

        {isLoading && (
          <div className="rounded-2xl border border-border bg-card p-16 flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!video && !isLoading && (
          <Empty label="Describe a scene and hit Generate." />
        )}
        {video && (
          <div className="rounded-2xl border border-border overflow-hidden bg-black max-w-5xl mx-auto">
            <video className="w-full aspect-video" controls loop>
              <source src={video} />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
