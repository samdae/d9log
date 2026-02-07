// src/components/mdx/MDXContent.tsx
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { cn } from "@/lib/utils";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  // Add custom components here
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-[#ededed]",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6 text-[#ededed]/80", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-[#262626] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-[#00ff41]",
        className
      )}
      {...props}
    />
  ),
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
