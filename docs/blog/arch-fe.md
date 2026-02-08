# Frontend Design Doc: D9Log (득구 블로그)

> Created: 2026-02-07
> Service: blog
> Type: Frontend
> Requirements: docs/blog/spec.md
> UI Specification: docs/blog/ui.md

## 0. Summary

### Goal
- **D9Log (득구 블로그)**의 UI/UX를 구현.
- **Cyberpunk Terminal** 감성을 살리면서도 읽기 편한 **가독성** 확보.
- Mobile First 기반의 **Responsive Web** 구현.

### Non-goals
- 복잡한 WebGL 3D 그래픽 (성능 이슈 방지).
- IE 지원.

### Success metrics
- **Lighthouse Performance 95+**.
- **FCP (First Contentful Paint)** < 1.0s.
- **CLS (Cumulative Layout Shift)** 0.

---

## 1. Scope

### In scope
- **Pages**: Main, Post Detail, About, 404 (Based on `ui.md`).
- **Components**: Terminal UI, Typewriter Effect, PostCard, MDX Viewer, Giscus.
- **Theme**: Dark Mode Only (Based on `ui.md` & `spec.md`).
- **Animation**: Framer Motion을 활용한 마이크로 인터랙션.

### Out of scope
- 실시간 채팅 (Giscus 댓글로 대체).
- PWA (추후 고려).

---

## 1.5. Tech Stack

```yaml
tech_stack:
  framework: "Next.js 14 (App Router)"
  language: "TypeScript 5.x"
  state_management: "Zustand" (UI State)
  styling: "Tailwind CSS + Tailwind Typography"
  animation: "Framer Motion"
  icons: "Lucide React"
  font: "next/font (JetBrains Mono, Pretendard)"
  mdx_renderer: "Velite (Content Pipeline) + Custom MDX Components"
```

---

## 1.6. Dependencies

```yaml
package_manager: "npm"
project_type: "new"

dependencies:
  # UI/Styling
  - name: "framer-motion"
    version: "latest"
    purpose: "Animation"
    status: "approved"
  - name: "lucide-react"
    version: "latest"
    purpose: "Icons"
    status: "approved"
  - name: "clsx"
    version: "latest"
    purpose: "ClassName Utility"
    status: "approved"
  - name: "tailwind-merge"
    version: "latest"
    purpose: "ClassName Merge"
    status: "approved"
  
  # Content
  - name: "velite"
    version: "latest"
    purpose: "MDX Pipeline"
    status: "approved"
  
  # Comments
  - name: "@giscus/react"
    version: "latest"
    purpose: "Comments"
    status: "approved"
  
  # State
  - name: "zustand"
    version: "latest"
    purpose: "Global UI State"
    status: "approved"
```

---

## 2. Architecture Impact

### Component Structure

> **Reference**: Derived from `ui.md` Component Hierarchy.

```yaml
component_structure:
  pages:
    - path: "/"
      component: "MainPage"
      file: "src/app/page.tsx"
      description: "로그 스트림 (최신 글 목록)"
    
    - path: "/blog/[slug]"
      component: "PostDetailPage"
      file: "src/app/blog/[slug]/page.tsx"
      description: "로그 상세 (MDX 뷰어 + 댓글)"
    
    - path: "/about"
      component: "AboutPage"
      file: "src/app/about/page.tsx"
      description: "득구 프로필 (스탯창)"
    
    - path: "*"
      component: "NotFound"
      file: "src/app/not-found.tsx"
      description: "404 페이지"

  shared:
    - name: "Header"
      path: "src/components/layout/Header.tsx"
      description: "로고, 네비게이션"
    
    - name: "Footer"
      path: "src/components/layout/Footer.tsx"
      description: "카피라이트, 소셜 링크"
    
    - name: "PostCard"
      path: "src/components/blog/PostCard.tsx"
      description: "글 목록 아이템 (터미널 스타일)"
    
    - name: "Typewriter"
      path: "src/components/ui/Typewriter.tsx"
      description: "타이핑 효과 텍스트"
    
    - name: "TerminalBlock"
      path: "src/components/ui/TerminalBlock.tsx"
      description: "터미널 스타일 컨테이너"
    
    - name: "MDXContent"
      path: "src/components/mdx/MDXContent.tsx"
      description: "MDX 렌더러 + 커스텀 컴포넌트 매핑"
    
    - name: "Giscus"
      path: "src/components/comments/Giscus.tsx"
      description: "GitHub Discussions 댓글 연동"
```

---

## 3. State Management

```yaml
state_management:
  global_state:
    - name: "useUIStore"
      file: "src/store/ui.ts"
      state:
        - field: "isMenuOpen"
          type: "boolean"
          initial: "false"
          description: "모바일 메뉴 토글 상태"
  
  local_state:
    - component: "MainPage"
      states:
        - name: "selectedCategory"
          type: "string"
          purpose: "카테고리 필터링"
```

