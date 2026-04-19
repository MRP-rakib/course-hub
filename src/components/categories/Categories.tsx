import Link from "next/link";
import Container from "../utils/Container";
import {
  Code2,
  Palette,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Camera,
  Stethoscope,
  Languages,
  Cpu,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    description: "Frontend, backend, and full stack projects.",
    icon: Code2,
    href: "/courses?category=web-development",
  },
  {
    name: "UI/UX Design",
    description: "Design systems, prototyping, and user flows.",
    icon: Palette,
    href: "/courses?category=ui-ux-design",
  },
  {
    name: "Business",
    description: "Leadership, operations, and startup basics.",
    icon: BriefcaseBusiness,
    href: "/courses?category=business",
  },
  {
    name: "Marketing",
    description: "SEO, social media, and growth strategies.",
    icon: ChartNoAxesColumnIncreasing,
    href: "/courses?category=marketing",
  },
  {
    name: "Photography",
    description: "Composition, editing, and visual storytelling.",
    icon: Camera,
    href: "/courses?category=photography",
  },
  {
    name: "Health & Fitness",
    description: "Nutrition, workouts, and healthy routines.",
    icon: Stethoscope,
    href: "/courses?category=health-fitness",
  },
  {
    name: "Language Learning",
    description: "English and global language communication.",
    icon: Languages,
    href: "/courses?category=language-learning",
  },
  {
    name: "Data & AI",
    description: "Analytics, machine learning, and AI tools.",
    icon: Cpu,
    href: "/courses?category=data-ai",
  },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden border-b border-white/6 bg-[#0a0a0f]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-70 w-[min(100%,820px)] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[110px]" />

      <Container className="relative py-14 md:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
            Explore by category
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Choose your learning path
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
            Pick a category and start building practical skills with structured courses and
            projects.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-2xl border border-white/8 bg-white/2 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-violet-500/[0.07]"
              >
                <div className="inline-flex rounded-xl border border-white/1 bg-white/3 p-2.5 text-violet-300 transition-colors group-hover:border-violet-500/35 group-hover:bg-violet-500/10">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{category.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/45">{category.description}</p>
                <span className="mt-4 inline-flex text-xs font-semibold tracking-wide text-violet-300/90">
                  View courses →
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
