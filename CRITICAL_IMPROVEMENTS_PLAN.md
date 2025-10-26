# 🎯 План критических улучшений site3-sewing-production

**Дата:** 2025-10-26
**Статус проекта:** Stage 4 - Critical Recommendations (Task 2/3)

---

## 🔴 ПРИОРИТЕТ 1: Критические баги (1-2 дня)

### 1.1 Исправить загрузку страницы (Playwright timeout)
**Проблема:** Страница не загружается за 60 секунд при тестах
- [ ] Профилировать загрузку страницы в DevTools
- [ ] Оптимизировать Vanta.js (lazy load или удалить)
- [ ] Проверить бесконечные циклы в React компонентах
- [ ] Добавить loading states и Suspense boundaries
- [ ] Тестировать: `pnpm test:e2e` должен пройти

**Файлы для проверки:**
- `components/site/vanta-dots-optimized.tsx` (3D фон)
- `app/page.tsx` (главная страница)
- `components/site/hero.tsx` (тяжелая анимация)

### 1.2 Восстановить пустые изображения
**Проблема:** 3 файла по 0 байт
- [ ] Найти оригиналы изображений или создать placeholder
- [ ] Оптимизировать в WebP формат
- [ ] Добавить в `/public/images/tech/`:
  - `dtf.webp`
  - `embroidery.webp`
  - `sublimation.webp`

### 1.3 Решить OpenTelemetry конфликты
**Проблема:** Sentry/OpenTelemetry version mismatch
- [ ] Обновить `@sentry/nextjs` до latest
- [ ] Добавить в `next.config.mjs`:
```js
experimental: {
  serverComponentsExternalPackages: ['import-in-the-middle', 'require-in-the-middle']
}
```

---

## 🟡 ПРИОРИТЕТ 2: Design Tokens завершение (1 день)

### 2.1 Заменить оставшиеся hardcoded цвета
**Осталось:** 15+ компонентов с #D64218, #FF6B35, #C03B15

**Файлы для обновления:**
- [ ] `components/site/services.tsx`
- [ ] `components/site/fulfillment-section.tsx`
- [ ] `components/site/merch-section.tsx`
- [ ] `components/site/contacts.tsx`
- [ ] `components/site/cta-main.tsx`
- [ ] `components/site/faq.tsx`
- [ ] `components/ui/virtualized-table.tsx`
- [ ] `components/ui/filter-toolbar.tsx`
- [ ] `components/decor/Stitch.tsx`
- [ ] `components/site/vanta-dots-optimized.tsx`
- [ ] `components/optimized/optimized-hero-image.tsx`

**Действия:**
```bash
# 1. Поиск всех вхождений
rg "#D64218|#FF6B35|#C03B15|#C23A14|#B53614" --type tsx --type ts

# 2. Замена на var(--brand), var(--brand-light), var(--brand-600), var(--brand-700)

# 3. Коммит
git add .
git commit -m "refactor(components): Replace hardcoded colors (Part 2)"
```

---

## 🟢 ПРИОРИТЕТ 3: Accessibility & SEO (2-3 дня)

### 3.1 Accessibility fixes
**Тесты:** 0/6 passed

- [ ] **Skip link для keyboard navigation**
  ```tsx
  // app/layout.tsx
  <a href="#main-content" className="skip-to-main">
    Перейти к основному содержанию
  </a>
  ```

- [ ] **Heading hierarchy**
  - Проверить, что на каждой странице 1 `<h1>`
  - Последовательность h1 → h2 → h3

- [ ] **Alt text для всех изображений**
  - Пройти по всем `<Image>` компонентам
  - Добавить descriptive alt=""

- [ ] **ARIA labels на интерактивных элементах**
  ```tsx
  <button aria-label="Открыть меню">☰</button>
  <Link aria-label="Перейти на главную">Logo</Link>
  ```

- [ ] **Keyboard accessibility**
  - Tab navigation должна работать
  - Focus visible на всех интерактивных элементах

### 3.2 SEO fixes
**Тесты:** 0/10 passed

- [ ] **Meta tags** (app/layout.tsx или metadata.ts)
  ```tsx
  export const metadata = {
    title: 'Швейное производство полного цикла | Site3',
    description: 'От разработки лекал до готового изделия. 10 000+ изделий в месяц',
    openGraph: {
      title: '...',
      description: '...',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: '...',
      description: '...',
    }
  }
  ```

- [ ] **Canonical URL**
  ```tsx
  <link rel="canonical" href="https://yourdomain.com/" />
  ```

- [ ] **Robots meta**
  ```tsx
  <meta name="robots" content="index, follow" />
  ```

- [ ] **PWA manifest** - создать `/public/manifest.json`

- [ ] **Sitemap.xml** - уже есть `next-sitemap`, проверить генерацию

