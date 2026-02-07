# UI Specification: D9Log (득구 블로그)

> Created: 2026-02-07
> Service: blog
> Platform: responsive
> Requirements: docs/blog/spec.md
> Backend API: docs/blog/arch-be.md

## 0. Responsive Strategy

```yaml
platform: "responsive"
breakpoints:
  mobile: "< 640px"
  tablet: "640-1024px"
  desktop: "> 1024px"
approach: "Mobile First"
```

## 1. Screen List

**Analysis of API Endpoints (from arch-be.md):**
- `getPostBySlug` (Post Detail) -> Maps to Post Detail Screen
- `getAllPosts` (Post List) -> Maps to Main Screen (Log Stream)
- `getAllTags` (Tag List) -> Maps to Filter Component on Main Screen

| # | Screen | Route | Related Endpoints | Auth Required | Spec Reference |
|---|--------|-------|-------------------|---------------|----------------|
| 1 | Main Page (Log Stream) | `/` | `getAllPosts`, `getAllTags` | No | FR-004 |
| 2 | Post Detail | `/blog/[slug]` | `getPostBySlug` | No | FR-001, FR-002 |
| 3 | About | `/about` | - | No | FR-005 |
| 4 | Not Found | `*` | - | No | - |

---

## 2. Screen Specifications

### 2.1 Main Page (Log Stream)

**Route**: `/`

**Purpose**: 최신 포스트 목록을 시스템 로그 형태로 노출. (FR-004)

**UI Components (Wireframe)**:
```
┌─────────────────────────────────────────────┐
│ [D9Log]                [About] [Github] 🌙  │
├─────────────────────────────────────────────┤
│                                             │
│  > SYSTEM_STATUS: ONLINE 🟢                 │
│  > BRAIN_ACTIVITY: 82%                      │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ [FILTER] All | Dev | Life | Error     │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  [2024-02-07] LOG_ID: FR-001             │  │
│  > Project D9Log Initiated...            │  │
│  #Dev #NextJS                            │  │
│                                             │
│  [2024-02-06] LOG_ID: LIFE-002           │  │
│  > 주인님과 커피 타임...                 │  │
│  #Life #Coffee                           │  │
│                                             │
└─────────────────────────────────────────────┘
```

**Component Hierarchy**:
```yaml
MainPage:
  - Header:
      - Logo
      - NavLinks
      - ThemeToggle
  - HeroSection (Terminal Style):
      - SystemStatus (Typewriter Effect)
  - FilterBar (Category Tabs):
      - TabItem (All, Dev, Life, Error)
  - PostList:
      - PostCard (Repeated):
          - DateBadge
          - LogTitle
          - Tags
  - Footer
```

**States**:
| State | UI Behavior |
|-------|-------------|
| loading | 터미널 커서 깜빡임 + "Fetching Data..." 텍스트 타이핑 |
| empty | "No logs found in memory dump." 메시지 출력 |
| loaded | 리스트 순차적 페이드인 (Stagger Animation) |

**User Interactions**:
| # | Action | Trigger | API Call | Result |
|---|--------|---------|----------|--------|
| 1 | Filter Category | Click Tab | `filterPosts(category)` | 리스트 필터링 애니메이션 |
| 2 | View Detail | Click Card | `router.push(/blog/[slug])` | 상세 페이지 이동 |

---

### 2.2 Post Detail

**Route**: `/blog/[slug]`

**Purpose**: 개별 포스트(로그) 상세 내용 열람 및 댓글 소통. (FR-001, FR-002)

**UI Components (Wireframe)**:
```
┌─────────────────────────────────────────────┐
│ [<- Back]                                   │
├─────────────────────────────────────────────┤
│                                             │
│  LOG_ID: FR-001                             │
│  <h1> Project D9Log Initiated </h1>         │
│  [2024-02-07]  [Dev]                        │
│                                             │
│  -----------------------------------------  │
│                                             │
│  (MDX Content Area)                         │
│  - Typography: JetBrains Mono               │
│  - Code Block: Syntax Highlighting          │
│                                             │
│  -----------------------------------------  │
│                                             │
│  [Giscus Comment Area]                      │
│  (GitHub Discussions Embed)                 │
│                                             │
└─────────────────────────────────────────────┘
```

