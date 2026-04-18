export default function DashboardGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex-1 bg-[#0a0a0f]">{children}</div>;
}
