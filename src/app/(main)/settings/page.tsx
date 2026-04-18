import AuthGuard from "@/components/auth/AuthGuard";
import SettingsPageContent from "@/components/settings/SettingsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Course Hub",
  description: "Account settings and preferences.",
};

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsPageContent />
    </AuthGuard>
  );
}
