import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Sparkles,
  Target,
  Users2,
} from "lucide-react";
import { allCourses } from "@/data/courses";
import { allInstructors } from "@/data/instructors";
import Container from "../utils/Container";

const values = [
  {
    title: "Clarity over hype",
    body: "Lessons are structured so you always know the next step—no endless tabs of disconnected tutorials.",
    icon: Target,
  },
  {
    title: "Built for real schedules",
    body: "Short modules, searchable catalog, and progress you can resume from any device.",
    icon: BookOpen,
  },
  {
    title: "Teachers who ship",
    body: "Instructors are practitioners first. Expect practical tradeoffs, not slide-only theory.",
    icon: Users2,
  },
  {
    title: "Community that nudges you",
    body: "Enrollment, cohort-style sections where we use them, and a culture of finishing what you start.",
    icon: Heart,
  },
];

export default function AboutContent() {
  const courseCount = allCourses.length;
  const instructorCount = allInstructors.length;
  const learnerReach = allCourses.reduce((sum, c) => sum + c.students, 0);

  const stats = [
    { label: "Courses live", value: `${courseCount}+` },
    { label: "Instructors", value: `${instructorCount}+` },
    {
      label: "Learners reached *",
      value: learnerReach >= 1_000_000
        ? `${(learnerReach / 1_000_000).toFixed(1)}M+`
        : learnerReach >= 1_000
          ? `${Math.round(learnerReach / 1_000)}k+`
          : learnerReach.toLocaleString(),
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0f]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[min(100%,880px)] -translate-x-1/2 rounded-full bg-violet-600/18 blur-[110px]" />
        <Container className="relative py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
              About Course Hub
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Learning that fits{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                how teams work today
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/50 sm:text-lg">
              We connect curious learners with instructors who teach from experience—so you build
              skills you can use on the job, not just in the browser.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
              >
                Browse catalog
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
              >
                Join the hub
              </Link>
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-white/45">
                  {item.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-center text-[11px] text-white/35">
            * Sum of enrollments across published courses on Course Hub (illustrative totals).
          </p>
        </Container>
      </section>

      <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-14 md:py-18">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Our story
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/55">
              <p>
                Course Hub started from a simple frustration: great material scattered across videos,
                docs, and chats—with no clear path from “interested” to “confident.” We wanted a
                single place where serious learners could find structured tracks and instructors
                could teach without rebuilding the same onboarding every time.
              </p>
              <p>
                Today we focus on web development, design, data, and growth skills—areas where
                practice and feedback matter as much as concepts. Every course in the catalog is
                built to be extended: swap topics, add cohorts, or plug in your own content while
                keeping the same learner-friendly layout.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/[0.06] bg-[#08080c] py-14 md:py-18">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
              Mission
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Make progress feel obvious
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
              We obsess over navigation, pacing, and clarity so you spend mental energy on the
              skill—not on figuring out what to click next.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="inline-flex rounded-lg border border-violet-500/25 bg-violet-500/10 p-2 text-violet-300">
                <GraduationCap size={22} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">For learners</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Browse by topic, compare instructors, and follow courses with consistent layouts—so
                you always know where you are in the journey.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="inline-flex rounded-lg border border-violet-500/25 bg-violet-500/10 p-2 text-violet-300">
                <Sparkles size={22} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">For educators</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                A reusable card model, profile pages, and room to highlight your expertise—without
                rebuilding a marketing site from scratch.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-14 md:py-18">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              What we stand for
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
              Principles that shape how we design every screen and lesson outline.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map(({ title, body, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-violet-500/25 hover:bg-violet-500/[0.04]"
              >
                <Icon className="text-violet-400" size={22} strokeWidth={1.75} aria-hidden />
                <h3 className="mt-3 font-display text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#08080c] py-14 md:py-18">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-600/15 to-purple-600/10 px-6 py-10 text-center md:px-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to start?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
              Explore the catalog or create an account and pick your first course today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/join"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                Get started
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/instructors"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/[0.08] sm:w-auto"
              >
                Meet instructors
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
