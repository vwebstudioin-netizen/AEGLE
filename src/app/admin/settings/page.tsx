"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, ArrowLeft, Save, Globe, Bell, Palette, Mail, Phone, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Site Settings</h1>
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

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {saved && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm">
            Settings saved successfully!
          </div>
        )}

        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" /> General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Clinic Name</Label>
                <Input id="siteName" defaultValue="AEGLE Skin Care Clinic" />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" defaultValue="Excellence in Healthcare" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Site Description</Label>
              <Textarea id="description" defaultValue="AEGLE Skin Care Clinic is a leading healthcare institution providing comprehensive medical services." rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Main Phone</Label>
                <Input id="phone" defaultValue="+91-11-2345-6789" />
              </div>
              <div>
                <Label htmlFor="emergency">Emergency Number</Label>
                <Input id="emergency" defaultValue="108" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">General Email</Label>
                <Input id="email" defaultValue="info@aegleclinic.com" />
              </div>
              <div>
                <Label htmlFor="appointmentEmail">Appointment Email</Label>
                <Input id="appointmentEmail" defaultValue="appointments@aegleclinic.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">
                <MapPin className="w-3 h-3 inline mr-1" />
                Address
              </Label>
              <Textarea id="address" defaultValue="123 Medical Center Drive, New Delhi, India 110001" rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" /> Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input id="smtpHost" defaultValue="smtp.gmail.com" />
              </div>
              <div>
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input id="smtpPort" defaultValue="587" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtpUser">
                  <Mail className="w-3 h-3 inline mr-1" />
                  SMTP Username
                </Label>
                <Input id="smtpUser" defaultValue="noreply@aegleclinic.com" />
              </div>
              <div>
                <Label htmlFor="smtpPass">SMTP Password</Label>
                <Input id="smtpPass" type="password" defaultValue="••••••••" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" /> Theme Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input type="color" id="primaryColor" defaultValue="#1d4ed8" className="w-10 h-10 rounded border cursor-pointer" />
                  <Input defaultValue="#1d4ed8" className="flex-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <input type="color" id="secondaryColor" defaultValue="#059669" className="w-10 h-10 rounded border cursor-pointer" />
                  <Input defaultValue="#059669" className="flex-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <input type="color" id="accentColor" defaultValue="#f59e0b" className="w-10 h-10 rounded border cursor-pointer" />
                  <Input defaultValue="#f59e0b" className="flex-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" /> Save All Settings
          </Button>
        </div>
      </main>
    </div>
  );
}
