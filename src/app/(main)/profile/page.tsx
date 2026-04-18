import AuthGuard from "@/components/auth/AuthGuard";
import ProfilePageContent from "@/components/profile/ProfilePageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My profile | Course Hub",
  description: "View and manage your Course Hub account profile.",
};

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}
