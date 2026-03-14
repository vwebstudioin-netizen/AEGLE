"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Demo: just redirect to dashboard
    setTimeout(() => {
      router.push("/portal/dashboard");
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2"><Sparkles className="w-8 h-8 text-primary" /></div>
          <CardTitle className="text-xl">
            {mode === "login" ? "Patient Portal Login" : "Create Account"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{SITE_NAME}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            {mode === "login" ? (
              <>
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button onClick={() => setMode("register")} className="text-primary font-medium hover:underline">
                    Sign up
                  </button>
                </p>
                <p className="mt-2">
                  <a href="#" className="text-primary text-xs hover:underline">
                    Forgot password?
                  </a>
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary">
              ← Back to website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
