"use client";

import React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export function DatePicker({ value, onChange, className }: { value?: string; onChange?: (value: string) => void; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-neutral-600"
      />
      <CalendarDays className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}


