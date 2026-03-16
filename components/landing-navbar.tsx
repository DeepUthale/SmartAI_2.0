"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({ weight: "700", subsets: ["latin"] });

export const LandingNabvbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-dark border-b border-white/[0.06]">
      <Link href="/" className="flex items-center gap-x-3 group">
        <div className="relative h-10 w-10 transition-transform group-hover:scale-110 duration-200">
          <Image fill src="/logo.png" alt="Logo" />
        </div>
        <h1 className={cn("text-lg font-bold text-white tracking-tight", font.className)}>
          SmartAI
        </h1>
      </Link>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-x-1 absolute left-1/2 -translate-x-1/2">
        {[
          { label: "Features", href: "#features" },
          { label: "How it works", href: "#how" },
          { label: "Pricing", href: "#pricing" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="px-4 py-1.5 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-150"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-x-2">
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-5 h-9 gap-x-2 text-sm shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-px">
              <Sparkles className="w-3.5 h-3.5" />
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-zinc-400 hover:text-white rounded-full h-9 text-sm px-4">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-white text-black hover:bg-zinc-100 rounded-full px-5 h-9 gap-x-2 text-sm font-semibold transition-all hover:-translate-y-px">
                Get started free
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
