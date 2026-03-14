import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  bgImage,
  size = "md",
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5",
        {
          "py-10 lg:py-14": size === "sm",
          "py-14 lg:py-20": size === "md",
          "py-20 lg:py-28": size === "lg",
        },
        className
      )}
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Decorative floating blobs — hidden on mobile */}
      <div className="hidden lg:block pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-primary/8 animate-float-slow" />
        <div className="absolute top-1/2 -left-16 w-40 h-40 rounded-full bg-secondary/10 animate-float-medium" style={{ animationDelay: "1.5s" }} />
        <div className="absolute -bottom-8 right-1/4 w-32 h-32 rounded-full bg-primary/6 animate-drift-x" style={{ animationDelay: "0.8s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-muted-foreground/50">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1
          className={cn("font-bold text-foreground", {
            "text-3xl lg:text-4xl": size === "sm",
            "text-4xl lg:text-5xl": size === "md",
            "text-5xl lg:text-6xl": size === "lg",
          })}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
