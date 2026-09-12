"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const ctaBanner = {
  heading: "Looking to buy Fuel Oil or Hexane Oil?",
  body: "Call or WhatsApp us with your quantity and delivery location — we'll respond quickly with pricing and availability.",
  cta: { label: "WhatsApp Us", href: "https://wa.me/91XXXXXXXXXX" },
} as const;

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-primary-foreground flex flex-col items-start gap-6 rounded-2xl px-8 py-12 md:flex-row md:items-center md:justify-between md:px-14"
      >
        <div>
          <h2 className="max-w-md text-2xl font-medium tracking-tight md:text-3xl">
            {ctaBanner.heading}
          </h2>
          <p className="text-primary-foreground/70 mt-2 max-w-md text-sm">
            {ctaBanner.body}
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          className="shrink-0"
          render={
            <Link
              href={ctaBanner.cta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaBanner.cta.label}
            </Link>
          }
        />
      </motion.div>
    </section>
  );
}
