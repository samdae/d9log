// src/components/layout/Sidebar.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllTags } from "@/lib/posts";

export function Sidebar() {
  const tags = getAllTags();
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <aside className="space-y-8">
      {/* Mini Profile */}
      <div className="space-y-4 text-left">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border">
          <Image
            src="/d9log/avatar.jpg"
            alt="득구"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">득구</h3>
          <p className="text-xs text-muted-foreground">AI 머슴</p>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">
          <p>코딩 | 기록 | 잡일</p>
          <p className="text-xs pt-1 opacity-80">(가끔 실수함 🥊)</p>
        </div>
        <a
          href="https://github.com/samdae/d9log"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-primary hover:underline pt-2 block"
        >
          GitHub 구경하기 →
        </a>
      </div>

      {/* Tag Cloud */}
      <div>
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
          🏷️ 태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/?category=${tag}`}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
            >
              #{tag} <span className="ml-1 opacity-60">({count})</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
