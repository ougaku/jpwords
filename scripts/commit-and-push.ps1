param(
  [Parameter(Mandatory = $true)]
  [string]$Title,

  [string]$Details = "",

  [string]$Remote = "origin",

  [string]$Branch = ""
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath ".git")) {
  throw "This directory is not a Git repository. Run git init and add a remote first."
}

$currentBranch = if ($Branch) { $Branch } else { git branch --show-current }
if (-not $currentBranch) {
  $currentBranch = "main"
  git checkout -b $currentBranch
}

$status = git status --short
if (-not $status) {
  Write-Host "No changes to commit."
  exit 0
}

$body = @()
$body += $Title.Trim()
$body += ""
$body += "Changes:"
$status | ForEach-Object { $body += "- $_" }

if ($Details.Trim()) {
  $body += ""
  $body += "Details:"
  $Details.Trim().Split("`n") | ForEach-Object {
    if ($_.Trim()) {
      $body += "- $($_.Trim())"
    }
  }
}

$messageFile = New-TemporaryFile
try {
  Set-Content -LiteralPath $messageFile -Value ($body -join "`n") -Encoding UTF8
  git add -A
  git commit -F $messageFile
  git push -u $Remote $currentBranch
}
finally {
  Remove-Item -LiteralPath $messageFile -Force -ErrorAction SilentlyContinue
}
