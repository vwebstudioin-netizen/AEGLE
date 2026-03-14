"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Link href="/portal/dashboard" className="text-white/80 hover:text-white text-sm">← Dashboard</Link>
          <h1 className="text-lg font-bold">My Profile</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First Name</Label><Input defaultValue="John" /></div>
              <div><Label>Last Name</Label><Input defaultValue="Doe" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Date of Birth</Label><Input type="date" defaultValue="1985-06-15" /></div>
              <div><Label>Gender</Label><Input defaultValue="Male" /></div>
            </div>
            <div><Label>Email</Label><Input type="email" defaultValue="john.doe@email.com" /></div>
            <div><Label>Phone</Label><Input type="tel" defaultValue="8050507755" /></div>
            <div><Label>Address</Label><Input defaultValue="123 Main Street, Springfield, IL 62701" /></div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Name</Label><Input defaultValue="Jane Doe" /></div>
              <div><Label>Relationship</Label><Input defaultValue="Spouse" /></div>
            </div>
            <div><Label>Phone</Label><Input type="tel" defaultValue="9900298841" /></div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Insurance Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Insurance Provider</Label><Input defaultValue="Blue Cross Blue Shield" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Policy Number</Label><Input defaultValue="BCBS-123456789" /></div>
              <div><Label>Group Number</Label><Input defaultValue="GRP-98765" /></div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
