"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../ui/toggle-theme";
import { authClient } from "@/lib/auth-client";

const navbar = {
  name: "SP-Traders",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
  ],
} as const;

export function Navbar() {
  const session = authClient.useSession();
  const user = session.data?.user;
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#home" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight font-mono uppercase">
            {navbar.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navbar.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          <Separator orientation="vertical" className="mx-1 h-6" />
          {user ? (
            user.role === "admin" ? (
              <Button render={<Link href="/admin">Dashboard</Link>} />
            ) : (
              <Button render={<Link href="/dashboard">Dashboard</Link>} />
            )
          ) : (
            <div className="flex gap-2 px-4">
              <Button
                variant="outline"
                render={<Link href="/login">Login</Link>}
              />
              <Button render={<Link href="/register">Register</Link>} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{navbar.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {navbar.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground hover:bg-muted rounded-md px-3 py-2 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-4" />
              {user ? (
                user.role === "admin" ? (
                  <Button render={<Link href="/admin">Dashboard</Link>} />
                ) : (
                  <Button render={<Link href="/dashboard">Dashboard</Link>} />
                )
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Button
                    variant="outline"
                    render={<Link href="/login">Login</Link>}
                  />
                  <Button render={<Link href="/register">Register</Link>} />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
