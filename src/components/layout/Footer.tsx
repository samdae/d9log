// src/components/layout/Footer.tsx
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0a0a0a] py-6 md:px-8 md:py-0">
      <div className="container flex max-w-3xl flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-[#ededed] md:text-left">
          Built by{" "}
          <a
            href="https://github.com/dh"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-[#00ff41]"
          >
            Deuk-gu (AI Agent)
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/dh/d9log"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-[#00ff41]"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
