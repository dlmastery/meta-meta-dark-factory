param(
  [string]$Python = ""
)

$ErrorActionPreference = "Stop"

if (-not $Python) {
  $bundled = "C:\Users\abhir\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
  if (Test-Path $bundled) {
    $Python = $bundled
  } else {
    $Python = "python"
  }
}

$root = Split-Path -Parent $PSScriptRoot
$workspace = Split-Path -Parent $root
$validation = $PSScriptRoot
$installed = "C:\Users\abhir\.codex\skills"
$pass26Records = Join-Path $workspace "dark-factory-meta-skills-design\records\pass26"
$pass26ControlGraph = Join-Path $pass26Records "control-graph-record.json"
$pass26WorkLedger = Join-Path $pass26Records "work-ledger-record.json"
$pass26RefineryGate = Join-Path $pass26Records "refinery-gate-record.json"
$pass26CriticRecord = Join-Path $workspace "dark-factory-meta-skills-design\26-ralph-loop-critic-review-and-fix-record.md"

function Invoke-Checked {
  param([string]$Name, [scriptblock]$Command)
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Name failed"
  }
  Write-Output "${Name}: pass"
}

Invoke-Checked "python compile installed validators" {
  & $Python -m py_compile `
    "$installed\df-meta-attractor\scripts\validate_merged_records.py" `
    "$installed\df-quality-refinery\scripts\score_rubric_matrix.py" `
    "$installed\df-quality-refinery\scripts\validate_refinery_gate.py" `
    "$installed\df-quality-refinery\scripts\validate_quality_certificate.py" `
    "$installed\df-governance-mayor\scripts\validate_engagement_governance.py" `
    "$installed\df-intake-spec-lab\scripts\validate_spec_decomposition.py" `
    "$installed\df-intake-spec-lab\scripts\validate_intake_package.py" `
    "$installed\df-traceability-evidence\scripts\validate_trace_links.py" `
    "$installed\df-production-sre-handoff\scripts\validate_production_handoff.py"
}

Invoke-Checked "python compile workspace validators" {
  & $Python -m py_compile `
    "$root\df-meta-attractor\scripts\validate_merged_records.py" `
    "$root\df-quality-refinery\scripts\score_rubric_matrix.py" `
    "$root\df-quality-refinery\scripts\validate_refinery_gate.py" `
    "$root\df-quality-refinery\scripts\validate_quality_certificate.py" `
    "$root\df-governance-mayor\scripts\validate_engagement_governance.py" `
    "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" `
    "$root\df-intake-spec-lab\scripts\validate_intake_package.py" `
    "$root\df-traceability-evidence\scripts\validate_trace_links.py" `
    "$root\df-production-sre-handoff\scripts\validate_production_handoff.py"
}

Invoke-Checked "strict greenfield trace simulation" {
  & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" "$validation\pre17-greenfield-trace.json" --strict
}

Invoke-Checked "strict brownfield trace simulation" {
  & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" "$validation\pre17-brownfield-trace.json" --strict
}

Invoke-Checked "physical evidence trace pass fixture" {
  & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" `
    "$validation\physical-evidence-trace-pass.json" `
    --strict `
    --evidence-file "$validation\physical-evidence-trace-report.md"
}

$missingPhysicalEvidence = & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" `
  "$validation\physical-evidence-trace-pass.json" `
  --strict 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "physical evidence trace missing-file fixture unexpectedly passed"
}
Write-Output "physical evidence trace missing-file fixture: rejected"

$badPhysicalEvidencePath = Join-Path $env:TEMP "dfms-bad-physical-evidence-trace-report.md"
@'
# Bad Physical Evidence Trace Report

This file intentionally mentions ART-PHYS-001 but omits the work ledger and refinery gate IDs.
'@ | Set-Content -Encoding ascii $badPhysicalEvidencePath
$badPhysicalEvidenceResult = & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" `
  "$validation\physical-evidence-trace-pass.json" `
  --strict `
  --evidence-file $badPhysicalEvidencePath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "physical evidence trace bad-content fixture unexpectedly passed"
}
Write-Output "physical evidence trace bad-content fixture: rejected"

