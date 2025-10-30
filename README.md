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
