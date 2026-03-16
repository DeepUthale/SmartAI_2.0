import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />

            <div className="flex items-center gap-x-2 ml-auto">
                {isPro && (
                    <div className="hidden sm:flex items-center gap-x-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full px-3 py-1 text-xs font-medium text-violet-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block animate-pulse" />
                        Pro Plan
                    </div>
                )}
                <ThemeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Navbar;