- [ ] **Robots.txt** - создать `/public/robots.txt`

---

## 🎨 ПРИОРИТЕТ 4: Layout & Design (3-4 дня)

### 4.1 Проблемы с расположением элементов
**Ты написал:** "там куча элементов криво расположены"

**Требуется визуальный аудит:**
- [ ] Hero section - проверить на разных разрешениях
- [ ] Services cards - выравнивание и spacing
- [ ] Contacts form - позиционирование
- [ ] Footer - выравнивание элементов

**Инструменты:**
1. Открыть http://localhost:3000 в браузере
2. DevTools → Responsive mode (375px, 768px, 1024px, 1920px)
3. Скриншоты проблемных мест
4. Применить Tailwind utilities для фиксов

### 4.2 Responsive design
- [ ] Mobile (375px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1920px+)

---

## ⚡ ПРИОРИТЕТ 5: Performance (2-3 дня)

### 5.1 Core Web Vitals оптимизация
- [ ] **LCP < 2.5s** - оптимизировать Hero image
- [ ] **FID < 100ms** - уменьшить JS bundle
- [ ] **CLS < 0.1** - зафиксировать layout shifts

### 5.2 Image optimization
- [ ] Конвертировать все PNG → WebP
- [ ] Добавить AVIF fallback
- [ ] Next.js Image с priority для above-fold
- [ ] Lazy loading для below-fold

### 5.3 Bundle size
```bash
pnpm run analyze
```
- [ ] Code splitting
- [ ] Tree shaking
- [ ] Dynamic imports для тяжелых компонентов

---

## 🚀 ПРИОРИТЕТ 6: Animation Improvements (Task 3/3) (3-5 дней)

### 6.1 Spring animations (Framer Motion)
- [ ] Использовать физические spring вместо duration
```tsx
animate={{ y: 0 }}
transition={{ type: 'spring', stiffness: 100, damping: 15 }}
```

### 6.2 Lenis smooth scroll
**Skill:** `motion-playbook`
- [ ] Установить Lenis
- [ ] Создать хук `useLenis`
- [ ] Интегрировать с GSAP ScrollTrigger

### 6.3 GSAP ScrollTrigger
- [ ] Parallax effects
- [ ] Scroll-driven animations
- [ ] Pin sections

### 6.4 Performance
- [ ] `will-change: transform` для анимаций
- [ ] GPU acceleration
- [ ] Reduce motion для accessibility

---

## 📋 КРИТЕРИИ ГОТОВНОСТИ

### ✅ Definition of Done для каждого приоритета:

1. **Playwright tests**: 18/18 passed ✅
2. **Lighthouse Score**:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 95
   - SEO: > 95
3. **Core Web Vitals**: все зеленые ✅
4. **Visual regression**: нет критических layout shifts ✅
5. **Cross-browser**: Chrome, Firefox, Safari ✅
6. **Responsive**: mobile, tablet, desktop ✅

---

## 🔄 WORKFLOW

### Для каждого приоритета:
1. Создать feature branch: `feature/priority-X-description`
2. Внести изменения
3. Запустить тесты: `pnpm test:e2e && pnpm run lint`
4. Создать коммит с детальным описанием
5. Push и создать PR
6. Code review
7. Merge в `revamp/claude-setup-and-audit`

---

## 📊 TIMELINE

| Приоритет | Задача | Время | Дедлайн |
|-----------|--------|-------|---------|
| 🔴 P1 | Playwright timeout fix | 1 день | День 1 |
| 🔴 P1 | Изображения + OpenTelemetry | 0.5 дня | День 1 |
| 🟡 P2 | Design Tokens завершение | 1 день | День 2 |
| 🟢 P3 | Accessibility fixes | 1.5 дня | День 3-4 |
| 🟢 P3 | SEO fixes | 1 день | День 4-5 |
| 🎨 P4 | Layout & Design audit | 2 дня | День 5-7 |
| 🎨 P4 | Responsive fixes | 1 день | День 7 |
| ⚡ P5 | Performance optimization | 2 дня | День 8-9 |
| 🚀 P6 | Animation improvements | 3 дня | День 10-12 |

**ИТОГО:** ~12 рабочих дней до production-ready

---

## 🎯 СЛЕДУЮЩИЙ ШАГ

**Немедленно начать с P1:**

```bash
# 1. Создать ветку для фикса
git checkout -b fix/playwright-timeout-and-images

# 2. Профилировать загрузку
# Открыть http://localhost:3000 в Chrome DevTools
# Performance → Record → Reload page
# Найти долгие задачи

# 3. Исправить проблемы
# 4. Запустить тесты
pnpm test:e2e

# 5. Коммит и PR
```

**Хочешь, чтобы я начал с P1 прямо сейчас?**
