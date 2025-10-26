---
name: view-transitions-enhance
description: Включение CSS View Transitions и scroll-driven анимаций в Next.js.
version: 0.1.0
when:
- Нужны быстрые межстраничные переходы.
- Нужно снизить JS-нагрузку.
outputs:
- next.config.mjs.snippet
- app/view-transitions.css
- app/layout.tsx.snippet
safety:
- Не перезаписывай существующие файлы без явного подтверждения.
- Перед изменениями создавай ветку и коммит с осмысленным сообщением.
- Запускай тесты/линтер перед PR.
---

## Шаги
1) Включи experimental.viewTransition в next.config.mjs.
2) Добавь CSS для переходов + медиазапрос для reduced-motion.
3) Проверь навигацию и исключения элементов.
