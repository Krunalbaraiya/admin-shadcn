import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Activity = { id: string; message: string; time: string };

export function ActivityLog({ items }: { items: Activity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((a) => (
            <li key={a.id} className="flex items-start justify-between text-sm">
              <span className="text-neutral-700 dark:text-neutral-200">{a.message}</span>
              <span className="shrink-0 text-neutral-500 dark:text-neutral-400">{a.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}


