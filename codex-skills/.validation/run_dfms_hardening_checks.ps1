param(
  [string]$Python = ""
)

$script = Join-Path $PSScriptRoot "run_pre17_hardening_checks.ps1"
& $script -Python $Python
