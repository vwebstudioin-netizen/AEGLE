"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, Search, Plus, Edit, Trash2, Eye, FileText, Newspaper, CalendarDays, MessageSquare } from "lucide-react";

type ContentTab = "blog" | "news" | "events" | "stories";

const tabs: { key: ContentTab; label: string; icon: typeof FileText }[] = [
  { key: "blog", label: "Blog Posts", icon: FileText },
  { key: "news", label: "News", icon: Newspaper },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "stories", label: "Patient Stories", icon: MessageSquare },
];

const sampleContent: Record<ContentTab, { title: string; author: string; date: string; status: string }[]> = {
  blog: [
    { title: "Understanding Heart Health", author: "Dr. Priya Sharma", date: "2025-01-10", status: "published" },
    { title: "Winter Wellness Tips", author: "Staff", date: "2025-01-08", status: "published" },
    { title: "New MRI Technology", author: "Admin", date: "2025-01-05", status: "draft" },
  ],
  news: [
    { title: "AEGLE Earns JCI Accreditation", author: "PR Team", date: "2025-01-12", status: "published" },
    { title: "New Pediatric Wing Opening", author: "PR Team", date: "2025-01-09", status: "published" },
  ],
  events: [
    { title: "Free Health Screening Camp", author: "Events Team", date: "2025-02-01", status: "upcoming" },
    { title: "Blood Donation Drive", author: "Events Team", date: "2025-01-25", status: "upcoming" },
  ],
  stories: [
    { title: "A Journey to Recovery — Rahul's Story", author: "Rahul Kumar", date: "2025-01-07", status: "published" },
    { title: "Hope After Heart Surgery", author: "Meera Patel", date: "2024-12-20", status: "published" },
  ],
};

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<ContentTab>("blog");
  const [searchTerm, setSearchTerm] = useState("");

  const items = sampleContent[activeTab].filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Content Management</h1>
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
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              onClick={() => { setActiveTab(tab.key); setSearchTerm(""); }}
              className="whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4 mr-1" /> {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-1" /> New {activeTab === "blog" ? "Post" : activeTab === "news" ? "Article" : activeTab === "events" ? "Event" : "Story"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{tabs.find((t) => t.key === activeTab)?.label} ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Title</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Author</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{item.title}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{item.author}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{item.date}</td>
                      <td className="py-3 px-2">
                        <Badge variant={item.status === "published" ? "default" : item.status === "draft" ? "secondary" : "outline"}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
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
