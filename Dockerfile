# Используем официальный образ Python
FROM python:3.10-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл с зависимостями
COPY requirements.txt .

# Устанавливаем системные зависимости для Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Python зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Устанавливаем браузеры Playwright
RUN playwright install chromium
RUN playwright install-deps

# Копируем весь проект
COPY . .

# Создаем папку для результатов тестов
RUN mkdir -p allure-results screenshots

# Установка переменных окружения для headless режима
ENV HEADLESS=true
ENV BROWSER=chromium

# Команда запуска тестов
CMD ["python", "-m", "pytest", "--alluredir=allure-results"]