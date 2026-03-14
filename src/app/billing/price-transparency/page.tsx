import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Price Transparency", description: "AEGLE Skin Care Clinic's commitment to healthcare price transparency." };

export default function PriceTransparencyPage() {
  return (
    <>
      <PageHero title="Price Transparency" subtitle="We are committed to helping you understand the cost of your care." breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "Price Transparency" }]} />
      <section className="container mx-auto px-4 py-16 max-w-3xl prose dark:prose-invert">
        <h2>Our Commitment</h2>
        <p>In compliance with the Price Transparency Policy, AEGLE Skin Care Clinic publishes a comprehensive list of standard charges for all items and services. This information empowers patients to make informed decisions about their healthcare.</p>

        <h2>Machine-Readable Files</h2>
        <p>The following files contain our standard charges in machine-readable format, updated annually:</p>
        <ul>
          <li><strong>Standard Charges (CSV)</strong> — Complete list of gross charges, discounted cash prices, payer-specific negotiated charges, and de-identified minimum and maximum negotiated charges.</li>
          <li><strong>Shoppable Services (CSV)</strong> — 300 shoppable services with bundled pricing including ancillary services.</li>
        </ul>
        <div className="not-prose flex gap-4 my-6">
          <a href="#"><Button variant="outline">Download Standard Charges (CSV)</Button></a>
          <a href="#"><Button variant="outline">Download Shoppable Services (CSV)</Button></a>
        </div>

        <h2>Consumer-Friendly Tools</h2>
        <p>For an easier way to estimate your costs, visit our <Link href="/billing/cost-estimator" className="text-primary hover:underline">Cost Estimator</Link> tool. You can also contact our <Link href="/patients-visitors/financial-counseling" className="text-primary hover:underline">Financial Counseling</Link> team for personalized estimates.</p>

        <h2>Questions?</h2>
        <p>If you have questions about pricing or your bill, please call our billing department at <strong>8050507755</strong> or email <strong>billing@aegleclinic.com</strong>.</p>
      </section>
    </>
  );
}
