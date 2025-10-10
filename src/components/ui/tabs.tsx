import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({ value, children, className }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full", className)} data-value={value}>{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div role="tablist" className="flex gap-1 rounded-md border bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">{children}</div>;
}

export function TabsTrigger({ value, active, onClick, children }: { value: string; active?: boolean; onClick?: (v: string) => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => onClick?.(value)}
      className={cn(
        "flex-1 rounded-sm px-3 py-2 text-sm",
        active ? "bg-neutral-100 font-semibold dark:bg-neutral-800" : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ hidden, children, className }: { hidden?: boolean; children: React.ReactNode; className?: string }) {
  return <div role="tabpanel" hidden={hidden} className={cn("mt-3", className)}>{children}</div>;
}


