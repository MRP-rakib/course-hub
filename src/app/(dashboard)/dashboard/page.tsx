import DashboardContent from "@/components/dashboard/DashboardContent";
import { getDemoDashboardData } from "@/data/demoProfiles";
import { parseDashboardRole, type DashboardRole } from "@/lib/dashboardRole";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{ role?: string }>;
};

const titles: Record<DashboardRole, string> = {
  student: "Student dashboard",
  teacher: "Teacher dashboard",
  admin: "Admin dashboard",
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { role: raw } = await searchParams;
  const role = parseDashboardRole(raw);
  return {
    title: `${titles[role]} | Course Hub`,
    description: "Your Course Hub dashboard — activity, account, and quick links.",
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  const { role: raw } = await searchParams;
  const role = parseDashboardRole(raw);
  const data = getDemoDashboardData(role);

  return <DashboardContent role={role} data={data} />;
}
