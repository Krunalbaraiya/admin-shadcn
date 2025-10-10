"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm({ onSubmit }: { onSubmit?: (values: { password: string; confirmPassword: string }) => void }) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const mismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <form
      className="mx-auto w-full max-w-sm space-y-3 rounded-lg border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      onSubmit={(e) => {
        e.preventDefault();
        if (!mismatch) onSubmit?.({ password, confirmPassword });
      }}
    >
      <div>
        <label className="mb-1 block text-sm font-medium">New Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Confirm Password</label>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {mismatch && <p className="mt-1 text-xs text-red-600">Passwords do not match</p>}
      </div>
      <Button type="submit" className="w-full" disabled={mismatch}>
        Reset Password
      </Button>
    </form>
  );
}


