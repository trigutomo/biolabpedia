@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ==========================================
echo   BIOLABPEDIA - Build ^& Preview Otomatis
echo ==========================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
    echo [X] Node.js / npm tidak ditemukan.
    echo     Install dulu: https://nodejs.org  (pilih LTS)
    echo     Setelah install, tutup dan buka lagi file ini.
    echo.
    pause
    exit /b 1
)

echo [1/3] Install dependencies...
call npm install --no-fund --no-audit
if errorlevel 1 (
    echo.
    echo [X] npm install GAGAL. Screenshot error di atas.
    echo.
    pause
    exit /b 1
)

echo.
echo [2/3] Build website...
call npm run build:file
if errorlevel 1 (
    echo.
    echo [X] Build GAGAL. Screenshot error di atas.
    echo.
    pause
    exit /b 1
)

if not exist "dist\index.html" (
    echo.
    echo [X] dist\index.html tidak ada setelah build.
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Membuka website di browser...
start "" "%~dp0dist\index.html"

echo.
echo SELESAI. Browser harus terbuka dengan Biolabpedia.
echo Kalau tidak, screenshot jendela browser yang terbuka.
echo.
pause
