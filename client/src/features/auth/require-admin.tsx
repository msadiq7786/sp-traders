"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import BgLoader from "@/components/ui/bg-loader";

interface RequireAdminAuthProps {
  children: React.ReactNode;
}

export function RequireAdminAuth({ children }: RequireAdminAuthProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const role = (session?.user as { role?: string } | undefined)?.role;
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/dashboard");
    }
  }, [session, isPending, role, router]);

  if (isPending) {
    return <BgLoader />;
  }

  if (!session || role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
