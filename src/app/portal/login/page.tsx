"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

export default function PortalLoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — background image */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
          alt="AEGLE Skin Care"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
          <p className="text-white/85 max-w-sm">Access your appointments, treatment history, and personalised skin care plans.</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Patient Portal</h1>
            <p className="text-muted-foreground mt-1">Sign in to access your health records</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => { window.location.href = "/portal/dashboard"; }, 1000);
            }}
            className="rounded-2xl border bg-card p-6 space-y-4 shadow-lg"
          >
            <div>
              <Label>Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" required placeholder="you@example.com" className="pl-10" />
              </div>
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" required placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/portal/register" className="text-primary hover:underline font-medium">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
