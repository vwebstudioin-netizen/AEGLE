import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DoctorData } from "@/types";
import { Avatar } from "@/components/ui/avatar";

interface DoctorCardProps {
  doctor: DoctorData;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar src={doctor.image} alt={doctor.name} size="lg" />
          <div className="flex-1 min-w-0">
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              {doctor.name}
            </Link>
            <p className="text-sm text-muted-foreground">{doctor.title}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {doctor.specialties.slice(0, 3).map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            {doctor.acceptingNewPatients && (
              <span className="text-green-600 font-medium">
                ✓ Accepting patients
              </span>
            )}
            {doctor.telemedicineAvailable && (
              <span>📹 Telemedicine</span>
            )}
          </div>
          <Link href={`/doctors/${doctor.slug}`}>
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
