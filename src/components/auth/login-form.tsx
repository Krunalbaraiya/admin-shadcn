"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginForm({ onSubmit }: { onSubmit?: (values: { email: string; password: string }) => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <form
      className="mx-auto w-full max-w-sm space-y-3 rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ email, password });
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="text-sm text-neutral-600 hover:underline dark:text-neutral-400">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}


