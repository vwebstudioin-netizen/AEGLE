"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Phone,
  User,
  Clock,
  Filter,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  PhoneCall,
  Star,
  Search,
} from "lucide-react";

/* ── Types ── */
interface Enquiry {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: "new" | "contacted" | "converted" | "closed";
  source: string;
  createdAt: string;
  notes: string;
}

const STATUS_CONFIG = {
  new: { label: "New", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300", icon: AlertCircle },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300", icon: PhoneCall },
  converted: { label: "Converted", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", icon: CheckCircle },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400", icon: Star },
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Enquiry["status"]>("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  /* filter + search */
  const filtered = enquiries.filter((e) => {
    const matchFilter = filter === "all" || e.status === filter;
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.interest.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  /* stats */
  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    converted: enquiries.filter((e) => e.status === "converted").length,
  };

  /* time ago helper */
  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-white/70 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Chat Enquiries
              </h1>
              <p className="text-purple-200 text-xs">AI Chatbot Leads — AEGLE Skin Care Clinic</p>
            </div>
          </div>
          <Button onClick={fetchEnquiries} variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Enquiries", value: stats.total, icon: MessageSquare, color: "text-purple-600" },
            { label: "New (Pending)", value: stats.new, icon: AlertCircle, color: "text-blue-600" },
            { label: "Contacted", value: stats.contacted, icon: PhoneCall, color: "text-yellow-600" },
            { label: "Converted", value: stats.converted, icon: CheckCircle, color: "text-green-600" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <Filter className="w-4 h-4 text-gray-400 ml-2" />
            {(["all", "new", "contacted", "converted", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filter === f
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or interest…"
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Enquiry Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              {filter === "all" ? "All Enquiries" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Enquiries`}
              <span className="text-gray-400 font-normal ml-2">({filtered.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-16 text-center text-gray-400">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading enquiries…
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                No enquiries found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 uppercase">
                      <th className="text-left px-5 py-3 font-medium">Lead</th>
                      <th className="text-left px-5 py-3 font-medium">Phone</th>
                      <th className="text-left px-5 py-3 font-medium">Interest</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Time</th>
                      <th className="text-left px-5 py-3 font-medium">Notes</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((enq) => {
                      const sc = STATUS_CONFIG[enq.status] || STATUS_CONFIG.new;
                      return (
                        <tr key={enq.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <User className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{enq.name}</p>
                                <p className="text-[11px] text-gray-400">via {enq.source}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <a href={`tel:${enq.phone}`} className="text-sm text-purple-600 hover:underline flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {enq.phone}
                            </a>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-700 dark:text-gray-300">{enq.interest}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${sc.color}`}>
                              <sc.icon className="w-3 h-3" /> {sc.label}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {timeAgo(enq.createdAt)}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-xs text-gray-500 max-w-[160px] truncate">{enq.notes || "—"}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex gap-1.5">
                              <a href={`tel:${enq.phone}`} className="w-7 h-7 rounded-md bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors" title="Call">
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a href={`https://wa.me/91${enq.phone}?text=Hi ${encodeURIComponent(enq.name)}, this is AEGLE Skin Care. Thank you for your enquiry about ${encodeURIComponent(enq.interest)}!`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors" title="WhatsApp">
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
