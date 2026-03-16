import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 py-5 flex items-center gap-x-4 border-b border-border mb-6">
      <div className={cn("p-2.5 rounded-xl shrink-0", bgColor)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-foreground leading-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
};
