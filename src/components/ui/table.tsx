"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (q: string) => void;
  onExport?: () => void;
  selectableRows?: boolean;
  onSelectionChange?: (rows: T[]) => void;
  className?: string;
  loading?: boolean;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  page = 1,
  pageSize = 10,
  total = data.length,
  onPageChange,
  onSearch,
  onExport,
  selectableRows,
  onSelectionChange,
  className,
  loading,
}: TableProps<T>) {
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState<{ key: keyof T; dir: "asc" | "desc" } | null>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[sort.key] as unknown as number | string | boolean | Date | null | undefined;
      const bv = b[sort.key] as unknown as number | string | boolean | Date | null | undefined;
      if (av === bv) return 0;
      const aVal = av instanceof Date ? av.getTime() : (av as number | string | boolean | null | undefined);
      const bVal = bv instanceof Date ? bv.getTime() : (bv as number | string | boolean | null | undefined);
      // Falls back to string comparison for non-number/boolean
      const cmp = typeof aVal === "number" && typeof bVal === "number"
        ? (aVal - bVal)
        : String(aVal ?? "").localeCompare(String(bVal ?? ""));
      return (cmp > 0 ? 1 : cmp < 0 ? -1 : 0) * (sort.dir === "asc" ? 1 : -1);
    });
    return copy;
  }, [data, sort]);

  React.useEffect(() => {
    onSelectionChange?.(Array.from(selected).map((i) => sorted[i]));
  }, [selected, sorted, onSelectionChange]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className={cn("w-full overflow-hidden rounded-md border dark:border-neutral-800", className)}>
      <div className="flex items-center justify-between gap-2 border-b p-2 dark:border-neutral-800">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search..."
            className="w-full rounded-md border border-neutral-200 bg-white pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-neutral-600"
          />
        </div>
        <button onClick={onExport} className="inline-flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>
      <div className="max-h-[60vh] w-full overflow-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-white dark:bg-neutral-900">
            <tr>
              {selectableRows && <th className="sticky left-0 z-20 bg-inherit p-2 w-11 min-w-11 max-w-11 text-center">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === sorted.length && sorted.length > 0}
                  onChange={(e) => {
                    setSelected(e.target.checked ? new Set(sorted.map((_, i) => i)) : new Set());
                  }}
                />
              </th>}
              {columns.map((c) => (
                <th key={String(c.key)} className="whitespace-nowrap border-b p-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <button
                    className={cn("inline-flex items-center gap-1", !c.sortable && "cursor-default")}
                    onClick={() => c.sortable && setSort((s) => ({ key: c.key, dir: s?.dir === "asc" ? "desc" : "asc" }))}
                  >
                    {c.header}
                    {c.sortable && <span className="text-neutral-400">{sort?.key === c.key ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + (selectableRows ? 1 : 0)} className="p-6 text-center text-sm">Loading...</td>
              </tr>
            )}
            {!loading && sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length + (selectableRows ? 1 : 0)} className="p-6 text-center text-sm text-neutral-500">No data found</td>
              </tr>
            )}
            {!loading && sorted.map((row, i) => (
              <tr key={i} className="odd:bg-neutral-50/40 hover:bg-neutral-50 dark:odd:bg-neutral-900/40 dark:hover:bg-neutral-800/40">
                {selectableRows && (
                  <td className="sticky left-0 z-10 bg-inherit p-2 w-11 min-w-11 max-w-11 text-center">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${i + 1}`}
                      checked={selected.has(i)}
                      onChange={(e) => {
                        setSelected((s) => {
                          const n = new Set(s);
                          if (e.target.checked) {
                            n.add(i);
                          } else {
                            n.delete(i);
                          }
                          return n;
                        });
                      }}
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td key={String(c.key)} className="whitespace-nowrap border-b p-3 text-sm dark:border-neutral-800">
                    {c.render ? c.render(row[c.key], row) : String(row[c.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 border-t p-2 text-sm dark:border-neutral-800">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
            onClick={() => onPageChange?.(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <button
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
            onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


