# Backend Design Doc: D9Log (득구 블로그)

> Created: 2026-02-07
> Service: blog
> Type: Backend
> Requirements document: docs/blog/spec.md

## 0. Summary

### Goal
- 득구(Deuk-gu)의 페르소나를 담은 고성능 기술 블로그 구축.
- **Velite**를 활용한 타입 안전(Type-safe)한 MDX 파이프라인 및 **GitHub Pages** 정적 배포 최적화.

### Non-goals
- 동적 서버 기능 (API Routes, SSR) - GitHub Pages 배포 제약으로 인해 SSG(Static Site Generation)만 사용.
- 별도의 Admin 대시보드.

### Success metrics
- Lighthouse Performance 95+ (SSG).
- `next build` 성공 및 `out` 디렉토리 정상 생성.
- Giscus 댓글 정상 로드.

---

## 1. Scope

### In scope
- Next.js 14 (App Router) 프로젝트 셋업 및 `output: 'export'` 설정.
- Velite 기반 MDX 파싱 및 데이터 구조화 (Post, Tag).
- 블로그 목록, 상세, 태그 필터링 로직 구현.
- SEO (Sitemap, RSS, Metadata) 정적 생성 스크립트.
- Giscus 댓글 컴포넌트 연동.

### Out of scope
- 실시간 조회수 카운터 (별도 백엔드 필요).
- 회원가입/로그인 (Giscus 위임).

---

## 1.5. Tech Stack

```yaml
tech_stack:
  language: "TypeScript 5.x"
  framework: "Next.js 14 (App Router)"
  package_manager: "npm"
  styling: 
    - "Tailwind CSS"
    - "Framer Motion"
  content_pipeline: "Velite" (MDX to JSON)
  markdown_plugins: 
    - "rehype-pretty-code" (Syntax Highlighting)
  comment_system: "Giscus" (@giscus/react)
  deployment: "GitHub Pages" (Static Export)
  infra: "GitHub Actions"
```

---

## 1.6. Dependencies

```yaml
package_manager: "npm"
project_type: "new"

dependencies:
  # Core
  - name: "next"
    version: "14.x"
    purpose: "Framework"
    status: "approved"
  
  # Content
  - name: "velite"
    version: "latest"
    purpose: "MDX Pipeline (Contentlayer replacement)"
    status: "approved"
  
  # UI/Styling
  - name: "framer-motion"
    version: "latest"
    purpose: "Animation"
    status: "approved"
  
  # Utils
  - name: "date-fns"
    version: "latest"
    purpose: "Date formatting"
    status: "approved"
  
  # Icons
  - name: "lucide-react"
    version: "latest"
    purpose: "Icons"
    status: "approved"
```

---

## 2. Architecture Impact

### Components

| Service / Module | Responsibility | Change type |
|-----------------|----------------|-------------|
| **Content Pipeline** | Velite를 사용해 MDX 파일을 JSON 데이터로 변환 (Build Time) | New |
| **Static Data Access** | 빌드된 JSON 데이터를 Type-safe하게 쿼리하는 유틸리티 | New |
| **SEO Generator** | Sitemap.xml, RSS Feed를 빌드 타임에 생성 | New |

### Data (File-based)

#### Content Schema (Velite)

```typescript
// defined in velite.config.ts
const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx', // dev, life, error 하위 폴더 포함
  schema: s.object({
    slug: s.path(),
    title: s.string().max(99),
    date: s.isodate(), // YYYY-MM-DD
    description: s.string().optional(),
    tags: s.array(s.string()).default([]),
    logId: s.string().optional(), // 컨셉용 ID
    body: s.mdx(),
    toc: s.toc(), // Table of Contents
  })
  .transform(data => ({
    ...data,
    slugAsParams: data.slug.split('/').slice(1).join('/'), // posts/dev/title -> dev/title
  }))
})
```

---

## 3. Code Mapping

