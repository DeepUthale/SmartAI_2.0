"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, Sparkles, VideoIcon } from "lucide-react";
import { Button } from "./ui/button";

const previewTools = [
  { icon: MessageSquare, label: "Conversation",    color: "text-violet-400", bg: "bg-violet-500/15" },
  { icon: ImageIcon,     label: "Image Gen",       color: "text-pink-400",   bg: "bg-pink-500/15"   },
  { icon: VideoIcon,     label: "Video Gen",       color: "text-orange-400", bg: "bg-orange-500/15" },
  { icon: Music,         label: "Music Gen",       color: "text-emerald-400",bg: "bg-emerald-500/15"},
  { icon: Code,          label: "Code Gen",        color: "text-blue-400",   bg: "bg-blue-500/15"   },
];

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-4">

      {/* ── Background layers ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Grid — subtle in dark, hidden in light */}
        <div className="absolute inset-0 opacity-[0.04] dark:block hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Orbs */}
        <div className="absolute top-1/4 right-[15%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-[10%]  w-[500px] h-[500px] bg-pink-600/8  rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[80px]  animate-float" />

        {/* Floating dots */}
        {[
          { top: "18%", left: "12%", size: 3, delay: "0s" },
          { top: "28%", left: "88%", size: 2, delay: "1s" },
          { top: "72%", left: "7%",  size: 4, delay: "2s" },
          { top: "60%", left: "92%", size: 2, delay: "0.5s" },
          { top: "45%", left: "3%",  size: 3, delay: "1.5s" },
          { top: "82%", left: "78%", size: 2, delay: "3s" },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-violet-500/50 dark:bg-white/30 animate-pulse-glow"
            style={{
              top: dot.top, left: dot.left,
              width: dot.size, height: dot.size,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* ── Hero content ───────────────────────────── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-x-2 bg-violet-500/10 border border-violet-500/25 rounded-full px-4 py-1.5 text-sm text-violet-700 dark:text-violet-300 animate-fade-up mt-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>5 AI tools · One platform · Free to start</span>
        </div>

        {/* Headline */}
        <div className="animate-fade-up delay-100 space-y-3">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold leading-[1.02] tracking-tight text-slate-900 dark:text-white">
            Create anything with
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold leading-[1.02] tracking-tight gradient-text min-h-[1.1em]">
            <TypewriterComponent
              options={{
                strings: ["AI Conversation.", "AI Images.", "AI Videos.", "AI Music.", "AI Code."],
                autoStart: true,
                loop: true,
                deleteSpeed: 40,
                delay: 60,
              }}
            />
          </h1>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-up delay-200 text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
          SmartAI brings together the most powerful AI models: GPT-4.1, DALL-E 3, WanVideo, and MusicGen in one beautifully designed workspace.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button className="group h-12 px-8 bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-zinc-100 rounded-full text-base font-semibold gap-x-2 shadow-2xl shadow-black/10 dark:shadow-white/10 transition-all hover:-translate-y-0.5">
              {isSignedIn ? "Open Dashboard" : "Start for free"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="ghost" className="h-12 px-8 text-slate-500 hover:text-slate-900 border border-slate-300 hover:bg-slate-100 hover:border-slate-400 dark:text-zinc-400 dark:hover:text-white dark:border-white/10 dark:hover:bg-white/5 dark:hover:border-white/20 rounded-full text-base transition-all">
              See what&apos;s possible
            </Button>
          </a>
        </div>

        <p className="animate-fade-up delay-400 text-slate-400 dark:text-zinc-600 text-sm">
          No credit card required · 7 free generations · Cancel anytime
        </p>

        {/* ── App preview card ───────────────────────── */}
        <div className="animate-fade-up delay-500 mt-12 mx-auto max-w-2xl">
          {/* Browser chrome */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl shadow-violet-500/10">
            {/* Title bar */}
            <div className="bg-slate-100 dark:bg-[#0f0f17] border-b border-slate-200 dark:border-white/[0.06] px-4 py-3 flex items-center gap-x-3">
              <div className="flex gap-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 bg-white dark:bg-white/5 rounded-md h-6 flex items-center px-3">
                <span className="text-[11px] text-slate-500 dark:text-zinc-600">smartai.app/dashboard</span>
              </div>
            </div>

            {/* App content preview */}
            <div className="bg-white dark:bg-[#0a0a0f] p-5 space-y-3">
              <div className="flex items-center gap-x-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium">AI Tools</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {previewTools.map((tool, i) => (
                  <div
                    key={tool.label}
                    className="group flex items-center gap-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:bg-white/[0.05] dark:hover:border-white/10 transition-all cursor-pointer"
                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                  >
                    <div className={`p-2 rounded-lg ${tool.bg}`}>
                      <tool.icon className={`w-4 h-4 ${tool.color}`} />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-zinc-300 font-medium">{tool.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
                {/* Shimmer card */}
                <div className="flex items-center gap-x-3 p-3 rounded-xl border border-violet-500/20 bg-violet-500/5">
                  <div className="p-2 rounded-lg bg-violet-500/15">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm text-violet-700 dark:text-violet-300 font-medium">More coming…</span>
                </div>
              </div>
            </div>
          </div>

          {/* Glow under the card */}
          <div className="h-8 bg-gradient-to-r from-violet-600/20 via-pink-600/20 to-violet-600/20 blur-2xl -mt-4 rounded-full mx-8" />
        </div>
      </div>
    </section>
  );
};
