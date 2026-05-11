"use client";

import { ChevronLeft, ChevronRight, LayoutDashboard, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { toggleSidebar } from "@/redux/features/sidebar";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <LayoutDashboard className="h-3 w-3 lg:h-5 lg:w-5" />,
    label: "Overview",
    href: "/dashboard",
  },
  {
    icon: <BookOpen className="h-3 w-3 lg:h-5 lg:w-5" />,
    label: "Course",
    href: "/dashboard/courses",
  },
  {
    icon: <Users className="h-3 w-3 lg:h-5 lg:w-5" />,
    label: "Student",
    href: "/dashboard/student",
  },
];

export default function Sidebar() {
  const {isExpanded} = useAppSelector(state=>state.sidebar)
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  return (
      <aside
        className={`
          min-h-full fixed top-16 lg:top-0 lg:relative z-50
          ${isExpanded ? "w-72" : "w-0 overflow-hidden lg:w-20"}
          bg-[#0a0a0f]/95 backdrop-blur-2xl
          border-r border-white/10
          transition-all duration-300 ease-in-out
        `}
      >
        {/* ANIMATED BACKGROUND GRADIENTS */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-violet-600/20 blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 -right-20 h-64 w-64 rounded-full bg-purple-600/15 blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="relative h-full flex flex-col p-4">
          {/* TOGGLE BUTTON */}
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={()=>dispatch(toggleSidebar())}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:scale-110"
            >
              {isExpanded ? (
                <ChevronLeft className="h-3 w-3 lg:h-5 lg:w-5" />
              ) : (
                <ChevronRight className="h-3 w-3 lg:h-5 lg:w-5" />
              )}
            </button>
          </div>

          {/* LOGO/BRAND */}
          <div className="mb-8">
            <div className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 blur-md opacity-75 animate-pulse" />
                <div className="relative w-8 h-8 lg:h-12 lg:w-12 rounded-xl bg-linear-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-[18px] lg:text-xl shadow-xl">
                  L
                </div>
              </div>
              {isExpanded && (
                <div className="overflow-hidden">
                  <h2 className="text-[18px] lg:text-xl font-bold bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent whitespace-nowrap">
                    Learning Hub
                  </h2>
                  <p className="text-xs text-white/50 whitespace-nowrap">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATION MENU */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative text-base flex items-center ${isExpanded ? "gap-3 px-4" : "justify-center px-2"} py-2.5 lg:py-3.5 rounded-xl
                    transition-all duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white/90"
                    }
                  `}
                  title={!isExpanded ? item.label : ""}
                >
                  {/* ACTIVE BACKGROUND */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30" />
                  )}

                  {/* HOVER BACKGROUND */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  {/* ICON */}
                  <span className={`relative z-10 shrink-0 ${isActive ? "text-white" : "text-violet-400"}`}>
                    {item.icon}
                  </span>

                  {/* LABEL */}
                  {isExpanded && (
                    <span className="relative z-10 font-medium whitespace-nowrap">{item.label}</span>
                  )}

                  {/* CHEVRON FOR ACTIVE */}
                  {isActive && isExpanded && (
                    <ChevronRight className="relative z-10 h-4 w-4 ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* FOOTER SECTION */}
          {isExpanded && (
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="rounded-xl bg-linear-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm border border-white/10">
                <p className="text-xs text-white/50 mb-1">Need help?</p>
                <p className="text-sm text-white/80 font-medium">Contact Support</p>
              </div>
            </div>
          )}
        </div>
      </aside>
  );
}