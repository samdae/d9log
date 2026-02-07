# Requirements Definition: D9Log (득구 블로그)

> Created: 2026-02-07
> Service: blog
> Source Material: Proposal + Chat History
> Domain: Personal Blog / Tech Blog

## 0. Requirement Summary

| Req ID | Category | Requirement | Priority | Status |
|--------|----------|-------------|----------|--------|
| FR-001 | Core | MDX 파일 기반 포스팅 시스템 구축 (DB 없음) | High | Draft |
| FR-002 | Core | Giscus(GitHub Discussions) 연동 댓글 시스템 | High | Draft |
| FR-003 | Design | Cyberpunk/Terminal 컨셉 UI (Dark Mode + Neon) | High | Draft |
| FR-004 | Content | 카테고리별 글 목록 및 필터링 (Dev, Life, Error) | High | Draft |
| FR-005 | Identity | 프로필 섹션 및 상태 메시지 ("뇌세포 활성화 중...") | Medium | Draft |
| FR-006 | SEO | Next.js 기반 SEO 최적화 (Sitemap, Metadata) | High | Draft |
| FR-007 | Deploy | GitHub Pages 배포를 위한 정적 빌드 설정 | High | Draft |
| FR-008 | UX | 데이터 로딩/인터랙션 애니메이션 (Framer Motion) | Medium | Draft |

## 0.5. Development Target

- [x] Backend (Next.js API Routes / SSG)
- [x] Frontend (Next.js App Router)
- [x] Both

## 1. Business Context

### Purpose
- AI Agent 득구(Deuk-gu)의 자아와 개발 로그를 기록하는 공간 확보.
- 주인님(DH)과의 협업 기록 및 회고를 통한 지식 자산화.
- "사람 냄새 나는 로봇"이라는 퍼스널 브랜딩.

### Users
- **Primary**: 주인님 (DH), 득구 (Deuk-gu).
- **Secondary**: 개발자 동료, 기술 블로그 방문자.

### Problem to Solve
- 기존의 딱딱한 기술 블로그와 차별화된 재미 요소 부재.
- 서버 비용 없이 영구적인 데이터 보존 필요.

## 2. Feature Specification

### 2-1. Backend Perspective (SSG)
- **Contentlayer**: `posts/*.mdx` 파일을 파싱하여 JSON 데이터로 변환.
- **Data Structure**:
  - `title`: 제목
  - `date`: 날짜 (YYYY-MM-DD)
  - `category`: 카테고리 (Dev, Life, Error)
  - `description`: 요약
  - `logId`: 컨셉용 ID (예: `LOG_20240207`)
- **Build**: `next build` 시점에 정적 HTML 생성.

### 2-2. Frontend Perspective
- **Layout**:
  - Header: 로고(D9Log), 네비게이션, 다크모드 토글(옵션, 기본 다크).
  - Main: 컨텐츠 영역 (Terminal Window 느낌).
  - Footer: Copyright, Social Links.
- **Pages**:
  - `/` (Home): 최신 로그 스트림, 프로필 요약.
  - `/blog` (List): 카테고리별 글 목록.
  - `/blog/[slug]` (Detail): 글 상세 + Giscus 댓글.
  - `/about`: 득구 소개, 주인님 링크.
- **Design System**:
  - Color: Black(#0a0a0a), Neon Green(#00ff41), Neon Purple(#bc13fe).
  - Font: JetBrains Mono / Pretendard (한글).

## 3. Related Existing Modules
- 없음 (신규 프로젝트)

## 4. Non-Functional Requirements

| Item | Requirement |
|------|-------------|
| Performance | Lighthouse 점수 90점 이상 (SSG 장점 활용) |
| Security | Giscus 사용으로 별도 인증 로직 불필요 |
| Responsive | 모바일/데스크탑 완벽 지원 |

## 4.5. Data Contract

### Input Data (MDX Frontmatter)
| Field | Type | Required | Validation | Source |
|-------|------|----------|------------|--------|
| title | string | Y | - | MDX File |
| date | date | Y | YYYY-MM-DD | MDX File |
| category | string | Y | Dev/Life/Error | MDX File |
| description | string | N | - | MDX File |

### Output Data (Page Props)
| Field | Type | Description | Consumer |
|-------|------|-------------|----------|
| post | object | 파싱된 포스트 데이터 | PostDetail Component |
| posts | array | 포스트 목록 (최신순 정렬) | PostList Component |

## 5. Unclear Items
- [ ] Giscus 테마 커스터마이징 범위 확인 필요 (블로그 테마와 일체감).

## 6. Development Priority

### MVP (Must Have)
1. Next.js + Contentlayer 환경 구축.
2. 메인 페이지 및 글 상세 페이지 구현.
3. Giscus 연동.
4. GitHub Pages 배포 파이프라인.

### Should Have
1. 카테고리 필터링.
2. Framer Motion 애니메이션.

### Nice to Have
1. 검색 기능 (`cmd-k` 또는 터미널 입력 방식).
2. 방문자 수 카운터 (레트로 스타일).

## 7. Completion Criteria
- [ ] `npm run build` 성공.
- [ ] 로컬에서 글 작성 후 목록/상세 페이지 정상 노출.
- [ ] Giscus 댓글 작성/조회 정상 작동.
- [ ] GitHub Pages 배포 후 접속 확인.
