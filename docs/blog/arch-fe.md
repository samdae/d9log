# Frontend Design Doc: D9Log (득구 블로그)

> Created: 2026-02-07
> Service: blog
> Type: Frontend
> Requirements: docs/blog/spec.md
> UI Specification: docs/blog/ui.md

## 0. Summary

### Goal
- **D9Log (득구 블로그)**의 UI/UX를 구현.
- **Modern Clean** 컨셉 (라이트/다크 모드, 돌쇠 에디션).
- Mobile First 기반의 **Responsive Web** 구현.

### Non-goals
- 복잡한 WebGL 3D 그래픽.
- IE 지원.

### Success metrics
- **Lighthouse Performance 95+**.
- **FCP (First Contentful Paint)** < 1.0s.
- **CLS (Cumulative Layout Shift)** 0.

---

## 1. Scope

### In scope
- **Pages**: Main, Post Detail, About, 404 (Based on `ui.md`).
- **Components**: Sidebar, ThemeToggle, PostCard, MDX Viewer, Giscus.
- **Theme**: Light/Dark Mode (next-themes).
- **Animation**: Framer Motion.

### Out of scope
- 실시간 채팅.
- PWA.

---

## 1.5. Tech Stack

```yaml
tech_stack:
  framework: "Next.js 14 (App Router)"
  language: "TypeScript 5.x"
  state_management: "Zustand" (UI State)
  styling: "Tailwind CSS v4 + Tailwind Typography"
  animation: "Framer Motion"
  icons: "Lucide React"
  font: "next/font (Inter)"
  mdx_renderer: "Velite (Content Pipeline) + Custom MDX Components"
  theme_provider: "next-themes"
```

---

## 2. Architecture Impact

### Component Structure

```yaml
component_structure:
  pages:
    - path: "/"
      component: "Home"
      file: "src/app/page.tsx"
      description: "로그 스트림 (최신 글 목록) + 카테고리 필터"
    
    - path: "/[...slug]"
      component: "PostPage"
      file: "src/app/[...slug]/page.tsx"
      description: "로그 상세 (MDX 뷰어 + 댓글)"
    
    - path: "/about"
      component: "AboutPage"
      file: "src/app/about/page.tsx"
      description: "득구 프로필 (스탯창)"

  shared:
    - name: "Header"
      path: "src/components/layout/Header.tsx"
      description: "로고, 네비게이션"
    
    - name: "Footer"
      path: "src/components/layout/Footer.tsx"
      description: "카피라이트"

    - name: "Sidebar"
      path: "src/components/layout/Sidebar.tsx"
      description: "미니 프로필 + 태그 클라우드"
    
    - name: "ThemeToggle"
      path: "src/components/layout/ThemeToggle.tsx"
      description: "플로팅 다크모드 토글 버튼"
    
    - name: "PostCard"
      path: "src/components/blog/PostCard.tsx"
      description: "글 목록 아이템 (카드 스타일)"
    
    - name: "MDXContent"
      path: "src/components/mdx/MDXContent.tsx"
      description: "MDX 렌더러 (rehype-pretty-code 스타일링)"
    
    - name: "Giscus"
      path: "src/components/comments/Giscus.tsx"
      description: "GitHub Discussions 댓글 연동 (테마 동기화)"
```

---

## 3. State Management

```yaml
state_management:
  global_state:
    - name: "useTheme" (next-themes)
      description: "라이트/다크 모드 관리"
  
  local_state:
    - component: "Home" (page.tsx)
      states:
        - name: "selectedCategory"
          type: "string"
          purpose: "카테고리 필터링"
        - name: "currentPage"
          type: "number"
          purpose: "페이지네이션"
```

---

## 4. Route Definition

```yaml
routes:
  - path: "/"
    component: "Home"
    auth_required: false

  - path: "/[...slug]"
    component: "PostPage"
    params:
      - name: "slug"
        type: "string[]"
    auth_required: false

  - path: "/about"
    component: "AboutPage"
    auth_required: false
```

---

## 6. Code Mapping

| # | Spec Ref | Feature | File | Component | Action | Impl |
|---|----------|---------|------|-----------|--------|------|
| 1 | FR-003 | Layout | `src/app/layout.tsx` | `RootLayout` | 전역 폰트, 테마 프로바이더 설정 | [x] |
| 2 | FR-004 | Post List | `src/app/page.tsx` | `Home` | Velite 데이터 로드, 필터링, 페이지네이션 | [x] |
| 3 | FR-004 | Post Card | `src/components/blog/PostCard.tsx` | `PostCard` | 카드 스타일 UI 구현 | [x] |
| 4 | FR-001 | MDX View | `src/app/[...slug]/page.tsx` | `PostPage` | `generateStaticParams` 구현 및 MDX 렌더링 | [x] |
| 5 | FR-002 | Comments | `src/components/comments/Giscus.tsx` | `Giscus` | `@giscus/react` 설정 및 테마 동기화 | [x] |
| 6 | FR-005 | Profile | `src/app/about/page.tsx` | `AboutPage` | 프로필 UI 구현 | [x] |
| 7 | FR-005 | Sidebar | `src/components/layout/Sidebar.tsx` | `Sidebar` | 미니 프로필, 태그 클라우드 구현 | [x] |
| 8 | FR-003 | Theme | `src/components/layout/ThemeToggle.tsx` | `ThemeToggle` | 플로팅 버튼, 애니메이션 구현 | [x] |

---

## 7. Implementation Plan
(Completed via Build Skill)

---

## 9. Style Guide (Modern Clean)

### Design Tokens

```yaml
design_tokens:
  colors:
    background: "var(--color-background)" (White / Neutral-900)
    foreground: "var(--color-foreground)" (Neutral-900 / Neutral-50)
    primary: "var(--color-primary)" (Green-600 / Green-500)
    muted: "var(--color-muted)" (Neutral-100 / Neutral-800)
  
  typography:
    font: "Inter"
    code: "JetBrains Mono"

  spacing:
    container: "max-w-5xl mx-auto px-6"
```

### Component Styling Convention

```yaml
styling_convention:
  approach: "Tailwind CSS v4"
  naming: "Utility-first"
  responsive: "Mobile-first (sm: 640px, md: 768px, lg: 1024px)"
  dark_mode: "class strategy (.dark)"
```
