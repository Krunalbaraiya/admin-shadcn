"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = React.useMemo(() => pathname.split("/").filter(Boolean), [pathname]);
  const paths = React.useMemo(
    () =>
      segments.map((seg, idx) => ({
        label: decodeURIComponent(seg.replace(/-/g, " ")), 
        href: "/" + segments.slice(0, idx + 1).join("/"),
        last: idx === segments.length - 1,
      })),
    [segments]
  );

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500 dark:text-neutral-400">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {paths.map((p) => (
          <React.Fragment key={p.href}>
            <li aria-hidden className="px-1">/</li>
            <li>
              {p.last ? (
                <span aria-current="page" className="font-medium text-neutral-700 dark:text-neutral-200">{p.label}</span>
              ) : (
                <Link href={p.href} className="hover:underline">{p.label}</Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}


