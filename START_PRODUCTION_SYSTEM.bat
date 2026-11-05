@echo off
title TUTOR PROCTORED EXAMS - Production System Startup
color 0B

echo ========================================================
echo   TUTOR PROCTORED EXAMS - PRODUCTION SYSTEM STARTUP
echo ========================================================
echo.
echo Clearing stale cache files...
if exist .next rmdir /s /q .next

echo.
echo Building Production Assets...
call npm run build

echo.
echo Starting Production Web Server on http://localhost:3000 ...
echo.

:: Launch web browser after a 3 second delay
start "" /b timeout /t 3 /nobreak >nul && start http://localhost:3000

:: Run Next.js production server
call npm run start

pause
