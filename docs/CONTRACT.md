# PROJECT CONTRACT
## Single Source of Truth for Repository

### Core Invariants

#### Framework & Technology Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styles**: TailwindCSS 3 + shadcn/ui (Radix)
- **Themes**: next-themes (light/dark mode support)
- **Animations**: framer-motion + lenis (with respect to prefers-reduced-motion)

#### Content Management
- **Copy Source**: ВСЕ тексты и таблицы берём строго из Promt.json (и/или из PDF ТЗ) без перефразирования, со всеми переносами строк
- **No Marketing**: Не добавлять от себя маркетинговых фраз, только плейсхолдеры там, где нет контента

#### Design System: Editorial Bold Type — Navy/Orange
- **Name**: Editorial Bold Type — Navy/Orange
- **Colors**:
  - Background: `#F7F7FA`
  - Foreground: `#0F1A2B`
  - Navy: `#0B2D48`
  - Orange: `#F45B31`
  - Dark Background: `#0B0D12`
  - Dark Foreground: `#E6E8ED`
- **Display Font**: Space Grotesk
- **Text Font**: Inter

#### Routing Structure
- `/` - Homepage
- `/patterns` - Patterns page
- `/corporate-merch` - Corporate merchandise
- `/fulfillment` - Fulfillment services
- `/pricing` - Pricing information
- `/catalog` - Product catalog

#### Accessibility, Performance & SEO
- Color contrast ratio ≥ 4.5:1
- `aria-hidden` for decorative layers
- Use `next/image` for all images
- `font-display: swap` for font loading
- Implement `next-seo` + `next-sitemap`

### Implementation Rules
1. This contract supersedes all other instructions
2. All text content must come from source documents (Promt.json/PDF)
3. No improvised marketing copy - use placeholders where content is missing
4. Maintain strict adherence to the Editorial Bold Type design system
5. All animations must respect user preferences (prefers-reduced-motion)