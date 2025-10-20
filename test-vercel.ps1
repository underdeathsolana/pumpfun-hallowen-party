# Test Vercel Deployment Script
# Gunakan script ini untuk test apakah deployment berhasil

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  VERCEL DEPLOYMENT TEST" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# Ask for Vercel URL
$vercelUrl = Read-Host "Enter your Vercel URL (e.g., https://your-app.vercel.app)"

if (-not $vercelUrl) {
    Write-Host "Error: URL is required!" -ForegroundColor Red
    exit 1
}

# Remove trailing slash
$vercelUrl = $vercelUrl.TrimEnd('/')

Write-Host "`nTesting deployment at: $vercelUrl" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "Test 1: Health Check Endpoint" -ForegroundColor Yellow
Write-Host "GET $vercelUrl/api/health" -ForegroundColor Gray

try {
    $healthResponse = Invoke-RestMethod -Uri "$vercelUrl/api/health" -Method GET -ErrorAction Stop
    Write-Host "✅ PASS: Health check successful" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Cyan
    $healthResponse | ConvertTo-Json -Depth 3 | Write-Host
    Write-Host ""
    
    if ($healthResponse.apiKeyConfigured -eq $true) {
        Write-Host "✅ API Key is configured!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: API Key not configured - will use fallback" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ FAIL: Health check failed" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host "`n========================================`n" -ForegroundColor Cyan

# Test 2: Costume Suggestion
Write-Host "Test 2: Costume Suggestion Endpoint" -ForegroundColor Yellow
Write-Host "POST $vercelUrl/api/costume-suggestion" -ForegroundColor Gray

try {
    $testName = "TestUser"
    $body = @{
        userName = $testName
    } | ConvertTo-Json

    $costumeResponse = Invoke-RestMethod `
        -Uri "$vercelUrl/api/costume-suggestion" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -ErrorAction Stop

    Write-Host "✅ PASS: Costume suggestion received" -ForegroundColor Green
    Write-Host "`nResponse:" -ForegroundColor Cyan
    Write-Host "  Success: $($costumeResponse.success)" -ForegroundColor Green
    Write-Host "  UserName: $($costumeResponse.userName)" -ForegroundColor Cyan
    Write-Host "  Used OpenAI: $($costumeResponse.usedOpenAI)" -ForegroundColor Cyan
    Write-Host "  Is Fallback: $($costumeResponse.isFallback)" -ForegroundColor Cyan
    Write-Host "  Timestamp: $($costumeResponse.timestamp)" -ForegroundColor Gray
    Write-Host "`n  Suggestion Preview:" -ForegroundColor Yellow
    $preview = $costumeResponse.suggestion -replace '<[^>]+>', '' | Select-Object -First 100
    Write-Host "  $preview..." -ForegroundColor White
    
    if ($costumeResponse.usedOpenAI -eq $true) {
        Write-Host "`n✅ OpenAI API is working!" -ForegroundColor Green
    } else {
        Write-Host "`n⚠️  Using fallback suggestions (OpenAI not used)" -ForegroundColor Yellow
        Write-Host "   Check if OPENAI_API_KEY is set in Vercel Environment Variables" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ FAIL: Costume suggestion failed" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host "`n========================================`n" -ForegroundColor Cyan

# Test 3: Frontend Accessibility
Write-Host "Test 3: Frontend Accessibility" -ForegroundColor Yellow
Write-Host "GET $vercelUrl/" -ForegroundColor Gray

try {
    $frontendResponse = Invoke-WebRequest -Uri $vercelUrl -Method GET -ErrorAction Stop
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ PASS: Frontend is accessible" -ForegroundColor Green
        Write-Host "   Status Code: $($frontendResponse.StatusCode)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ FAIL: Frontend not accessible" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST COMPLETE!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "  1. If health check fails: Check Vercel deployment logs"
Write-Host "  2. If API key not configured: Add OPENAI_API_KEY in Vercel Settings"
Write-Host "  3. If costume suggestion fails: Check function logs in Vercel"
Write-Host "  4. Open browser and test manually: $vercelUrl`n"

Write-Host "DEBUGGING:" -ForegroundColor Yellow
Write-Host "  • Vercel Dashboard: https://vercel.com/dashboard"
Write-Host "  • Function Logs: Dashboard → Your Project → Deployments → View Logs"
Write-Host "  • Environment Variables: Dashboard → Your Project → Settings → Environment Variables`n"

Write-Host "Press any key to open website in browser..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
Start-Process $vercelUrl
