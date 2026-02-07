// src/components/blog/PostCard.tsx
import Link from "next/link";
import { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col space-y-2 border-l-2 border-[#262626] pl-6 transition-colors hover:border-[#00ff41]">
      <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-[#262626] bg-[#0a0a0a] group-hover:border-[#00ff41] group-hover:bg-[#00ff41]" />
      
      <div className="flex items-center space-x-2 text-xs text-[#bc13fe]">
        <span>[{post.logId || "LOG_UNKNOWN"}]</span>
        <span className="text-[#ededed]/60">{formatDate(post.date)}</span>
      </div>
      
      <Link href={`/${post.slug}`} className="block">
        <h2 className="font-heading text-xl font-bold text-[#ededed] group-hover:text-[#00ff41] transition-colors">
          {post.title}
        </h2>
      </Link>
      
      {post.description && (
        <p className="text-sm text-[#ededed]/70 line-clamp-2">
          {post.description}
        </p>
      )}
      
      <div className="flex gap-2 pt-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded border border-[#262626] bg-[#0a0a0a] px-2 py-0.5 text-xs font-medium text-[#ededed]/80"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
