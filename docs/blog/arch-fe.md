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
