"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "../lib/MenuItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuPropsType } from "../utils/types/MenuPropsTYpe";
import Container from "../utils/Container";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const [menu, setMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, ready } = useAuth();

  const navItems = MenuItem.filter(
    (item) => item.path !== "/dashboard" || Boolean(user),
  );

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Course{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Hub
              </span>
            </span>
            <GraduationCap size={18} className="shrink-0 text-violet-400" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`relative text-sm capitalize transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-violet-400 after:to-pink-400 after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100 ${
                    pathname === item.path
                      ? "font-medium text-violet-400 after:scale-x-100"
                      : "text-white/40"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {ready && user ? (
              <ProfileMenu />
            ) : ready ? (
              <>
                <Link
                  href="/signin"
                  className="hidden rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 font-display text-xs font-bold tracking-wide text-white/85 transition-colors hover:border-white/[0.16] hover:bg-white/[0.07] sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/join"
                  className="relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-2 font-display text-xs font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-95 sm:px-4"
                >
                  Join Now →
                </Link>
              </>
            ) : (
              <span className="h-9 w-16 animate-pulse rounded-lg bg-white/[0.06]" aria-hidden />
            )}
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white lg:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </Container>
      </nav>

      <MobileMenu menu={menu} setMenu={setMenu} pathname={pathname} navItems={navItems} />
    </>
  );
}

type MobileNavProps = MenuPropsType & {
  navItems: typeof MenuItem;
};

function MobileMenu({ menu, setMenu, pathname, navItems }: MobileNavProps) {
  const { user, signOut } = useAuth();

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-300 lg:hidden ${
        menu ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenu(false)} />

      <div
        className={`absolute left-0 top-0 flex h-full w-72 flex-col border-r border-white/[0.07] bg-[#0e0e16] p-6 transition-transform duration-300 ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            Course{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
          <button
            onClick={() => setMenu(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <X size={15} />
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                onClick={() => setMenu(false)}
                className={`block rounded-lg border px-3 py-2.5 text-sm capitalize transition-all duration-200 ${
                  pathname === item.path
                    ? "border-violet-500/30 bg-violet-500/10 font-medium text-violet-400"
                    : "border-transparent text-white/40 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {user ? (
          <div className="space-y-2 border-t border-white/[0.06] pt-4">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Account
            </p>
            <Link
              href="/dashboard"
              onClick={() => setMenu(false)}
              className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.04]"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              onClick={() => setMenu(false)}
              className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.04]"
            >
              My profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setMenu(false)}
              className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.04]"
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut();
                setMenu(false);
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300/90 hover:bg-red-500/10"
            >
              Sign out
            </button>
          </div>
        ) : null}

        <div className="border-t border-white/6 pt-4">
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/signin"
                onClick={() => setMenu(false)}
                className="block rounded-xl border border-white/[0.1] bg-white/[0.04] py-3 text-center font-display text-sm font-bold tracking-wide text-white transition-colors hover:bg-white/[0.07]"
              >
                Sign in
              </Link>
              <Link
                href="/join"
                onClick={() => setMenu(false)}
                className="block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-center font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
              >
                Join Now →
              </Link>
            </div>
          ) : (
            <Link
              href="/join"
              onClick={() => setMenu(false)}
              className="block rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-center font-display text-sm font-semibold text-white/60 transition-colors hover:text-white/90"
            >
              Invite a friend
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
