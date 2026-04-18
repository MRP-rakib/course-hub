import type { CourseCardProps } from "@/components/courses/CourseCard";

export type CourseRecord = CourseCardProps & {
  slug: string;
  description: string;
  highlights: string[];
};

export const allCourses: CourseRecord[] = [
  {
    slug: "react-nextjs-bootcamp",
    title: "React & Next.js Bootcamp",
    instructor: "Sarah Ahmed",
    category: "Web Development",
    level: "Intermediate",
    lessons: 38,
    duration: "22h 30m",
    rating: 4.8,
    students: 12840,
    price: "$49",
    href: "/courses/react-nextjs-bootcamp",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=640&q=80",
    badge: "Best Seller",
    description:
      "Build modern full-stack apps with React 19 patterns, the App Router, server components, and deployment. Projects mirror real product constraints so you finish with a portfolio-ready codebase and mental model for shipping on the web.",
    highlights: [
      "App Router, layouts, loading states, and streaming UI",
      "Data fetching, caching, and server actions where they fit",
      "Authentication flows and protected routes",
      "Performance, accessibility, and production deploy checklist",
    ],
  },
  {
    slug: "ui-design-system-mastery",
    title: "UI Design System Mastery",
    instructor: "Rakib Hasan",
    category: "UI/UX Design",
    level: "Beginner",
    lessons: 26,
    duration: "14h 10m",
    rating: 4.7,
    students: 7460,
    price: "$39",
    href: "/courses/ui-design-system-mastery",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=640&q=80",
    description:
      "Learn to define tokens, components, and documentation so designers and engineers stay aligned. You'll leave with a scalable library mindset—not just a folder of one-off screens.",
    highlights: [
      "Foundations: color, type, spacing, and motion tokens",
      "Composable components and variant strategies",
      "Handoff workflows that reduce rework",
      "Accessibility baked in from the first variant",
    ],
  },
  {
    slug: "data-analytics-python",
    title: "Data Analytics with Python",
    instructor: "Nadia Rahman",
    category: "Data & AI",
    level: "Advanced",
    lessons: 44,
    duration: "28h 40m",
    rating: 4.9,
    students: 9350,
    price: "$59",
    href: "/courses/data-analytics-python",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80",
    badge: "New",
    description:
      "Move from spreadsheets to code: clean data, explore with pandas, visualize stories, and communicate outcomes stakeholders trust. Includes end-to-end notebooks you can reuse at work.",
    highlights: [
      "Wrangling messy CSVs and APIs into analysis-ready frames",
      "Exploratory analysis and clear charts",
      "Statistics intuition without hand-wavy math",
      "Presenting findings in notebooks and short decks",
    ],
  },
  {
    slug: "digital-marketing-growth-lab",
    title: "Digital Marketing Growth Lab",
    instructor: "Imran Kabir",
    category: "Marketing",
    level: "Intermediate",
    lessons: 31,
    duration: "18h 20m",
    rating: 4.6,
    students: 6820,
    price: "$45",
    href: "/courses/digital-marketing-growth-lab",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&q=80",
    description:
      "Plan channels, measure what matters, and iterate with experiments. You'll connect strategy to analytics so budgets and creative both improve week over week.",
    highlights: [
      "Funnels, attribution basics, and honest metrics",
      "Content and campaign frameworks that scale",
      "Lightweight A/B thinking without chaos",
      "Reporting stakeholders actually read",
    ],
  },
  {
    slug: "fullstack-nodejs-masterclass",
    title: "Full-Stack Node.js Masterclass",
    instructor: "Omar Siddique",
    category: "Web Development",
    level: "Advanced",
    lessons: 52,
    duration: "32h 15m",
    rating: 4.85,
    students: 5120,
    price: "$55",
    href: "/courses/fullstack-nodejs-masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=640&q=80",
    description:
      "Design APIs, persist data safely, and harden services for traffic spikes. You'll work through a coherent product backend with testing and observability habits that survive production.",
    highlights: [
      "REST design, validation, and error contracts",
      "SQL/NoSQL tradeoffs with pragmatic schemas",
      "AuthN/Z patterns and secrets hygiene",
      "Logging, metrics, and deployable Docker basics",
    ],
  },
  {
    slug: "machine-learning-foundations",
    title: "Machine Learning Foundations",
    instructor: "Leila Chowdhury",
    category: "Data & AI",
    level: "Intermediate",
    lessons: 36,
    duration: "24h 00m",
    rating: 4.75,
    students: 9040,
    price: "$59",
    href: "/courses/machine-learning-foundations",
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=640&q=80",
    description:
      "Core supervised learning with scikit-learn: from problem framing to evaluation. Focus on intuition, diagnostics, and when to stop tuning and ship.",
    highlights: [
      "Problem framing, labels, and baselines",
      "Linear models, trees, and ensembles at a practical depth",
      "Cross-validation and leakage awareness",
      "Calibration between model complexity and data size",
    ],
  },
  {
    slug: "figma-product-designers",
    title: "Figma for Product Designers",
    instructor: "Anika Islam",
    category: "UI/UX Design",
    level: "Beginner",
    lessons: 22,
    duration: "11h 45m",
    rating: 4.65,
    students: 12100,
    price: "$35",
    href: "/courses/figma-product-designers",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=640&q=80",
    badge: "Popular",
    description:
      "Turn ideas into structured files: components, variants, auto layout, and prototypes that your team can build from. Less mess in the canvas, more predictability in delivery.",
    highlights: [
      "Stable component architecture and naming",
      "Variants that match real product states",
      "Prototyping flows without overbuilding",
      "Specs and dev handoff that reduce ping-pong",
    ],
  },
  {
    slug: "devops-docker-kubernetes",
    title: "DevOps with Docker & Kubernetes",
    instructor: "Tanvir Hossain",
    category: "DevOps",
    level: "Advanced",
    lessons: 40,
    duration: "26h 30m",
    rating: 4.7,
    students: 3890,
    price: "$65",
    href: "/courses/devops-docker-kubernetes",
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=640&q=80",
    description:
      "Package apps, run them locally and in clusters, and understand the moving parts ops teams expect. Emphasis on debugging workflows when things fail—as they always do.",
    highlights: [
      "Dockerfiles that cache well and stay small",
      "Compose for local parity with staging",
      "Kubernetes objects you actually need first",
      "CI hooks and rollout discipline without cargo culting",
    ],
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    instructor: "Farhan Ali",
    category: "Web Development",
    level: "Intermediate",
    lessons: 29,
    duration: "16h 50m",
    rating: 4.82,
    students: 7880,
    price: "$42",
    href: "/courses/typescript-deep-dive",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=640&q=80",
    description:
      "Level up from any-infected code to types that guide refactors. Generics, inference, utility types, and narrowing patterns for safer React and Node codebases.",
    highlights: [
      "Structural typing vs your mental JavaScript model",
      "Generics and constraints without ceremony",
      "Utility types that remove duplication",
      "Typing async flows and boundary layers",
    ],
  },
  {
    slug: "content-strategy-creators",
    title: "Content Strategy for Creators",
    instructor: "Mira Karim",
    category: "Marketing",
    level: "Beginner",
    lessons: 18,
    duration: "9h 20m",
    rating: 4.55,
    students: 4520,
    price: "$29",
    href: "/courses/content-strategy-creators",
    thumbnail:
      "https://images.unsplash.com/photo-1432888498260-38fa4eaf6fd8?auto=format&fit=crop&w=640&q=80",
    description:
      "Plan editorial calendars, hooks, and distribution so your message compounds. Built for solo creators and small teams who need clarity more than hacks.",
    highlights: [
      "Positioning and audience mapping you’ll reuse",
      "Content pillars and repeatable formats",
      "Lightweight analytics for iteration",
      "Workflows that avoid creator burnout",
    ],
  },
];

export function getCourseBySlug(slug: string): CourseRecord | undefined {
  return allCourses.find((c) => c.slug === slug);
}

export function toCourseCardProps({
  slug: _slug,
  description: _description,
  highlights: _highlights,
  ...card
}: CourseRecord): CourseCardProps {
  return card;
}
