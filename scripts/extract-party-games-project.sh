#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT_DIR/party-games-app"
TARGET_DIR="${1:-$ROOT_DIR/../party-games-project}"

if [ ! -d "$SRC_DIR" ]; then
  echo "[ERROR] Не найдена папка party-games-app в $ROOT_DIR"
  exit 1
fi

mkdir -p "$TARGET_DIR"

# Копируем только standalone-фронтенд
rsync -a --delete \
  --exclude node_modules \
  --exclude dist \
  "$SRC_DIR/" "$TARGET_DIR/"

echo "[OK] Готово. Твой отдельный проект: $TARGET_DIR"
echo "[NEXT] Дальше:"
echo "  cd "$TARGET_DIR""
echo "  npm install"
echo "  npm run dev"
