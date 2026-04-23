#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/party-games-app"

if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js не найден. Установите Node.js 20 LTS: https://nodejs.org"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] npm не найден. Переустановите Node.js (включает npm)."
  exit 1
fi

echo "[INFO] Node: $(node -v)"
echo "[INFO] npm : $(npm -v)"

cd "$APP_DIR"

if [ ! -d node_modules ]; then
  echo "[INFO] Устанавливаю зависимости..."
  npm install
else
  echo "[INFO] node_modules уже существует, пропускаю npm install"
fi

echo "[INFO] Запускаю dev-сервер на http://localhost:5173"
exec npm run dev -- --host 0.0.0.0 --port 5173
