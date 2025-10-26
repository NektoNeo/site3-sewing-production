---
name: bug-triage-and-fix
description: 'Шаблоны баг-триажа: воспроизведение → тест → фикс → PR + Decision Log.'
version: 0.1.0
when:
- Нужно системно собирать баги клиента и фиксить их.
outputs:
- Issue templates
- PR template
- Decision Log
- make-bugfix-branch.ps1
safety:
- Не перезаписывай существующие файлы без явного подтверждения.
- Перед изменениями создавай ветку и коммит с осмысленным сообщением.
- Запускай тесты/линтер перед PR.
---

## Шаги
1) Создай ветку `fix/<ключ>` (см. `windows/make-bugfix-branch.ps1`).
2) Оформи issue/PR по шаблонам и добавь запись в Decision Log.
