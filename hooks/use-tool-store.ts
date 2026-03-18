import { create } from "zustand";
import { ChatCompletionMessageParam as ChatCompletionMessage } from "openai/resources/chat/index.mjs";

interface ToolStore {
  // Conversation
  conversationMessages: ChatCompletionMessage[];
  setConversationMessages: (messages: ChatCompletionMessage[]) => void;

  // Code
  codeMessages: ChatCompletionMessage[];
  setCodeMessages: (messages: ChatCompletionMessage[]) => void;

  // Image
  images: string[];
  setImages: (images: string[]) => void;

  // Music
  music: string | undefined;
  setMusic: (music: string | undefined) => void;

  // Video
  video: string | undefined;
  setVideo: (video: string | undefined) => void;
}

export const useToolStore = create<ToolStore>((set) => ({
  conversationMessages: [],
  setConversationMessages: (messages) => set({ conversationMessages: messages }),

  codeMessages: [],
  setCodeMessages: (messages) => set({ codeMessages: messages }),

  images: [],
  setImages: (images) => set({ images }),

  music: undefined,
  setMusic: (music) => set({ music }),

  video: undefined,
  setVideo: (video) => set({ video }),
}));
