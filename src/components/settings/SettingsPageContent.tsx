"use client";

import { useAuth } from "@/context/AuthContext";
import Container from "../utils/Container";
import Link from "next/link";
import { Bell, Lock, UserRound } from "lucide-react";

export default function SettingsPageContent() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-12 md:py-16">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-400/90">Account</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/50">
          Preferences are stored locally for this demo. Hook forms to your API to persist changes.
        </p>

        <div className="mt-10 grid max-w-2xl gap-4">
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-violet-500/25 bg-violet-500/10 p-2 text-violet-300">
                <UserRound size={20} aria-hidden />
              </div>
              <div>
                <h2 className="font-display font-bold text-white">Profile</h2>
                <p className="text-xs text-white/45">Name and email</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/55">
              Signed in as <span className="font-medium text-white/85">{user.email}</span>
            </p>
            <Link
              href="/profile"
              className="mt-4 inline-block text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200"
            >
              Edit on My profile →
            </Link>
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 md:p-6 opacity-80">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-white/45">
                <Bell size={20} aria-hidden />
              </div>
              <div>
                <h2 className="font-display font-bold text-white/80">Notifications</h2>
                <p className="text-xs text-white/40">Coming soon</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 md:p-6 opacity-80">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-white/45">
                <Lock size={20} aria-hidden />
              </div>
              <div>
                <h2 className="font-display font-bold text-white/80">Password & security</h2>
                <p className="text-xs text-white/40">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
