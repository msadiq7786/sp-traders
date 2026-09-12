import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { socialLinks } from "@/data/social-links";

const footer = {
  name: "SP-Traders",
  tagline: "Established 2017 · Mysore, Karnataka",
  description:
    "Manufacturer and supplier of Fuel Oil (HSN 2710 19 50) and Hexane Oil (HSN 29011000). Serving industries and traders across Karnataka.",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
  ],
  copyright: `© ${new Date().getFullYear()} SP-Traders. All rights reserved.`,
} as const;

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top row: brand + nav + social */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <div>
                <span className="font-display text-lg font-semibold leading-none font-mono uppercase">
                  {footer.name}
                </span>
                <p className="text-primary-foreground/50 text-xs mt-0.5">
                  {footer.tagline}
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/70 mt-4 text-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Horizontal nav */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium">Navigate</p>
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {footer.nav.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social icons */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium">Social Connect</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="size-5 fill-primary-foreground/60 hover:fill-primary-foreground transition-all duration-200" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/15 my-10" />

        <p className="text-primary-foreground/50 text-xs text-center">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
