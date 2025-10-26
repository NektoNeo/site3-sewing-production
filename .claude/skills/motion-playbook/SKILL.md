---
name: motion-playbook
description: 'Паттерны анимаций: Motion/Framer Motion, Lenis (smooth scroll), опционально
  GSAP.'
version: 0.1.0
when:
- Нужно добавить микровзаимодействия и плавные переходы.
outputs:
- hooks/useLenis.ts
- components/FadeIn.tsx
- components/SlideUp.tsx
- components/ParallaxHero.tsx
safety:
- Не перезаписывай существующие файлы без явного подтверждения.
- Перед изменениями создавай ветку и коммит с осмысленным сообщением.
- Запускай тесты/линтер перед PR.
---

## Шаги
1) Установи `framer-motion` (или `motion`), `@studio-freight/lenis`.
2) Добавь хук `useLenis` и базовые компоненты анимаций.
3) Включи fallback для `prefers-reduced-motion`.
