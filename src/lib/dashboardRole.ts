export type DashboardRole = "student" | "teacher" | "admin";

export function parseDashboardRole(raw: string | undefined | string[]): DashboardRole {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "teacher" || v === "instructor") return "teacher";
  if (v === "admin") return "admin";
  return "student";
}
