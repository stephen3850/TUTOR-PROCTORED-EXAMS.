@echo off
title TUTOR PROCTORED EXAMS - Push Code to GitHub
color 0B

echo ========================================================
echo     TUTOR PROCTORED EXAMS - PUSH CODE TO GITHUB
echo ========================================================
echo.
echo Target Repository: https://github.com/stephen3850/TUTOR-PROCTORED-EXAMS.git
echo.
echo Pushing main branch to GitHub...
echo (If prompted by Windows Git, sign into your GitHub account)
echo.

git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo SUCCESS: Codebase pushed to GitHub successfully!
    echo ========================================================
) else (
    echo ========================================================
    echo NOTICE: If you saw "Repository not found":
    echo 1. Ensure https://github.com/stephen3850/TUTOR-PROCTORED-EXAMS is created on GitHub.
    echo 2. Sign into Git Credential Manager if prompted.
    echo ========================================================
)

pause
