import InstructorCard from "./InstructorCard";
import Container from "../utils/Container";
import { allInstructors, toInstructorCardProps } from "@/data/instructors";

const featuredInstructors = allInstructors.slice(0, 4);

export default function FeatureInstructor() {
  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-14 md:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
            Featured instructors
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Experts behind the courses
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
            A rotating spotlight on educators—swap the array to promote different mentors anytime.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredInstructors.map((instructor) => (
            <InstructorCard
              key={instructor.href}
              {...toInstructorCardProps(instructor)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
