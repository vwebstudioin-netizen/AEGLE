import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: `Terms of Service — ${SITE_NAME}`,
  description: "Terms of Service for AEGLE Skin Care Clinic. Read our terms and conditions for using our services and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">1. Services</h2>
            <p className="text-muted-foreground leading-relaxed">AEGLE Skin Care Clinic provides dermatological treatments, cosmetic procedures, skin care consultations, and beauty products. All treatments are performed by qualified dermatologists and trained professionals. Results may vary based on individual skin type and condition.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">2. Appointments & Cancellations</h2>
            <p className="text-muted-foreground leading-relaxed">Appointments must be booked in advance. Cancellations require at least 24 hours notice. Late cancellations or no-shows may incur a fee. We reserve the right to reschedule appointments if necessary for medical reasons.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">3. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">Payment is due at the time of service unless otherwise arranged. We accept cash, credit/debit cards, UPI, and net banking via Razorpay. Package deals must be paid in full upfront or via approved EMI options. Prices are subject to change without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">4. Medical Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">Our website content is for informational purposes only and does not constitute medical advice. Treatment outcomes vary by individual. A thorough consultation is required before any procedure. Patients must disclose all relevant medical history, allergies, and medications.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">5. Consent</h2>
            <p className="text-muted-foreground leading-relaxed">Written informed consent is required before all procedures. You will be informed about expected outcomes, potential risks, aftercare requirements, and alternative options. You may withdraw consent at any time before the procedure begins.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">All content on this website — including text, images, logos, and design — is the property of AEGLE Skin Care Clinic and is protected by copyright. Unauthorized reproduction or distribution is prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">AEGLE Skin Care Clinic is not liable for outcomes that deviate from expectations due to individual biological response, non-compliance with aftercare instructions, or undisclosed medical conditions. Our maximum liability is limited to the amount paid for the specific service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
