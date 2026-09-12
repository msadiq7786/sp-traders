"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/site/safe-image";
import { images } from "@/data/images";

const hero = {
  eyebrow: "LDO Manufacturer · Mysore, Karnataka",
  heading: "Quality Fuel Oil & Hexane Oil",
  subheading:
    "SP-Traders is a trusted manufacturer and supplier of Fuel Oil and Hexane Oil based in Mysore. We serve industries, factories, and traders across Karnataka with consistent quality and reliable supply.",
} as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  const slides = images.slides;
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[480px] md:min-h-[540px]"
    >
      {/* Auto-slide background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <SafeImage
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            priority={current === 0}
            className="object-cover"
          />
          {/* Left scrim — keeps text readable without hiding the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          {/* Bottom fade to blend with page */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-20 pb-16 md:pt-28 md:pb-20 z-10"
      >
        <motion.span
          variants={item}
          className="text-white/80 border-white/30 w-fit rounded-full border px-3 py-1 text-xs backdrop-blur-sm bg-black/20"
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-2xl text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl text-white drop-shadow-lg"
        >
          {hero.heading}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white/85 max-w-xl text-base md:text-lg drop-shadow"
        >
          {hero.subheading}
        </motion.p>

        <motion.div variants={item}>
          <Button
            size="lg"
            className="text-lg font-medium p-5"
            render={<Link href="/dashboard">Get Started</Link>}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
