import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description:
    "Search our directory of 500+ expert physicians across all specialties at AEGLE Skin Care Clinic.",
};

export default function DoctorsPage() {
  const allSpecialties = [
    ...new Set(doctors.flatMap((d) => d.specialties)),
  ].sort();
  const allDepts = [...new Set(doctors.flatMap((d) => d.departments))];

  return (
    <>
      <PageHero
        title="Find a Doctor"
        subtitle="Search our directory of 500+ expert physicians. All are board-certified and committed to providing exceptional care."
        breadcrumbs={[{ label: "Find a Doctor" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="default" className="cursor-pointer">
              All
            </Badge>
            {allDepts.map((deptId) => {
              const dept = departments.find((d) => d.id === deptId);
              return (
                <Badge key={deptId} variant="outline" className="cursor-pointer hover:bg-muted">
                  {dept?.name || deptId}
                </Badge>
              );
            })}
          </div>

          {/* Doctor grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <Link key={doc.id} href={`/doctors/${doc.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-20 h-20 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-primary">{doc.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500 text-sm">★</span>
                          <span className="text-sm font-medium">
                            {doc.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({doc.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {doc.specialties.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      {doc.acceptingNewPatients && (
                        <span className="text-green-600 font-medium">
                          ✓ Accepting patients
                        </span>
                      )}
                      {doc.telemedicineAvailable && <span>📹 Telemedicine</span>}
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        View Profile
                      </Button>
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
