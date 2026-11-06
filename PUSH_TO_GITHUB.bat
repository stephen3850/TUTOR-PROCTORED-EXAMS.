@echo off
title TUTOR PROCTORED EXAMS - Push Code to GitHub
color 0A

echo ========================================================
echo     TUTOR PROCTORED EXAMS - PUSH CODE TO GITHUB
echo ========================================================
echo.
echo Target Repository: https://github.com/stephen3850/TUTOR-PROCTORED-EXAMS..git
echo.
echo Pushing main branch to GitHub...
echo.

git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo SUCCESS: Codebase pushed to GitHub successfully!
    echo ========================================================
) else (
    echo ========================================================
    echo NOTICE: Push failed. Check your internet connection.
    echo ========================================================
)

pause