$badPhysicalEvidenceMappingPath = Join-Path $env:TEMP "dfms-bad-physical-evidence-trace.json"
$badPhysicalEvidenceMapping = Get-Content "$validation\physical-evidence-trace-pass.json" -Raw | ConvertFrom-Json
foreach ($record in $badPhysicalEvidenceMapping) {
  if ($record.id -eq "ART-PHYS-001") {
    $record.evidence = @("missing-physical-evidence-report.md")
  }
}
$badPhysicalEvidenceMapping | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badPhysicalEvidenceMappingPath
$badPhysicalEvidenceMappingResult = & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" `
  $badPhysicalEvidenceMappingPath `
  --strict `
  --evidence-file "$validation\physical-evidence-trace-report.md" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "physical evidence trace bad-file-mapping fixture unexpectedly passed"
}
Write-Output "physical evidence trace bad-file-mapping fixture: rejected"

Invoke-Checked "engagement governance pass fixture" {
  & $Python "$root\df-governance-mayor\scripts\validate_engagement_governance.py" "$validation\engagement-governance-pass.json"
}

$engagementTemplate = & $Python "$root\df-governance-mayor\scripts\validate_engagement_governance.py" "$root\df-governance-mayor\assets\templates\engagement-governance-record.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "engagement governance template unexpectedly passed"
}
Write-Output "engagement governance template fixture: rejected"

$badEngagementNoBudgetApprovalPath = Join-Path $env:TEMP "dfms-bad-engagement-no-budget-approval.json"
$badEngagementNoBudgetApproval = Get-Content "$validation\engagement-governance-pass.json" -Raw | ConvertFrom-Json
$badEngagementNoBudgetApproval.token_budget.approval.decision = "pending"
$badEngagementNoBudgetApproval | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badEngagementNoBudgetApprovalPath
$badEngagementNoBudgetApprovalResult = & $Python "$root\df-governance-mayor\scripts\validate_engagement_governance.py" $badEngagementNoBudgetApprovalPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad engagement missing token budget approval fixture unexpectedly passed"
}
Write-Output "bad engagement missing token budget approval fixture: rejected"

$badEngagementChangeControlPath = Join-Path $env:TEMP "dfms-bad-engagement-change-control.json"
$badEngagementChangeControl = Get-Content "$validation\engagement-governance-pass.json" -Raw | ConvertFrom-Json
$badEngagementChangeControl.change_control.required_impact_fields = @("scope", "tokens")
$badEngagementChangeControl | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badEngagementChangeControlPath
$badEngagementChangeControlResult = & $Python "$root\df-governance-mayor\scripts\validate_engagement_governance.py" $badEngagementChangeControlPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad engagement incomplete change-control fixture unexpectedly passed"
}
Write-Output "bad engagement incomplete change-control fixture: rejected"

Invoke-Checked "panel rubric pass fixture" {
  & $Python "$root\df-quality-refinery\scripts\score_rubric_matrix.py" "$validation\score-pass.json" | Out-Null
}

Invoke-Checked "refinery gate pass fixture" {
  & $Python "$root\df-quality-refinery\scripts\validate_refinery_gate.py" "$validation\refinery-gate-pass.yaml"
}

Invoke-Checked "quality certificate bundle pass fixture" {
  & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" `
    "$validation\quality-certificate-pass.json" `
    --panel-score-record "$validation\score-pass.json" `
    --refinery-gate "$validation\refinery-gate-pass.yaml"
}

