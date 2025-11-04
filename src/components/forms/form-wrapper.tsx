import React from "react";
import { cn } from "@/lib/utils";

export function FormWrapper({
  title,
  description,
  onSubmit,
  children,
  className,
}: {
  title?: string;
  description?: string;
  onSubmit?: React.FormEventHandler;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-4 rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
    >
      {(title || description) && (
        <div>
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </form>
  );
}
