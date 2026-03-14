import Image from "next/image";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Undo2, PackageOpen, ShoppingBag, CalendarX2, Clock, PhoneCall } from "lucide-react";

export const metadata = {
  title: `Refund Policy — ${SITE_NAME}`,
  description: "Refund and cancellation policy for AEGLE Skin Care Clinic treatments, packages, and product purchases.",
};

const sections = [
  { icon: Undo2, title: "1. Treatment Refunds", content: "Individual treatments are non-refundable once performed. If you are unsatisfied with a treatment, please contact us within 48 hours for a free follow-up consultation. We are committed to ensuring your satisfaction and may offer complimentary corrective sessions at our dermatologist\u2019s discretion." },
  { icon: PackageOpen, title: "2. Package Refunds", content: "Treatment packages may be cancelled with a refund for unused sessions, subject to a 15% administrative fee. Packages must be cancelled within 6 months of purchase. Used sessions will be charged at individual session rates, and the balance will be refunded." },
  { icon: ShoppingBag, title: "3. Product Returns", content: "Unopened products may be returned within 7 days of purchase for a full refund. Opened products cannot be returned for hygiene reasons unless they are defective. Defective products will be replaced or refunded at no extra cost." },
  { icon: CalendarX2, title: "4. Cancellation of Appointments", content: "Appointments cancelled more than 24 hours in advance incur no charges. Late cancellations (less than 24 hours) may be charged a fee of \u20B9500. No-shows will be charged the full consultation fee." },
  { icon: Clock, title: "5. Refund Processing", content: "Approved refunds are processed within 7\u201310 business days. Refunds are credited to the original payment method. Cash payments are refunded via bank transfer. You will receive an email confirmation once the refund is initiated." },
  { icon: PhoneCall, title: "6. How to Request a Refund", content: `To request a refund, please contact us at:\nEmail: ${CONTACT_EMAIL}\nPhone: ${CONTACT_PHONE}\nVisit: Any AEGLE clinic location\n\nPlease include your booking reference, date of service, and reason for the refund request.` },
];

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero title="Refund Policy" subtitle="Our transparent refund and cancellation policy for treatments, packages, and products." breadcrumbs={[{ label: "Refund Policy" }]} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-10">
            <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80" alt="Refund policy" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Transparent & Fair Refunds</p>
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
