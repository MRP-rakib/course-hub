"use client";

import { useAuth } from "@/context/AuthContext";
import Container from "../utils/Container";
import Link from "next/link";
import { LayoutDashboard, Mail, Settings, User } from "lucide-react";

export default function ProfilePageContent() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-400/90">
          Account
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          My profile
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/50">
          Basic account details. Connect this screen to your user API when backend auth is ready.
        </p>

        <div className="mt-10 max-w-lg rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 font-display text-xl font-bold text-white">
              {user.name
                .split(/\s+/)
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">{user.name}</p>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-white/50">
                <Mail size={14} className="shrink-0" aria-hidden />
                {user.email}
              </p>
            </div>
          </div>

          <dl className="mt-8 space-y-4 border-t border-white/[0.08] pt-8 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="flex items-center gap-2 text-white/45">
                <User size={15} className="text-violet-400/80" aria-hidden />
                Display name
              </dt>
              <dd className="font-medium text-white/90">{user.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/45">Email</dt>
              <dd className="text-right font-medium text-white/90">{user.email}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.08] pt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <LayoutDashboard size={16} aria-hidden />
              Open dashboard
            </Link>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-violet-500/35"
            >
              <Settings size={16} aria-hidden />
              Settings
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
