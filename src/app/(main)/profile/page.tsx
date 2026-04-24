"use client";

import { useState } from "react";
import { BookOpen, Trophy, Clock, User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Check, X } from "lucide-react";
import Container from "@/components/utils/Container";

type TabType = "overview" | "edit" | "security";

interface UserType {
  name: string;
  email: string;
  role: string;
  joined: string;
  phone: string;
  location: string;
  enrolled: number;
  completed: number;
  hours: number;
}

export default function Profile() {
  const [tab, setTab] = useState<TabType>("overview");
  const [isEditing, setIsEditing] = useState(false);

  const user: UserType = {
    name: "Rakib Hossain",
    email: "rakib@example.com",
    role: "Student",
    joined: "Jan 2025",
    phone: "+8801XXXXXXXXX",
    location: "Rajshahi, Bangladesh",
    enrolled: 12,
    completed: 5,
    hours: 48,
  };

  const completionRate = Math.round((user.completed / user.enrolled) * 100);

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
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl p-8 shadow-2xl shadow-violet-900/20">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-violet-500/20 to-transparent blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 blur-lg opacity-75 animate-pulse" />
                <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-3xl shadow-xl">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center border-2 border-[#0a0a0f]">
                  <Check className="h-4 w-4" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    {user.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {user.role}
                  </span>
                </div>
                <p className="text-white/60 text-base mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-violet-400" />
                    Joined {user.joined}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-violet-400" />
                    {user.location}
                  </span>
                </div>
              </div>
            </div>

            {/* TAB NAVIGATION */}
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
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/50" />
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

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            value={user.enrolled}
            label="Courses Enrolled"
            color="violet"
          />
          <StatCard
            icon={<Trophy className="h-6 w-6" />}
            value={user.completed}
            label="Completed"
            color="pink"
          />
          <StatCard
            icon={<Clock className="h-6 w-6" />}
            value={`${user.hours}h`}
            label="Learning Time"
            color="purple"
          />
          <StatCard
            icon={<div className="text-2xl font-bold">{completionRate}%</div>}
            value=""
            label="Completion Rate"
            color="emerald"
            customValue={
              <div className="w-full bg-white/10 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            }
          />
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl p-8 shadow-2xl shadow-violet-900/10">
          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <InfoSection title="Personal Information" icon={<User className="h-5 w-5" />}>
                  <InfoRow icon={<User className="h-4 w-4" />} label="Full Name" value={user.name} />
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email Address" value={user.email} />
                  <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone Number" value={user.phone} />
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location" value={user.location} />
                </InfoSection>

                <InfoSection title="Account Details" icon={<Shield className="h-5 w-5" />}>
                  <InfoRow icon={<User className="h-4 w-4" />} label="Role" value={user.role} />
                  <InfoRow icon={<Calendar className="h-4 w-4" />} label="Member Since" value={user.joined} />
                  <InfoRow icon={<BookOpen className="h-4 w-4" />} label="Active Courses" value={`${user.enrolled - user.completed}`} />
                  <InfoRow icon={<Trophy className="h-4 w-4" />} label="Achievements" value="5 Badges" />
                </InfoSection>
              </div>

              {/* Activity Overview */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-violet-400" />
                  Learning Progress
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-violet-400">{user.enrolled}</div>
                    <div className="text-sm text-white/60 mt-1">Total Courses</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-400">{user.completed}</div>
                    <div className="text-sm text-white/60 mt-1">Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">{user.hours}h</div>
                    <div className="text-sm text-white/60 mt-1">Study Time</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EDIT TAB */}
          {tab === "edit" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
                >
                  {isEditing ? "Cancel" : "Enable Editing"}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Full Name" icon={<User className="h-4 w-4" />} defaultValue={user.name} disabled={!isEditing} />
                <InputField label="Email Address" icon={<Mail className="h-4 w-4" />} defaultValue={user.email} disabled={!isEditing} />
                <InputField label="Phone Number" icon={<Phone className="h-4 w-4" />} defaultValue={user.phone} disabled={!isEditing} />
                <InputField label="Location" icon={<MapPin className="h-4 w-4" />} defaultValue={user.location} disabled={!isEditing} />
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                    <Check className="h-5 w-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <X className="h-5 w-5" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECURITY TAB */}
          {tab === "security" && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
                <p className="text-white/60 text-sm">Update your password to keep your account secure</p>
              </div>

              <InputField label="Current Password" type="password" icon={<Shield className="h-4 w-4" />} />
              <InputField label="New Password" type="password" icon={<Shield className="h-4 w-4" />} />
              <InputField label="Confirm New Password" type="password" icon={<Shield className="h-4 w-4" />} />

              <div className="pt-4">
                <button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300">
                  Update Password
                </button>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <h4 className="font-semibold text-sm mb-2 text-violet-300">Password Requirements</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function StatCard({
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
    <div className={`rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-6 hover:scale-105 transition-transform duration-300 ${colorClasses[color]}`}>
      <div className="mb-3">{icon}</div>
      {customValue || <h3 className="text-3xl font-bold mb-1">{value}</h3>}
      <p className="text-white/60 text-sm font-medium">{label}</p>
    </div>
  );
}

function InfoSection({
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

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
      <span className="text-white/50 text-sm flex items-center gap-2">
        <span className="text-violet-400">{icon}</span>
        {label}
      </span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  defaultValue,
  icon,
  disabled = false,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-white/70 mb-2 block">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${
            icon ? "pl-11" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  );
}