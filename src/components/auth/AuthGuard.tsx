"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthGuardProps = {
  children: React.ReactNode;
  /** Redirect target when not signed in (default /signin) */
  loginPath?: string;
};

/**
 * Renders children only when a user is signed in (client session).
 * Redirects to sign-in with ?next= current path when unauthenticated.
 */
export default function AuthGuard({ children, loginPath = "/signin" }: AuthGuardProps) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready || user) return;
    const encoded = encodeURIComponent(pathname || "/");
    router.replace(`${loginPath}?next=${encoded}`);
  }, [ready, user, router, pathname, loginPath]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#0a0a0f] text-sm text-white/45">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#0a0a0f] text-sm text-white/45">
        Redirecting to sign in…
      </div>
    );
  }

  return <>{children}</>;
}
