"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SkeletonProps = {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shimmer?: boolean;
};

const roundedMap: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md", shimmer = true }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative isolate overflow-hidden bg-neutral-200 dark:bg-neutral-800",
        roundedMap[rounded],
        className
      )}
    >
      {shimmer && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-44 w-full" rounded="lg" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-md border dark:border-neutral-800">
      <div className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] border-b px-3 py-2 text-sm font-medium dark:border-neutral-800" style={{
        ['--cols' as string]: columns,
      }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/5" />
        ))}
      </div>
      <div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] border-b px-3 py-3 dark:border-neutral-900" style={{
            ['--cols' as string]: columns,
          }}>
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton key={c} className="h-3 w-4/5" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10" rounded="full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}


