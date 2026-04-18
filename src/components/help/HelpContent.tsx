import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, LifeBuoy, Mail } from "lucide-react";
import Container from "../utils/Container";

type FaqItem = {
  q: string;
  a: string;
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

const sections: FaqSection[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do I create an account?",
        a: "Use the Join page to register as a student or teacher. You’ll confirm your email, then you can browse courses and enroll from any course page or the catalog.",
      },
      {
        q: "Do I need experience before I start?",
        a: "No. Courses list a level (Beginner, Intermediate, Advanced). Pick a track that matches where you are today; you can always move up as you grow.",
      },
      {
        q: "Can I switch between student and teacher later?",
        a: "Yes. Many people learn first and teach later. Contact support if you need both roles under one email—we’ll point you to the right signup path.",
      },
    ],
  },
  {
    title: "Courses & learning",
    items: [
      {
        q: "How long do I have access to a course?",
        a: "Unless a course states a limited window, you keep access for the lifetime of that offering on Course Hub so you can revisit lessons and updates.",
      },
      {
        q: "Are classes live or on-demand?",
        a: "Most content is on-demand video and materials you can take at your pace. If a cohort or live session exists, it will be noted on the course page.",
      },
      {
        q: "How do I contact an instructor?",
        a: "Visit the instructor’s profile from the course or Instructors directory. Use the channels we provide there—many instructors share office-hour or community links.",
      },
    ],
  },
  {
    title: "Billing & access",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We support major cards and regional methods shown at checkout. All transactions are encrypted; we never store full card numbers on our servers.",
      },
      {
        q: "Can I get a refund?",
        a: "If a course isn’t what you expected, request a refund within the window stated at purchase (often 14–30 days) and before you’ve completed most of the content.",
      },
      {
        q: "Do you offer invoices for teams?",
        a: "Yes. For team or school purchases, reach out with your company details and seat count—we’ll send a quote and onboarding steps.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        q: "What browsers work best?",
        a: "Use the latest Chrome, Firefox, Safari, or Edge. Enable JavaScript and cookies for sign-in. For video, a stable connection of ~5 Mbps helps for HD.",
      },
      {
        q: "The video won’t play—what should I try?",
        a: "Refresh the page, disable strict ad blockers for our domain, and try another network. If it persists, email support with your browser version and a screenshot.",
      },
    ],
  },
];

function FaqDetails({ item }: { item: FaqItem }) {
  return (
    <details className="group border-b border-white/[0.08] py-4 first:pt-0 last:border-b-0">
      <summary className="cursor-pointer list-none pr-8 font-medium text-white transition-colors marker:content-none group-open:text-violet-200 [&::-webkit-details-marker]:hidden">
        <span className="flex items-start justify-between gap-3">
          {item.q}
          <ChevronDown
            size={18}
            className="mt-0.5 shrink-0 text-violet-400/80 transition-transform group-open:rotate-180"
            aria-hidden
          />
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{item.a}</p>
    </details>
  );
}

export default function HelpContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0f]">
        <div className="pointer-events-none absolute right-0 top-0 h-[280px] w-[min(100%,520px)] rounded-full bg-violet-600/15 blur-[100px]" />
        <Container className="relative py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
              <HelpCircle size={14} aria-hidden />
              Help center
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              How can we{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Quick answers about accounts, courses, billing, and playback. Still stuck? Reach out
              and we’ll get back within one business day.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {sections.map((section) => (
              <div key={section.title} className="mb-12 last:mb-0">
                <h2 className="font-display text-xl font-bold text-white">{section.title}</h2>
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 md:px-6">
                  {section.items.map((item) => (
                    <FaqDetails key={item.q} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#08080c] py-12 md:py-16">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="inline-flex rounded-lg border border-violet-500/25 bg-violet-500/10 p-2 text-violet-300">
                <LifeBuoy size={22} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">Browse the catalog</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Explore courses by topic and compare instructors before you enroll.
              </p>
              <Link
                href="/courses"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200"
              >
                Go to courses
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="inline-flex rounded-lg border border-violet-500/25 bg-violet-500/10 p-2 text-violet-300">
                <Mail size={22} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">Email support</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                For billing, access, or bugs, send a message and include your account email and a
                short description.
              </p>
              <a
                href="mailto:support@coursehub.example"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-violet-200"
              >
                support@coursehub.example
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
