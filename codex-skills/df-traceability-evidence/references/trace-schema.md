# Trace Schema

Core IDs:
- REQ for requirements.
- ART for artifacts.
- ADR for decisions.
- TST for tests.
- RSK for risks.
- EVD for evidence.
- CERT for certificates.
- HND for handoffs.
- CG for control graph records.
- NODE for control graph nodes.
- WL for work-ledger items.
- RFG for refinery gate records.
- ITR for interrogation records.
- COM for human communication records.
- CTX for context-pack records.
- MBR for methodology blend records.
- SDR for spec decomposition records.
- SDN for spec decomposition nodes.
- OPS-DRILL for outage drill records.
- EVD-DEBATE for expert debate records.

Link types:
- derives_from.
- satisfies.
- implements.
- verifies.
- mitigates.
- decides.
- supersedes.
- depends_on.
- accepted_by.
- raises.
- routes_to.
- tracked_by.
- gated_by.
- refines.
- owns.
- reviewed_by.
- answers.
- revalidated_by.
- verified_by.
- blocks.

Mandatory:
- Requirements must have source, owner, status, and verification path.
- Artifacts must have standards basis, reviewers, trace links, evidence, and residual risk state.
- Code changes must link to a requirement, defect, decision, or maintenance reason.
- Governed runs must link to an Attractor Run Record or waiver.
- Material work must link to a control graph node and work-ledger item.
- Accepted artifacts, code changes, release items, and handoffs must link to a refinery gate or explicit deferral.
- Customer answers that become requirements must link from interrogation record to requirement and verification path.
- Governed simulation or certification records must pass strict trace validation, including in-file reference resolution and inbound/outbound trace presence for material records unless owner-scoped waivers exist.
- Governed intake must link interrogation answers to spec decomposition nodes, leaf requirements, acceptance tests, control graph nodes, work-ledger items, and refinery gates.
- File-like evidence references in artifacts, ledgers, gates, certificates, handoffs, and evidence records must resolve to supplied instantiated evidence files during strict project-book or certification validation.
