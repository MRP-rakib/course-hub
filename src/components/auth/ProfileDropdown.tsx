"use client";

import { LogOut, User, BookOpen, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/authSlice";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-2 py-1.5 transition-colors hover:bg-white/8"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-bold uppercase">
          {user?.fullname?.charAt(0)}
        </div>
        <span className="text-xs font-medium text-white/70">{user?.fullname}</span>
        <ChevronDown
          size={13}
          className={`text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/8 bg-[#0e0e16] shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden z-50">
          {/* User Info */}
          <div className="px-4 py-4 border-b border-white/6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-sm font-bold uppercase">
                {user?.fullname?.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.fullname}</p>
                <p className="text-xs text-white/40 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/4 hover:text-white"
            >
              <User size={15} className="text-violet-400" />
              Profile
            </Link>
            <Link
              href="/my-courses"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/4 hover:text-white"
            >
              <BookOpen size={15} className="text-violet-400" />
              My Courses
            </Link>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-white/6">
            <button
              onClick={() => { dispatch(logout()); setOpen(false); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}