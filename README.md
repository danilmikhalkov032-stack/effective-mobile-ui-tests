# UI Autotests for effective-mobile.ru

## Описание проекта
Автоматизированные UI-тесты для главной страницы effective-mobile.ru с использованием Playwright, PyTest и Allure.

## Структура проекта
\\\
effective-mobile-ui-tests/
├── pages/           # Page Object Model
│   ├── base_page.py
│   └── main_page.py
├── tests/           # Тестовые сценарии
│   └── test_main_page.py
├── helpers/         # Вспомогательные классы
├── utils/           # Утилиты
├── screenshots/     # Скриншоты тестов
├── conftest.py      # Фикстуры pytest
├── pytest.ini       # Конфигурация pytest
├── requirements.txt # Зависимости Python
├── Dockerfile       # Конфигурация Docker
└── README.md        # Документация
\\\

## Быстрый старт

### Предварительные требования
- Python 3.10
- Git
- Docker (опционально)

### Установка и запуск

1. **Клонируйте репозиторий**
\\\ash
git clone <repository-url>
cd effective-mobile-ui-tests
\\\

2. **Создайте виртуальное окружение**
\\\ash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
\\\

3. **Установите зависимости**
\\\ash
pip install -r requirements.txt
playwright install chromium
\\\

4. **Запустите тесты**
\\\ash
python -m pytest
\\\

5. **Запустите тесты с Allure отчетом**
\\\ash
python -m pytest --alluredir=allure-results
allure serve allure-results
\\\

### Запуск в Docker

1. **Соберите образ**
\\\ash
docker build -t effective-mobile-tests .
\\\

2. **Запустите контейнер**
\\\ash
docker run -it --rm effective-mobile-tests
\\\

## Тестовые сценарии
- Проверка загрузки главной страницы
- Навигация в раздел \"Услуги\"
- Навигация в раздел \"Проекты\" 
- Навигация в раздел \"Контакты\"

## Используемые технологии
- Python 3.10
- Playwright
- PyTest
- Allure Framework
- Page Object Pattern

## Party Games (React demo)

В репозиторий добавлен отдельный модуль `party-games-app` с архитектурным разбиением по слоям:

- `src/app` — сборка приложения и глобальные стили;
- `src/pages` — экраны (Home / Setup / Session);
- `src/widgets` — карточки и составные блоки;
- `src/features` — логика игровой сессии;
- `src/entities` — игровые сущности и данные;
- `src/shared` — переиспользуемые UI и утилиты.

### Локальный запуск и live-изменения

```bash
cd party-games-app
npm install
npm run dev
```

После запуска откройте `http://localhost:5173`.
Vite включает HMR (hot reload), поэтому любые изменения в файлах `src/**` будут видны в реальном времени.

### Подробный план, если что-то не запускается

Смотри отдельную инструкцию: `docs/party-games-local-setup.md`.
Там есть пошаговый сценарий запуска, устранение `npm 403`, смена порта и проверка HMR.

### Самый быстрый запуск (1 команда)

```bash
# Linux/macOS/Git Bash
bash scripts/run-party-games-dev.sh

# Windows PowerShell
.\scripts\run-party-games-dev.ps1
```

Скрипт сам проверит Node/npm, поставит зависимости и поднимет dev-сервер на `http://localhost:5173`.


### Где корень моего проекта?

Если тебе нужен именно твой фронт без `effective-mobile-ui-tests`, используй `party-games-app` как отдельный root.

- В IDE открой папку `party-games-app`.
- Либо вынеси его в соседнюю директорию командой:

```bash
# Linux/macOS/Git Bash
bash scripts/extract-party-games-project.sh

# Windows PowerShell
.\scripts\extract-party-games-project.ps1
```

После этого работай в `../party-games-project` как в полностью отдельном проекте.


### Windows PowerShell (Win+S) быстрый сценарий

Если ты запускаешь через Win+S → PowerShell, смотри пошаговый файл:

- `docs/windows-powershell-quickstart.md`

Там есть команды от `cd ...` до запуска `http://localhost:5173`.


### Вообще нет папки проекта?

Если ты запускаешь всё с нуля и у тебя ещё нет репозитория на диске, начни с:

- `docs/first-time-zero-to-run.md`


> Подсказка: не пиши `<URL_РЕПО>` буквально, вставляй реальную git-ссылку.

### PowerShell: команды без шаблонов (готово к вставке)

```powershell
cd C:\projects\effective-mobile-ui-tests
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run-party-games-dev.ps1
```


### PowerShell: режим "без ошибок"

```powershell
cd C:\projects\effective-mobile-ui-tests
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run-party-games-dev.ps1
```

Важно: каждая команда с новой строки.


### PowerShell: запуск из `C:\projects` без перехода в папку

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\effective-mobile-ui-tests\scripts\run-party-games-dev.ps1
```
