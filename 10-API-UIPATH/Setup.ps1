# UiPath API Automation Setup Script
# This script helps prepare the environment for the Postman-Swagger API automation

param(
    [string]$DownloadPath = "C:\APIExports",
    [string]$TokenPath = "C:\temp\tokens"
)

Write-Host "=== UiPath API Automation Setup ===" -ForegroundColor Green
Write-Host ""

# Create necessary directories
Write-Host "Creating required directories..." -ForegroundColor Yellow
$directories = @($DownloadPath, $TokenPath)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        try {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Host "✓ Created directory: $dir" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Failed to create directory: $dir" -ForegroundColor Red
            Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    else {
        Write-Host "✓ Directory already exists: $dir" -ForegroundColor Gray
    }
}

Write-Host ""

# Check Chrome installation
Write-Host "Checking Chrome browser..." -ForegroundColor Yellow
$chromeInstalled = $false

$chromePaths = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        Write-Host "✓ Chrome found at: $path" -ForegroundColor Green
        $chromeInstalled = $true
        break
    }
}

if (!$chromeInstalled) {
    Write-Host "✗ Chrome browser not found!" -ForegroundColor Red
    Write-Host "  Please install Google Chrome for the automation to work." -ForegroundColor Red
}

Write-Host ""

# Check UiPath Studio
Write-Host "Checking UiPath Studio..." -ForegroundColor Yellow
$uipathPaths = @(
    "$env:ProgramFiles\UiPath\Studio\UiPath.Studio.exe",
    "$env:ProgramFiles(x86)\UiPath\Studio\UiPath.Studio.exe",
    "$env:LOCALAPPDATA\Programs\UiPath\Studio\UiPath.Studio.exe"
)

$uipathInstalled = $false
foreach ($path in $uipathPaths) {
    if (Test-Path $path) {
        Write-Host "✓ UiPath Studio found at: $path" -ForegroundColor Green
        $uipathInstalled = $true
        break
    }
}

if (!$uipathInstalled) {
    Write-Host "✗ UiPath Studio not found!" -ForegroundColor Red
    Write-Host "  Please install UiPath Studio to run the automation." -ForegroundColor Red
}

Write-Host ""

# Create sample config file if it doesn't exist
$configPath = Join-Path $PSScriptRoot "Config.json"
if (!(Test-Path $configPath)) {
    Write-Host "Creating sample configuration file..." -ForegroundColor Yellow
    
    $sampleConfig = @{
        PostmanCredentials = @{
            Username = "your_postman_email@example.com"
            Password = "your_postman_password"
        }
        SwaggerConfiguration = @{
            SwaggerURL = "https://your-api-domain.com/swagger/index.html"
            APIEndpoint = "/api/v1/your-endpoint"
        }
        LocalSettings = @{
            DownloadPath = $DownloadPath
            TokenStoragePath = $TokenPath
        }
    }
    
    try {
        $sampleConfig | ConvertTo-Json -Depth 3 | Set-Content -Path $configPath -Encoding UTF8
        Write-Host "✓ Sample config file created: $configPath" -ForegroundColor Green
        Write-Host "  Please edit this file with your actual credentials and URLs." -ForegroundColor Yellow
    }
    catch {
        Write-Host "✗ Failed to create config file" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
else {
    Write-Host "✓ Configuration file already exists: $configPath" -ForegroundColor Gray
}

Write-Host ""

# Test network connectivity
Write-Host "Testing network connectivity..." -ForegroundColor Yellow

$testUrls = @(
    "https://identity.getpostman.com",
    "https://web.postman.co"
)

foreach ($url in $testUrls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -UseBasicParsing
        Write-Host "✓ Connection successful to: $url" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Connection failed to: $url" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Display security recommendations
Write-Host "=== Security Recommendations ===" -ForegroundColor Cyan
Write-Host "1. Never commit credentials to version control" -ForegroundColor White
Write-Host "2. Use UiPath Orchestrator assets for production environments" -ForegroundColor White
Write-Host "3. Consider using Windows Credential Manager for local development" -ForegroundColor White
Write-Host "4. Regularly rotate API tokens and passwords" -ForegroundColor White
Write-Host "5. Use HTTPS for all API communications" -ForegroundColor White

Write-Host ""

# Display next steps
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Edit the Config.json file with your actual credentials" -ForegroundColor White
Write-Host "2. Open the project in UiPath Studio" -ForegroundColor White
Write-Host "3. Install required packages if prompted" -ForegroundColor White
Write-Host "4. Configure input arguments in Main.xaml" -ForegroundColor White
Write-Host "5. Test the automation in a development environment" -ForegroundColor White

Write-Host ""
Write-Host "Setup completed!" -ForegroundColor Green
Write-Host "Project location: $PSScriptRoot" -ForegroundColor Gray

# Pause to show results
Read-Host "Press Enter to exit"
