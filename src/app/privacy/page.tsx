import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Lock, Share2, UserCheck, Cookie, Mail } from "lucide-react";

export const metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: "Privacy Policy for AEGLE Skin Care Clinic. Learn how we collect, use, and protect your personal data.",
};

const sections = [
  { icon: Database, title: "1. Information We Collect", content: "We collect personal information you provide when booking appointments, creating an account, making purchases, or contacting us. This includes your name, phone number, email address, medical history relevant to treatments, payment information, and any photographs taken for treatment documentation." },
  { icon: Shield, title: "2. How We Use Your Information", content: "Your information is used to: provide skin care treatments and consultations, process appointments and payments, send treatment reminders and follow-up care instructions, improve our services, communicate offers and updates (with your consent), and comply with legal obligations." },
  { icon: Lock, title: "3. Data Protection", content: "We implement industry-standard security measures to protect your personal data. Medical records and treatment photographs are stored securely with restricted access. We use encrypted connections (SSL/TLS) for all data transmissions. Payment processing is handled by certified third-party gateways (Razorpay)." },
  { icon: Share2, title: "4. Data Sharing", content: "We do not sell your personal data. We may share limited information with: payment processors, cloud service providers, and legal authorities when required by law. All third-party partners are bound by data protection agreements." },
  { icon: UserCheck, title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. To exercise your rights, contact us at info@aegleclinic.com." },
  { icon: Cookie, title: "6. Cookies", content: "Our website uses essential cookies for functionality and analytics cookies to improve user experience. You can manage cookie preferences through your browser settings." },
  { icon: Mail, title: "7. Contact Us", content: "For privacy-related inquiries, contact us at:\nEmail: info@aegleclinic.com\nPhone: 8050507755\nAddress: AEGLE Skin Care Clinic, Bangalore, Karnataka, India" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your personal data." breadcrumbs={[{ label: "Privacy Policy" }]} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Decorative banner */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-10">
            <Image src="https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=1600&q=80" alt="Data protection" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Your Privacy Matters</p>
              <p className="text-sm text-white/80">Last updated: March 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.title} className="border-l-4 border-l-primary/40 hover:border-l-primary transition-colors">
                  <CardContent className="p-5 flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground mb-2">{s.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
