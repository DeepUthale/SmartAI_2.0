"use client";

import axios from "axios";
import * as z from "zod";
import { Music, Sparkles } from "lucide-react";

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

const MusicPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "" },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);
            const response = await axios.post("/api/music", values);
            setMusic(response.data.audio);
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
                title="Music Generation"
                description="Turn your prompt into an original music track."
                icon={Music}
                iconColor="text-emerald-400"
                bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8 space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="rounded-2xl border border-border bg-card p-4 focus-within:border-emerald-500/40 transition-colors flex items-center gap-3">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                className="border-0 bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent text-foreground placeholder:text-muted-foreground/50 text-sm px-0"
                                                disabled={isLoading}
                                                placeholder="Melancholic piano solo in a rainy evening setting…"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-9 px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 rounded-xl text-xs font-semibold gap-x-1.5 shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-px disabled:opacity-50 disabled:translate-y-0 shrink-0"
                            >
                                {isLoading ? (
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                ) : (
                                    <Sparkles className="w-3.5 h-3.5" />
                                )}
                                {isLoading ? "Composing…" : "Generate"}
                            </Button>
                        </div>
                    </form>
                </Form>

                {isLoading && (
                    <div className="rounded-2xl border border-border bg-card p-16 flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                {!music && !isLoading && <Empty label="Describe a vibe or genre and hit Generate." />}
                {music && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
                        <div className="flex items-center gap-x-2 text-sm font-medium text-emerald-400">
                            <Music className="w-4 h-4" />
                            Your generated track
                        </div>
                        <audio controls className="w-full" loop>
                            <source src={music} />
                        </audio>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicPage;
