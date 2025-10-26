---
name: design-tokens-bridge
description: Связь дизайн-токенов из Figma/Tokens Studio → Style Dictionary → CSS
  vars/Tailwind.
version: 0.1.0
when:
- Есть референсы/макеты и нужно формализовать палитру/типографику/spacing как токены.
outputs:
- style-dictionary.config.cjs
- generated/theme.css
- обновлённый tailwind.config.ts
safety:
- Не перезаписывай существующие файлы без явного подтверждения.
- Перед изменениями создавай ветку и коммит с осмысленным сообщением.
- Запускай тесты/линтер перед PR.
---

## Шаги (для Claude)
1) Установи `style-dictionary` как dev-зависимость.
2) Считай `resources/tokens/tokens.example.json` и подготовь `tokens.json` под проект.
3) Построй `generated/theme.css` и обнови `tailwind.config.ts`.
4) Создай PR с диффом и документацией по токенам.
