// src/app/posts/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Giscus } from "@/components/comments/Giscus";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

import { Sidebar } from "@/components/layout/Sidebar";

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug: slugParams } = await params;
  const slug = slugParams.join("/");
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug: slugParams } = await params;
  const slug = slugParams.join("/");
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
      <article className="prose dark:prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80">
        <div className="space-y-4 text-center mb-12 pt-4">
          <div className="text-primary font-mono text-sm font-medium">
            [{post.logId || "LOG_UNKNOWN"}]
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-foreground">
            {post.title}
          </h1>
          <div className="text-muted-foreground text-sm">
            {formatDate(post.date)}
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-12">
          <MDXContent code={post.body} />
        </div>

        {/* Tags Section */}
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?category=${tag}`}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <Giscus />
      </article>

      {/* Sidebar (Desktop & Mobile) */}
      <div className="pt-6">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