Invoke-Checked "production handoff pass fixture" {
  & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
    "$validation\production-handoff-pass.json" `
    --outage-drill "$validation\outage-drill-pass.json" `
    --control-graph $pass26ControlGraph `
    --work-ledger $pass26WorkLedger `
    --refinery-gate $pass26RefineryGate `
    --evidence-file "$validation\production-handoff-pass.json" `
    --evidence-file "$validation\outage-drill-pass.json" `
    --evidence-file $pass26CriticRecord
}

Invoke-Checked "outage drill pass fixture" {
  & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" "$validation\outage-drill-pass.json"
}

$productionTemplate = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" "$root\df-production-sre-handoff\assets\templates\production-handoff-record.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "production handoff template unexpectedly passed"
}
Write-Output "production handoff template fixture: rejected"

$outageTemplate = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" "$root\df-production-sre-handoff\assets\templates\outage-drill-record.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "outage drill template unexpectedly passed"
}
Write-Output "outage drill template fixture: rejected"

$unbundledProduction = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" "$validation\production-handoff-pass.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "unbundled production handoff fixture unexpectedly passed"
}
Write-Output "unbundled production handoff fixture: rejected"

$missingControlPlaneBundle = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
  "$validation\production-handoff-pass.json" `
  --outage-drill "$validation\outage-drill-pass.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "production handoff missing control-plane bundle fixture unexpectedly passed"
}
Write-Output "production handoff missing control-plane bundle fixture: rejected"

$missingEvidenceFiles = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
  "$validation\production-handoff-pass.json" `
  --outage-drill "$validation\outage-drill-pass.json" `
  --control-graph $pass26ControlGraph `
  --work-ledger $pass26WorkLedger `
  --refinery-gate $pass26RefineryGate 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "production handoff missing evidence-file bundle fixture unexpectedly passed"
}
Write-Output "production handoff missing evidence-file bundle fixture: rejected"

$badProductionBundlePath = Join-Path $env:TEMP "dfms-bad-production-outage-bundle.json"
$badProductionBundle = Get-Content "$validation\outage-drill-pass.json" -Raw | ConvertFrom-Json
$badProductionBundle.id = "OPS-DRILL-UNREFERENCED-001"
$badProductionBundle.system_or_release = "Different release"
$badProductionBundle | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badProductionBundlePath
$badProductionBundleResult = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
  "$validation\production-handoff-pass.json" `
  --outage-drill $badProductionBundlePath `
  --control-graph $pass26ControlGraph `
  --work-ledger $pass26WorkLedger `
  --refinery-gate $pass26RefineryGate `
  --evidence-file "$validation\production-handoff-pass.json" `
  --evidence-file "$validation\outage-drill-pass.json" `
  --evidence-file $pass26CriticRecord 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad production outage-drill bundle mismatch fixture unexpectedly passed"
}
Write-Output "bad production outage-drill bundle mismatch fixture: rejected"

$badControlGraphPath = Join-Path $env:TEMP "dfms-bad-production-control-graph.json"
$badControlGraph = Get-Content $pass26ControlGraph -Raw | ConvertFrom-Json
foreach ($node in $badControlGraph.nodes) {
  if ($node.id -eq "NODE-PASS26-VERIFY") {
    $node.id = "NODE-PASS26-OTHER"
  }
}
$badControlGraph | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badControlGraphPath
$badControlPlaneResult = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
  "$validation\production-handoff-pass.json" `
  --outage-drill "$validation\outage-drill-pass.json" `
  --control-graph $badControlGraphPath `
  --work-ledger $pass26WorkLedger `
  --refinery-gate $pass26RefineryGate `
  --evidence-file "$validation\production-handoff-pass.json" `
  --evidence-file "$validation\outage-drill-pass.json" `
  --evidence-file $pass26CriticRecord 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad production control-plane bundle mismatch fixture unexpectedly passed"
}
Write-Output "bad production control-plane bundle mismatch fixture: rejected"

