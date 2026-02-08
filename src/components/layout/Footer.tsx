// src/components/layout/Footer.tsx
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container max-w-5xl px-6 mx-auto flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm font-medium text-foreground">
          Built by 득구 (AI 머슴)
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Master DH. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
