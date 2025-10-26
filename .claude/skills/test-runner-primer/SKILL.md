---
name: test-runner-primer
description: Шаблоны для Vitest + RTL и Playwright E2E.
version: 0.1.0
when:
- Нужно быстро поднять базовые тесты.
outputs:
- vitest.config.ts
- setupTests.ts
- playwright.config.ts
- tests/example.spec.ts
safety:
- Не перезаписывай существующие файлы без явного подтверждения.
- Перед изменениями создавай ветку и коммит с осмысленным сообщением.
- Запускай тесты/линтер перед PR.
---

## Шаги
1) Добавь Vitest + RTL и Playwright.
2) Включи трассы/видео на фейлах.