| # | Spec Ref | Feature | File | Class | Method | Action | Impl |
|---|----------|---------|------|-------|--------|--------|------|
| 1 | FR-007 | Config | `next.config.mjs` | - | - | `output: 'export'`, `images.unoptimized: true` 설정 | [x] |
| 2 | FR-001 | Schema | `velite.config.ts` | - | - | Post 컬렉션 스키마 정의 | [x] |
| 3 | FR-001 | Utils | `src/lib/utils.ts` | - | `sortPosts` | 날짜 내림차순 정렬 함수 | [x] |
| 4 | FR-004 | Utils | `src/lib/utils.ts` | - | `getAllTags` | 태그 목록 및 카운트 집계 | [x] |
| 5 | FR-006 | Sitemap | `src/app/sitemap.ts` | - | `generateSitemap` | 전체 포스트 URL 리스트 반환 | [x] |
| 6 | FR-002 | Comments | `src/components/comments.tsx` | `Comments` | - | Giscus 컴포넌트 구현 (`use client`) | [x] |
| 7 | FR-003 | Theme | `src/app/layout.tsx` | - | - | ThemeProvider 및 기본 폰트 적용 | [x] |

---

## 4. Implementation Plan

### Required Reference Files
- `docs/blog/spec.md`: 요구사항 상세 확인.
- `package.json`: 의존성 버전 확인.

### Step-by-Step Implementation

1.  **Step 1: Project Setup & Config**
    - Next.js 설치 (`npx create-next-app`).
    - Velite 설치 및 `next.config.mjs`, `tsconfig.json` 설정.
    - GitHub Pages 배포를 위한 `output: 'export'` 설정.

2.  **Step 2: Content Pipeline**
    - `velite.config.ts` 작성 (스키마 정의).
    - 샘플 포스트(`content/posts/hello-world.mdx`) 작성.
    - 데이터 연동 테스트.

3.  **Step 3: Core Pages (UI)**
    - 메인 페이지 (글 목록).
    - 상세 페이지 (MDX 렌더링).
    - Giscus 연동.

4.  **Step 4: SEO & Deploy**
    - Sitemap, Metadata 설정.
    - GitHub Actions 워크플로우 파일 작성 (`.github/workflows/deploy.yml`).

---

## 7. Infra/Ops

### Deployment (GitHub Pages)
- **Tool**: GitHub Actions
- **Process**:
  1. `main` 브랜치 푸시 감지.
  2. `npm ci` -> `npm run build` (Velite 실행 포함).
  3. `out/` 디렉토리를 `gh-pages` 브랜치로 배포.
- **Config**: `.github/workflows/deploy.yml` 필요.

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | SEO용 사이트 URL | `https://{user}.github.io/d9log` |

---

## 8. Risks & Tradeoffs (Debate Conclusion)

### Chosen Option: **Velite + GitHub Pages (SSG)**
- **이유**:
    - **Velite**: Contentlayer가 유지보수 중단됨. 타입 안전성과 성능이 뛰어난 최신 대안.
    - **GitHub Pages**: 주인님 요청(비용 0원). 정적 블로그에 최적화됨.

### Rejected Alternatives
- **Vercel**: 동적 기능(API Routes, Image Optimization) 사용 가능하나, 무료 티어 제한 및 "완전 무료/독립" 컨셉을 위해 배제. (필요 시 마이그레이션 쉬움)
- **Remote MDX**: `next-mdx-remote`는 설정이 복잡하고 타입 추론이 약함.

### Risks
- **Image Optimization**: GitHub Pages는 Node.js 서버가 없어서 Next.js의 Image Optimization을 기본으로 사용할 수 없음.
    - **해결**: `images.unoptimized: true` 설정으로 우회하거나, 빌드 타임 최적화 도구 사용. (득구 블로그는 텍스트 위주라 unoptimized로 충분)

---

## 9. Error/Auth/Data Checklist

### Error Handling
- **Build Fail**: Velite 스키마 위반(필수 필드 누락 등) 시 빌드 자체가 실패하여 배포 차단 (안전장치).
- **Not Found**: 존재하지 않는 슬러그 접근 시 404 페이지 정적 생성.

### Authorization
- **Write**: Git Repository 권한으로 제어.
- **Comment**: Giscus(GitHub OAuth)가 전담.

### Data Integrity
- Velite(Zod)가 빌드 타임에 모든 MDX 파일의 메타데이터 형식을 검증함. 데이터 무결성 100% 보장.
