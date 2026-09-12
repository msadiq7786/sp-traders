"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { reviews } from "@/data/reviews";

const reviewsSection = {
  eyebrow: "Customer reviews",
  heading: "What our customers say",
  body: "Feedback from businesses who buy from SP-Traders.",
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="max-w-xl">
        <span className="text-muted-foreground text-xs">
          {reviewsSection.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          {reviewsSection.heading}
        </h2>
        <p className="text-muted-foreground mt-4 text-sm md:text-base">
          {reviewsSection.body}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
          >
            <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="flex h-full flex-col gap-4">
                <div
                  className="flex gap-0.5"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < review.rating
                          ? "size-4 fill-yellow-500 stroke-0"
                          : "fill-muted-foreground/30 size-4 stroke-0"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">{review.quote}</p>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <Avatar>
                    {review.image && (
                      <AvatarImage src={review.image} alt={review.name} />
                    )}
                    <AvatarFallback>{initials(review.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {review.role} · {review.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
