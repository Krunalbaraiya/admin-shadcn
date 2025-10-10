"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type Toast = { id: number; title?: string; description?: string; variant?: "default" | "success" | "error" };

type ToastContextValue = {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const show = (toast: Omit<Toast, "id">) => setToasts((t) => [...t, { id: Date.now() + Math.random(), ...toast }]);
  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 w-full max-w-sm space-y-2 px-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto rounded-md border bg-white p-3 shadow dark:border-neutral-800 dark:bg-neutral-900",
              t.variant === "success" && "border-green-600/40",
              t.variant === "error" && "border-red-600/40"
            )}
          >
            {t.title && <div className="text-sm font-semibold">{t.title}</div>}
            {t.description && <div className="text-xs text-neutral-600 dark:text-neutral-400">{t.description}</div>}
            <div className="mt-2 text-right">
              <button className="text-xs text-neutral-500 hover:underline" onClick={() => dismiss(t.id)}>
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}


