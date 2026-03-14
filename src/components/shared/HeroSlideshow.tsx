"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  /** Seconds each image stays visible (default 6) */
  interval?: number;
  /** Crossfade duration in ms (default 1500) */
  fadeDuration?: number;
}

/**
 * Full-screen crossfade slideshow for hero backgrounds.
 * Renders all images stacked; only the active one is opacity-100.
 * Pure CSS transitions — no extra dependencies.
 */
export function HeroSlideshow({
  images,
  interval = 6,
  fadeDuration = 1500,
}: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          className="object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
          }}
        />
      ))}
    </>
  );
}
