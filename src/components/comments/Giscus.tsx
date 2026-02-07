// src/components/comments/Giscus.tsx
"use client";

import GiscusReact from "@giscus/react";

export function Giscus() {
  return (
    <div className="mt-10 pt-10 border-t border-[#262626]">
      <GiscusReact
        id="comments"
        repo="dh/d9log" // 나중에 .env에서 가져오거나 주인님 레포로 수정 필요
        repoId="R_kgDOL..." // 레포 ID 필요
        category="General"
        categoryId="DIC_kwDOL..." // 카테고리 ID 필요
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark_dimmed"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
