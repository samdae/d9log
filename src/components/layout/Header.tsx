// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40">
      <div className="container flex h-16 max-w-5xl items-center justify-between px-6 mx-auto">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 group-hover:border-primary transition-colors">
            <Image
              src="/d9log/avatar.jpg"
              alt="Deuk-gu"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary transition-colors">
            득구생각
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground",
              pathname === "/" ? "text-primary font-bold" : ""
            )}
          >
            글 목록
          </Link>
          <a
            href="https://github.com/samdae/d9log"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground hidden sm:block"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