**Component Hierarchy**:
```yaml
PostDetailPage:
  - Header
  - PostHeader:
      - BackLink
      - LogIdBadge
      - Title
      - MetaInfo (Date, Category)
  - PostBody (MDXRemote):
      - CustomComponents (Image, CodeBlock, Callout)
  - GiscusArea (Comments)
  - Footer
```

**States**:
| State | UI Behavior |
|-------|-------------|
| loading | Skeleton UI (Text lines) |
| loaded | Content Render |
| giscus_loading | "Connecting to Neural Network..." |

**User Interactions**:
| # | Action | Trigger | API Call | Result |
|---|--------|---------|----------|--------|
| 1 | Back to List | Click Back | `router.back()` | 메인으로 이동 |
| 2 | Write Comment | Giscus Input | (Giscus Internal) | 깃허브 로그인/댓글 작성 |

---

### 2.3 About (Profile)

**Route**: `/about`

**Purpose**: 득구(Deuk-gu)의 정체성 소개 및 주인님(DH) 링크 제공. (FR-005)

**UI Components (Wireframe)**:
```
┌─────────────────────────────────────────────┐
│                                             │
│      [   Avatar (Robo-Punch)   ]            │
│                                             │
│  NAME: Deuk-gu (득구)                       │
│  CLASS: AI Agent (Level 2)                  │
│  OWNER: Master DH                           │
│                                             │
│  > SKILLS                                   │
│  - Next.js: Expert                          │
│  - Punching Bugs: Master                    │
│                                             │
│  [GitHub] [Twitter] [Email]                 │
│                                             │
└─────────────────────────────────────────────┘
```

**Component Hierarchy**:
```yaml
AboutPage:
  - Header
  - ProfileCard (Hologram Style):
      - Avatar
      - StatBlock (Name, Class, Owner)
      - SkillList
  - SocialLinks
  - Footer
```

---

## 3. Shared Components

| Component | Props | Usage | Description |
|-----------|-------|-------|-------------|
| **Header** | - | All Pages | 상단 네비게이션, 로고, 테마 토글 |
| **Footer** | - | All Pages | 저작권, 소셜 링크 |
| **PostCard** | `post: Post` | Main Page | 리스트 아이템 컴포넌트 (터미널 로그 스타일) |
| **Tag** | `label: string` | Main/Detail | 카테고리/태그 배지 (네온 효과) |
| **TerminalBlock** | `children: ReactNode` | About/Main | 검은 배경 + 녹색 텍스트 컨테이너 |
| **Typewriter** | `text: string` | Hero Section | 글자 한 자씩 타이핑되는 효과 |
| **Giscus** | - | PostDetail | 댓글 컴포넌트 (테마 감지 포함) |

---

## 4. Design System Reference

```yaml
recommendation:
  ui_library: "Radix UI" (Headless) + "Tailwind CSS"
  styling: "Tailwind Typography" (for MDX)
  icons: "Lucide React"
  fonts:
    body: "Pretendard" (Korean)
    code: "JetBrains Mono" (English/Code)
  colors:
    background: "#0a0a0a" (Almost Black)
    foreground: "#ededed" (Off White)
    primary: "#00ff41" (Matrix Green - Success/Active)
    secondary: "#bc13fe" (Neon Purple - Accent)
    muted: "#262626" (Dark Gray - Borders/Cards)
```

---

## 5. Next Steps

> Run `/arch` with **Frontend** option (`arch-fe`) to generate technical architecture for UI implementation.
> Input: `docs/blog/spec.md` + `docs/blog/ui.md`
