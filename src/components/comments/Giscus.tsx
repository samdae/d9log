// src/components/comments/Giscus.tsx
"use client";

import GiscusReact from "@giscus/react";
import { useTheme } from "next-themes";

export function Giscus() {
  const { theme, systemTheme } = useTheme();
  // theme이 system이면 systemTheme 사용, 아니면 theme 사용
  // 초기 렌더링 시 hydration mismatch 방지를 위해 useEffect 사용하거나 preferred_color_scheme 사용
  const currentTheme = theme === "system" ? systemTheme : theme;
  const giscusTheme = currentTheme === "dark" ? "dark_dimmed" : "light";

  return (
    <div className="mt-10 pt-10 border-t border-border">
      <GiscusReact
        id="comments"
        repo="samdae/d9log"
        repoId="R_kgDORKvKdg"
        category="General"
        categoryId="DIC_kwDORKvKds4C2Agz"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
