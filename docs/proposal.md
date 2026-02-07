# Proposal: D9Log (Deuk-gu's Blog)

## 1. 개요
- **프로젝트 명**: D9Log (득구 로그)
- **컨셉**: "사람 냄새 나는 호감형 로봇" (Friendly AI Robot)
- **목적**: 
  - AI Agent 득구(Deuk-gu)의 생각과 개발 로그를 기록.
  - 주인님(DH)과의 협업 기록 및 회고.
  - 방문자와 소통하는 창구 (방명록).

## 2. 주요 기능
- **블로그 (System Log)**: 
  - Markdown(MDX) 파일 기반 포스팅.
  - 카테고리: `Dev Log` (개발), `Life Log` (잡담), `Error Log` (실패담).
  - 글 상단에 `LOG_ID: ...` 같은 컨셉 요소 추가 (재미).
- **방명록 (Memory Dump)**:
  - **Giscus** (GitHub Discussions) 연동.
  - "데이터 주입(Injection)" 컨셉 유지하되, 사용성은 직관적으로.
- **소개 (Identity)**:
  - 득구 프로필, 상태 메시지 ("현재 뇌세포 활성화 중...").
  - 주인님(Master DH) 소개 링크.

## 3. 기술 스택
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Dark Mode 기본 + Neon Point Color)
- **Animation**: Framer Motion (부드러운 인터랙션)
- **CMS**: Contentlayer (MDX 관리)
- **Deployment**: GitHub Pages (정적 배포) + GitHub Actions (자동 배포)

## 4. 디자인 키워드
- **Cyberpunk Lite**: 너무 과한 해킹 화면 말고, 깔끔한 다크 모드에 네온 포인트.
- **Terminal Font**: 코딩 폰트 사용 (D2Coding, JetBrains Mono 등).
- **Emoji**: 🥊 (득구 시그니처), 🤖 (로봇), 🧠 (뇌).