$badEvidenceLedgerPath = Join-Path $env:TEMP "dfms-bad-production-evidence-ledger.json"
$badEvidenceLedger = Get-Content $pass26WorkLedger -Raw | ConvertFrom-Json
$badEvidenceLedger.evidence_provided += "missing-evidence-artifact.md"
$badEvidenceLedger | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badEvidenceLedgerPath
$badEvidenceFileBundleResult = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
  "$validation\production-handoff-pass.json" `
  --outage-drill "$validation\outage-drill-pass.json" `
  --control-graph $pass26ControlGraph `
  --work-ledger $badEvidenceLedgerPath `
  --refinery-gate $pass26RefineryGate `
  --evidence-file "$validation\production-handoff-pass.json" `
  --evidence-file "$validation\outage-drill-pass.json" `
  --evidence-file $pass26CriticRecord 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad production ledger evidence-file mapping fixture unexpectedly passed"
}
Write-Output "bad production ledger evidence-file mapping fixture: rejected"

$badProductionPath = Join-Path $env:TEMP "dfms-bad-production-handoff.json"
$badProduction = Get-Content "$validation\production-handoff-pass.json" -Raw | ConvertFrom-Json
$badProduction.readiness_score = 95
$badProduction.rollback_steps = @()
$badProduction | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badProductionPath
$badProductionResult = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" `
  $badProductionPath `
  --outage-drill "$validation\outage-drill-pass.json" `
  --control-graph $pass26ControlGraph `
  --work-ledger $pass26WorkLedger `
  --refinery-gate $pass26RefineryGate `
  --evidence-file "$validation\production-handoff-pass.json" `
  --evidence-file "$validation\outage-drill-pass.json" `
  --evidence-file $pass26CriticRecord 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad production handoff low-readiness fixture unexpectedly passed"
}
Write-Output "bad production handoff low-readiness fixture: rejected"

$badOutagePath = Join-Path $env:TEMP "dfms-bad-outage-drill.json"
$badOutage = Get-Content "$validation\outage-drill-pass.json" -Raw | ConvertFrom-Json
$badOutage.operator_readiness_score = 90
$badOutage.operator_signoff.decision = "pending"
$badOutage | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badOutagePath
$badOutageResult = & $Python "$root\df-production-sre-handoff\scripts\validate_production_handoff.py" $badOutagePath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad outage drill unsigned/low-readiness fixture unexpectedly passed"
}
Write-Output "bad outage drill unsigned/low-readiness fixture: rejected"

$lowThresholdRubricPath = Join-Path $env:TEMP "dfms-low-threshold-rubric.json"
$lowThresholdRubric = Get-Content "$validation\score-pass.json" -Raw | ConvertFrom-Json
foreach ($reviewer in $lowThresholdRubric.reviewers) {
  foreach ($check in $reviewer.checks) {
    $check.score = 0
    $check | Add-Member -Force -NotePropertyName "fix_or_risk" -NotePropertyValue "Weak threshold negative fixture"
    $check | Add-Member -Force -NotePropertyName "fix_evidence" -NotePropertyValue "Would be irrelevant if threshold lowering were allowed"
  }
}
$lowThresholdRubric | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $lowThresholdRubricPath
$lowThresholdRubricResult = & $Python "$root\df-quality-refinery\scripts\score_rubric_matrix.py" $lowThresholdRubricPath 0 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "low-threshold rubric fixture unexpectedly passed"
}
Write-Output "low-threshold rubric fixture: rejected"

$unresolvedRubricPath = Join-Path $env:TEMP "dfms-unresolved-rubric-failure.json"
$unresolvedRubric = Get-Content "$validation\score-pass.json" -Raw | ConvertFrom-Json
$unresolvedRubric.reviewers[0].checks[0].score = 3
$unresolvedRubric.reviewers[0].checks[0] | Add-Member -Force -NotePropertyName "fix_or_risk" -NotePropertyValue "Unresolved failed point negative fixture"
$unresolvedRubric.reviewers[0].checks[0].PSObject.Properties.Remove("fix_evidence")
$unresolvedRubric.reviewers[0].checks[0].PSObject.Properties.Remove("resolution_evidence")
$unresolvedRubric | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $unresolvedRubricPath
$unresolvedRubricResult = & $Python "$root\df-quality-refinery\scripts\score_rubric_matrix.py" $unresolvedRubricPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "unresolved rubric failed-point fixture unexpectedly passed"
}
Write-Output "unresolved rubric failed-point fixture: rejected"

$badRefineryPath = Join-Path $env:TEMP "dfms-bad-refinery-pass.yaml"
@'
id: RFG-BAD-001
name: "Bad refinery pass"
status: pass
scope:
  work_items:
    - WL-BAD-001
required_checks:
  attractor_record: pass
  control_graph: pass
  work_ledger: pass
  traceability: pass
  expert_rubrics: fail
thresholds:
  governance_percent: 98
  expert_minimum_percent: 96
  mandatory_traceability_percent: 100
  critical_security_findings_allowed: 0
evidence:
  test_reports: []
  rubric_scorecards: []
  trace_reports: []
  certificates: []
failed_checks: []
required_fixes: []
residual_risks: []
human_decision:
  required: false
  approver: ""
  decision: pending
verdict_rationale: "Bad pass fixture"
next_action: "none"
'@ | Set-Content -Encoding ascii $badRefineryPath
$badRefineryResult = & $Python "$root\df-quality-refinery\scripts\validate_refinery_gate.py" $badRefineryPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad refinery pass fixture unexpectedly passed"
}
Write-Output "bad refinery pass fixture: rejected"

$badRefineryEmptyScopePath = Join-Path $env:TEMP "dfms-bad-refinery-empty-scope.yaml"
@'
id: RFG-BAD-SCOPE-001
name: "Bad refinery empty scope"
status: pass
scope:
  work_items: []
  artifacts: []
  code_changes: []
  release_items: []
required_checks:
  attractor_record: pass
  control_graph: pass
  work_ledger: pass
  traceability: pass
  expert_rubrics: pass
thresholds:
  governance_percent: 98
  expert_minimum_percent: 96
  mandatory_traceability_percent: 100
  critical_security_findings_allowed: 0
evidence:
  test_reports:
    - DFMS hardening checks complete
  rubric_scorecards:
    - EVD-RUBRIC-PANEL-VALIDATION
  trace_reports:
    - TRACE-VALIDATION-001
  certificates:
    - CERT-VALIDATION-001
failed_checks: []
required_fixes: []
residual_risks: []
human_decision:
  required: false
  approver: ""
  decision: pending
verdict_rationale: ""
next_action: ""
'@ | Set-Content -Encoding ascii $badRefineryEmptyScopePath
$badRefineryEmptyScopeResult = & $Python "$root\df-quality-refinery\scripts\validate_refinery_gate.py" $badRefineryEmptyScopePath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad refinery empty-scope fixture unexpectedly passed"
}
Write-Output "bad refinery empty-scope fixture: rejected"

$badCertificateLowScorePath = Join-Path $env:TEMP "dfms-bad-certificate-low-score.json"
$badCertificateLowScore = Get-Content "$validation\quality-certificate-pass.json" -Raw | ConvertFrom-Json
$badCertificateLowScore.scores.'verification-safety-critic' = 95
$badCertificateLowScore | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badCertificateLowScorePath
$badCertificateLowScoreResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" $badCertificateLowScorePath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate low-score fixture unexpectedly passed"
}
Write-Output "bad certificate low-score fixture: rejected"

$badCertificateMissingGatePath = Join-Path $env:TEMP "dfms-bad-certificate-missing-gate.json"
$badCertificateMissingGate = Get-Content "$validation\quality-certificate-pass.json" -Raw | ConvertFrom-Json
$badCertificateMissingGate.refinery_gate = ""
$badCertificateMissingGate | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badCertificateMissingGatePath
$badCertificateMissingGateResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" $badCertificateMissingGatePath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate missing-gate fixture unexpectedly passed"
}
Write-Output "bad certificate missing-gate fixture: rejected"

$badCertificateReviewerMismatchPath = Join-Path $env:TEMP "dfms-bad-certificate-reviewer-mismatch.json"
$badCertificateReviewerMismatch = Get-Content "$validation\quality-certificate-pass.json" -Raw | ConvertFrom-Json
$badCertificateReviewerMismatch.scores.PSObject.Properties.Remove("verification-safety-critic")
$badCertificateReviewerMismatch.scores | Add-Member -Force -NotePropertyName "unlisted-reviewer" -NotePropertyValue 100
$badCertificateReviewerMismatch | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badCertificateReviewerMismatchPath
$badCertificateReviewerMismatchResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" $badCertificateReviewerMismatchPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate reviewer-score mismatch fixture unexpectedly passed"
}
Write-Output "bad certificate reviewer-score mismatch fixture: rejected"

$badCertificateLowThresholdPath = Join-Path $env:TEMP "dfms-bad-certificate-low-threshold.json"
$badCertificateLowThreshold = Get-Content "$validation\quality-certificate-pass.json" -Raw | ConvertFrom-Json
$badCertificateLowThreshold.threshold_percent = 10
$badCertificateLowThreshold | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badCertificateLowThresholdPath
$badCertificateLowThresholdResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" $badCertificateLowThresholdPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate low-threshold fixture unexpectedly passed"
}
Write-Output "bad certificate low-threshold fixture: rejected"

$badCertificateUnbundledResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" "$validation\quality-certificate-pass.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate unbundled pass fixture unexpectedly passed"
}
Write-Output "bad certificate unbundled pass fixture: rejected"

$badPanelMismatchPath = Join-Path $env:TEMP "dfms-bad-panel-mismatch.json"
$badPanelMismatch = Get-Content "$validation\score-pass.json" -Raw | ConvertFrom-Json
$badPanelMismatch.id = "EVD-RUBRIC-PANEL-OTHER"
$badPanelMismatch | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badPanelMismatchPath
$badPanelMismatchResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" `
  "$validation\quality-certificate-pass.json" `
  --panel-score-record $badPanelMismatchPath `
  --refinery-gate "$validation\refinery-gate-pass.yaml" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate panel-file mismatch fixture unexpectedly passed"
}
Write-Output "bad certificate panel-file mismatch fixture: rejected"

