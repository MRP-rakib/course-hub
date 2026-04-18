"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "../lib/MenuItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuPropsType } from "../utils/types/MenuPropsTYpe";
import Container from "../utils/Container";

function Navbar() {
  const [menu, setMenu] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Course{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Hub
              </span>
            </span>
            <GraduationCap size={18} className="text-violet-400" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {MenuItem.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`relative text-sm capitalize transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-violet-400 after:to-pink-400 after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100
                    ${pathname === item.path
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
          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 font-display text-xs font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-95"
            >
              Join Now →
            </Link>
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <Menu size={17} />
            </button>
          </div>

        </Container>
      </nav>

      <MobileMenu menu={menu} setMenu={setMenu} pathname={pathname} />
    </>
  );
}

function MobileMenu({ menu, setMenu, pathname }: MenuPropsType) {
  return (
    <div
      className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
        menu ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setMenu(false)}
      />

      {/* Drawer */}
      <div
        className={`absolute left-0 top-0 h-full w-72 border-r border-white/[0.07] bg-[#0e0e16] flex flex-col p-6 transition-transform duration-300 ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            Course{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
          <button
            onClick={() => setMenu(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <X size={15} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-1 flex-1">
          {MenuItem.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                onClick={() => setMenu(false)}
                className={`block rounded-lg border px-3 py-2.5 text-sm capitalize transition-all duration-200
                  ${pathname === item.path
                    ? "border-violet-500/30 bg-violet-500/10 font-medium text-violet-400"
                    : "border-transparent text-white/40 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white/80"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="pt-6 border-t border-white/6">
          <Link
            href="/join"
            onClick={() => setMenu(false)}
            className="block text-center rounded-xl bg-linear-to-r from-violet-600 to-purple-600 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Join Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;