---

## 4. Route Definition

```yaml
routes:
  - path: "/"
    component: "MainPage"
    auth_required: false

  - path: "/blog/[slug]"
    component: "PostDetailPage"
    params:
      - name: "slug"
        type: "string"
    auth_required: false

  - path: "/about"
    component: "AboutPage"
    auth_required: false
```

---

## 6. Code Mapping

| # | Spec Ref | Feature | File | Component | Action | Impl |
|---|----------|---------|------|-----------|--------|------|
| 1 | FR-003 | Layout | `src/app/layout.tsx` | `RootLayout` | 전역 폰트, 테마, 배경색 설정 | [x] |
| 2 | FR-004 | Post List | `src/app/page.tsx` | `MainPage` | Velite 데이터 로드 및 필터링 로직 구현 | [x] |
| 3 | FR-004 | Post Card | `src/components/blog/PostCard.tsx` | `PostCard` | 터미널 로그 스타일 UI 구현 | [x] |
| 4 | FR-001 | MDX View | `src/app/blog/[slug]/page.tsx` | `PostDetailPage` | `generateStaticParams` 구현 및 MDX 렌더링 | [x] |
| 5 | FR-002 | Comments | `src/components/comments/Giscus.tsx` | `Giscus` | `@giscus/react` 설정 및 테마 주입 | [x] |
| 6 | FR-005 | Profile | `src/app/about/page.tsx` | `AboutPage` | 스탯창 UI 및 스킬 리스트 구현 | [x] |
| 7 | FR-008 | Animation | `src/components/ui/Typewriter.tsx` | `Typewriter` | Framer Motion 활용 타이핑 효과 | [x] |

---

## 7. Implementation Plan

### Step-by-Step Implementation

1.  **Step 1: UI Foundation**
    - Tailwind Config 설정 (색상, 폰트).
    - `src/lib/utils.ts` (cn 유틸리티).
    - `layout.tsx` 기본 구조 잡기.

2.  **Step 2: Shared Components**
    - `Header`, `Footer` 구현.
    - `Typewriter`, `TerminalBlock` 등 디자인 컴포넌트 구현.

3.  **Step 3: Feature Implementation**
    - 메인 페이지 (목록 + 필터).
    - 상세 페이지 (MDX 스타일링 - Typography 플러그인 커스텀).
    - About 페이지.

4.  **Step 4: Integration & Polish**
    - Giscus 연동.
    - Framer Motion 애니메이션 적용 (Page Transition, Hover Effect).

---

## 9. Style Guide (Cyberpunk Lite)

### Design Tokens

```yaml
design_tokens:
  colors:
    background: "#0a0a0a" (Neutral-950)
    foreground: "#ededed" (Neutral-50)
    primary: "#00ff41" (Neon Green)
    secondary: "#bc13fe" (Neon Purple)
    muted: "#262626" (Neutral-900)
  
  typography:
    heading: "JetBrains Mono"
    body: "Pretendard"
    code: "JetBrains Mono"

  spacing:
    container: "max-w-3xl mx-auto px-4"
```

### Component Styling Convention

```yaml
styling_convention:
  approach: "Tailwind CSS"
  naming: "Utility-first"
  responsive: "Mobile-first (sm: 640px, md: 768px, lg: 1024px)"
  dark_mode: "class strategy (always dark for this project)"
```

---

## 11. UX/Performance/A11y Checklist

### UX States

| State | Component | Handling | User Feedback |
|-------|-----------|----------|---------------|
| Loading | PostList | Skeleton | 반투명 박스 깜빡임 |
| Empty | PostList | Message | "시스템 로그가 비어있습니다." |

### Performance

| Item | Target | Optimization |
|------|--------|--------------|
| Font Loading | CLS 0 | `next/font` 사용 (preload) |
| Image | LCP < 1.0s | `priority` 속성 사용 (Hero Image) |

### Accessibility

| Item | Implementation |
|------|----------------|
| Semantic HTML | `<main>`, `<article>`, `<nav>` 태그 준수 |
| Color Contrast | Neon 컬러 사용 시 배경 대비 4.5:1 확인 |

---

## Pre-build Preparation (from Pre-build Check)

> Added: 2026-02-07 via `/pre-build` skill

### External Services Status
| Service | Status | Notes |
|---------|--------|-------|
| Giscus | ⚠️ TBD | GitHub Discussions 설정 후 .env에 키값 추가 필요 |

### Infrastructure Status
| Component | Status | Notes |
|-----------|--------|-------|
| GitHub Pages | ✅ Ready | `next.config.mjs`에 `output: 'export'` 설정됨 |

### Mock Data Status
| Data | Status | Location |
|------|--------|----------|
| Sample Post | ✅ Ready | `content/posts/hello-world.mdx` |

### Generated Files
- `.env.example` - Environment variable template
