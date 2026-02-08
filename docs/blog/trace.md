# Changelog

## 2026-02-07 - Initial Setup & Feature Implementation

### Code Mapping Changes
| # | Feature | File | Class | Method | Action | Change | Synced |
|---|---------|------|-------|--------|--------|--------|--------|
| - | - | - | - | - | No structural changes from debug (New implementation) | - | [x] |

---

### Basic Information
| Item | Content |
|------|---------|
| Purpose | D9Log (득구 블로그) v1.0 구축 및 배포 |
| Scope | Project Init, Backend (Velite), Frontend (Next.js), Deploy (GH Pages) |
| Severity | High (Initial Release) |

### Change Reasoning
- **Why this work started**: 주인님(DH)의 지시로 AI 머슴 득구의 자아찾기 및 기록용 블로그 구축 시작.
- **Key Decisions**:
  - **SSG**: GitHub Pages 배포를 위해 Next.js Static Export 선택.
  - **Velite**: Contentlayer 대체재로 타입 안전한 MDX 파이프라인 구축.
  - **Giscus**: DB 없이 댓글 기능 구현.
  - **Tailwind v4**: 최신 스타일링 적용 (설정 이슈 해결).

### Action Details
| File | Changes | Change Type |
|------|---------|-------------|
| `next.config.mjs` | `output: 'export'`, `basePath: '/d9log'`, `trailingSlash: true` 설정 | Added |
| `velite.config.ts` | Post 컬렉션 스키마 정의 및 rehype 플러그인 설정 | Added |
| `src/lib/posts.ts` | Velite 데이터 접근 유틸리티 (`getAllPosts`, `getPostBySlug`) 구현 | Added |
| `src/app/page.tsx` | 메인 페이지 (카테고리 필터, 페이지네이션, 사이드바 레이아웃) 구현 | Added |
| `src/app/posts/[...slug]/page.tsx` | 상세 페이지 (MDX 렌더러, 태그, Giscus) 구현 | Added |
| `src/components/layout/*` | Header, Footer, Sidebar, ThemeToggle 컴포넌트 구현 | Added |
| `src/app/globals.css` | Tailwind v4 설정 및 다크모드/배너 스타일링 적용 | Added |

### Troubleshooting Log
1.  **GitHub Pages 404**:
    *   **증상**: 배포 후 CSS 깨짐 및 404 발생.
    *   **원인**: `_next` 폴더 무시(Jekyll), `basePath` 미적용, `trailingSlash` 부재.
    *   **해결**: `.nojekyll` 추가, `basePath: '/d9log'` 설정, `trailingSlash: true` 추가.
2.  **Tailwind v4 에러**:
    *   **증상**: `bg-background` 클래스 인식 불가 에러.
    *   **원인**: v3 문법(`@tailwind`)과 v4 문법 혼용.
    *   **해결**: `@import "tailwindcss";` 및 `@theme` 디렉티브로 전면 수정.
3.  **다크모드 이슈**:
    *   **증상**: 토글 버튼 눌러도 반응 없음, 특정 요소 색상 고정.
    *   **원인**: 시스템 설정(`media query`)만 따르게 되어 있었음.
    *   **해결**: `.dark` 클래스 기반 선택자로 CSS 변수 재정의 (`@variant dark`).

### Impact Scope
- **Direct Impact**: 전체 블로그 기능 (글쓰기, 읽기, 댓글, 테마).
- **No Impact Confirmed**: 외부 API (사용 안 함).

### Verification Method
| Verification Item | Method | Expected Result |
|------------------|--------|-----------------|
| 배포 확인 | `https://samdae.github.io/d9log/` 접속 | 메인 페이지 정상 로딩 |
| 테마 전환 | 우측 하단 버튼 클릭 | 라이트/다크 모드 즉시 전환 |
| 글 필터링 | 태그/카테고리 클릭 | 해당 글만 필터링되어 노출 |
| 댓글 기능 | 상세 페이지 하단 Giscus 확인 | 댓글창 로딩 및 작성 가능 |

### Related Documents
- Requirements: docs/blog/spec.md
- Design (BE): docs/blog/arch-be.md
- Design (FE): docs/blog/arch-fe.md
- UI Spec: docs/blog/ui.md
