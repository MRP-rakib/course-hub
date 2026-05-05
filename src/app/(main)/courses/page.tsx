import { Suspense } from "react";
import CoursesListing from "@/components/courses/CoursesListing";

export default function Courses() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesListing />
    </Suspense>
  );
}