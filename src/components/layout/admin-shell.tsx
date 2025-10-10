"use client";

import React from "react";
import { Home, BarChart3, Users, Settings } from "lucide-react";
import { Container } from "./container";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AdminShell({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [openMobile, setOpenMobile] = React.useState(false);
  const sections = [
    {
      key: "main",
      label: "Main",
      items: [
        {
          key: "overview",
          label: "Overview",
          href: "/",
          icon: <Home className="h-4 w-4" />,
        },
        {
          key: "analytics",
          label: "Analytics",
          href: "/analytics",
          icon: <BarChart3 className="h-4 w-4" />,
        },
      ],
    },
    {
      key: "users",
      label: "Users",
      items: [
        {
          key: "all",
          label: "All Users",
          href: "/users",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      items: [
        {
          key: "general",
          label: "General",
          href: "/settings",
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
  ];
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Topbar title={title} onMenuClick={() => setOpenMobile(true)} />
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <Sidebar
          sections={sections}
          openMobile={openMobile}
          onCloseMobile={() => setOpenMobile(false)}
        />
        <main className="p-3 sm:p-4">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
