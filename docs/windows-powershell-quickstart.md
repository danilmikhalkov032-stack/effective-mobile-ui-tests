# Windows (Win+S → PowerShell) — что делать дальше

## Самое важное правило

Вводи **по одной команде на строку** и нажимай Enter после каждой.
Нельзя склеивать команды вот так: `cd aaa cd bbb`.

Также не печатай символы `<` и `>`.

---


## Режим "без ошибок" (вставь целиком одним блоком)

Скопируй и вставь в PowerShell ровно этот блок:

```powershell
cd C:\projects\effective-mobile-ui-tests
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run-party-games-dev.ps1
```

Ничего в нём не меняй и не дописывай в ту же строку.

---

## Рабочий сценарий для твоего случая (папка уже есть)

У тебя уже есть папка `C:\projects\effective-mobile-ui-tests`.
Выполни в PowerShell **ровно** это:

```powershell
cd C:\projects\effective-mobile-ui-tests
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run-party-games-dev.ps1
```

После запуска открой:

- http://localhost:5173

---

## Если хочешь сначала проверить, где ты

```powershell
cd C:\projects
dir
cd .\effective-mobile-ui-tests
dir
```

Внутри должны быть папки `party-games-app` и `scripts`.

---

## Если `git clone` создал папку с другим именем

После `git clone ...` всегда делай:

```powershell
dir
```

И переходи в **реальное** имя папки из списка, например:

```powershell
cd .\effective-mobile-ui-tests
```

---

## Если скрипт не запускается

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\run-party-games-dev.ps1
```

Если ты не в папке проекта — сначала:

```powershell
cd C:\projects\effective-mobile-ui-tests
```

---

## Альтернатива через .cmd

```cmd
scripts\windows-party-games.cmd
```
