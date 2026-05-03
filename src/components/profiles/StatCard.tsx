export function StatCard({
  icon,
  value,
  label,
  color,
  customValue,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: "violet" | "pink" | "purple" | "emerald";
  customValue?: React.ReactNode;
}) {
  const colorClasses = {
    violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
    pink: "from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  };

  return (
    <div className={`rounded-2xl border bg-linear-to-br backdrop-blur-xl p-6 hover:scale-105 transition-transform duration-300 ${colorClasses[color]}`}>
      <div className="mb-3">{icon}</div>
      {customValue || <h3 className="text-3xl font-bold mb-1">{value}</h3>}
      <p className="text-white/60 text-sm font-medium">{label}</p>
    </div>
  );
}