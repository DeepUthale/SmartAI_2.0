"use client";

import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Unlimited Conversation",
    icon: MessageSquare,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Unlimited Image Generation",
    icon: ImageIcon,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    label: "Unlimited Video Generation",
    icon: VideoIcon,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Unlimited Music Generation",
    icon: Music,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Unlimited Code Generation",
    icon: Code,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="bg-[#0f0f17] border border-white/10 text-white max-w-md">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Zap className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">Upgrade to Pro</p>
              <p className="text-sm text-zinc-400 font-normal mt-1">
                Unlock unlimited access to all AI tools
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="space-y-2 py-2">
            {tools.map((tool) => (
              <div
                key={tool.label}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.03]"
              >
                <div className="flex items-center gap-x-3">
                  <div className={cn("p-1.5 rounded-lg", tool.bg)}>
                    <tool.icon className={cn("w-4 h-4", tool.color)} />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">
                    {tool.label}
                  </span>
                </div>
                <Check className="w-4 h-4 text-violet-400 shrink-0" />
              </div>
            ))}
          </div>
        </DialogDescription>

        <DialogFooter className="pt-2">
          <Button
            disabled={loading}
            onClick={onSubscribe}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0 h-11 text-sm font-semibold gap-x-2 shadow-lg shadow-violet-500/20"
          >
            <Zap className="w-4 h-4 fill-white" />
            {loading ? "Redirecting…" : "Upgrade — $2 / month"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
