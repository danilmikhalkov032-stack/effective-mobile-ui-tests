$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Resolve-Path (Join-Path $ScriptDir "..")
$AppDir = Join-Path $RootDir "party-games-app"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js не найден. Установите Node.js 20 LTS: https://nodejs.org"
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm не найден. Переустановите Node.js (npm идет в комплекте)."
}

Write-Host "[INFO] Node: $(node -v)"
Write-Host "[INFO] npm : $(npm -v)"

Set-Location $AppDir

if (-not (Test-Path "node_modules")) {
  Write-Host "[INFO] Устанавливаю зависимости..."
  npm install
} else {
  Write-Host "[INFO] node_modules уже существует, пропускаю npm install"
}

Write-Host "[INFO] Запускаю dev-сервер на http://localhost:5173"
npm run dev -- --host 0.0.0.0 --port 5173
