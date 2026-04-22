"use client";

import { useState } from "react";
import { BookOpen, Trophy, Clock } from "lucide-react";
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

  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-225 -translate-x-1/2 bg-violet-600/15 blur-[140px]" />

      <Container className="relative px-4 py-14 md:py-18">

        {/* PROFILE HEADER CARD */}
        <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-linear-to-r from-violet-600 to-pink-500 flex items-center justify-center font-bold text-lg">
              R
            </div>

            <div>
              <h1 className="text-2xl font-extrabold">{user.name}</h1>
              <p className="text-white/50 text-sm">{user.email}</p>
              <span className="text-xs text-violet-400">{user.role}</span>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-2">
            {(["overview", "edit", "security"] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm border transition ${
                  tab === t
                    ? "bg-white/10 border-white/20 text-violet-400"
                    : "border-white/10 text-white/50 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

          <Stat icon={<BookOpen className="text-violet-400" />} value={user.enrolled} label="Courses" />
          <Stat icon={<Trophy className="text-pink-400" />} value={user.completed} label="Completed" />
          <Stat icon={<Clock className="text-violet-300" />} value={`${user.hours}h`} label="Learning Time" />

        </div>

        {/* MAIN CARD */}
        <div className="mt-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl p-6">

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="grid md:grid-cols-2 gap-10">

              <div>
                <h2 className="text-violet-400 font-bold mb-4">Personal Info</h2>
                <Info label="Name" value={user.name} />
                <Info label="Email" value={user.email} />
                <Info label="Phone" value={user.phone} />
                <Info label="Location" value={user.location} />
              </div>

              <div>
                <h2 className="text-violet-400 font-bold mb-4">Account Info</h2>
                <Info label="Role" value={user.role} />
                <Info label="Joined" value={user.joined} />
              </div>

            </div>
          )}

          {/* EDIT */}
          {tab === "edit" && (
            <div className="grid md:grid-cols-2 gap-4">

              <Input label="Name" defaultValue={user.name} />
              <Input label="Email" defaultValue={user.email} />
              <Input label="Phone" defaultValue={user.phone} />
              <Input label="Location" defaultValue={user.location} />

              <button className="md:col-span-2 mt-2 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 py-3 font-bold hover:opacity-90">
                Save Changes
              </button>

            </div>
          )}

          {/* SECURITY */}
          {tab === "security" && (
            <div className="max-w-md space-y-4">

              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm Password" type="password" />

              <button className="w-full rounded-xl bg-linear-to-r from-violet-600 to-purple-600 py-3 font-bold hover:opacity-90">
                Update Password
              </button>

            </div>
          )}

        </div>
      </Container>
    </div>
  );
}

/* ===== UI BLOCKS ===== */

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl p-5">
      {icon}
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className="text-white/45 text-sm">{label}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/6 py-2 text-sm">
      <span className="text-white/45">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Input({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-sm text-white/45">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-violet-500"
      />
    </div>
  );
}