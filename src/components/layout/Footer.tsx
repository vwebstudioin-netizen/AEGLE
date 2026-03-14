import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CLINIC_ADDRESS,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  PROMO_CONFIG,
} from "@/lib/constants";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Promo banner (instead of emergency) */}
      {PROMO_CONFIG.enabled && (
        <div className="gradient-gold py-3">
          <div className="container mx-auto px-4 text-center text-sm font-semibold text-pink-900 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> {PROMO_CONFIG.bannerText}
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo-icon.svg" alt="AEGLE" width={40} height={40} className="rounded-lg" />
              <span className="font-bold text-lg text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              {SITE_TAGLINE} — Premium skin care clinic delivering advanced dermatological treatments for radiant, youthful skin.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {CLINIC_ADDRESS}</p>
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-500" /> {CONTACT_PHONE}</p>
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-500" /> {CONTACT_EMAIL}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-white font-semibold mb-4">Treatments</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.treatments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-white font-semibold mb-4">More</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                X
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                LI
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {currentYear} {SITE_NAME}. All rights reserved.</p>
          <p>
            Built with <span className="text-primary">MYW Templates</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
