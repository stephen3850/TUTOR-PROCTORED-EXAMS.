@echo off
title TUTOR PROCTORED EXAMS - System Startup
color 0A

echo ========================================================
echo       TUTOR PROCTORED EXAMS - STARTING SYSTEM
echo ========================================================
echo.
echo Clearing stale cache files...
if exist .next rmdir /s /q .next

echo.
echo Starting Next.js Development Server...
echo.

:: Launch web browser after a 4 second delay in background
start "" /b timeout /t 4 /nobreak >nul && start http://localhost:3000

:: Run Next.js server
call npm run dev

pause
