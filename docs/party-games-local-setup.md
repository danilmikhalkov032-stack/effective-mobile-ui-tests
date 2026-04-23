# Party Games — где корень проекта и как запускать

## Главное

Сейчас ты находишься в общем репозитории `effective-mobile-ui-tests`.
Твой фронт-проект лежит в подпапке:

- `party-games-app`  ← это и есть корень твоего React-проекта

То есть для разработки открывай именно `party-games-app` как root-папку в IDE.

---

## Вариант A: работать прямо здесь (внутри текущего репо)

```bash
cd party-games-app
npm install
npm run dev
```

Открой `http://localhost:5173`.

---

## Вариант B: вынести в отдельный root (без effective-mobile)

Из корня текущего репозитория запусти:

```bash
# Linux/macOS/Git Bash
bash scripts/extract-party-games-project.sh

# Windows PowerShell
.\scripts\extract-party-games-project.ps1
```

Скрипт создаст соседнюю папку:

- `../party-games-project`

Дальше работай уже там:

```bash
cd ../party-games-project
npm install
npm run dev
```

---

## One-command запуск (в текущем репозитории)

```bash
# Linux/macOS/Git Bash
bash scripts/run-party-games-dev.sh

# Windows PowerShell
.\scripts\run-party-games-dev.ps1
```

Скрипт проверит Node/npm, поставит зависимости и запустит dev-сервер.

---

## Если не работает

### `403 Forbidden` на `npm install`

```bash
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install
```

### Порт 5173 занят

```bash
npm run dev -- --port 5174
```

См. также: `docs/windows-powershell-quickstart.md` для сценария Win+S → PowerShell.
