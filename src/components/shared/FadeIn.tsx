"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * Scroll-triggered fade-in animation wrapper.
 * Uses Intersection Observer — no external dependencies.
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("fade-in-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const directionMap = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`opacity-0 ${directionMap[direction]} transition-all duration-700 ease-out ${className}`}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}

/**
 * Staggered children animation — each child fades in with increasing delay.
 */
export function StaggerChildren({
  children,
  className = "",
  stagger = 100,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  direction?: FadeInProps["direction"];
}) {
  return (
    <>
      {children.map((child, i) => (
        <FadeIn key={i} delay={i * stagger} direction={direction} className={className}>
          {child}
        </FadeIn>
      ))}
    </>
  );
}
