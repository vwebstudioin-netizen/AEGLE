"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, Search, Filter, User, Clock, FileText, Settings, LogIn, LogOut, Edit, Trash2 } from "lucide-react";

const auditEntries = [
  { id: 1, action: "Login", user: "admin@aegleclinic.com", role: "Admin", target: "Admin Portal", ip: "192.168.1.100", timestamp: "2025-01-15 09:00:12", icon: LogIn },
  { id: 2, action: "Update", user: "admin@aegleclinic.com", role: "Admin", target: "Doctor: Dr. Priya Sharma", ip: "192.168.1.100", timestamp: "2025-01-15 09:15:34", icon: Edit },
  { id: 3, action: "Create", user: "admin@aegleclinic.com", role: "Admin", target: "Blog: Winter Wellness Tips", ip: "192.168.1.100", timestamp: "2025-01-15 09:45:22", icon: FileText },
  { id: 4, action: "Delete", user: "admin@aegleclinic.com", role: "Admin", target: "Event: Old Health Camp", ip: "192.168.1.100", timestamp: "2025-01-15 10:02:11", icon: Trash2 },
  { id: 5, action: "Settings", user: "admin@aegleclinic.com", role: "Admin", target: "SMTP Configuration Updated", ip: "192.168.1.100", timestamp: "2025-01-15 10:30:45", icon: Settings },
  { id: 6, action: "Login", user: "doctor@aegleclinic.com", role: "Doctor", target: "Portal", ip: "192.168.1.105", timestamp: "2025-01-15 10:45:00", icon: LogIn },
  { id: 7, action: "Update", user: "doctor@aegleclinic.com", role: "Doctor", target: "Appointment: APT-001 Status", ip: "192.168.1.105", timestamp: "2025-01-15 11:00:15", icon: Edit },
  { id: 8, action: "Logout", user: "admin@aegleclinic.com", role: "Admin", target: "Admin Portal", ip: "192.168.1.100", timestamp: "2025-01-15 12:00:00", icon: LogOut },
];

const actionColors: Record<string, string> = {
  Login: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Logout: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  Create: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Update: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Delete: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Settings: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
};

export default function AdminAuditPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = auditEntries.filter(
    (entry) =>
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Audit Log</h1>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search audit log..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-1" /> Filter
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Log ({filtered.length} entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filtered.map((entry) => (
                <div key={entry.id} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${actionColors[entry.action] || "bg-gray-100"}`}>
                    <entry.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{entry.action}</Badge>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{entry.target}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{entry.user}</span>
                      <span>{entry.role}</span>
                      <span>IP: {entry.ip}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {entry.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
