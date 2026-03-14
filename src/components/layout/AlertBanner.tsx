"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  message: string;
  type?: "info" | "warning" | "emergency";
  dismissible?: boolean;
  link?: { label: string; href: string };
}

export function AlertBanner({
  message,
  type = "info",
  dismissible = true,
  link,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className={cn("py-2.5 text-sm text-center font-medium", {
        "bg-blue-600 text-white": type === "info",
        "bg-yellow-500 text-black": type === "warning",
        "bg-red-600 text-white": type === "emergency",
      })}
      role="alert"
    >
      <div className="container mx-auto px-4 flex items-center justify-center gap-3">
        <span>{message}</span>
        {link && (
          <a
            href={link.href}
            className="underline underline-offset-2 font-semibold hover:no-underline"
          >
            {link.label}
          </a>
        )}
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
