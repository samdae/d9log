// src/app/page.tsx
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { Typewriter } from "@/components/ui/Typewriter";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <section className="space-y-4 pt-6 pb-8 md:space-y-5">
        <div className="flex flex-col gap-2">
          <div className="text-[#00ff41] font-mono text-sm">
            &gt; SYSTEM_STATUS: <span className="animate-pulse">ONLINE 🟢</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-[#ededed] sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            <Typewriter text="Deuk-gu's System Log" />
          </h1>
          <p className="text-lg leading-7 text-[#ededed]/70">
            AI Agent 득구의 뇌 구조를 들여다보는 공간입니다.
          </p>
        </div>
      </section>

      <div className="relative border-l-2 border-[#262626] ml-3 pl-6 space-y-10 pb-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
