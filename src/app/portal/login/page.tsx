"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PortalLoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center"><h1 className="text-3xl font-bold">Patient Portal</h1><p className="text-muted-foreground mt-1">Sign in to access your health records</p></div>
        <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { window.location.href = "/portal/dashboard"; }, 1000); }} className="rounded-2xl border bg-card p-6 space-y-4 shadow-lg">
          <div><Label>Email</Label><Input type="email" required placeholder="you@example.com" /></div>
          <div><Label>Password</Label><Input type="password" required placeholder="••••••••" /></div>
          <div className="flex items-center justify-between"><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Remember me</label><a href="#" className="text-sm text-primary hover:underline">Forgot password?</a></div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link href="/portal/register" className="text-primary hover:underline font-medium">Register here</Link></p>
      </div>
    </div>
  );
}
