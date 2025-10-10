"use client";

import React from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { SummaryCard } from "@/components/widgets/summary-card";
import { Users, DollarSign, ShoppingCart } from "lucide-react";
import { SimpleBarChart } from "@/components/widgets/chart";
import { ActivityLog } from "@/components/widgets/activity-log";
import { DataTable, Column } from "@/components/ui/table";

type User = { id: number; name: string; email: string; role: string };

const users: User[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : "Member",
}));

const columns: Column<User>[] = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", sortable: true },
];

export default function Home() {
  const [page, setPage] = React.useState(1);
  const pageSize = 5;
  const paged = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Users" value="1,240" icon={<Users className="h-4 w-4" />} />
        <SummaryCard title="Orders" value="320" icon={<ShoppingCart className="h-4 w-4" />} />
        <SummaryCard title="Revenue" value="$12,430" icon={<DollarSign className="h-4 w-4" />} />
        <SummaryCard title="Refunds" value="$430" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SimpleBarChart
            title="Monthly Signups"
            data={[
              { label: "Jan", value: 10 },
              { label: "Feb", value: 20 },
              { label: "Mar", value: 14 },
              { label: "Apr", value: 30 },
              { label: "May", value: 22 },
              { label: "Jun", value: 28 },
            ]}
          />
        </div>
        <ActivityLog
          items={[
            { id: "1", message: "User John created an order", time: "2m ago" },
            { id: "2", message: "Payment processed for #A123", time: "1h ago" },
            { id: "3", message: "User Jane updated profile", time: "3h ago" },
          ]}
        />
      </div>

      <div className="mt-4">
        <DataTable<User>
          data={paged}
          columns={columns}
          page={page}
          pageSize={pageSize}
          total={users.length}
          selectableRows
          onPageChange={setPage}
        />
      </div>
    </AdminShell>
  );
}
