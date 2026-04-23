# Party Game Host — пример разбиения по архитектуре

Это рефакторинг вашего «монолитного» React-файла в модульную структуру.

## Структура

- `app/`
  - `tokens.js` — дизайн-токены.
  - `session-domain.js` — чистая доменная логика (роли, рекомендации, таймер, расчёт ночи).
- `data/`
  - `game-library.js` — каталог игр и паки.
  - `role-meta.js` — мета-данные ролей и локации.
- `hooks/`
  - `useGameSession.js` — состояние игровой сессии и жизненный цикл.
- `components/`
  - `layout/` — каркас экрана (`AppShell`, `TopBar`, `BottomNav`).
  - `common/` — переиспользуемые контролы (`PrimaryButton`, `SurfaceCard`, `Chip` и т.д.).
- `utils/`
  - `cn.js` — утилита склейки классов.
  - `illustration.js` — генерация SVG-иллюстраций.

## Как дальше раскладывать большой экран

Ваш текущий большой компонент (`PartyGameHostAppMockup`) лучше разделить так:

1. `screens/HomeScreen.jsx`
2. `screens/PlayersScreen.jsx`
3. `screens/RecommendationsScreen.jsx`
4. `screens/SetupScreen.jsx`
5. `screens/PassReadyScreen.jsx`
6. `screens/PassRevealScreen.jsx`
7. `screens/RoundScreen.jsx`
8. `screens/MafiaNight*.jsx`

И в контейнере `PartyGameHostAppMockup.jsx` оставить только:
- `flow`/роутинг между экранами,
- минимальные обработчики переходов,
- сборку `AppShell`.
