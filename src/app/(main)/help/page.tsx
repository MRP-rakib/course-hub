import HelpContent from "@/components/help/HelpContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & FAQ | Course Hub",
  description:
    "Answers about getting started, courses, billing, and technical issues on Course Hub.",
};

export default function HelpPage() {
  return <HelpContent />;
}
