"use client";

import axios from "axios";
import * as z from "zod";
import { Download, ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";

import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProModal } from "@/hooks/use-pro-modal";
import { useToolStore } from "@/hooks/use-tool-store";
import toast from "react-hot-toast";

const ImagePage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const { images, setImages } = useToolStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "", amount: "1", resolution: "512x512" },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);
            setImages(response.data.map((image: { url: string }) => image.url));
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
                title="Image Generation"
                description="Turn your prompt into a stunning image."
                icon={ImageIcon}
                iconColor="text-pink-400"
                bgColor="bg-pink-500/10"
            />
            <div className="px-4 lg:px-8 space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Input card */}
                        <div className="rounded-2xl border border-border bg-card p-4 focus-within:border-pink-500/40 transition-colors space-y-3">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="border-0 bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent text-foreground placeholder:text-muted-foreground/50 text-sm px-0"
                                                disabled={isLoading}
                                                placeholder="A majestic horse galloping through a misty valley at sunrise…"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Options row */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-border">
                                <div className="flex gap-3 flex-1">
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-9 text-xs rounded-xl border-border bg-muted/50">
                                                            <SelectValue defaultValue={field.value} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {amountOptions.map((o) => (
                                                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="resolution"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-9 text-xs rounded-xl border-border bg-muted/50">
                                                            <SelectValue defaultValue={field.value} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {resolutionOptions.map((o) => (
                                                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-9 px-5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border-0 rounded-xl text-xs font-semibold gap-x-1.5 shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-px disabled:opacity-50 disabled:translate-y-0"
                                >
                                    {isLoading ? (
                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    ) : (
                                        <Sparkles className="w-3.5 h-3.5" />
                                    )}
                                    {isLoading ? "Generating…" : "Generate"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

                {/* Results */}
                {isLoading && (
                    <div className="rounded-2xl border border-border bg-card p-16 flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                {images.length === 0 && !isLoading && <Empty label="Describe an image and hit Generate." />}
                {images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {images.map((src) => (
                            <div key={src} className="group relative rounded-2xl overflow-hidden border border-border bg-card aspect-square">
                                <Image alt="Generated image" fill src={src} className="object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Button
                                        onClick={() => window.open(src)}
                                        size="sm"
                                        className="bg-white text-black hover:bg-zinc-100 rounded-xl gap-x-1.5 shadow-xl"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePage;
