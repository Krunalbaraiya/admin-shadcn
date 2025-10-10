import React from "react";
import { Container } from "./container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/60">
      <Container className="py-4 text-xs text-neutral-600 dark:text-neutral-400">
        © {year} Your Company. All rights reserved.
      </Container>
    </footer>
  );
}


