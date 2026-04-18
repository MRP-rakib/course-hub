"use client";

import { useRouter } from "next/navigation";
import type { DashboardRole } from "@/lib/dashboardRole";

const roles: { id: DashboardRole; label: string }[] = [
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "admin", label: "Admin" },
];

type DashboardRolePickerProps = {
  currentRole: DashboardRole;
};

export default function DashboardRolePicker({ currentRole }: DashboardRolePickerProps) {
  const router = useRouter();

  return (
    <div
      className="inline-flex flex-wrap gap-1 rounded-xl border border-white/[0.1] bg-white/[0.04] p-1"
      role="tablist"
      aria-label="Dashboard role (demo)"
    >
      {roles.map(({ id, label }) => {
        const active = currentRole === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => router.push(`/dashboard?role=${id}`)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm"
                : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
