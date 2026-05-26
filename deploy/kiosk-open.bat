@echo off
setlocal EnableExtensions

REM เปิด kiosk — รัน bun dev ในโฟลเดอร์ QUIZ-new ก่อน (ถ้ายังไม่ขึ้น) แล้วเปิดเบราว์เซอร์เต็มจอ
REM ตั้ง path ใน kiosk-config.bat (คัดลอกจาก deploy\kiosk-config.example.bat)

cd /d "%~dp0"

if exist "%~dp0kiosk-config.bat" (
  call "%~dp0kiosk-config.bat"
)

if not defined KIOSK_PROJECT_DIR set "KIOSK_PROJECT_DIR=E:\QUIZ-new-main\QUIZ-new-main"
if not defined KIOSK_URL set "KIOSK_URL=http://localhost:5173/"
if not defined KIOSK_PREFER_CHROME set "KIOSK_PREFER_CHROME=0"
if not defined KIOSK_DEV_WAIT_SEC set "KIOSK_DEV_WAIT_SEC=45"

if not exist "%KIOSK_PROJECT_DIR%\package.json" (
  echo [kiosk-open] ไม่พบโปรเจกต์: %KIOSK_PROJECT_DIR%
  echo แก้ KIOSK_PROJECT_DIR ใน kiosk-config.bat
  pause
  exit /b 1
)

where bun >nul 2>&1
if errorlevel 1 (
  echo [kiosk-open] ไม่พบ bun ใน PATH
  pause
  exit /b 1
)

call :wait_for_dev_server
if errorlevel 1 (
  echo [kiosk-open] dev server ไม่ขึ้นภายใน %KIOSK_DEV_WAIT_SEC% วินาที
  pause
  exit /b 1
)

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

set "BROWSER="
set "BROWSER_ARGS="

if "%KIOSK_PREFER_CHROME%"=="1" (
  if exist "%CHROME%" (
    set "BROWSER=%CHROME%"
    set "BROWSER_ARGS=--kiosk --app=%KIOSK_URL% --no-first-run --disable-infobars --disable-session-crashed-bubble --disable-features=TranslateUI --overscroll-history-navigation=0 --start-fullscreen"
  ) else if exist "%EDGE%" (
    set "BROWSER=%EDGE%"
    set "BROWSER_ARGS=--kiosk --edge-kiosk-type=fullscreen --app=%KIOSK_URL% --edge-kiosk-no-first-run --no-first-run --disable-features=TranslateUI,EdgeSidebarAutoLaunch --overscroll-history-navigation=0"
  )
) else (
  if exist "%EDGE%" (
    set "BROWSER=%EDGE%"
    set "BROWSER_ARGS=--kiosk --edge-kiosk-type=fullscreen --app=%KIOSK_URL% --edge-kiosk-no-first-run --no-first-run --disable-features=TranslateUI,EdgeSidebarAutoLaunch --overscroll-history-navigation=0"
  ) else if exist "%CHROME%" (
    set "BROWSER=%CHROME%"
    set "BROWSER_ARGS=--kiosk --app=%KIOSK_URL% --no-first-run --disable-infobars --disable-session-crashed-bubble --disable-features=TranslateUI --overscroll-history-navigation=0 --start-fullscreen"
  )
)

if not defined BROWSER (
  echo [kiosk-open] ไม่พบ Microsoft Edge หรือ Google Chrome
  pause
  exit /b 1
)

start "" "%BROWSER%" %BROWSER_ARGS%
exit /b 0

:wait_for_dev_server
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%KIOSK_URL%' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if not errorlevel 1 exit /b 0

echo [kiosk-open] กำลังเปิด bun dev ที่ %KIOSK_PROJECT_DIR%
start "QUIZ Dev Server" cmd /k "cd /d ""%KIOSK_PROJECT_DIR%"" && bun dev"

set /a _tries=0
:wait_loop
set /a _tries+=1
if %_tries% GTR %KIOSK_DEV_WAIT_SEC% exit /b 1
timeout /t 1 /nobreak >nul
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%KIOSK_URL%' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if errorlevel 1 goto wait_loop
echo [kiosk-open] dev server พร้อมแล้ว
exit /b 0
