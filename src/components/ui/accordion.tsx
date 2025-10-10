import * as React from "react";
import { cn } from "@/lib/utils";

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("divide-y rounded-md border dark:divide-neutral-800 dark:border-neutral-800", className)}>{children}</div>;
}

export function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800">
        {title}
        <span className="text-xs text-neutral-500">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300">{children}</div>}
    </div>
  );
}


