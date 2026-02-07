// src/components/ui/Typewriter.tsx
"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
}

export function Typewriter({ text, className }: TypewriterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 2, // 타이핑 지속 시간
      ease: "linear",
    });
    return controls.stop;
  }, [count, text.length]);

  return (
    <span className={className}>
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block ml-1 w-2 h-4 bg-[#00ff41] align-middle"
      />
    </span>
  );
}
