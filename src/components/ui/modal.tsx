"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && onOpenChange(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/40"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-lg border bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900",
          className
        )}
        role="dialog"
        aria-modal
      >
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {description && (
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
          <button
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-neutral-700 dark:text-neutral-200">
          {children}
        </div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
