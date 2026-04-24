import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Container from "../utils/Container";

const footerLink =
  "text-sm text-white/40 transition-colors duration-200 hover:text-violet-300";

const sectionTitle =
  "text-[11px] font-semibold uppercase tracking-widest text-violet-400/90 mb-4";

const socialLink =
  "text-xs font-medium text-white/35 transition-colors hover:text-violet-300";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/[0.07] bg-[#0a0a0f] overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-70 w-[min(100%,720px)] -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

      <Container className="relative px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Course{" "}
                <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Hub
                </span>
              </span>
              <GraduationCap size={20} className="text-violet-400 shrink-0" aria-hidden />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/35">
              Learn, teach, and grow with a modern online learning platform built for
              students and instructors.
            </p>
            <Link
              href="/join"
              className="mt-6 inline-flex items-center rounded-lg border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs font-bold font-display tracking-wide text-violet-300 transition-colors hover:border-violet-500/40 hover:bg-violet-500/15"
            >
              Get started →
            </Link>
          </div>
          <div>
            <h3 className={sectionTitle}>Quick links</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/" className={footerLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className={footerLink}>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/join" className={footerLink}>
                  Join
                </Link>
              </li>
              <li>
                <Link href="/about" className={footerLink}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={sectionTitle}>Support</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/help" className={footerLink}>
                  Help center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={footerLink}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={footerLink}>
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={sectionTitle}>Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/35">
              <li>
                <a
                  href="mailto:support@coursehub.com"
                  className="transition-colors hover:text-violet-300"
                >
                  support@coursehub.com
                </a>
              </li>
              <li>
                <a href="tel:+8801234567890" className="transition-colors hover:text-violet-300">
                  +880 1234-567890
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-2 text-white/20">
              <a href="#" className={socialLink}>
                Facebook
              </a>
              <span className="mx-2 text-white/15" aria-hidden>
                ·
              </span>
              <a href="#" className={socialLink}>
                Twitter
              </a>
              <span className="mx-2 text-white/15" aria-hidden>
                ·
              </span>
              <a href="#" className={socialLink}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row sm:items-center">
          <p className="text-center text-xs text-white/25 sm:text-left">
            © {year} Course Hub. All rights reserved.
          </p>
          <p className="text-xs text-white/20">Built for learners everywhere.</p>
        </div>
      </Container>
    </footer>
  );
}
