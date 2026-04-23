@echo off
setlocal

set "ROOT=%~dp0.."
cd /d "%ROOT%"

if not exist "party-games-app" (
  echo [ERROR] Не найдена папка party-games-app в %CD%
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File ".\scripts\run-party-games-dev.ps1"
endlocal
