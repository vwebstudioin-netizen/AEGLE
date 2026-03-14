import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "No Surprises Act", description: "Your rights under the No Surprises Act and Good Faith Estimates at AEGLE Skin Care Clinic." };

export default function NoSurprisesPage() {
  return (
    <>
      <PageHero title="No Surprises Act" subtitle="Understanding your protections against unexpected medical bills." breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "No Surprises Act" }]} />
      <section className="container mx-auto px-4 py-16 max-w-3xl prose dark:prose-invert">
        <h2>What is the No Surprises Act?</h2>
        <p>Effective January 1, 2022, the No Surprises Act protects patients from surprise medical bills when they receive emergency care, non-emergency care from out-of-network providers at in-network facilities, and care from out-of-network air ambulance providers.</p>

        <h2>Your Rights</h2>
        <ul>
          <li><strong>Emergency Services:</strong> You cannot be charged more than in-network cost sharing for emergency services, even from out-of-network providers.</li>
          <li><strong>Non-Emergency Services:</strong> Out-of-network providers at in-network facilities must give you an advance notice and obtain your consent before providing services at out-of-network rates.</li>
          <li><strong>Good Faith Estimates:</strong> If you are uninsured or self-pay, you have the right to receive a Good Faith Estimate of expected charges before your visit.</li>
        </ul>

        <h2>Good Faith Estimates</h2>
        <p>Under the No Surprises Act, healthcare providers must give patients who don&apos;t have insurance or who are not using insurance an estimate of the expected charges for medical services, including related costs like medical tests, prescription drugs, equipment, and clinic fees.</p>
        <ul>
          <li>You can request a Good Faith Estimate before scheduling a service.</li>
          <li>If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute it.</li>
          <li>Keep a copy of your Good Faith Estimate for your records.</li>
        </ul>

        <h2>Request a Good Faith Estimate</h2>
        <p>To request a Good Faith Estimate, please contact our billing department:</p>
        <ul>
          <li><strong>Phone:</strong> 8050507755</li>
          <li><strong>Email:</strong> goodfaithestimate@aegleclinic.com</li>
        </ul>

        <h2>Learn More</h2>
        <p>For more information about your rights, visit <a href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CMS.gov/NoSurprises</a> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> for assistance.</p>
      </section>
    </>
  );
}
