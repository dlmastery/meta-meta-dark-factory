# Traceability Matrix

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

| Requirement | Design Element | Implementation | Test Evidence | Review Evidence |
|---|---|---|---|---|
| `REQ-001` | Quick add parser | `app/app.js::parseQuickAdd` | `tests/core.test.cjs`, `browser-wysiwyg-results.json` | Expert review `REV-REQ-001`, `REV-VNV-001` |
| `REQ-002` | Habit parser and habit model | `app/app.js::parseQuickAdd`, `createHabit` | `tests/core.test.cjs` | Expert review `REV-BEH-001` |
| `REQ-003` | Task filters | `taskVisible`, UI segments | Browser WYSIWYG flow | Expert review `REV-UX-001` |
| `REQ-004` | Task completion | `toggleTask` | Browser WYSIWYG flow | Expert review `REV-VNV-001` |
| `REQ-005` | Habit completion | `toggleHabit`, `habitStreak` | Core and browser tests | Expert review `REV-BEH-001` |
| `REQ-006` | Capacity guard | `calculateStats` | Core test overload assertion | Expert review `REV-PROD-001` |
| `REQ-007` | Timeboxed sequence | `planTasks` | Core and browser plan view | Expert review `REV-UX-001` |
| `REQ-008` | Priority matrix | `renderMatrix` | Browser plan view | Expert review `REV-PROD-001` |
| `REQ-009` | Focus mode | `renderFocus`, focus buttons | Browser focus view | Expert review `REV-UX-001` |
| `REQ-010` | Shutdown note | `renderReviews`, save review | Scenario matrix | Expert review `REV-PROD-001` |
| `REQ-011` | Export | `export-state` handler | Browser E2E download assertion | RALPH-20 review `R20-FIND-001` |
| `REQ-012` | Plan quality audit | `planAudit`, `renderPlanAudit` | `tests/core.test.cjs`, `browser-wysiwyg-results.json` | Iteration 2 review `IT2-FIND-001` |
| `REQ-013` | Habit friction insight | `habitFrictionInsights`, `renderHabitInsights` | `tests/core.test.cjs`, `browser-wysiwyg-results.json` | Iteration 2 review `IT2-FIND-002` |
| `NFR-001` | Static architecture | HTML/CSS/JS | Open file and browser test | Architecture record |
| `NFR-002` | Responsive layout | CSS media queries | WYSIWYG desktop/mobile screenshots | Hawkeye stage audit |
| `NFR-003` | Accessibility certification readiness | Labels, landmarks, skip link, ARIA states, contrast, keyboard reachability, target sizing | Static, browser, and accessibility certification audits | Certification readiness bead `TB-20260426-105` |
| `NFR-004` | Local privacy | No network calls | Architecture review | Hawkeye process audit |
| `NFR-005` | Reliability | Unit and browser test suite | Test command evidence | Quality gate |
| `NFR-006` | Maintainability | Exported pure functions | Core tests import module | Architecture review |
| `NFR-007` | Google Material 3 / Material 3 Expressive UI standards | Material system tokens, role colors, shape, motion, and state-layer-like interactions in `app/styles.css` | Static UI audit, accessibility audit, desktop/mobile WYSIWYG evidence | Material UI bead `TB-20260426-107` |
| `GOV-001` | Meta-meta product-tailored factory chain | `product-tailoring-profile.json`, `generated-meta-skill-contract.json`, `dark-factory-instantiation-record.json` | `meta-meta-charter-compliance-matrix.json` | Standards audit `TB-20260426-104` |
| `GOV-002` | Strict task/TPM/PERT/KG/Hawkeye controls | `TASKS.md`, `tpm-flow-ledger.json`, `factory-pert-plan.json`, `knowledge-graph.json`, `hawkeye-conformance-audit-record.json` | Execution kernel and validators | Standards audit `TB-20260426-104` |
| `GOV-003` | Standards conformance audit | `standards-conformance-audit-record.json`, `artifact-bom-audit-record.json` | `audit-quality-certificate.json` | Audit panel record |
| `GOV-004` | Internal DFMS certification readiness | `12-certification-readiness-hardening-record.md`, `certification-readiness-certificate.json` | Accessibility certification audit and execution kernel | Certification readiness panel |
| `UXQA-001` | Mobile shell must expose product workflow without excessive chrome | Compact mobile side panel and inline ritual list | `browser-wysiwyg-results.json`, mobile screenshot | UX QA certificate |
| `UXQA-002` | Stateful task and habit controls must expose machine-readable state | `aria-pressed` on task and habit buttons | `accessibility-certification-results.json` | UX QA panel |
| `REL-001` | Local-first state must recover from malformed stored data | `normalizeState`, bounded field sanitization | `tests/core.test.cjs` malformed-state case | Reliability lead review |
| `GOV-005` | Internal UX/reliability QA certification | `13-ralph-ux-reliability-qa-certification-record.md`, `qa-certification-certificate.json` | full test stack and execution kernel | UX QA jury |
| `GOV-006` | Internal Material UI standards conformance | `14-material-ui-standards-conformance-record.md`, `material-ui-conformance-certificate.json` | static Material audit, accessibility Material contrast audit, WYSIWYG browser evidence | Material UI standards panel and Hawkeye auditor |
| `GOV-007` | Human review and onboarding portal | `15-human-review-onboarding-portal-record.md`, `portal/index.html`, `portal/portal-data.json`, `portal/diagrams.md` | `tests/portal-index-audit.cjs`, `human-review-portal-validation.json`, meta-attractor portal validator | Human portal panel and Hawkeye auditor |

## Residual Risks

- `RR-EXPORT-001`: Resolved in RALPH-20 pass. Browser E2E now asserts local export download filename.
- `RR-A11Y-001`: Resolved for internal automated certification readiness. External assistive-technology lab certification remains a separate scope.
- `RR-CERT-001`: External accredited standards certification is not claimed; this run now passes internal DFMS certification readiness only.
- `RR-MAT-001`: External Google certification and native Android Material implementation are not claimed; this run supports internal DFMS Material 3 / Material 3 Expressive-aligned conformance for the static web demonstrator.
- `RR-PORTAL-001`: Hosted documentation portal, comments, access control, and server-side search are not claimed; this run supports internal static local portal readiness.
