// src/components/layout/ThemeToggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // 모바일(768px 미만)일 때만 스크롤 로직 적용
      if (window.innerWidth < 768) {
        setIsVisible(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setIsVisible(true); // 데스크탑은 항상 보임
      }
    };

    // 초기 로드 시 체크
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // 리사이즈 대응

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-colors 
            bg-[#262626] dark:bg-white 
            text-yellow-400"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "light" ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
