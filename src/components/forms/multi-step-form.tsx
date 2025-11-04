"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function MultiStepForm({
  steps,
  onSubmit,
}: {
  steps: { title: string; content: React.ReactNode }[];
  onSubmit?: () => void;
}) {
  const [idx, setIdx] = React.useState(0);
  const last = idx === steps.length - 1;
  return (
    <div className="rounded-lg border p-4 dark:border-neutral-800">
      <div className="mb-4 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2">
            <span
              className={
                "grid h-6 w-6 place-items-center rounded-full text-xs " +
                (i <= idx
                  ? "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900"
                  : "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400")
              }
            >
              {i + 1}
            </span>
            <span className="hidden text-sm sm:block">{s.title}</span>
            {i < steps.length - 1 && (
              <span className="text-neutral-400">—</span>
            )}
          </div>
        ))}
      </div>
      <div className="min-h-24">{steps[idx]?.content}</div>
      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => setIdx((v) => Math.max(0, v - 1))}
          disabled={idx === 0}
        >
          Back
        </Button>
        <Button
          onClick={() =>
            last
              ? onSubmit?.()
              : setIdx((v) => Math.min(steps.length - 1, v + 1))
          }
        >
          {last ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
