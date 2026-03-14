"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, Search, Eye, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const sampleAppointments = [
  { id: "APT-001", patient: "Rajesh Kumar", doctor: "Dr. Priya Sharma", department: "Cardiology", date: "2025-01-15", time: "10:00 AM", status: "confirmed" },
  { id: "APT-002", patient: "Anita Desai", doctor: "Dr. Vikram Patel", department: "Orthopedics", date: "2025-01-15", time: "10:30 AM", status: "pending" },
  { id: "APT-003", patient: "Suresh Menon", doctor: "Dr. Aisha Khan", department: "Neurology", date: "2025-01-15", time: "11:00 AM", status: "confirmed" },
  { id: "APT-004", patient: "Meera Nair", doctor: "Dr. Ravi Gupta", department: "Pediatrics", date: "2025-01-15", time: "11:30 AM", status: "cancelled" },
  { id: "APT-005", patient: "Amit Singh", doctor: "Dr. Priya Sharma", department: "Cardiology", date: "2025-01-15", time: "02:00 PM", status: "confirmed" },
  { id: "APT-006", patient: "Priya Reddy", doctor: "Dr. Sunita Joshi", department: "Dermatology", date: "2025-01-16", time: "09:00 AM", status: "pending" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive"; icon: typeof CheckCircle }> = {
  confirmed: { label: "Confirmed", variant: "default", icon: CheckCircle },
  pending: { label: "Pending", variant: "secondary", icon: AlertCircle },
  cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

export default function AdminAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleAppointments.filter((apt) => {
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Appointment Management</h1>
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
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">148</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">112</p>
                <p className="text-xs text-gray-500">Confirmed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-500">Cancelled</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search patient, doctor, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "confirmed", "pending", "cancelled"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Patient</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Doctor</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Department</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Time</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((apt) => {
                    const config = statusConfig[apt.status];
                    return (
                      <tr key={apt.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-2 font-mono text-xs">{apt.id}</td>
                        <td className="py-3 px-2 font-medium">{apt.patient}</td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{apt.doctor}</td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{apt.department}</td>
                        <td className="py-3 px-2">{apt.date}</td>
                        <td className="py-3 px-2">{apt.time}</td>
                        <td className="py-3 px-2">
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
