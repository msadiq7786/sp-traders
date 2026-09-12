"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { oilProducts } from "@/data/products";

const intro = {
  eyebrow: "About SP-Traders",
  heading: "Local manufacturer. Reliable supply — since 2017.",
  body: "Based in Mysore, Karnataka, SP-Traders manufactures and supplies Fuel Oil and Hexane Oil to industries, traders, and factories. We focus on consistent quality, fair pricing, and timely delivery.",
  cta: { label: "Why choose us", href: "#why-us" },
} as const;

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
        {/* Left: About text */}
        <div>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            {intro.eyebrow}
          </span>
          <h2 className="mt-3 max-w-md text-3xl font-medium tracking-tight md:text-4xl">
            {intro.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-sm md:text-base leading-relaxed">
            {intro.body}
          </p>
          <Button
            variant="outline"
            className="mt-6"
            render={<Link href={intro.cta.href}>{intro.cta.label}</Link>}
          />
        </div>

        {/* Right: Product cards aligned equally */}
        <div className="grid grid-cols-2 gap-5 md:border-l md:pl-16">
          {oilProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border p-5 flex flex-col gap-3 h-full"
            >
              <div>
                <p className="font-semibold text-base">{product.name}</p>
                <p className="text-muted-foreground text-[11px] mt-1 font-mono bg-muted inline-block px-2 py-0.5 rounded">
                  {product.hsn}
                </p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
