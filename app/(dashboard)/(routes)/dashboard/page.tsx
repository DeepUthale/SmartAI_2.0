"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Sparkles,
  VideoIcon,
  Zap,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";

const tools = [
  {
    label: "Conversation",
    description: "Chat with the world's smartest AI assistant. Ask anything.",
    icon: MessageSquare,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    accent: "border-l-violet-500",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    description:
      "Turn text prompts into stunning, high-quality visuals instantly.",
    icon: ImageIcon,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    accent: "border-l-pink-500",
    href: "/image",
  },
  {
    label: "Video Generation",
    description: "Synthesise cinematic videos from text with WanVideo AI.",
    icon: VideoIcon,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    accent: "border-l-orange-500",
    href: "/video",
  },
  {
    label: "Music Generation",
    description:
      "Compose original music from a text description using MusicGen.",
    icon: Music,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    accent: "border-l-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    description: "Generate clean, documented code in any programming language.",
    icon: Code,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    accent: "border-l-blue-500",
    href: "/code",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setSweeping(true), 50);
    const stop = setTimeout(() => setSweeping(false), 50 + 1100 + (tools.length - 1) * 140);
    return () => { clearTimeout(start); clearTimeout(stop); };
  }, []);

  return (
    <div className="px-4 lg:px-8 py-8 space-y-10">
      {/* ── Welcome header ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-500 font-medium">
              All systems operational
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back!
          </h1>
          <p className="text-muted-foreground text-sm">
            What would you like to create today?
          </p>
        </div>
        <button
          onClick={() => proModal.onOpen()}
          className="self-start sm:self-auto flex items-center gap-x-2 bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-500/30 hover:border-violet-400/50 rounded-xl px-4 py-2.5 transition-all hover:-translate-y-px group"
        >
          <Zap className="w-4 h-4 text-violet-700 fill-violet-700 dark:text-violet-400 dark:fill-violet-400" />
          <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
            Upgrade to Pro
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400 opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ── Section label ────────────────────────────── */}
      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-foreground">
            AI Tools
          </span>
        </div>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">
          {tools.length} tools available
        </span>
      </div>

      {/* ── Tool grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <button
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className={cn(
              "group relative text-left rounded-2xl border-l-4 border border-border bg-card overflow-hidden transition-all duration-200",
              "hover:-translate-y-1 hover:shadow-md cursor-pointer",
              tool.accent,
            )}
          >
            {/* Slide-in color fill */}
            <div
              className={cn(
                "absolute inset-y-0 left-0 w-full sm:w-0 sm:opacity-100 sm:group-hover:w-full transition-[width] duration-300 ease-out",
                sweeping ? "opacity-100" : "opacity-40",
                tool.bg,
                sweeping && "animate-card-sweep",
              )}
              style={sweeping ? { animationDelay: `${i * 140}ms` } : undefined}
            />

            <div className="relative z-10 p-5 space-y-4">
              {/* Icon + arrow */}
              <div className="flex items-start justify-between">
                <div className={cn("p-2.5 rounded-xl", tool.bg)}>
                  <tool.icon className={cn("w-5 h-5", tool.color)} />
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {tool.label}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Launch button */}
              <div
                className={cn(
                  "inline-flex items-center gap-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all",
                  tool.bg,
                  tool.color,
                )}
              >
                Launch
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </button>
        ))}

        {/* Coming soon card */}
        <div className="rounded-2xl border border-dashed border-border bg-card p-5 flex flex-col items-center justify-center gap-y-3 text-center min-h-[160px]">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              More coming soon
            </p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              New AI tools in development
            </p>
          </div>
        </div>
      </div>

      {/* ── Section label ────────────────────────────── */}
      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-2">
          <LayoutGrid className="w-4 h-4 text-teal-400" />
          <span className="text-sm font-semibold text-foreground">
            Platform Overview
          </span>
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ── Quick stats ──────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "AI Models",
            value: "5",
            sub: "Available",
            color: "text-violet-400",
          },
          {
            label: "Free Tier",
            value: "7",
            sub: "Generations",
            color: "text-pink-400",
          },
          {
            label: "Response Time",
            value: "~2s",
            sub: "Average",
            color: "text-emerald-400",
          },
          {
            label: "Pro Plan",
            value: "$2",
            sub: "Per month",
            color: "text-orange-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-4 py-4 space-y-1"
          >
            <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs font-medium text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
