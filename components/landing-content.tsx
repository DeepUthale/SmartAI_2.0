"use client";

import {
  ArrowRight, CheckCircle2, Code, ImageIcon,
  MessageSquare, Music, Sparkles, VideoIcon, Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

/* ── Features ───────────────────────────────────────── */
const features = [
  {
    icon: MessageSquare, title: "Conversation AI",
    description: "Natural, context-aware conversations powered by GPT-4.1. Ask anything, brainstorm ideas, get expert answers instantly.",
    color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", glow: "group-hover:shadow-violet-500/10",
  },
  {
    icon: ImageIcon, title: "Image Generation",
    description: "Turn text into stunning visuals with DALL-E 3. Choose resolution, quantity and style for professional results.",
    color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", glow: "group-hover:shadow-pink-500/10",
  },
  {
    icon: VideoIcon, title: "Video Synthesis",
    description: "Generate high-quality videos from text prompts using WanVideo. Cinematic AI video, on demand.",
    color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", glow: "group-hover:shadow-orange-500/10",
  },
  {
    icon: Music, title: "Music Creation",
    description: "Describe a mood or genre and MusicGen composes an original track for you. Your own AI music studio.",
    color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "group-hover:shadow-emerald-500/10",
  },
  {
    icon: Code, title: "Code Generation",
    description: "Generate clean, documented code in any language. Debug, explain, and refactor with your AI pair programmer.",
    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: Zap, title: "Lightning Fast",
    description: "Built on Next.js 14 with edge-optimised API routes. Responses arrive in seconds, not minutes.",
    color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", glow: "group-hover:shadow-yellow-500/10",
  },
];

/* ── Steps ──────────────────────────────────────────── */
const steps = [
  { n: "01", title: "Create your account", desc: "Sign up free in seconds, no credit card required." },
  { n: "02", title: "Choose a tool",        desc: "Pick from Conversation, Image, Video, Music or Code." },
  { n: "03", title: "Describe your idea",   desc: "Type a prompt and SmartAI generates your content." },
  { n: "04", title: "Download & share",     desc: "Save your creations, iterate, and share with the world." },
];

/* ── Pricing ────────────────────────────────────────── */
const freePlan  = ["7 AI generations total", "All 5 AI tools", "Standard speed", "Community support"];
const proPlan   = ["Unlimited AI generations", "All 5 AI tools", "Priority speed", "Email support", "Early access to new tools"];

/* ── Team ───────────────────────────────────────────── */

/* ── Section wrapper ────────────────────────────────── */
const Section = ({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={cn("px-6 py-24 max-w-6xl mx-auto", className)}>
    {children}
  </section>
);

const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-x-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 text-sm text-zinc-400 mb-6">
    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
    {children}
  </div>
);

export const LandingContent = () => {
  return (
    <div className="text-white">

      {/* ── Features ─────────────────────────────────── */}
      <Section id="features">
        <div className="text-center mb-16">
          <SectionBadge>Everything you need</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Five AI tools.<br />
            <span className="gradient-text">One workspace.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            All the AI capabilities you need, beautifully designed and ready to use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={cn(
                "group relative rounded-2xl p-6 border bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default",
                f.border, f.glow
              )}
            >
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-5", f.bg)}>
                <f.icon className={cn("w-5 h-5", f.color)} />
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Divider ───────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── How it works ─────────────────────────────── */}
      <Section id="how">
        <div className="text-center mb-16">
          <SectionBadge>Simple by design</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Get started in <span className="gradient-text">minutes</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            From sign-up to your first AI creation in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.n} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[calc(100%+0px)] w-full h-px bg-gradient-to-r from-white/15 to-transparent z-0" />
              )}
              <div className="relative z-10 bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-200">
                <div className="text-3xl font-black gradient-text mb-4 leading-none">{step.n}</div>
                <h3 className="font-semibold text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Divider ───────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Pricing ──────────────────────────────────── */}
      <Section id="pricing">
        <div className="text-center mb-16">
          <SectionBadge>Simple pricing</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Start free, <span className="gradient-text">scale up</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            No hidden fees. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
            <div>
              <p className="text-sm text-zinc-500 font-medium mb-1">Free</p>
              <div className="flex items-baseline gap-x-1">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-zinc-500 text-sm">/ forever</span>
              </div>
              <p className="text-zinc-500 text-sm mt-2">Perfect for trying out SmartAI.</p>
            </div>
            <ul className="space-y-3">
              {freePlan.map((item) => (
                <li key={item} className="flex items-center gap-x-3 text-sm text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-zinc-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className="block">
              <Button variant="outline" className="w-full rounded-xl border-white/10 text-white hover:bg-white/5">
                Get started
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl border border-violet-500/40 bg-gradient-to-b from-violet-500/10 to-pink-500/5 p-8 space-y-6 shadow-xl shadow-violet-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-violet-500/30">
                MOST POPULAR
              </span>
            </div>
            <div>
              <p className="text-sm text-violet-300 font-medium mb-1">Pro</p>
              <div className="flex items-baseline gap-x-1">
                <span className="text-4xl font-black text-white">$2</span>
                <span className="text-zinc-500 text-sm">/ month</span>
              </div>
              <p className="text-zinc-400 text-sm mt-2">Everything, unlimited, forever.</p>
            </div>
            <ul className="space-y-3">
              {proPlan.map((item) => (
                <li key={item} className="flex items-center gap-x-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className="block">
              <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-violet-500/25 gap-x-2">
                <Zap className="w-4 h-4 fill-white" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10 p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-pink-600/5" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to create with AI?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of creators using SmartAI to generate content, code, music and more.
            </p>
            <Link href="/sign-up">
              <Button className="h-12 px-10 bg-white text-black hover:bg-zinc-100 rounded-full text-base font-semibold gap-x-2 shadow-2xl shadow-white/10 transition-all hover:-translate-y-0.5">
                Start for free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-x-2">
            <span className="text-white font-semibold">SmartAI</span>
            <span>·</span>
            <span>© 2026 All rights reserved</span>
          </div>
          <div className="flex items-center gap-x-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-zinc-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingContent;
