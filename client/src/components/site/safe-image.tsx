"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type SafeImageProps = ImageProps;

/**
 * Wraps next/image and falls back to a plain muted tile if the source
 * 404s — useful while placeholder Pexels URLs are still being swapped
 * out for final imagery.
 */
export function SafeImage({ className, alt, ...props }: SafeImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "bg-muted text-muted-foreground flex items-center justify-center text-sm",
          className,
        )}
        role="img"
        aria-label={typeof alt === "string" ? alt : undefined}
      >
        {alt}
      </div>
    );
  }

  return (
    <Image
      className={className}
      alt={alt}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
