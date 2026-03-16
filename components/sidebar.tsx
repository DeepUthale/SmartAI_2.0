"use client";

import { cn } from "@/lib/utils";
import {
  Code, ImageIcon, LayoutDashboard,
  MessageSquare, Music, Settings, VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({ weight: "700", subsets: ["latin"] });

const routes = [
  { label: "Dashboard",        icon: LayoutDashboard, href: "/dashboard",   color: "text-sky-500",     activeBg: "bg-sky-500/10"     },
  { label: "Conversation",     icon: MessageSquare,   href: "/conversation", color: "text-violet-500",  activeBg: "bg-violet-500/10"  },
  { label: "Image Generation", icon: ImageIcon,       href: "/image",        color: "text-pink-500",    activeBg: "bg-pink-500/10"    },
  { label: "Video Generation", icon: VideoIcon,       href: "/video",        color: "text-orange-500",  activeBg: "bg-orange-500/10"  },
  { label: "Music Generation", icon: Music,           href: "/music",        color: "text-emerald-500", activeBg: "bg-emerald-500/10" },
  { label: "Code Generation",  icon: Code,            href: "/code",         color: "text-blue-500",    activeBg: "bg-blue-500/10"    },
  { label: "Settings",         icon: Settings,        href: "/settings",     color: "text-zinc-500",    activeBg: "bg-zinc-500/10"    },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">

      {/* Logo */}
      <div className="px-3 pt-5 pb-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-x-3 px-3 py-2 rounded-xl hover:bg-accent transition-colors group"
        >
          <div className="relative w-10 h-10 shrink-0 transition-transform group-hover:scale-105 duration-200">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <span className={cn("text-base font-bold text-foreground tracking-tight", montserrat.className)}>
            SmartAI
          </span>
        </Link>
      </div>

      <div className="mx-3 h-px bg-border mb-2" />

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-2">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Tools
        </p>
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "flex items-center gap-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? cn("text-foreground", route.activeBg)
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <route.icon
                style={{ width: 17, height: 17 }}
                className={cn("shrink-0 transition-colors", isActive ? route.color : "")}
              />
              <span>{route.label}</span>
              {isActive && (
                <div className={cn("ml-auto w-1.5 h-1.5 rounded-full", route.color.replace("text-", "bg-"))} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Counter */}
      <div className="px-3 pb-4 pt-1">
        <div className="mx-0 mb-3 h-px bg-border" />
        <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
    </div>
  );
};

export default Sidebar;
