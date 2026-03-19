"use client";

import axios from "axios";
import * as z from "zod";
import { MessagesSquare, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam as ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { useToolStore } from "@/hooks/use-tool-store";
import toast from "react-hot-toast";

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const { conversationMessages: messages, setConversationMessages: setMessages } = useToolStore();

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

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages([...messages, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Heading
        title="Conversation"
        description="Chat with the most advanced AI model."
        icon={MessagesSquare}
        iconColor="text-violet-400"
        bgColor="bg-violet-500/10"
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 lg:px-8 space-y-4 pb-4">
        {messages.length === 0 && !isLoading && (
          <Empty label="Start a conversation below." />
        )}

        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-x-3 max-w-3xl",
              message.role === "user" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
            <div
              className={cn(
                "rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[80%]",
                message.role === "user"
                  ? "bg-violet-600 text-white rounded-tr-sm"
                  : "bg-muted/50 border border-border text-foreground rounded-tl-sm"
              )}
            >
              {typeof message.content === "string" ? message.content : ""}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-x-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <div className="w-3 h-3 rounded-full border-2 border-transparent border-t-violet-400 animate-spin" />
            </div>
            <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 lg:px-8 pb-6 pt-3 pr-20 lg:pr-24 border-t border-border">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-x-2 bg-muted/40 border border-border rounded-2xl px-4 py-2 focus-within:border-violet-500/40 transition-colors"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="border-0 bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent text-foreground placeholder:text-muted-foreground text-sm"
                      disabled={isLoading}
                      placeholder="Ask me anything…"
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
              className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConversationPage;
