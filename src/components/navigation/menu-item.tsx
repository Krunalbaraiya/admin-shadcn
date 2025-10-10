import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type MenuItemProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
};

export function MenuItem({ href, label, icon, active, onClick, collapsed }: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        collapsed ? "gap-0 md:px-0 md:py-2 md:justify-center" : "gap-3 px-3 py-2",
        active && "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
      )}
    >
      <span className={cn("grid h-5 w-5 place-items-center text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-50", collapsed && "md:mx-auto")}>{icon}</span>
      <span className={cn("truncate", collapsed && "md:hidden")}>{label}</span>
    </Link>
  );
}


