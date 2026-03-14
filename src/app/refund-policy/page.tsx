import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

export const metadata = {
  title: `Refund Policy — ${SITE_NAME}`,
  description: "Refund and cancellation policy for AEGLE Skin Care Clinic treatments, packages, and product purchases.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">1. Treatment Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">Individual treatments are non-refundable once performed. If you are unsatisfied with a treatment, please contact us within 48 hours for a free follow-up consultation. We are committed to ensuring your satisfaction and may offer complimentary corrective sessions at our dermatologist&apos;s discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">2. Package Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">Treatment packages may be cancelled with a refund for unused sessions, subject to a 15% administrative fee. Packages must be cancelled within 6 months of purchase. Used sessions will be charged at individual session rates, and the balance will be refunded.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">3. Product Returns</h2>
            <p className="text-muted-foreground leading-relaxed">Unopened products may be returned within 7 days of purchase for a full refund. Opened products cannot be returned for hygiene reasons unless they are defective. Defective products will be replaced or refunded at no extra cost.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">4. Cancellation of Appointments</h2>
            <p className="text-muted-foreground leading-relaxed">Appointments cancelled more than 24 hours in advance incur no charges. Late cancellations (less than 24 hours) may be charged a fee of ₹500. No-shows will be charged the full consultation fee.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">5. Refund Processing</h2>
            <p className="text-muted-foreground leading-relaxed">Approved refunds are processed within 7–10 business days. Refunds are credited to the original payment method. Cash payments are refunded via bank transfer. You will receive an email confirmation once the refund is initiated.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">6. How to Request a Refund</h2>
            <p className="text-muted-foreground leading-relaxed">To request a refund, please contact us at:<br />Email: {CONTACT_EMAIL}<br />Phone: {CONTACT_PHONE}<br />Visit: Any AEGLE clinic location<br /><br />Please include your booking reference, date of service, and reason for the refund request.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
