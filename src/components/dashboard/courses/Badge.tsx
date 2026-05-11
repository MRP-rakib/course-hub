function Badge({ text }: { text: string }) {
  const colors: Record<string, string> = {
    Bestseller: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    New: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    Hot: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  };
  const cls = colors[text] ?? "border-violet-500/40 bg-violet-500/10 text-violet-300";
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cls}`}>
      {text}
    </span>
  );
}

export default Badge