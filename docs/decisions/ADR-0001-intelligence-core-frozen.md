# ADR-0001 — Atlas Intelligence Core Version 1.0 Frozen

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-08-02 |
| **Supersedes** | — |
| **Superseded by** | — |

---

## Context

Atlas is a table tennis coaching intelligence platform whose central commitment is that technology amplifies human coaching rather than replacing it. Delivering that commitment reliably requires the conceptual architecture — how Atlas thinks, reasons, prioritizes, trains, and remembers — to be settled *before* implementation, not discovered during it.

Over a sustained documentation phase, nine foundational documents were produced, comprising the **Atlas Intelligence Core**:

| Document | Defines |
|---|---|
| [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) | How Atlas thinks as a coach — the conscience, the Identity Hierarchy, the Decision Hierarchy |
| [`table-tennis-knowledge.md`](../constitution/intelligence-core/table-tennis-knowledge.md) | What Atlas knows about the sport — the concept schema and relationship model |
| [`reasoning-model.md`](../constitution/intelligence-core/reasoning-model.md) | How Atlas reasons — the thirteen-stage reasoning lifecycle |
| [`priority-engine.md`](../constitution/intelligence-core/priority-engine.md) | How Atlas decides what deserves attention — WORK NOW / MONITOR / WAIT |
| [`training-model.md`](../constitution/intelligence-core/training-model.md) | How Atlas turns priorities into training |
| [`default-reasoning-profile.md`](../constitution/intelligence-core/default-reasoning-profile.md) | How Atlas behaves before personalization exists — the canonical Atlas Defaults |
| [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) | Who holds final human authority in every scenario |
| [`current-session.md`](../constitution/intelligence-core/current-session.md) | What is true today — context, never identity |
| [`memory-model.md`](../constitution/intelligence-core/memory-model.md) | How Atlas remembers, updates, replaces, and forgets |

A formal architectural audit of this set identified four critical blockers: an authority model with no valid subject where no coach exists (C1); `Atlas Defaults` referenced throughout but never defined (C2); `Current Session` mandated by the Decision Hierarchy but undefined (C3); and a mandatory memory lifecycle stage whose structure was unspecified (C4). Each has since been resolved by a dedicated document or amendment.

The Intelligence Core is now internally consistent, with declared precedence, non-overlapping ownership, and explicit inheritance between documents. It is sufficiently stable to build upon.

---

## Decision

**The Atlas Intelligence Core Version 1.0 is officially frozen as of the date of this record.**

Specifically:

1. **The Intelligence Core is considered architecturally complete.** The nine documents listed above constitute Version 1.0 and are the authoritative conceptual architecture of Atlas.
2. **Future work must inherit this architecture rather than redefine it.** Subsequent phases build upon the Intelligence Core; they do not reinterpret, restate, or quietly diverge from it.
3. **Changes to the Intelligence Core require a new ADR.** No document in the Core may be materially amended without a recorded architectural decision stating what changed and why.
4. **Implementation decisions must never silently modify the conceptual architecture.** Where implementation reveals that a conceptual definition is wrong, incomplete, or unbuildable, the correct response is a new ADR amending the Core — never an implementation that diverges from it while the documents continue to assert otherwise.
5. **Atlas DNA remains immutable.** Freezing does not create a mechanism to amend Level 1 principles. Player safety, long-term development, honesty, evidence-grounding, respect for uncertainty, explainability, and human decision authority are not subject to revision by ADR.

**The freeze is declared with 36 open architectural questions recorded across six Core documents.** These are known, bounded, and deliberately documented. Freezing asserts that the architecture is *stable enough to build on*, not that every question is answered. Open questions are inheritance points for future work, not defects concealed by the freeze.

---

## Rationale

**Architectural stability.** A conceptual foundation that changes during implementation forces repeated rework and produces systems whose behavior contradicts their own documentation. Fixing the foundation first converts an open-ended design problem into a bounded construction problem.

**Shared language.** The Core establishes precise, shared terminology — Atlas DNA, Club/Coach/Group/Player DNA, Current Session, WORK NOW/MONITOR/WAIT, Identity/Context/Historical Memory, Atlas Defaults. Contributors reasoning in the same vocabulary produce compatible work; contributors inventing their own do not.

**Consistency.** Freezing prevents the same concept being defined differently in different places as the system grows — the most common origin of architectural incoherence in long-lived products.

