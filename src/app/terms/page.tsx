import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, CalendarX2, CreditCard, FileWarning, ClipboardCheck, Copyright, Scale, Landmark } from "lucide-react";

export const metadata = {
  title: `Terms of Service — ${SITE_NAME}`,
  description: "Terms of Service for AEGLE Skin Care Clinic. Read our terms and conditions for using our services and website.",
};

const sections = [
  { icon: Stethoscope, title: "1. Services", content: "AEGLE Skin Care Clinic provides dermatological treatments, cosmetic procedures, skin care consultations, and beauty products. All treatments are performed by qualified dermatologists and trained professionals. Results may vary based on individual skin type and condition." },
  { icon: CalendarX2, title: "2. Appointments & Cancellations", content: "Appointments must be booked in advance. Cancellations require at least 24 hours notice. Late cancellations or no-shows may incur a fee. We reserve the right to reschedule appointments if necessary for medical reasons." },
  { icon: CreditCard, title: "3. Payment Terms", content: "Payment is due at the time of service unless otherwise arranged. We accept cash, credit/debit cards, UPI, and net banking via Razorpay. Package deals must be paid in full upfront or via approved EMI options. Prices are subject to change without prior notice." },
  { icon: FileWarning, title: "4. Medical Disclaimer", content: "Our website content is for informational purposes only and does not constitute medical advice. Treatment outcomes vary by individual. A thorough consultation is required before any procedure. Patients must disclose all relevant medical history, allergies, and medications." },
  { icon: ClipboardCheck, title: "5. Consent", content: "Written informed consent is required before all procedures. You will be informed about expected outcomes, potential risks, aftercare requirements, and alternative options. You may withdraw consent at any time before the procedure begins." },
  { icon: Copyright, title: "6. Intellectual Property", content: "All content on this website — including text, images, logos, and design — is the property of AEGLE Skin Care Clinic and is protected by copyright. Unauthorized reproduction or distribution is prohibited." },
  { icon: Scale, title: "7. Limitation of Liability", content: "AEGLE Skin Care Clinic is not liable for outcomes that deviate from expectations due to individual biological response, non-compliance with aftercare instructions, or undisclosed medical conditions. Our maximum liability is limited to the amount paid for the specific service." },
  { icon: Landmark, title: "8. Governing Law", content: "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka." },
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" subtitle="Please read these terms carefully before using our services." breadcrumbs={[{ label: "Terms of Service" }]} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-10">
            <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80" alt="Terms and agreement" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Terms & Conditions</p>
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
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
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
