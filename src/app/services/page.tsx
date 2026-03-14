import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive medical services from emergency care to advanced surgical procedures at AEGLE Skin Care Clinic.",
};

export default function ServicesPage() {
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive medical services from preventive care to the most advanced surgical procedures."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((s) => s.category === category)
                  .map((service) => (
                    <Link key={service.id} href={`/services/${service.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
                        {service.image && (
                          <div className="relative h-40 bg-muted">
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              className="object-cover"
                              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <EmojiIcon emoji={service.icon} className="w-7 h-7 text-primary" />
                            <CardTitle className="text-lg">
                              {service.name}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {service.features.slice(0, 3).map((f) => (
                              <Badge key={f} variant="outline" className="text-xs">
                                {f}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
