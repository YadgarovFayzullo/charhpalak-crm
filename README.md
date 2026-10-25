# KiGo Admin (CRM)

Админ-панель KiGo по дизайну «KiGo UI dizayn», экраны Admin-*. React + Vite.

```bash
npm install
npm run dev     # http://localhost:5175
npm run build   # сборка в dist/
```

## Экраны

| Путь | Экран |
|---|---|
| `#/` | Boshqaruv: KPI, очередь заявок, график броней, лента действий |
| `#/arizalar` | Заявки (турнир, клуб, тренер, спонсор): проверка, одобрение, запрос информации, отказ |
| `#/turnirlar` | Турниры: статусы, «Saytda» и баннер, порядок на сайте, остановка с возвратом |
| `#/landing`, `#/homiylar` | Блоки лендинга и главного экрана мини-приложения с живым превью |
| `#/klublar`, `#/foydalanuvchilar` | Клубы, тренеры, пользователи: тарифы, видимость, блокировка |
| `#/tolovlar` | Брони и платежи, возвраты, выгрузка в Excel (CSV) |
| `#/shikoyatlar` | Жалобы и модерация отзывов |
| `#/sozlamalar` | Команда, роли и права, комиссии, правила |

## Данные и вход

CRM работает с общим бэкендом KiGo (`charxpalak/backend`, PostgreSQL) — с той же базой, что мини-приложение и бот.
Адрес API — `VITE_API_URL` (по умолчанию `http://localhost:8010`).

Вход через Telegram: «Telegram orqali kirish» → бот @charhpalak_bot → «✅ Kirish». Пускает только сотрудников из «Sozlamalar va rollar».
Сессия хранится в браузере 7 дней, «⎋» в сайдбаре — выход.

Стили — `src/styles.css`, перенесены из макетов без изменений.
`VITE_APP_URL` (см. `.env.example`) — адрес мини-приложения: кнопки «Ochish» и «Sahifasini ko‘rish» открывают экраны там.
