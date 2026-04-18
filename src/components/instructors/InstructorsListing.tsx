"use client";

import { useMemo, useState } from "react";
import InstructorCard from "./InstructorCard";
import Container from "../utils/Container";
import PaginationBtn from "../utils/paginationBtn";
import { allInstructors, toInstructorCardProps } from "@/data/instructors";

const PAGE_SIZE = 8;

export default function InstructorsListing() {
  const [page, setPage] = useState(1);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allInstructors.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <section className="border-b border-white/[0.06] bg-[#0a0a0f] py-14 md:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-300">
            Instructors
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Learn from experienced teachers
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
            Browse every instructor in the hub—ratings, student counts, and courses taught in one
            place.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {paged.map((instructor) => (
            <InstructorCard
              key={instructor.href}
              {...toInstructorCardProps(instructor)}
            />
          ))}
        </div>

        <div className="mt-10">
          <PaginationBtn
            currentPage={page}
            totalItems={allInstructors.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            siblingCount={1}
          />
        </div>
      </Container>
    </section>
  );
}
