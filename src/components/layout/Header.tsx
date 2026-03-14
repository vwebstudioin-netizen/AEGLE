"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE, PROMO_CONFIG, WHATSAPP_NUMBER } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(null);
  }, [pathname]);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-primary text-white text-sm hidden lg:block">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {PROMO_CONFIG.enabled && (
              <span className="font-semibold">✨ {PROMO_CONFIG.badgeText} on all treatments</span>
            )}
            <span className="text-white/50">|</span>
            <span>📞 {WHATSAPP_NUMBER.replace(/^91/, "+91 ")}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/portal/login" className="hover:text-white/80 transition-colors">
              Client Portal
            </Link>
            <span className="text-white/50">|</span>
            <Link href="/shop" className="hover:text-white/80 transition-colors">
              Shop
            </Link>
            <span className="text-white/50">|</span>
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-background/95 backdrop-blur-md transition-shadow",
          scrolled && "shadow-md"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/logo-icon.svg" alt="AEGLE" width={40} height={40} className="rounded-lg" priority />
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-foreground leading-none">
                  {SITE_NAME}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {SITE_TAGLINE}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children ? setMegaMenuOpen(link.label) : undefined
                  }
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted",
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <span className="ml-1 text-xs">▾</span>
                    )}
                  </Link>

                  {/* Mega menu dropdown */}
                  {link.children && megaMenuOpen === link.label && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className={cn(
                        "bg-card border border-border rounded-xl shadow-xl p-4 animate-fadeIn",
                        link.children.length > 5 ? "min-w-[480px] grid grid-cols-2 gap-1" : "min-w-[220px]"
                      )}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2 text-sm rounded-lg transition-colors",
                              pathname === child.href
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/80 hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link href="/appointment" className="hidden sm:block">
                <Button size="sm">Book Consultation</Button>
              </Link>
              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={cn(
                      "h-0.5 w-full bg-foreground transition-transform",
                      mobileOpen && "rotate-45 translate-y-2"
                    )}
                  />
                  <span
                    className={cn(
                      "h-0.5 w-full bg-foreground transition-opacity",
                      mobileOpen && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "h-0.5 w-full bg-foreground transition-transform",
                      mobileOpen && "-rotate-45 -translate-y-2"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && !isDesktop && (
          <div className="lg:hidden border-t border-border bg-background animate-slideIn">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <Link href="/appointment" className="block">
                  <Button className="w-full">Book Consultation</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
