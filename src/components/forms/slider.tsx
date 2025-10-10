"use client";

import React from "react";

export function Slider({ value = 0, min = 0, max = 100, step = 1, onChange }: { value?: number; min?: number; max?: number; step?: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="h-2 w-full appearance-none rounded-full bg-neutral-200 accent-neutral-900 dark:bg-neutral-800 dark:accent-neutral-200"
      />
      <span className="w-10 text-right text-sm text-neutral-600 dark:text-neutral-300">{value}</span>
    </div>
  );
}


