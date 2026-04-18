import type { InstructorCardProps } from "@/components/instructors/InstructorCard";

export type InstructorRecord = InstructorCardProps & {
  slug: string;
  /** Longer bio for the profile page */
  about: string;
  expertise: string[];
};

export const allInstructors: InstructorRecord[] = [
  {
    slug: "sarah-ahmed",
    name: "Sarah Ahmed",
    role: "Web Development",
    bio: "Ex–staff engineer focused on React, Next.js, and production-ready frontends for product teams.",
    about:
      "Sarah spent a decade shipping interfaces for high-traffic products before moving full-time into teaching. Her classes emphasize how the framework choices you make now affect observability, accessibility, and refactors six months later—not just getting the demo to compile.",
    students: 18400,
    courses: 6,
    rating: 4.9,
    href: "/instructors/sarah-ahmed",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    badge: "Top rated",
    expertise: [
      "React 19, Next.js App Router, and edge-ready deployments",
      "Design systems handoff and component APIs that scale",
      "Performance budgets, Core Web Vitals, and debugging production",
      "Teaching engineers to reason about tradeoffs, not copy configs",
    ],
  },
  {
    slug: "rakib-hasan",
    name: "Rakib Hasan",
    role: "UI/UX Design",
    bio: "Design systems lead helping teams ship cohesive interfaces with accessible components.",
    about:
      "Rakib bridges design and engineering: he’s led multi-brand token libraries and helped startups avoid “design drift” as they grow. Expect opinionated but pragmatic takes on Figma structure, naming, and when not to add another variant.",
    students: 11200,
    courses: 4,
    rating: 4.8,
    href: "/instructors/rakib-hasan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Tokens, theming, and multi-brand delivery",
      "Accessible patterns (focus, motion, contrast) from day one",
      "Documentation that engineers actually read",
      "Workshops that reduce design–dev ping-pong",
    ],
  },
  {
    slug: "nadia-rahman",
    name: "Nadia Rahman",
    role: "Data & AI",
    bio: "Data scientist teaching analytics and ML with clear explanations and real datasets.",
    about:
      "Nadia’s background mixes research and analytics consulting. She focuses on helping you translate messy business questions into notebooks, charts, and narratives that stakeholders trust—without losing statistical honesty along the way.",
    students: 15600,
    courses: 5,
    rating: 4.95,
    href: "/instructors/nadia-rahman",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Python data stack: pandas, visualization, and reporting",
      "Experiment design and avoiding biased conclusions",
      "From spreadsheet refugees to reproducible workflows",
      "Communicating uncertainty without hand-waving",
    ],
  },
  {
    slug: "imran-kabir",
    name: "Imran Kabir",
    role: "Marketing",
    bio: "Growth marketer covering funnels, content, and measurable campaigns for modern brands.",
    about:
      "Imran builds growth loops for lean teams. His teaching ties channel tactics back to economics: unit economics, experimentation, and reporting that doesn’t drown you in vanity metrics.",
    students: 9200,
    courses: 3,
    rating: 4.7,
    href: "/instructors/imran-kabir",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Acquisition, activation, and retention framing",
      "Content systems that compound instead of one-off spikes",
      "Attribution literacy without snake oil",
      "Stakeholder-friendly dashboards and reviews",
    ],
  },
  {
    slug: "omar-siddique",
    name: "Omar Siddique",
    role: "Backend & Node.js",
    bio: "Full-stack mentor with a focus on APIs, databases, and scalable Node.js services.",
    about:
      "Omar has operated services under real traffic. He teaches backendcraft as a discipline: contracts, migrations, error models, and how to sleep when on-call—not just CRUD tutorials.",
    students: 7800,
    courses: 4,
    rating: 4.85,
    href: "/instructors/omar-siddique",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "REST and pragmatic API versioning",
      "Postgres modeling, migrations, and performance basics",
      "Auth patterns and secrets hygiene",
      "Shipping with tests that protect refactors",
    ],
  },
  {
    slug: "leila-chowdhury",
    name: "Leila Chowdhury",
    role: "Machine Learning",
    bio: "Research-minded instructor bridging classical ML and practical deployment workflows.",
    about:
      "Leila believes most “ML failures” are problem framing and evaluation failures first. Her courses emphasize baselines, diagnostics, and knowing when a simpler model is the professional answer.",
    students: 10300,
    courses: 3,
    rating: 4.75,
    href: "/instructors/leila-chowdhury",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Scikit-learn workflows end to end",
      "Cross-validation, leakage, and honest metrics",
      "Feature iteration without overfitting theater",
      "Operational basics: monitoring drift and failure modes",
    ],
  },
  {
    slug: "anika-islam",
    name: "Anika Islam",
    role: "Product Design",
    bio: "Figma power user teaching prototyping, handoff, and collaboration with engineering.",
    about:
      "Anika’s sweet spot is product teams shipping weekly. You’ll learn how to keep files maintainable when velocity is high, and how prototypes earn their keep by reducing ambiguity—not animating for its own sake.",
    students: 14100,
    courses: 5,
    rating: 4.65,
    href: "/instructors/anika-islam",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    badge: "Popular",
    expertise: [
      "Figma architecture for real team scale",
      "Variants, properties, and sane naming",
      "Prototype flows that survive critique",
      "Collaboration rituals with PM and engineering",
    ],
  },
  {
    slug: "tanvir-hossain",
    name: "Tanvir Hossain",
    role: "DevOps",
    bio: "SRE background: CI/CD, containers, and cloud-native ops without the jargon overload.",
    about:
      "Tanvir teaches ops as debuggable systems. Containers, pipelines, and Kubernetes objects are taught with failure modes first—so you know what to grep when the pager fires.",
    students: 6100,
    courses: 3,
    rating: 4.72,
    href: "/instructors/tanvir-hossain",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Dockerfiles, compose, and caching discipline",
      "CI that’s fast enough to stay green",
      "Kubernetes primitives that matter on day one",
      "Incident habits: timelines, blameless review, and runbooks",
    ],
  },
  {
    slug: "farhan-ali",
    name: "Farhan Ali",
    role: "TypeScript & Web",
    bio: "Typed JavaScript advocate: patterns, tooling, and maintainable app architecture.",
    about:
      "Farhan helps teams migrate incrementally from any-heavy codebases to types that guide refactors. Expect emphasis on inference, generics without ceremony, and boundaries at module edges.",
    students: 8900,
    courses: 4,
    rating: 4.82,
    href: "/instructors/farhan-ali",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Incremental adoption and path mapping",
      "Typing React and async boundaries safely",
      "Utility types and avoiding fake abstraction",
      "Tooling: ESLint, tsconfig splits, editor workflows",
    ],
  },
  {
    slug: "mira-karim",
    name: "Mira Karim",
    role: "Content Strategy",
    bio: "Editorial lead helping creators plan narratives and distribution that actually convert.",
    about:
      "Mira mixes editorial taste with distribution mechanics. Her angle is sustainable publishing: fewer random posts, more repeatable formats—and analytics lightweight enough that you’ll actually look at them weekly.",
    students: 5400,
    courses: 2,
    rating: 4.55,
    href: "/instructors/mira-karim",
    avatar:
      "https://images.unsplash.com/photo-1531746028-753aef694487?auto=format&fit=crop&w=400&q=80",
    expertise: [
      "Positioning and messaging you can reuse across channels",
      "Editorial calendars that survive reality",
      "Hooks and packaging for short-form and long-form",
      "Gentle analytics loops for iteration without burnout",
    ],
  },
];

export function getInstructorBySlug(slug: string): InstructorRecord | undefined {
  return allInstructors.find((i) => i.slug === slug);
}

export function toInstructorCardProps({
  slug: _slug,
  about: _about,
  expertise: _expertise,
  ...card
}: InstructorRecord): InstructorCardProps {
  return card;
}
