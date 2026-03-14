import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmojiIcon } from "@/components/shared/EmojiIcon";
import type { DepartmentData } from "@/types";

interface DepartmentCardProps {
  department: DepartmentData;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/departments/${department.slug}`}>
      <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
        {department.image && (
          <div className="h-48 overflow-hidden rounded-t-xl">
            <img
              src={department.image}
              alt={department.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-3">
            <EmojiIcon emoji={department.icon} className="w-7 h-7 text-primary" />
            <CardTitle className="text-lg">{department.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {department.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>{department.doctors.length} Doctors</span>
            <span>•</span>
            <span>{department.services.length} Services</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
