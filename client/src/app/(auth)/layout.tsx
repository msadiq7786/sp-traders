import React from "react";
import { UnRequireAuth } from "@/features/auth/unrequire-auth";

function AuthLayout({ children }: React.PropsWithChildren) {
  return <UnRequireAuth>{children}</UnRequireAuth>;
}

export default AuthLayout;
