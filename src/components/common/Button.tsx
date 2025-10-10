"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
  outline:
    "border border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800",
  ghost:
    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
  destructive:
    "bg-red-600 text-white hover:bg-red-700",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading = false, leftIcon, rightIcon, children, disabled, onDrag, onDragEnd, onDragStart, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={!disabled && !loading ? { y: -1 } : undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-neutral-600",
          variantClasses[variant],
          className
        )}
        aria-busy={loading}
        disabled={disabled || loading}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        {...props}
      >
        {loading && (
          <motion.span
            className="inline-block h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent dark:border-neutral-200/80"
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", repeat: Infinity, duration: 0.9 }}
          />
        )}
        {!loading && leftIcon}
        <span className="truncate">{children}</span>
        {!loading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";


