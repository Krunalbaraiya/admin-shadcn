"use client";

import React from "react";
import { BarChart3, Home, Settings, Users, Plus, Minus } from "lucide-react";
import { MenuItem } from "@/components/navigation/menu-item";
import { SidebarGroup } from "@/components/navigation/sidebar-group";
import { cn } from "@/lib/utils";

export function Sidebar({ openMobile, onClose }: { openMobile?: boolean; onClose?: () => void }) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 w-64 border-r bg-white p-3 transition-transform dark:border-neutral-800 dark:bg-neutral-950 md:static md:translate-x-0",
        openMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        collapsed && "md:w-16"
      )}
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-between px-2 py-1">
        <div className={cn("text-lg font-bold", collapsed && "md:hidden")}>Admin</div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="hidden rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 md:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
        </button>
        <button onClick={onClose} className="rounded-md px-2 py-1 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden">Close</button>
      </div>
      <nav className={cn("mt-1", collapsed ? "space-y-0" : "space-y-4")}> 
        <SidebarGroup label="Dashboard" collapsed={collapsed}>
          <MenuItem href="/" label="Overview" icon={<Home className="h-4 w-4" />} collapsed={collapsed} />
          <MenuItem href="/analytics" label="Analytics" icon={<BarChart3 className="h-4 w-4" />} collapsed={collapsed} />
        </SidebarGroup>
        <SidebarGroup label="Users" collapsed={collapsed}>
          <MenuItem href="/users" label="All Users" icon={<Users className="h-4 w-4" />} collapsed={collapsed} />
        </SidebarGroup>
        <SidebarGroup label="Settings" collapsed={collapsed}>
          <MenuItem href="/settings" label="General" icon={<Settings className="h-4 w-4" />} collapsed={collapsed} />
        </SidebarGroup>
      </nav>
    </aside>
  );
}


