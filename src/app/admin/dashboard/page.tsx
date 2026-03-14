"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Building2,
  FileText,
  Settings,
  BarChart3,
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  Activity,
  AlertTriangle,
  LogOut,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";

const stats = [
  { label: "Total Patients", value: "12,456", change: "+8.2%", up: true, icon: Users },
  { label: "Appointments Today", value: "148", change: "+12.5%", up: true, icon: Calendar },
  { label: "Revenue (MTD)", value: "₹45,67,890", change: "+5.3%", up: true, icon: DollarSign },
  { label: "New Registrations", value: "234", change: "-2.1%", up: false, icon: UserPlus },
];

const quickActions = [
  { label: "Chat Enquiries", href: "/admin/enquiries", icon: MessageSquare, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  { label: "Shop / Products", href: "/admin/shop", icon: ShoppingBag, color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
  { label: "Manage Doctors", href: "/admin/doctors", icon: Users, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "Departments", href: "/admin/departments", icon: Building2, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { label: "Content", href: "/admin/content", icon: FileText, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
  { label: "Settings", href: "/admin/settings", icon: Settings, color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
  { label: "Audit Log", href: "/admin/audit", icon: Shield, color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
];

const recentActivity = [
  { action: "New chatbot enquiry", detail: "Priya Sharma — Skin Treatment", time: "5 min ago", type: "enquiry" },
  { action: "Appointment booked", detail: "Dr. Surekha — Laser Consultation", time: "12 min ago", type: "appointment" },
  { action: "Payment received", detail: "₹15,000 — HydraFacial Package", time: "25 min ago", type: "payment" },
  { action: "New chatbot enquiry", detail: "Rahul Verma — Hair Treatment", time: "40 min ago", type: "enquiry" },
  { action: "Review submitted", detail: "⭐⭐⭐⭐⭐ — Excellent service!", time: "1 hr ago", type: "review" },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Admin Dashboard</h1>
              <p className="text-blue-200 text-xs">AEGLE Skin Care Clinic</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-200">admin@aegleclinic.com</span>
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-1" /> Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-1 text-sm ${stat.up ? "text-green-600" : "text-red-600"}`}>
                      {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center ${action.color} mb-2`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "enquiry" ? "bg-purple-500" :
                      activity.type === "payment" ? "bg-green-500" :
                      activity.type === "appointment" ? "bg-blue-500" :
                      activity.type === "review" ? "bg-yellow-500" :
                      "bg-gray-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Server Load High</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">CPU usage at 78% — Consider scaling resources</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-400">System Update Available</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Version 2.4.1 available — Schedule maintenance window</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">Backup Completed</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Daily backup completed at 03:00 AM — 2.4 GB</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">SSL Certificate Renewal</p>
                  <p className="text-xs text-red-600 dark:text-red-500">Expires in 15 days — Auto-renewal scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
