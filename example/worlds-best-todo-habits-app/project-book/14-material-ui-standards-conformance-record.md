# Material UI Standards Conformance Record

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Change Bead

- Bead: `TB-20260426-107`
- Trigger: User required the UI to use Google's latest Material standards.
- Scope: Material 3 / Material 3 Expressive alignment for the bounded local-static Northstar Daily demonstrator.
- Non-scope: Importing remote Material packages, downloading fonts at runtime, Android native implementation, Wear OS implementation, production release, backend, sync, auth, mobile packaging, and external certification.

## Official Standard Basis

| Source | Date Checked | Applied Guidance |
|---|---|---|
| Google Keyword, "Android and Wear OS are getting a big refresh" | 2026-04-26 | Material 3 Expressive emphasizes personalization, dynamic color themes, smoother interactions, responsive components, emphasized typography, and glanceable information. |
| Material Web Theming | 2026-04-26 | Material theming is represented as CSS custom property tokens; components map to system tokens for color, typography, shape, and motion. |
| Material Web Color | 2026-04-26 | Color roles use `--md-sys-color-*` tokens with paired accessible `on-*` content colors. |
| Material Web Typography | 2026-04-26 | Typography uses reference typeface tokens and `--md-sys-typescale-*` roles. |
| Material Web Shape | 2026-04-26 | Shape uses `--md-sys-shape-*` corner tokens from small through full. |

## Implementation Changes

| Area | Material Requirement | Implementation |
|---|---|---|
| Token layer | UI decisions must be named and reusable. | Added `--md-sys-color-*`, `--md-sys-typescale-*`, `--md-sys-shape-*`, motion, and elevation tokens in `app/styles.css`. |
| Dynamic-color posture | App should use role-based tonal colors instead of hard-coded one-off colors. | Primary, secondary, tertiary, error, surface, outline, and container roles now drive major controls and surfaces. |
| Shape | Controls and surfaces should use Material shape roles. | Navigation, primary actions, state chips, habit buttons, and segmented controls use full pills; cards and panels use extra-large rounded Material surfaces. |
| Interaction state | Controls need clear hover, focus, active, and stateful feedback. | Added state-layer-like hover/focus backgrounds, transitions, active button movement, `aria-pressed` checks, and stronger focus outlines. |
| Typography | Headings, labels, and body text should map to Material typescale roles. | Added Material reference typeface and typescale tokens while staying dependency-free. |
| Glanceability | Important status should be visible without hunting. | Existing metric cards are preserved but restyled with Material tonal surfaces and clearer active container states. |
| Responsiveness | Material 3 Expressive highlights responsive components. | Existing desktop/mobile WYSIWYG flow remains passing with 48px primary nav/action targets and mobile card stack. |
| Accessibility | Color roles must preserve content contrast. | Accessibility audit now checks both legacy compatibility colors and Material `on-*` token contrast pairs. |

## Expert Review Panel

| Role | Persona Contract | Decision |
|---|---|---|
| Google Material Systems Lead | Elite design-systems reviewer accountable for Material token discipline, role-based color, shape scale, touch targets, and component state behavior. Rejects cosmetic "Material-ish" styling that lacks tokens or accessible content roles. | Pass |
| Product UX And Interaction Director | Principal UX reviewer accountable for scanability, workflow speed, mobile ergonomics, glanceable task state, and no lost primary actions. Rejects beautiful layouts that slow repeated daily use. | Pass |
| Accessibility And Browser Verification Lead | Senior QA reviewer accountable for contrast, keyboard order, accessible state, target sizing, responsive screenshots, and executable browser evidence. Rejects screenshots without keyboard/ARIA proof. | Pass |
| Hawkeye Conformance Auditor | Independent process auditor with veto over bead discipline, trace links, stale evidence, missing tests, or unsupported standards claims. | Pass |
| Adversarial Anti-Slop Prosecutor | Red-team critic accountable for attacking token theater, fake standards claims, broken mobile UX, and overclaimed conformance. | Stand down after evidence |

## Five-Round RALPH Loop Summary

| Loop | Review | Attack | Patch | Harden |
|---|---|---|---|---|
| 1 | Material source check found that current app used custom colors and 8px cards. | Critic: "This is not current Material; it is a generic dashboard." | Added Material 3 system tokens for color, type, shape, elevation, and motion. | Static audit now requires Material tokens. |
| 2 | UI pass found dark sidebar weakened Material surface-container model. | Critic: "The app has one heavy dark rail rather than tonal surfaces." | Converted sidebar, cards, coach panel, segmented controls, and metrics to tonal surfaces. | Browser desktop/mobile screenshots refreshed. |
| 3 | Interaction pass found buttons could be more Material-like. | Critic: "Primary actions and nav should have clear pill/action behavior." | Added pill actions, active nav containers, hover/focus state layers, and 48px touch targets. | Browser WYSIWYG test passed. |
| 4 | Accessibility pass found old tests did not enforce Material role contrast. | Critic: "Token names alone can hide inaccessible combinations." | Added Material `on-*` token contrast pairs to the accessibility audit. | Accessibility audit passed. |
| 5 | Governance pass checked whether this was traceable. | Critic: "A UI standard can be skipped later if it is not a bead and gate." | Added this record, panel record, quality gate, certificate, task bead, KG, TPM, PERT, Hawkeye, and validation summary updates. | Final verification rerun required before close. |

## Evidence

| Evidence | Result |
|---|---|
| `tests/core.test.cjs` | Pass |
| `tests/static-ui-audit.cjs` | Pass, includes Material token and motion checks |
| `tests/accessibility-certification-audit.cjs` | Pass, includes Material token contrast pairs |
| `tests/browser-wysiwyg.test.cjs` | Pass, desktop and mobile screenshots refreshed |
| `project-book/evidence/wysiwyg-desktop.png` | Reviewed for desktop Material surface conformance |
| `project-book/evidence/wysiwyg-mobile.png` | Reviewed for mobile stack and target conformance |

## Residual Risks

- `RR-MAT-001`: This is a standards-aligned static web implementation, not a native Android Material Components or Material Web package implementation. The no-remote-dependency constraint is intentional for this local demonstrator.
- `RR-MAT-002`: Dynamic color is represented through Material role tokens and a chosen palette, not runtime extraction from a wallpaper or user theme.
- `RR-MAT-003`: External Google certification is not claimed; this is internal DFMS Material conformance for the bounded app.

## Verdict

Pass for internal DFMS Material 3 / Material 3 Expressive UI standards conformance for the bounded local-static Northstar Daily demonstrator, subject to the stated residual risks and revalidation triggers.
