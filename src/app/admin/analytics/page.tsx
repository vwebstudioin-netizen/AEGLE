"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  ArrowLeft,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  BarChart3,
} from "lucide-react";

const pageViews = [
  { page: "/", views: 12450, unique: 8920 },
  { page: "/departments", views: 5670, unique: 4230 },
  { page: "/doctors", views: 4890, unique: 3560 },
  { page: "/appointment", views: 3450, unique: 2890 },
  { page: "/contact", views: 2340, unique: 1980 },
  { page: "/emergency", views: 1890, unique: 1560 },
  { page: "/services", views: 1670, unique: 1340 },
  { page: "/billing", views: 1230, unique: 980 },
];

const trafficSources = [
  { source: "Organic Search", percentage: 42, color: "bg-blue-500" },
  { source: "Direct", percentage: 28, color: "bg-green-500" },
  { source: "Referral", percentage: 15, color: "bg-pink-500" },
  { source: "Social Media", percentage: 10, color: "bg-orange-500" },
  { source: "Email", percentage: 5, color: "bg-pink-500" },
];

const deviceBreakdown = [
  { device: "Desktop", percentage: 52, icon: Monitor },
  { device: "Mobile", percentage: 38, icon: Smartphone },
  { device: "Tablet", percentage: 10, icon: Globe },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Analytics</h1>
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

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">45.2K</p>
              <p className="text-sm text-gray-500">Page Views (30d)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">18.7K</p>
              <p className="text-sm text-gray-500">Unique Visitors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto text-pink-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">3,450</p>
              <p className="text-sm text-gray-500">Appointments Booked</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto text-orange-600 mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">4:32</p>
              <p className="text-sm text-gray-500">Avg Session (min)</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pageViews.map((page) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{page.page}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{page.unique.toLocaleString()} unique</span>
                      <span className="font-medium w-16 text-right">{page.views.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{source.source}</span>
                      <span className="font-medium">{source.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div
                        className={`h-2 rounded-full ${source.color}`}
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              {deviceBreakdown.map((device) => (
                <div key={device.device} className="text-center">
                  <device.icon className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{device.percentage}%</p>
                  <p className="text-sm text-gray-500">{device.device}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
