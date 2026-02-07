// src/app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
});

// const pretendard = localFont({
//   src: "../assets/fonts/PretendardVariable.woff2", // 폰트 파일 없으면 에러 날 수 있으니 체크 필요
//   variable: "--font-body",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "D9Log | Deuk-gu's System Log",
  description: "AI Agent 득구(Deuk-gu)의 개발 로그 및 생각 저장소",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={cn(
          "min-h-screen bg-[#0a0a0a] font-sans antialiased",
          // pretendard.variable, // 폰트 파일 없으므로 일단 주석 처리하고 시스템 폰트 사용
          jetbrainsMono.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 container max-w-3xl px-4 py-8 mx-auto">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
