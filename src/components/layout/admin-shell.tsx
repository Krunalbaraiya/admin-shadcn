"use client";

import React from "react";
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
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Topbar title={title} onMenuClick={() => setOpenMobile(true)} />
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <Sidebar
          openMobile={openMobile}
          onClose={() => setOpenMobile(false)}
        />
        <main className="p-3 sm:p-4">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
