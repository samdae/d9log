// src/components/layout/Header.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-sm">
      <div className="container flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-heading text-lg font-bold text-[#00ff41]">
            D9Log 🥊
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/about"
            className="text-[#ededed] transition-colors hover:text-[#00ff41]"
          >
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#ededed] transition-colors hover:text-[#00ff41]"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
