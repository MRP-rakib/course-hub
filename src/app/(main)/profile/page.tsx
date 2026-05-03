"use client";

import { useState } from "react";
import { BookOpen, Trophy, User, Mail, MapPin, Calendar, Shield, Edit3, Check, X } from "lucide-react";
import Container from "@/components/utils/Container";
import { useAppSelector } from "@/redux/hooks";
// import InputField from "@/components/ui/InputField";
// import { InfoSection } from "@/components/profiles/InfoSection";
// import { InfoRow } from "@/components/profiles/InfoRow";
import { StatCard } from "@/components/profiles/StatCard";
import SecurityTab from "@/components/profiles/SecurityTab";
import EditTab from "@/components/profiles/EditTab";
import Overview from "@/components/profiles/Overview";

type TabType = "overview" | "edit" | "security";


export default function Profile() {
  const [tab, setTab] = useState<TabType>("overview");
  // const [isEditing, setIsEditing] = useState(false);
  const {profile} = useAppSelector(state=>state.auth)

  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ANIMATED BACKGROUND GRADIENTS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px] animate-pulse delay-700" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-pink-600/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      <Container className="relative px-4 py-8 md:py-12 max-w-6xl">
        {/* PROFILE HEADER CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-2xl p-8 shadow-2xl shadow-violet-900/20">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-linear-to-br from-violet-500/20 to-transparent blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 blur-lg opacity-75 animate-pulse" />
                <div className="relative h-24 w-24 rounded-2xl bg-linear-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-3xl shadow-xl">
                  {profile?.fullname.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-lg bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center border-2 border-[#0a0a0f]">
                  <Check className="h-4 w-4" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    {profile?.fullname}
                  </h1>
                  <span className="px-3 py-1 capitalize rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {profile?.role}
                  </span>
                </div>
                <p className="text-white/60 text-base mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profile?.email}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-violet-400" />
                    {new Date(profile?.created_At||'').toLocaleDateString()||''}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-violet-400" />
                    {profile?.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/5">
              {(["overview", "edit", "security"] as TabType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                    tab === t
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {tab === t && (
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/50" />
                  )}
                  <span className="relative flex items-center gap-2">
                    {t === "overview" && <User className="h-4 w-4" />}
                    {t === "edit" && <Edit3 className="h-4 w-4" />}
                    {t === "security" && <Shield className="h-4 w-4" />}
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            value={profile?.total_enrollment||0}
            label="Courses Enrolled"
            color="violet"
          />
          <StatCard
            icon={<Trophy className="h-6 w-6" />}
            value={profile?.completed_courses||0}
            label="Completed"
            color="pink"
          />
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-2xl p-8 shadow-2xl shadow-violet-900/10">

          {tab === "overview" && (
            <Overview profile={profile}/>
          )}

          {tab === "edit" && (
            <EditTab  profile={profile}/>
          )}

          {tab === "security" && (
            <SecurityTab/>
          )}
        </div>
      </Container>
    </div>
  )
}

