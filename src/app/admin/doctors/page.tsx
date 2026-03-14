"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { doctors } from "@/data/doctors";
import { Shield, ArrowLeft, Search, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function AdminDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.departments.some((dept) => dept.toLowerCase().includes(searchTerm.toLowerCase())) ||
      d.specialties.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Doctor Management</h1>
              <p className="text-blue-200 text-xs">AEGLE Skin Care Clinic</p>
            </div>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-1" /> Add Doctor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Doctors ({filteredDoctors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Department</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Specialties</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Experience</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.slug} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.title}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{doctor.departments.join(", ")}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{doctor.specialties.slice(0, 2).join(", ")}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{doctor.experience} yrs</td>
                      <td className="py-3 px-2">
                        <Badge variant={doctor.acceptingNewPatients ? "default" : "secondary"}>
                          {doctor.acceptingNewPatients ? "Active" : "Not Accepting"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
