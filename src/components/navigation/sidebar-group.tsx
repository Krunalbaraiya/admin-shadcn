import React from "react";

export function SidebarGroup({
  label,
  children,
  collapsed,
}: {
  label: string;
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <div className={collapsed ? "space-y-0" : "space-y-1"}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          collapsed ? "hidden" : "",
          "w-full text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
          collapsed ? "px-0 md:px-0 md:text-center py-1 md:py-1" : "px-3 py-2",
        ].join(" ")}
        aria-expanded={open}
      >
        <span>{label}</span>
      </button>
      <div className={!open ? "hidden" : collapsed ? "space-y-0" : "space-y-1"}>
        {children}
      </div>
    </div>
  );
}
