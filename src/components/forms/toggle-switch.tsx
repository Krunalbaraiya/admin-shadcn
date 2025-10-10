"use client";

import React from "react";

export function ToggleSwitch({ checked, onChange, label }: { checked?: boolean; onChange?: (v: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-neutral-300 transition peer-checked:bg-neutral-900 dark:bg-neutral-700 dark:peer-checked:bg-neutral-200">
        <input
          type="checkbox"
          className="peer absolute h-full w-full cursor-pointer opacity-0"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="pointer-events-none ml-0.5 inline-block h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-4 dark:bg-neutral-900" />
      </span>
      {label && <span className="text-sm text-neutral-700 dark:text-neutral-200">{label}</span>}
    </label>
  );
}


