import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import { departments } from "@/data/departments";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Explore our 30+ medical departments and centers of excellence at AEGLE Skin Care Clinic.",
};

export default function DepartmentsPage() {
  const sorted = [...departments].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        title="Medical Departments"
        subtitle="Our 30+ departments and centers of excellence provide comprehensive care across every medical specialty."
        breadcrumbs={[{ label: "Departments" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((dept) => (
              <Link key={dept.id} href={`/departments/${dept.slug}`}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all">
                  {dept.image && (
                    <div className="h-48 overflow-hidden rounded-t-xl">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <EmojiIcon emoji={dept.icon} className="w-7 h-7 text-primary" />
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {dept.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dept.stats.slice(0, 2).map((stat) => (
                        <Badge key={stat.label} variant="secondary">
                          {stat.value}
                        </Badge>
                      ))}
                      <Badge variant="outline">
                        {dept.doctors.length} Doctors
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
