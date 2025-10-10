"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm({ onSubmit }: { onSubmit?: (values: { email: string }) => void }) {
  const [email, setEmail] = React.useState("");
  return (
    <form
      className="mx-auto w-full max-w-sm space-y-3 rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ email });
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Send reset link
      </Button>
    </form>
  );
}


