---
name: a11y-seo-perf-audit
description: Проверки доступности, Lighthouse budgets, SEO-метаданные.
version: 0.1.0
when:
- Нужна объективная оценка качества перед деплоем.
outputs:
- axe-playwright.ts
- lighthouserc.json
- lighthouse-budgets.json
safety:
- Не перезаписывай существующие файлы без явного подтверждения.
- Перед изменениями создавай ветку и коммит с осмысленным сообщением.
- Запускай тесты/линтер перед PR.
---

## Шаги
1) Добавь Playwright smoke-тест (a11y/SEO).
2) Подключи Lighthouse CI с бюджетами и отчётами в PR.
