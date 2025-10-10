import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SummaryCard({ title, value, icon }: { title: string; value: string | number; icon?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}