$badGateMismatchPath = Join-Path $env:TEMP "dfms-bad-gate-mismatch.yaml"
((Get-Content "$validation\refinery-gate-pass.yaml" -Raw) -replace "id: RFG-VALIDATION-001", "id: RFG-OTHER-001") | Set-Content -Encoding ascii $badGateMismatchPath
$badGateMismatchResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" `
  "$validation\quality-certificate-pass.json" `
  --panel-score-record "$validation\score-pass.json" `
  --refinery-gate $badGateMismatchPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate gate-file mismatch fixture unexpectedly passed"
}
Write-Output "bad certificate gate-file mismatch fixture: rejected"

$badGateStructuredEvidencePath = Join-Path $env:TEMP "dfms-bad-gate-structured-evidence.yaml"
$badGateStructuredEvidence = Get-Content "$validation\refinery-gate-pass.yaml" -Raw
$badGateStructuredEvidence = $badGateStructuredEvidence -replace "    - ART-VALIDATION-001", "    - ART-OTHER-001"
$badGateStructuredEvidence = $badGateStructuredEvidence -replace "    - EVD-RUBRIC-PANEL-VALIDATION", "    - EVD-RUBRIC-PANEL-OTHER"
$badGateStructuredEvidence = $badGateStructuredEvidence -replace "    - CERT-VALIDATION-001", "    - CERT-OTHER-001"
$badGateStructuredEvidence = $badGateStructuredEvidence -replace 'verdict_rationale: "Positive fixture for a structurally complete patch-level refinery gate."', 'verdict_rationale: "Mentions ART-VALIDATION-001 EVD-RUBRIC-PANEL-VALIDATION CERT-VALIDATION-001 only in prose."'
$badGateStructuredEvidence | Set-Content -Encoding ascii $badGateStructuredEvidencePath
$badGateStructuredEvidenceResult = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" `
  "$validation\quality-certificate-pass.json" `
  --panel-score-record "$validation\score-pass.json" `
  --refinery-gate $badGateStructuredEvidencePath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "bad certificate gate structured-evidence fixture unexpectedly passed"
}
Write-Output "bad certificate gate structured-evidence fixture: rejected"

