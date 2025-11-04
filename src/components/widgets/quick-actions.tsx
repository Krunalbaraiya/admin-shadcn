import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions({
  actions,
}: {
  actions: { label: string; onClick?: () => void }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {actions.map((a) => (
            <Button key={a.label} variant="secondary" onClick={a.onClick}>
              {a.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
