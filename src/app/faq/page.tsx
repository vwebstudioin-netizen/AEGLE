import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { generalFaqs, billingFaqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about AEGLE Skin Care Clinic services, billing, appointments, and more.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common questions about our clinic and services."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">General Questions</h2>
            <div className="space-y-4">
              {generalFaqs.map((faq) => (
                <Card key={faq.question}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Billing & Insurance</h2>
            <div className="space-y-4">
              {billingFaqs.map((faq) => (
                <Card key={faq.question}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is happy to help with any additional questions or concerns.
              </p>
              <div className="flex gap-4 justify-center text-sm">
                <a href="/contact" className="text-primary font-medium hover:underline">
                  Contact Us
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="tel:+18005551234" className="text-primary font-medium hover:underline">
                  Call (800) 555-1234
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