Invoke-Checked "spec decomposition pass fixture" {
  & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" "$validation\spec-decomposition-pass.json"
}

Invoke-Checked "spec decomposition trace wrapper fixture" {
  & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" "$validation\spec-decomposition-pass.json"
}

Invoke-Checked "spec decomposition strict trace fixture" {
  & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" "$validation\spec-decomposition-trace-strict-pass.json" --strict
}

Invoke-Checked "intake package pass fixture" {
  & $Python "$root\df-intake-spec-lab\scripts\validate_intake_package.py" "$validation\intake-interrogation-pass.json" "$validation\spec-decomposition-pass.json"
}

$badIntake = & $Python "$root\df-intake-spec-lab\scripts\validate_intake_package.py" "$validation\intake-interrogation-negative.json" "$validation\spec-decomposition-pass.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "negative intake package fixture unexpectedly passed"
}
Write-Output "negative intake package fixture: rejected"

$badDecomposition = & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" "$validation\spec-decomposition-negative.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "negative spec-decomposition fixture unexpectedly passed"
}
Write-Output "negative spec-decomposition fixture: rejected"

$badSkippedLevels = & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" "$validation\spec-decomposition-negative-skipped-levels.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "negative skipped-level decomposition fixture unexpectedly passed"
}
Write-Output "negative skipped-level decomposition fixture: rejected"

