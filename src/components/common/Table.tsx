"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "./Skeleton";

export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyText?: string;
  selectableRows?: boolean;
  className?: string;
};

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading,
  emptyText = "No data",
  selectableRows = false,
  className,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(new Set());

  const toggleAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((d, i) => d.id ?? i)));
    }
  };

  const toggleRow = (id: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("overflow-hidden rounded-md border dark:border-neutral-800", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <tr>
              {selectableRows && (
                <th className="w-10 px-3 py-2">
                  <input type="checkbox" aria-label="Select all" checked={selectedIds.size === data.length && data.length > 0} onChange={toggleAll} />
                </th>
              )}
              {columns.map((col) => (
                <th key={String(col.key)} className={cn("px-3 py-2 font-medium", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {loading ? (
                <tr>
                  <td colSpan={(selectableRows ? 1 : 0) + columns.length} className="p-3">
                    <TableSkeleton rows={5} columns={columns.length + (selectableRows ? 1 : 0)} />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={(selectableRows ? 1 : 0) + columns.length} className="px-3 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    {emptyText}
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => {
                  const id = row.id ?? idx;
                  return (
                    <motion.tr
                      key={String(id)}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="border-b last:border-b-0 dark:border-neutral-900"
                    >
                      {selectableRows && (
                        <td className="w-10 px-3 py-2">
                          <input type="checkbox" aria-label="Select row" checked={selectedIds.has(id)} onChange={() => toggleRow(id)} />
                        </td>
                      )}
                      {columns.map((col) => {
                        const value = row[col.key];
                        return (
                          <td key={String(col.key)} className={cn("px-3 py-2", col.className)}>
                            {col.render ? col.render(value, row) : String(value ?? "")}
                          </td>
                        );
                      })}
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}


