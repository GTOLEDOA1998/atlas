# ADR-0003 — Atlas Memory Governance Accepted

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-08-05 |
| **Supersedes** | — |
| **Superseded by** | — |
| **Related** | [`ADR-0001`](ADR-0001-intelligence-core-frozen.md) — Intelligence Core frozen · [`ADR-0002`](ADR-0002-documentation-governance.md) — Documentation governance |

---

## Context

Atlas remembers a developing human being — frequently a minor, usually without an account of their own. **What may be remembered about that person, for how long, and under whose permission is a policy decision**, and it was **deliberately excluded from the Intelligence Core.**

That exclusion is on the record. [`ADR-0001`](ADR-0001-intelligence-core-frozen.md) freezes the nine-document Core and lists memory governance among its explicit *Out of Scope* items and its inherited limitations: *"Memory governance remains outstanding… the decision is still owed and belongs in Governance."* The same gap is recorded inside the frozen Core itself, as **Open Question 1 of [`memory-model.md`](../constitution/intelligence-core/memory-model.md)** — *"the governance decision itself is still owed, and belongs in Governance rather than the Intelligence Core"* — and in [`data-model.md`](../architecture/data-model.md) Part V.

This gap is load-bearing. The Data Model, the SDS and the DBDS all declare that they cannot close, and the first feature that persists a person's data cannot begin, until it is resolved. It was tracked as blocker **G1**, whose completion criterion is *a governance document answering all five questions, recorded as an ADR.*

That governance document now exists. [`memory-governance.md`](../constitution/memory-governance.md) answers all five G1 questions — what may be remembered about a minor and for how long; who consents and how it is recorded; which memory travels on a club change; how much superseded history is retained; and what directed forgetting means. It was written as a Tier 1 constitution policy, drafted and audited but **not yet formally accepted**. An independent G1 audit found no content contradiction against the Intelligence Core, the Data Model, the SDS, the DBDS, or ADR-0001/0002, and returned *G1 READY: YES*. The Product Owner has decided to accept it.

This ADR is the recorded act of that acceptance, and the mechanism by which the corresponding Core open question is closed — because [`ADR-0001`](ADR-0001-intelligence-core-frozen.md) requires that *"resolving a recorded open question is an architectural decision and is recorded as one."*

---

## Decision

1. **`memory-governance.md` is adopted, as it stands, as the governing Tier 1 constitution policy of Atlas on memory** — what constitutes persistent memory, the permission model, what may and may not be stored, ownership, who may create/modify/remove memory, retention, directed forgetting, and what happens when a relationship ends. Its substantive content is accepted unchanged.

2. **Open Question 1 of `memory-model.md` is formally closed.** The governance decision it recorded as "still owed" is now made and lives in `memory-governance.md`. The closure is recorded here; `memory-model.md` is annotated to point at this ADR, and no other change is made to it.

3. **This decision introduces no new architecture and changes no substantive content of the Intelligence Core.** It adopts a policy that already inherits the Core and declares itself defective where it conflicts with it. It resolves a governance question the Core deliberately left open; it does not reinterpret, restate, or amend how Atlas thinks, reasons, prioritizes, trains, or remembers.

4. **The persistence shape this policy relies on is already defined and is not re-decided here.** The Recording Authority assertion is the `RecordingAssertion` structure fixed by **DM-025** ([`data-model.md`](../architecture/data-model.md) §2.4b); this ADR records G1 at the policy level only.

5. **Accepting G1 is only G1.** It does not approve the Data Model (F2), does not approve the DBDS, does not reconcile the legacy migration, does not open the Sprint 3 gate (S3.0), and does not authorize the implementation of Players. Those remain separate acts.

6. **The authority and precedence established by ADR-0001 and ADR-0002 are unchanged.** `memory-governance.md` sits, by its own precedence line, below Atlas DNA and the entire Intelligence Core; it is a Tier 1 document under the change-policy model of ADR-0002.

---

## Scope

**This decision covers:**

- The adoption of the persistent-memory policy: the definition of persistent memory, and the rule that generates the may-store and may-not-store lists.
- **Recording Authority** — the permission model under which memory about a subject may be held.
- Permitted and prohibited memory.
- **Ownership** of every memory — the subject it describes and the human authority accountable for it.
- **Correction** — memory is corrected by supersession with the prior retained; a human overrides rather than edits.
- **Deletion / directed forgetting** — the only real deletion, human-initiated, at the four levels the policy defines.
- **Retention** — what is permanent and what is bounded.
- **End of relationship** — what travels and what stays when a player changes club, a coach leaves, a group dissolves, or a club dissolves.
- **Historical identity** — identity derived from history and never tangled with it.

**This decision does not cover, approve, or authorize:**

- Any **implementation**, **SQL**, **migration**, or **UI**.
- The **DBDS** (physical blueprint) or its approval.
- The **Data Model (F2)** or its approval.
- The **legacy-migration reconciliation** or the Sprint 3 precondition gate (**S3.0**).
- The implementation of **Players** or any later sprint.
- Any **new domain rule** — no entity, relationship, ownership rule, invariant, authority, lifecycle, or data class is created or changed by this ADR.

---

## Consequences

### Formally unblocked

- **G1 is resolved.** The memory-governance blocker recorded in ADR-0001, `memory-model.md` Open Question 1, and `data-model.md` Part V is closed. Downstream documents that declared they *cannot close until G1 is resolved* lose that specific dependency.

### Explicitly **not** approved by this ADR

- **F2 (Data Model)** — still `Candidate`; its approval is a separate Product Owner act. G1 was one of its two remaining gates; the approval act itself remains.
- **DBDS** — not approved.
- **Legacy migration** — not reconciled; its applied state and the reconciliation path remain the Product Owner's to settle.
- **S3.0 (Sprint 3 precondition gate)** — not green. It still requires F2 approval, the DBDS approval, the legacy reconciliation, and a migration-application path.
- **Players (S3)** — not authorized. No code, schema, or migration is enabled by this decision.

### Positive

- The governance the corpus was built to accommodate is now real and recorded, not assumed.
- A Core open question that gated three downstream documents is closed by the deliberate, visible mechanism ADR-0001 prescribes, rather than by drift.

### Limitation

- G1 answers *what may be remembered and under whose permission*. Several adjacent questions remain open by design and are **not** resolved here — the promotion threshold, the decay rate, conflicting declaration authority (Core open questions), and derivation-tracking granularity (DM-022). `memory-governance.md` §11 states which questions it deliberately does not decide.

---

## Related Documents

- [`memory-governance.md`](../constitution/memory-governance.md) — the policy adopted by this ADR.
- [`memory-model.md`](../constitution/intelligence-core/memory-model.md) — the Core document whose Open Question 1 this ADR closes; the structure the policy operates on.
- [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) — who holds which authority; the source of the Recording Authority model.
- [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) — Level 1 Atlas DNA, which governs absolutely and which this policy may not weaken.
- [`data-model.md`](../architecture/data-model.md) — the four data classes the policy uses; **DM-025** (§2.4b) fixes the `RecordingAssertion` persistence shape.
- [`ADR-0001`](ADR-0001-intelligence-core-frozen.md) — froze the Core, recorded memory governance as owed, and requires open questions to be closed by ADR.
- [`ADR-0002`](ADR-0002-documentation-governance.md) — the tier and change-policy model under which `memory-governance.md` is a Tier 1 document.

---

_This record accepts the Atlas Memory Governance policy and closes Open Question 1 of the frozen Intelligence Core. It adopts an existing policy unchanged, introduces no new architecture, and approves nothing beyond G1. It changes only by supersession through a subsequent ADR._