**Long-term maintainability.** Atlas is intended to be maintained for many years by people and systems that do not yet exist. A written, frozen, precedence-ordered architecture is what allows a future team to continue the work rather than reverse-engineer intent.

**Future scalability.** The Core is defined at the level of philosophy and structure, not technology. It remains valid as models, frameworks, and platforms change beneath it.

**Reduction of architectural drift.** Without a freeze, each new feature applies small, individually reasonable pressure on the conceptual model until it no longer describes the system. Requiring an ADR makes drift visible and deliberate.

**Clear separation between conceptual architecture and implementation.** The Core defines *what Atlas must be*. Implementation defines *how it is realized*. Keeping these separate allows implementation to change freely without destabilizing meaning, and prevents implementation convenience from silently redefining product intent.

---

## Consequences

### Positive

- Implementation may proceed against a stable, unambiguous conceptual foundation.
- Contributors — human and AI — inherit a single authoritative source rather than negotiating intent per task.
- Product commitments (AI assists, the coach decides; explainability; honest uncertainty) are structurally enforced rather than restated per feature.
- Architectural change becomes visible, deliberate, and reviewable.
- The Core is portable: another team could continue Atlas without redefining what it is.

### Limitations

- **The Core is now more expensive to change**, by design. Correcting a genuine conceptual error requires an ADR rather than an edit. This friction is the intended cost of stability.
- **36 open questions are inherited, not resolved.** Several — notably the promotion threshold from context to identity, appearing in three documents — will require answers before or during implementation.
- **Memory governance remains outstanding.** What may be remembered, for how long, and under whose consent is a policy decision deliberately excluded from the Intelligence Core. `memory-model.md` is built to accommodate restrictive answers, but the decision is still owed and belongs in Governance.
- **Freezing does not validate feasibility.** The Core is conceptually coherent; it has not been proven implementable. Implementation may surface genuine conceptual defects.
- **Documentation-first carries an inversion risk.** The conceptual layer is currently far more developed than the domain, data, and implementation layers. Subsequent phases must close that gap rather than extend the conceptual layer further.

### How future ADRs should evolve the Core without breaking it

- **Extend before amending.** Prefer a new document that inherits from the Core over changing a Core document. Most future needs are extensions.
- **Amend narrowly.** Where amendment is necessary, change the minimum required and preserve the existing philosophy, structure, and vocabulary.
- **State the inheritance.** Every new Intelligence document declares what it inherits, what it owns, and what it explicitly does not own.
- **Never weaken Atlas DNA.** Any proposal requiring a Level 1 principle to yield is rejected, not accommodated.
- **Record supersession explicitly.** An ADR that changes a prior decision names it and states what is superseded.
- **Close open questions by ADR.** Resolving a recorded open question is an architectural decision and is recorded as one.

---

## Scope

This decision covers the nine documents constituting the Atlas Intelligence Core, their internal consistency, their declared precedence and inheritance relationships, and the shared vocabulary they establish.

It also covers the process by which the Core may change: by ADR only.

## Out of Scope

This decision does **not** cover, freeze, or approve:

- The **Domain Model**, **Data Model**, **Software Design Specification**, or any implementation.
- Product scope, roadmap, MVP definition, pricing, or commercial decisions.
- Technology choices, application architecture, or the existing codebase.
- **Memory governance policy** — consent, retention, and what may be remembered.
- Privacy, legal, and regulatory obligations.
- Resolution of the 36 recorded open architectural questions.

Nothing in this ADR should be read as asserting that the above are settled.

---

## Future Evolution

With the Intelligence Core frozen, work proceeds in the following order. Each phase inherits from the Core and from every phase before it:

1. **Domain Model** — the entities, relationships, and vocabulary of the coaching domain, derived from the Core.
2. **Data Model** — how domain concepts are represented, related, and governed, including tenancy.
3. **Software Design Specification (SDS)** — the technical design realizing the Domain and Data models.
4. **Software Implementation** — construction against the SDS.

**The Intelligence Core becomes the permanent conceptual foundation for all future work.** Each subsequent phase must be traceable back to it: a domain entity that contradicts Coaching DNA, a data model that cannot represent the Identity Hierarchy, or an implementation that makes Atlas the decision authority are all defects in that phase — not evidence that the Core requires revision.

Where a later phase genuinely demonstrates that the Core is wrong, the correct response is a new ADR amending the Core deliberately and visibly. That path is intentionally available, and intentionally narrow.

---

_This record freezes the Atlas Intelligence Core Version 1.0. It changes only by supersession through a subsequent ADR._
