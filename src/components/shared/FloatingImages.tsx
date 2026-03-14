import Image from "next/image";

export interface FloatingImage {
  src: string;
  alt: string;
  /** Tailwind classes for positioning, e.g. "top-10 right-8" */
  position: string;
  /** px width/height  */
  size?: number;
  /** One of the float animation utility classes */
  animation?: "animate-float-slow" | "animate-float-medium" | "animate-float-fast" | "animate-drift-x" | "animate-pulse-glow";
  /** Extra delay so images don't all sync up, e.g. "animation-delay: 1s" */
  delay?: string;
  /** Extra Tailwind classes */
  className?: string;
}

interface FloatingImagesProps {
  images: FloatingImage[];
}

/**
 * Renders absolutely-positioned images that float/bob continuously.
 * Drop this inside any `relative overflow-hidden` hero section.
 */
export function FloatingImages({ images }: FloatingImagesProps) {
  return (
    <>
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none z-[1] ${img.position} ${img.animation ?? "animate-float-slow"} ${img.className ?? ""}`}
          style={img.delay ? { animationDelay: img.delay } : undefined}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.size ?? 120}
            height={img.size ?? 120}
            className="rounded-2xl shadow-2xl object-cover opacity-60"
          />
        </div>
      ))}
    </>
  );
}
