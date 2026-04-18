import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import Container from "../utils/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0f]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100%,900px)] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

      <Container className="relative grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-10 xl:py-24">
        <div>
          <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
            New semester enrollment is open
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Learn faster with the
            <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Course Hub community
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Discover high quality lessons, practice projects, and mentorship in one place.
            Whether you are a beginner or upskilling, Course Hub helps you stay consistent and
            job ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Start Learning
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              <PlayCircle size={16} />
              Browse Courses
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-3 text-center sm:max-w-lg">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
              <p className="text-lg font-bold text-white sm:text-xl">120+</p>
              <p className="text-xs text-white/40 sm:text-sm">Expert instructors</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
              <p className="text-lg font-bold text-white sm:text-xl">20k+</p>
              <p className="text-xs text-white/40 sm:text-sm">Active learners</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
              <p className="text-lg font-bold text-white sm:text-xl">95%</p>
              <p className="text-xs text-white/40 sm:text-sm">Completion rate</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-none">
          <div className="rounded-2xl border border-white/[0.09] bg-linear-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_20px_80px_rgba(139,92,246,0.15)] sm:p-6">
            <div className="rounded-xl border border-white/[0.08] bg-[#10101a] p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                Weekly spotlight
              </p>
              <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">Full Stack Development</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Build real world apps with modern tooling, guided projects, and portfolio ready
                outcomes.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                  <span className="text-sm text-white/70">Module progress</span>
                  <span className="text-sm font-semibold text-violet-300">74%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center">
                <p className="text-base font-bold text-white sm:text-lg">40h</p>
                <p className="text-xs text-white/40">Video content</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center">
                <p className="text-base font-bold text-white sm:text-lg">16</p>
                <p className="text-xs text-white/40">Hands-on projects</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
