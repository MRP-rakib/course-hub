export function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/2 transition-colors">
      <span className="text-white/50 text-sm flex items-center gap-2">
        <span className="text-violet-400">{icon}</span>
        {label}
      </span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}