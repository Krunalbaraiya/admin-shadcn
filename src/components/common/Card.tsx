"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export type CardProps = {
  title?: string;
  description?: string;
  className?: string;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
};

export function Card({ title, description, className, headerRight, children, loading = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={
        cn("rounded-lg border bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-4", className)
      }
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {title ? (
            <h3 className="truncate text-sm font-semibold sm:text-base">{title}</h3>
          ) : (
            loading && <Skeleton className="h-5 w-40" />
          )}
          {description ? (
            <p className="mt-1 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
          ) : (
            loading && <Skeleton className="mt-1 h-3 w-64" />
          )}
        </div>
        <div className="flex-shrink-0">{headerRight}</div>
      </div>
      <div>{loading ? <Skeleton className="h-40 w-full rounded-md" /> : children}</div>
    </motion.div>
  );
}


