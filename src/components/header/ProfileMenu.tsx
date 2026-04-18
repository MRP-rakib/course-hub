"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "?";
}

export default function ProfileMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handlePointer(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  if (!user) return null;

  const active =
    pathname === "/dashboard" || pathname === "/profile" || pathname === "/settings";

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "My profile", icon: UserRound },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-sm font-medium transition-colors ${
          active || open
            ? "border-violet-500/35 bg-violet-500/10 text-white"
            : "border-white/[0.08] bg-white/[0.04] text-white/80 hover:border-white/[0.12] hover:bg-white/[0.07]"
        }`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
          {initials(user.name)}
        </span>
        <span className="hidden max-w-[120px] truncate sm:inline">{user.name}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-[200] w-56 rounded-xl border border-white/[0.1] bg-[#12121a] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
        >
          <div className="border-b border-white/[0.06] px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-white/45">{user.email}</p>
          </div>
          <div className="py-1">
            {items.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <Icon size={16} className="text-violet-400/90" aria-hidden />
                {label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                signOut();
                router.push("/");
                router.refresh();
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-300/90 transition-colors hover:bg-red-500/10"
            >
              <LogOut size={16} aria-hidden />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
