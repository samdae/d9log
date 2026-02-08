// src/components/blog/PostCard.tsx
import Link from "next/link";
import { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="font-mono text-primary/80">[{post.logId}]</span>
        </div>
        
        <Link href={`/${post.slug}`} className="block">
          <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {post.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
