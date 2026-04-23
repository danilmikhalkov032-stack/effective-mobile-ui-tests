param(
  [string]$TargetDir = "..\party-games-project"
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Resolve-Path (Join-Path $ScriptDir "..")
$SourceDir = Join-Path $RootDir "party-games-app"
$ResolvedTarget = Resolve-Path -LiteralPath (Join-Path $RootDir $TargetDir) -ErrorAction SilentlyContinue
if (-not $ResolvedTarget) {
  New-Item -ItemType Directory -Path (Join-Path $RootDir $TargetDir) -Force | Out-Null
  $ResolvedTarget = Resolve-Path -LiteralPath (Join-Path $RootDir $TargetDir)
}
$TargetPath = $ResolvedTarget.Path

if (-not (Test-Path $SourceDir)) {
  Write-Error "Не найдена папка party-games-app в $RootDir"
}

# Полная синхронизация содержимого (аналог rsync --delete)
if (Test-Path $TargetPath) {
  Get-ChildItem -Path $TargetPath -Force | Remove-Item -Recurse -Force
}

Copy-Item -Path (Join-Path $SourceDir "*") -Destination $TargetPath -Recurse -Force

# Удаляем служебные папки, если были скопированы
$nodeModules = Join-Path $TargetPath "node_modules"
$distDir = Join-Path $TargetPath "dist"
if (Test-Path $nodeModules) { Remove-Item $nodeModules -Recurse -Force }
if (Test-Path $distDir) { Remove-Item $distDir -Recurse -Force }

Write-Host "[OK] Готово. Твой отдельный проект: $TargetPath"
Write-Host "[NEXT] Дальше:"
Write-Host "  cd $TargetPath"
Write-Host "  npm install"
Write-Host "  npm run dev"
