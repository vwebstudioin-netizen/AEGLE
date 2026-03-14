"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center"><h1 className="text-3xl font-bold">Admin Portal</h1><p className="text-muted-foreground mt-1">Sign in to manage the AEGLE clinic website</p></div>
        <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { window.location.href = "/admin/dashboard"; }, 1000); }} className="rounded-2xl border bg-card p-6 space-y-4 shadow-lg">
          <div><Label>Email</Label><Input type="email" required placeholder="admin@aegleclinic.com" /></div>
          <div><Label>Password</Label><Input type="password" required placeholder="••••••••" /></div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
        </form>
      </div>
    </div>
  );
}
