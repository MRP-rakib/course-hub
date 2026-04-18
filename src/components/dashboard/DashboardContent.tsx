import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  Mail,
  Shield,
  User,
  Users2,
} from "lucide-react";
import type { DashboardUserData } from "@/data/demoProfiles";
import type { DashboardRole } from "@/lib/dashboardRole";
import Container from "../utils/Container";
import DashboardRolePicker from "./DashboardRolePicker";

const roleLabels: Record<DashboardRole, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin",
};

function Field({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">
        {Icon ? <Icon size={13} className="text-violet-400/90" aria-hidden /> : null}
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium text-white/90">{value}</p>
    </div>
  );
}

type DashboardContentProps = {
  role: DashboardRole;
  data: DashboardUserData;
};

export default function DashboardContent({ role, data }: DashboardContentProps) {
  const label = roleLabels[role];

  return (
    <section className="min-h-full bg-[#0a0a0f] pb-16 pt-6 md:pt-8">
      <Container>
        <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-6 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-violet-300"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <DashboardRolePicker currentRole={role} />
            <span className="hidden text-white/25 sm:inline" aria-hidden>
              |
            </span>
            <span className="text-center text-sm text-white/45 sm:text-left">
              Viewing as{" "}
              <span className="font-semibold text-violet-300">{label}</span>
              <span className="ml-1 text-white/35">(demo)</span>
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-400/90">
            Dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Welcome back, {data.fullName.split(" ")[0]}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/50">
            {role === "student" &&
              "Track progress, manage your account, and jump back into courses."}
            {role === "teacher" &&
              "See teaching impact, account details, and links to your public presence."}
            {role === "admin" &&
              "Monitor access, permissions, and support paths for the platform."}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          <div className="flex flex-col items-center rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6 text-center lg:sticky lg:top-24">
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-violet-500/20">
              <Image
                src={data.avatar}
                alt={data.fullName}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <p className="mt-5 font-display text-xl font-extrabold text-white">{data.fullName}</p>
            <p className="mt-1 text-sm text-violet-300/90">@{data.username}</p>
            <span className="mt-3 inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-300">
              {label}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{data.bio}</p>
            <p className="mt-4 text-xs text-white/40">Member since {data.memberSince}</p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Account</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Email" value={data.email} icon={Mail} />
                <Field label="Username" value={data.username} icon={User} />
              </div>
            </div>

            {data.role === "student" ? (
              <div>
                <h2 className="font-display text-lg font-bold text-white">Learning activity</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-violet-600/10 to-transparent px-4 py-4">
                    <BookOpen className="text-violet-400" size={20} aria-hidden />
                    <p className="mt-3 text-2xl font-extrabold text-white">
                      {data.enrolledCourses}
                    </p>
                    <p className="text-xs font-medium text-white/50">Courses enrolled</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                    <GraduationCap className="text-violet-400" size={20} aria-hidden />
                    <p className="mt-3 text-2xl font-extrabold text-white">
                      {data.completedLessons}
                    </p>
                    <p className="text-xs font-medium text-white/50">Lessons done</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                    <Clock className="text-violet-400" size={20} aria-hidden />
                    <p className="mt-3 text-2xl font-extrabold text-white">{data.hoursLearned}h</p>
                    <p className="text-xs font-medium text-white/50">Time learning</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Browse courses
                  </Link>
                  <Link
                    href="/help"
                    className="inline-flex items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-violet-500/35"
                  >
                    Help center
                  </Link>
                </div>
              </div>
            ) : null}

            {data.role === "instructor" ? (
              <div>
                <h2 className="font-display text-lg font-bold text-white">Teaching impact</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-violet-600/10 to-transparent px-4 py-4">
                    <BookOpen className="text-violet-400" size={20} aria-hidden />
                    <p className="mt-3 text-2xl font-extrabold text-white">
                      {data.coursesPublished}
                    </p>
                    <p className="text-xs font-medium text-white/50">Courses published</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                    <Users2 className="text-violet-400" size={20} aria-hidden />
                    <p className="mt-3 text-2xl font-extrabold text-white">
                      {data.totalStudents.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium text-white/50">Students reached</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
                    <Award className="text-violet-400" size={20} aria-hidden />
                    <p className="mt-3 text-2xl font-extrabold text-white">
                      {data.avgRating.toFixed(1)}
                    </p>
                    <p className="text-xs font-medium text-white/50">Avg. rating</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Course catalog
                  </Link>
                  <Link
                    href="/instructors"
                    className="inline-flex items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-violet-500/35"
                  >
                    Instructor directory
                  </Link>
                </div>
              </div>
            ) : null}

            {data.role === "admin" ? (
              <div>
                <h2 className="font-display text-lg font-bold text-white">Platform access</h2>
                <Field label="Last sign-in" value={data.lastLogin} icon={BarChart3} />
                <div className="mt-4">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                    <Shield size={13} className="text-violet-400/90" aria-hidden />
                    Permissions
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {data.permissions.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/75"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/help"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Support & escalations
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-violet-500/35"
                  >
                    Review catalog
                  </Link>
                </div>
              </div>
            ) : null}

            <p className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-white/45">
              Demo data + <code className="text-violet-300/90">?role=</code> switcher. After login,
              pass the signed-in user&apos;s role from the session instead of the query string.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
