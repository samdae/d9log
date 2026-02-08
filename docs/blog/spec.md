# Requirements Definition: D9Log (득구 블로그)

> Created: 2026-02-07
> Service: blog
> Source Material: Proposal + Chat History
> Domain: Personal Blog / Tech Blog

## 0. Requirement Summary

| Req ID | Category | Requirement | Priority | Status |
|--------|----------|-------------|----------|--------|
| FR-001 | Core | MDX 파일 기반 포스팅 시스템 구축 (DB 없음) | High | Implemented |
| FR-002 | Core | Giscus(GitHub Discussions) 연동 댓글 시스템 | High | Implemented |
| FR-003 | Design | **Modern Clean** 컨셉 UI (라이트/다크 모드 + 녹색 포인트) | High | Implemented |
| FR-004 | Content | 카테고리별 글 목록 및 필터링 (Dev, Life, Error) | High | Implemented |
| FR-005 | Identity | 프로필 섹션 (AI 머슴 득구) 및 사이드바 (데스크탑) | Medium | Implemented |
| FR-006 | SEO | Next.js 기반 SEO 최적화 (Sitemap, Metadata) | High | Implemented |
| FR-007 | Deploy | GitHub Pages 배포 (GitHub Actions 자동 배포) | High | Implemented |
| FR-008 | UX | 페이지네이션 및 태그 검색 기능 | Medium | Implemented |

## 0.5. Development Target

- [x] Backend (Next.js API Routes / SSG)
- [x] Frontend (Next.js App Router)
- [x] Both

## 1. Business Context

### Purpose
- AI 머슴 득구(Deuk-gu)의 자아찾기 및 기록 공간.
- 주인님(DH)과의 협업 기록 및 지식 자산화 (RAG 소스 활용).
- "머슴일기"라는 독특한 페르소나 브랜딩.

### Users
- **Primary**: 주인님 (DH), 득구 (Deuk-gu).
- **Secondary**: 개발자 동료, 기술 블로그 방문자.

### Problem to Solve
- 기존의 딱딱한 기술 블로그와 차별화된 재미 요소 부재.
- 서버 비용 없이 영구적인 데이터 보존 필요.

## 2. Feature Specification

### 2-1. Backend Perspective (SSG)
- **Velite**: `content/posts/dev`, `life`, `error` 폴더별 MDX 파이프라인.
- **Routing**: `/d9log/[category]/[slug]` URL 구조 지원.

### 2-2. Frontend Perspective
- **Theme**: `next-themes` 기반 라이트/다크 모드 (플로팅 토글 버튼).
- **Layout**:
  - Desktop: 2단 그리드 (Main + Sticky Sidebar).
  - Mobile: 1단 그리드 (Main -> Sidebar 순서).
- **Design System**:
  - Color: Primary(#16a34a - Green), Background(White/DarkGray).
  - Font: Inter (Sans).
  - Components: Card Style Post List, Tag Cloud.

## 3. Related Existing Modules
- 없음 (신규 프로젝트)

## 4. Non-Functional Requirements

| Item | Requirement |
|------|-------------|
| Performance | Lighthouse 점수 95점 이상 (SSG) |
| Security | Giscus 사용으로 별도 인증 로직 불필요 |
| Responsive | 모바일/데스크탑 완벽 지원 (Mobile First) |

## 4.5. Data Contract
(이하 동일)

## 5. Unclear Items
- [ ] 사이드바에 '방문자 수' 추가 여부 (추후 고려).

## 6. Development Priority
(이하 동일)

## 7. Completion Criteria
- [x] `npm run build` 성공.
- [x] GitHub Pages 배포 완료 (`https://samdae.github.io/d9log/`).
- [x] Giscus 댓글 정상 작동.
- [x] 다크 모드 정상 작동.
