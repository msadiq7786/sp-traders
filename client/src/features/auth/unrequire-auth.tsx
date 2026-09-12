"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import BgLoader from "@/components/ui/bg-loader";

interface UnRequireAuthProps {
  children: React.ReactNode;
}

export function UnRequireAuth({ children }: UnRequireAuthProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <BgLoader />;
  }

  if (session) {
    return null;
  }

  return <>{children}</>;
}
