import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Course Hub",
  description:
    "Our mission, values, and how Course Hub helps learners and instructors build real skills.",
};

export default function AboutPage() {
  return <AboutContent />;
}
