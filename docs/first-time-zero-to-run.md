# С нуля: если у тебя вообще нет папки проекта

Если ты ничего не создавал и только общаешься в чате — это нормально.
Нужно сначала получить проект на свой компьютер.

## 1) Установи инструменты

- Git: https://git-scm.com/download/win
- Node.js LTS: https://nodejs.org

После установки закрой и открой PowerShell заново.

## 2) Создай папку для проектов

```powershell
mkdir C:\projects
cd C:\projects
```

## 3) Скачай репозиторий

```powershell
git clone https://github.com/OWNER/REPO.git
cd REPO
```

> ВАЖНО: символы `<` и `>` печатать НЕ нужно.
> Вставляй реальную ссылку целиком, например: `git clone https://github.com/OWNER/REPO.git`.

## 4) Проверь, что папка есть

```powershell
dir
```

Ты должен увидеть среди папок: `party-games-app` и `scripts`.

## 5) Запусти фронт

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run-party-games-dev.ps1
```

Открой в браузере: http://localhost:5173

## 6) Если хочешь отдельный чистый проект без test-репы

```powershell
.\scripts\extract-party-games-project.ps1
cd ..\party-games-project
npm install
npm run dev
```

## Если `git clone` не сработал

- пришли сюда текст ошибки — дам точную команду под твою ситуацию.


### Частые ошибки в PowerShell

1. `git clone <URL_РЕПО>` → ошибка из-за `<` и `>`.
   Правильно: `git clone https://github.com/OWNER/REPO.git`

2. `cd effective-mobile-ui-testsmkdir C:\projects` → это две команды, склеенные в одну строку.
   Выполняй команды по одной, каждая с новой строки.
