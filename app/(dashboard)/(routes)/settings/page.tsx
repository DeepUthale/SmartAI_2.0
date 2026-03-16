import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings, Zap } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account and subscription."
        icon={Settings}
        iconColor="text-zinc-500"
        bgColor="bg-zinc-500/10"
      />
      <div className="px-4 lg:px-8 space-y-6">

        {/* Plan status card */}
        <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              {isPro ? (
                <span className="flex items-center gap-x-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full px-3 py-1 text-xs font-semibold text-violet-400">
                  <Zap className="w-3 h-3 fill-violet-400" />
                  Pro Plan
                </span>
              ) : (
                <span className="flex items-center gap-x-1.5 bg-zinc-500/10 border border-zinc-500/20 rounded-full px-3 py-1 text-xs font-semibold text-zinc-400">
                  Free Plan
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {isPro
                ? "You have unlimited access to all AI tools."
                : "You are on the free plan. Upgrade for unlimited generations."}
            </p>
          </div>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
