"use client";

import { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted || isPro) return null;

  const pct = Math.min((apiLimitCount / MAX_FREE_COUNTS) * 100, 100);

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">Free usage</span>
          <span className="text-foreground font-semibold tabular-nums">
            {apiLimitCount} / {MAX_FREE_COUNTS}
          </span>
        </div>
        {/* Progress track */}
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground">
          {MAX_FREE_COUNTS - apiLimitCount} generation{MAX_FREE_COUNTS - apiLimitCount !== 1 ? "s" : ""} remaining
        </p>
      </div>
      <Button
        onClick={proModal.onOpen}
        className="w-full h-8 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0 text-xs gap-x-1.5 shadow-lg shadow-violet-500/20 rounded-lg"
      >
        <Zap className="w-3.5 h-3.5 fill-white" />
        Upgrade to Pro
      </Button>
    </div>
  );
};
