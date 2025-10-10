"use client";

import React from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

export function Topbar({ onMenuClick, title }: { onMenuClick?: () => void; title?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-neutral-800 dark:bg-neutral-950/70">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-4">
        <button
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600 md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className={cn("min-w-0 flex-1", !title && "sr-only")}>{title && <h1 className="truncate text-base font-semibold">{title}</h1>}</div>
        <div className="hidden min-w-0 flex-1 items-center md:flex">
          <div className="relative ml-auto w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-neutral-600"
            />
          </div>
        </div>
        <ThemeToggle />
        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">3</span>
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}

function ProfileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100">
          <User className="h-4 w-4" />
        </span>
        <span className="hidden text-left text-sm leading-tight sm:block">
          <span className="block font-medium">Alex Johnson</span>
          <span className="block text-neutral-500 dark:text-neutral-400">Administrator</span>
        </span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <div className="px-3 py-2 text-sm">
            <div className="font-medium">Alex Johnson</div>
            <div className="text-neutral-500 dark:text-neutral-400">admin@example.com</div>
          </div>
          <div className="border-t dark:border-neutral-800" />
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Profile</button>
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Settings</button>
          <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800">Sign out</button>
        </div>
      )}
    </div>
  );
}


