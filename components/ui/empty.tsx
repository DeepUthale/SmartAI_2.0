import { Sparkles } from "lucide-react";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
        <Sparkles className="w-7 h-7 text-zinc-600" />
      </div>
      <p className="text-zinc-600 text-sm text-center">{label}</p>
    </div>
  );
};
