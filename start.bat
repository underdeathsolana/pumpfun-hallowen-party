@echo off
echo.
echo ============================================
echo    Starting Halloween Party Server
echo ============================================
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

:: Start backend server
echo Starting backend API server...
start "Backend API" cmd /k "npm start"

:: Wait a moment
timeout /t 3 /nobreak >nul

:: Start frontend server
echo Starting frontend server...
start "Frontend" cmd /k "python -m http.server 8000"

:: Wait a moment
timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo    Servers Started!
echo ============================================
echo.
echo Backend API: http://localhost:3000
echo Frontend:    http://localhost:8000
echo.
echo Press any key to open website in browser...
pause >nul

:: Open browser
start http://localhost:8000

echo.
echo Both servers are running!
echo Close both CMD windows to stop servers.
echo.
pause
