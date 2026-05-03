export function InfoSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-violet-300">
        {icon}
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}