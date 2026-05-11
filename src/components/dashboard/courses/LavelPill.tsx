function LevelPill({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "text-emerald-400 border-emerald-500/20 bg-emerald-500/8",
    Intermediate: "text-amber-400 border-amber-500/20 bg-amber-500/8",
    Advanced: "text-rose-400 border-rose-500/20 bg-rose-500/8",
  };
  const cls = colors[level] ?? "text-white/60 border-white/10 bg-white/5";
  return (
    <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {level}
    </span>
  );
}

export default LevelPill