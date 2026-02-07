// src/app/posts/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Giscus } from "@/components/comments/Giscus";
import { formatDate } from "@/lib/utils";

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
    <article className="container py-6 prose dark:prose-invert max-w-none">
      <div className="space-y-4 text-center">
        <div className="text-[#00ff41] font-mono text-sm">
          [{post.logId || "LOG_UNKNOWN"}]
        </div>
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-[#ededed]">
          {post.title}
        </h1>
        <div className="text-[#ededed]/60 text-sm">
          {formatDate(post.date)}
        </div>
      </div>
      
      <div className="mt-8 border-t border-[#262626] pt-8">
        <MDXContent code={post.body} />
      </div>

      <Giscus />
    </article>
  );
}
