"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Code, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam as ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as z from "zod";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/ui/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { formSchema } from "./constants";

const CodePage = () => {
    const router = useRouter();
    const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { prompt: "" },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", { messages: newMessages });
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) proModal.onOpen();
            else toast.error("Something went wrong.");
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <Heading
                title="Code Generation"
                description="Generate, explain and debug code with AI."
                icon={Code}
                iconColor="text-blue-400"
                bgColor="bg-blue-500/10"
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto min-h-0 px-4 lg:px-8 space-y-4 pb-4">
                {messages.length === 0 && !isLoading && (
                    <Empty label="Ask me to write, explain or debug any code." />
                )}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-start gap-x-3 max-w-4xl",
                            message.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                        <div
                            className={cn(
                                "rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%]",
                                message.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-sm"
                                    : "bg-card border border-border text-foreground rounded-tl-sm"
                            )}
                        >
                            <ReactMarkdown
                                className="overflow-hidden leading-7"
                                components={{
                                    pre: ({ node, ...props }) => (
                                        <div className="overflow-auto w-full my-3 bg-black/20 dark:bg-black/40 p-3 rounded-xl border border-white/5">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({ node, ...props }) => (
                                        <code className="rounded px-1.5 py-0.5 bg-black/10 dark:bg-white/10 font-mono text-xs" {...props} />
                                    ),
                                }}
                            >
                                {typeof message.content === "string" ? message.content : ""}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <div className="w-3 h-3 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                            <Loader />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="px-4 lg:px-8 pb-6 pt-3 border-t border-border pr-20 lg:pr-24">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex items-center gap-x-2 bg-card border border-border rounded-2xl px-4 py-2 focus-within:border-blue-500/40 transition-colors"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            className="border-0 bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent text-foreground placeholder:text-muted-foreground/50 text-sm"
                                            disabled={isLoading}
                                            placeholder="Write a React hook for debouncing…"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            size="icon"
                            className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 shrink-0 transition-colors"
                        >
                            <Send className="w-3.5 h-3.5" />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CodePage;
