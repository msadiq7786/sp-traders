"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SafeImage } from "@/components/site/safe-image";
import { images } from "@/data/images";

const whyUs = {
  eyebrow: "Why customers choose SP-Traders",
  heading: "Simple, reliable oil supply — since 2017",
  body: "We keep things straightforward — quality products, honest pricing, and delivery you can count on. Serving Karnataka's industries for over 8 years.",
  items: [
    {
      title: "Proven product quality",
      description:
        "Our Fuel Oil and Hexane Oil meet standard industrial specifications — tested and verified before every dispatch. No surprises, no rejections.",
    },
    {
      title: "Locally based in Mysore",
      description:
        "Being a Mysore-based manufacturer means faster delivery, easier coordination, and no extra middleman markups for customers in Karnataka.",
    },
    {
      title: "Flexible order quantities",
      description:
        "Whether you need a full tanker load or just a few drums, we accommodate both bulk and small-quantity orders to suit your business scale.",
    },
    {
      title: "Fast response & direct communication",
      description:
        "Reach us directly on WhatsApp or phone — no call centers, no long queues. Most enquiries are answered within the same business day.",
    },
    {
      title: "Trusted by businesses since 2017",
      description:
        "We have been supplying fuel oil and hexane oil since 2017. Our repeat customers are our biggest proof — consistent quality builds long-term trust.",
    },
    {
      title: "Proper documentation & HSN compliance",
      description:
        "All our products are supplied with valid HSN codes (2710 19 50 for Fuel Oil, 29011000 for Hexane Oil) and proper invoicing for smooth GST compliance.",
    },
  ],
} as const;

export function WhyUs() {
  return (
    <section id="why-us" className="bg-muted/40 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <span className="text-muted-foreground text-xs">{whyUs.eyebrow}</span>
          <h2 className="mt-3 max-w-md text-3xl font-medium tracking-tight md:text-4xl">
            {whyUs.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-sm md:text-base">
            {whyUs.body}
          </p>

          <Accordion className="mt-8 max-w-md">
            {whyUs.items.map((it, i) => (
              <AccordionItem key={it.title} value={`item-${i}`}>
                <AccordionTrigger className="text-base text-left">
                  {it.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {it.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative min-h-80 overflow-hidden rounded-xl md:min-h-0"
        >
          <SafeImage
            src={images.whyUs.src}
            alt={images.whyUs.alt}
            fill
            className="object-cover"
          />
          {/* Since 2017 badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-center">
            <p className="text-2xl font-bold leading-none">2017</p>
            <p className="text-xs text-white/70 mt-1">Est. in Mysore</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