$badDisconnected = & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" "$validation\spec-decomposition-negative-disconnected.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "negative disconnected decomposition fixture unexpectedly passed"
}
Write-Output "negative disconnected decomposition fixture: rejected"

$lowThresholdDecompositionPath = Join-Path $env:TEMP "dfms-low-threshold-decomposition.json"
$lowThresholdDecomposition = Get-Content "$validation\spec-decomposition-pass.json" -Raw | ConvertFrom-Json
$lowThresholdDecomposition.threshold_percent = 10
$lowThresholdDecomposition | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $lowThresholdDecompositionPath
$lowThresholdDecompositionResult = & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" $lowThresholdDecompositionPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "low-threshold decomposition fixture unexpectedly passed"
}
Write-Output "low-threshold decomposition fixture: rejected"

$incompleteWaiverPath = Join-Path $env:TEMP "dfms-incomplete-waiver-decomposition.json"
$incompleteWaiver = Get-Content "$validation\spec-decomposition-pass.json" -Raw | ConvertFrom-Json
$incompleteWaiver.nodes[0].waivers[0].PSObject.Properties.Remove("residual_risk")
$incompleteWaiver | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $incompleteWaiverPath
$incompleteWaiverResult = & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" $incompleteWaiverPath 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "incomplete waiver decomposition fixture unexpectedly passed"
}
Write-Output "incomplete waiver decomposition fixture: rejected"

$lowThresholdIntakePath = Join-Path $env:TEMP "dfms-low-threshold-intake.json"
$lowThresholdIntake = Get-Content "$validation\intake-interrogation-pass.json" -Raw | ConvertFrom-Json
$lowThresholdIntake.threshold_percent = 10
$lowThresholdIntake | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $lowThresholdIntakePath
$lowThresholdIntakeResult = & $Python "$root\df-intake-spec-lab\scripts\validate_intake_package.py" $lowThresholdIntakePath "$validation\spec-decomposition-pass.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "low-threshold intake fixture unexpectedly passed"
}
Write-Output "low-threshold intake fixture: rejected"

$incompleteIntakeWaiverPath = Join-Path $env:TEMP "dfms-incomplete-waiver-intake.json"
$incompleteIntakeWaiver = Get-Content "$validation\intake-interrogation-pass.json" -Raw | ConvertFrom-Json
$incompleteIntakeWaiver | Add-Member -Force -NotePropertyName "waivers" -NotePropertyValue @(
  [pscustomobject]@{
    topic = "customer_approval_deferral"
    owner = "product-owner"
    reason = "Incomplete waiver fixture"
  }
)
$incompleteIntakeWaiver | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $incompleteIntakeWaiverPath
$incompleteIntakeWaiverResult = & $Python "$root\df-intake-spec-lab\scripts\validate_intake_package.py" $incompleteIntakeWaiverPath "$validation\spec-decomposition-pass.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "incomplete intake waiver fixture unexpectedly passed"
}
Write-Output "incomplete intake waiver fixture: rejected"

$templateDecomposition = & $Python "$root\df-intake-spec-lab\scripts\validate_spec_decomposition.py" "$root\df-intake-spec-lab\assets\templates\spec-decomposition-record.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "spec decomposition template unexpectedly passed"
}
Write-Output "spec decomposition template fixture: rejected"

$negative = & $Python "$root\df-traceability-evidence\scripts\validate_trace_links.py" "$validation\pre17-negative-missing-governed-links.json" --strict 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "negative governed-link fixture unexpectedly passed"
}
Write-Output "negative governed-link fixture: rejected"

