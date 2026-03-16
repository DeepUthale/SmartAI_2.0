export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
        <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-pink-500 animate-spin" style={{ animationDuration: "0.6s", animationDirection: "reverse" }} />
      </div>
      <p className="text-sm text-zinc-500 animate-pulse">SmartAI is thinking…</p>
    </div>
  );
};
