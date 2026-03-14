import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: "Privacy Policy for AEGLE Skin Care Clinic. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">We collect personal information you provide when booking appointments, creating an account, making purchases, or contacting us. This includes your name, phone number, email address, medical history relevant to treatments, payment information, and any photographs taken for treatment documentation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">Your information is used to: provide skin care treatments and consultations, process appointments and payments, send treatment reminders and follow-up care instructions, improve our services, communicate offers and updates (with your consent), and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">3. Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">We implement industry-standard security measures to protect your personal data. Medical records and treatment photographs are stored securely with restricted access. We use encrypted connections (SSL/TLS) for all data transmissions. Payment processing is handled by certified third-party gateways (Razorpay).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">We do not sell your personal data. We may share limited information with: payment processors, cloud service providers, and legal authorities when required by law. All third-party partners are bound by data protection agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. To exercise your rights, contact us at info@aegleclinic.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">6. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">Our website uses essential cookies for functionality and analytics cookies to improve user experience. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">For privacy-related inquiries, contact us at:<br />Email: info@aegleclinic.com<br />Phone: 8050507755<br />Address: AEGLE Skin Care Clinic, Bangalore, Karnataka, India</p>
          </section>
        </div>
      </div>
    </main>
  );
}
