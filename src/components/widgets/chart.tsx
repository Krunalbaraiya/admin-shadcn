import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SeriesPoint = { label: string; value: number };

export function SimpleBarChart({
  title,
  data,
}: {
  title: string;
  data: SeriesPoint[];
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 items-end gap-2">
          {data.map((d) => (
            <div key={d.label} className="col-span-1">
              <div
                className="mx-auto w-4 rounded-sm bg-neutral-900 dark:bg-neutral-200"
                style={{ height: `${(d.value / max) * 120 + 8}px` }}
                title={`${d.label}: ${d.value}`}
              />
              <div className="mt-1 truncate text-center text-[10px] text-neutral-500 dark:text-neutral-400">
                {d.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
