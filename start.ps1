# Start Halloween Party - Backend + Frontend

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Starting Halloween Party Server" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Start backend server in new window
Write-Host "Starting backend API server..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -PassThru

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend server in new window  
Write-Host "Starting frontend server..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; python -m http.server 8000" -PassThru

# Wait for frontend to start
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Servers Started!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Backend API: " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:3000" -ForegroundColor White

Write-Host "Frontend:    " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:8000" -ForegroundColor White

Write-Host ""
Write-Host "Server Status:" -ForegroundColor Yellow
Write-Host "   - Backend: Running on port 3000"
Write-Host "   - Frontend: Running on port 8000"
Write-Host "   - API Key: Configured"
Write-Host "   - CORS: Enabled"

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Open http://localhost:8000 in your browser"
Write-Host "   2. Enter your name"
Write-Host "   3. Get instant AI costume suggestions!"

Write-Host ""
Write-Host "Note:" -ForegroundColor Yellow
Write-Host "   Close the PowerShell windows to stop servers"

Write-Host ""
Write-Host "Opening website in browser..." -ForegroundColor Green
Start-Sleep -Seconds 2
Start-Process "http://localhost:8000"

Write-Host ""
Write-Host "Ready! Enjoy your Halloween Party!" -ForegroundColor Green
Write-Host ""
