import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.name}
        subtitle={service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {service.preparationSteps && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">How to Prepare</h2>
                  <ol className="space-y-3">
                    {service.preparationSteps.map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {service.recoveryInfo && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Recovery</h2>
                  <p className="text-muted-foreground">{service.recoveryInfo}</p>
                </div>
              )}

              {service.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">FAQs</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq) => (
                      <Card key={faq.question}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-3 text-sm">
                  <h3 className="font-semibold text-foreground">Service Details</h3>
                  {service.estimatedDuration && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{service.estimatedDuration}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium text-secondary">{service.priceRange || "Consultation Required"}</span>
                  </div>
                  {service.promoTag && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offer</span>
                      <Badge variant="success">{service.promoTag}</Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{service.category}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Schedule This Service</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Contact us to schedule or learn more about this service.
                  </p>
                  <Link href="/appointment">
                    <Button className="bg-white text-primary hover:bg-white/90 w-full">
                      Book Appointment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
