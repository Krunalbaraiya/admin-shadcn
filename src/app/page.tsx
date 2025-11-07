"use client";

import React, { useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { SummaryCard } from "@/components/widgets/summary-card";
import { Users, DollarSign, ShoppingCart } from "lucide-react";
import { SimpleBarChart } from "@/components/widgets/chart";
import { ActivityLog } from "@/components/widgets/activity-log";
import { DataTable, Column } from "@/components/ui/table";
import Heading from "@/components/ui/heading";
import { DatePicker } from "@/components/forms/date-picker";
import { FormWrapper } from "@/components/forms/form-wrapper";
import { Input } from "@/components/ui/input";
import { MultiStepForm } from "@/components/forms/multi-step-form";
import { ToggleSwitch } from "@/components/forms/toggle-switch";
import { Slider } from "@/components/forms/slider";
import { Button } from "@/components/ui/button";
import { AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("home");
  const pageSize = 5;
  const paged = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <AdminShell title="Dashboard">

      {/* Analytics Section */}
      <section className="mt-8">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Chart Component */}
          <div className="lg:col-span-2">
            <Heading title="Analytics" className="mb-4" />
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
          {/* Activity Log */}
          <div>
            <Heading title="Recent Activity" className="mb-4" />
            <ActivityLog
              items={[
                {
                  id: "1",
                  message: "User John created an order",
                  time: "2m ago",
                },
                {
                  id: "2",
                  message: "Payment processed for #A123",
                  time: "1h ago",
                },
                {
                  id: "3",
                  message: "User Jane updated profile",
                  time: "3h ago",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Data Table Section */}
      <section className="mt-8">
        <Heading title="User Management" className="mb-4" />
        <DataTable<User>
          data={paged}
          columns={columns}
          page={page}
          pageSize={pageSize}
          total={users.length}
          selectableRows
          onPageChange={setPage}
        />
      </section>

      {/* Forms Section */}
      <section className="mt-8">
        <Heading title="Forms & Inputs" className="mb-4" />
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-medium">Date Selection</h3>
            <DatePicker />
          </div>

          <FormWrapper
            title="User Information"
            description="Enter user details"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
            </div>
          </FormWrapper>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-medium">Multi-Step Process</h3>
            <MultiStepForm
              steps={[
                { title: "Step 1", content: <div>Personal Info</div> },
                { title: "Step 2", content: <div>Contact Details</div> },
                { title: "Step 3", content: <div>Confirmation</div> },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Interactive Components Section */}
      <section className="mt-8">
        <Heading title="Interactive Elements" className="mb-4" />
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-medium">Controls</h3>
            <div className="space-y-4">
              <Slider
                value={20}
                min={0}
                max={100}
                step={1}
                onChange={(v) => console.log(v)}
              />
              <ToggleSwitch />
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-medium">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Delete</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Section */}
      <section className="mt-8">
        <Heading title="Dialogs & Overlays" className="mb-4" />
        <div className="space-y-4">
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal
            open={open}
            onOpenChange={setOpen}
            title="Confirmation"
            description="Please confirm your action"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive">Confirm</Button>
              </>
            }
          >
            Are you sure you want to proceed?
          </Modal>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mt-8">
        <Heading title="Navigation" className="mb-4" />
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="home" active={value === "home"}>
              Home
            </TabsTrigger>
            <TabsTrigger value="profile" active={value === "profile"}>
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent hidden={value !== "home"}>
            <Card>
              <CardContent>🏠 Welcome to Home</CardContent>
            </Card>
          </TabsContent>
          <TabsContent hidden={value !== "profile"}>
            <Card>
              <CardContent>👤 Profile Information</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </AdminShell>
  );
}