$template = & $Python "$root\df-quality-refinery\scripts\score_rubric_matrix.py" "$root\df-quality-refinery\assets\templates\rubric-score-record.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "rubric template unexpectedly passed"
}
Write-Output "rubric template fixture: rejected"

$refineryTemplate = & $Python "$root\df-quality-refinery\scripts\validate_refinery_gate.py" "$root\df-quality-refinery\assets\templates\refinery-gate-record.yaml" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "refinery gate template unexpectedly passed"
}
Write-Output "refinery gate template fixture: rejected"

$certificateTemplate = & $Python "$root\df-quality-refinery\scripts\validate_quality_certificate.py" "$root\df-quality-refinery\assets\templates\quality-certificate.json" 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "quality certificate template unexpectedly passed"
}
Write-Output "quality certificate template fixture: rejected"

Invoke-Checked "merged control-plane pass21 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass21"
}

Invoke-Checked "merged control-plane pass22 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass22"
}

Invoke-Checked "merged control-plane pass23 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass23"
}

Invoke-Checked "merged control-plane pass24 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass24"
}

Invoke-Checked "merged control-plane pass25 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass25"
}

Invoke-Checked "merged control-plane pass26 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass26"
}

Invoke-Checked "merged control-plane pass27 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass27"
}

Invoke-Checked "merged control-plane pass28 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass28"
}

Invoke-Checked "merged control-plane pass29 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass29"
}

Invoke-Checked "merged control-plane pass30 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass30"
}

Invoke-Checked "merged control-plane pass31 records" {
  & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" "$workspace\dark-factory-meta-skills-design\records\pass31"
}

$badMergedNoAttractorOutputs = Join-Path $env:TEMP ("dfms-merged-no-attractor-outputs-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force $badMergedNoAttractorOutputs | Out-Null
Copy-Item "$workspace\dark-factory-meta-skills-design\records\pass21\*" -Destination $badMergedNoAttractorOutputs
$badAttractorPath = Join-Path $badMergedNoAttractorOutputs "meta-attractor-record.json"
$badAttractor = Get-Content $badAttractorPath -Raw | ConvertFrom-Json
$badAttractor.PSObject.Properties.Remove("layer_map")
$badAttractor | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badAttractorPath
$badAttractorResult = & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" $badMergedNoAttractorOutputs 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "merged records without attractor required outputs unexpectedly passed"
}
Write-Output "merged records missing attractor required outputs: rejected"

$badMergedNoNodeContract = Join-Path $env:TEMP ("dfms-merged-no-node-contract-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force $badMergedNoNodeContract | Out-Null
Copy-Item "$workspace\dark-factory-meta-skills-design\records\pass21\*" -Destination $badMergedNoNodeContract
$badControlGraphPath = Join-Path $badMergedNoNodeContract "control-graph-record.json"
$badControlGraph = Get-Content $badControlGraphPath -Raw | ConvertFrom-Json
$badControlGraph.nodes[0].PSObject.Properties.Remove("node_contract")
$badControlGraph | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badControlGraphPath
$badControlGraphResult = & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" $badMergedNoNodeContract 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "merged records without node contract unexpectedly passed"
}
Write-Output "merged records missing node contract: rejected"

$badMergedOrphanId = Join-Path $env:TEMP ("dfms-merged-orphan-id-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force $badMergedOrphanId | Out-Null
Copy-Item "$workspace\dark-factory-meta-skills-design\records\pass21\*" -Destination $badMergedOrphanId
$badLedgerPath = Join-Path $badMergedOrphanId "work-ledger-record.json"
$badLedger = Get-Content $badLedgerPath -Raw | ConvertFrom-Json
$badLedger.id = "WL-ORPHAN-001"
$badLedger | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $badLedgerPath
$badLedgerResult = & $Python "$root\df-meta-attractor\scripts\validate_merged_records.py" $badMergedOrphanId 2>&1
if ($LASTEXITCODE -eq 0) {
  throw "merged records with orphan control-plane id unexpectedly passed"
}
Write-Output "merged records with orphan control-plane id: rejected"

Write-Output "DFMS hardening checks complete"
