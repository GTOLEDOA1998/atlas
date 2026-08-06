# ADR-0002 — Documentation Governance and Structure

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-08-03 |
| **Supersedes** | — |
| **Superseded by** | — |
| **Related** | [`ADR-0001`](ADR-0001-intelligence-core-frozen.md) — Atlas Intelligence Core Version 1.0 frozen |

---

## Context

Atlas is documentation-first by design. [`ADR-0001`](ADR-0001-intelligence-core-frozen.md) froze a nine-document Intelligence Core precisely so that construction would inherit a stable conceptual foundation rather than rediscover it. That decision made the documentation corpus load-bearing: it is not a description of the system, it is a constraint on it.

The corpus grew organically into numbered topic folders. An audit of all 25 files found that the scheme had failed in five measurable ways:

**Topic folders do not say what a document costs to change.** The first thing a contributor needs before touching a document is whether changing it requires an ADR, an approval, or nothing at all. `01 Vision/` does not answer that. Nothing did — the rule existed only in the header of each document, inconsistently, and in no document at all for several.

**Numbering imposed an order that aged badly.** Two different folders were numbered `03`. Numbers encode a reading sequence that changes as a product changes, and the filesystem is the wrong place to store it.

**Five of eleven folders were empty**, promising documentation that did not exist. Three files were zero bytes. One was an unfilled template.

**A superseded copy of the technology stack survived alongside its replacement**, producing three contradictions capable of changing a development decision: the UI primitive library (Radix versus Base UI, where the codebase uses Base UI), the authentication implementation status (described as pending after it had shipped), and the product's own positioning ("AI employee platform" versus "coaching intelligence platform", the former contradicting the immutable principle that Atlas is subordinate to the coach's judgment).

**Two artifacts existed only in conversation.** The Data Model specification — which gates the next sprint — and the Sprint 2 specification were never written to a file, despite the development rules requiring documentation to be updated as part of the definition of done.

The common cause is not carelessness. It is that **no rule stated who may change what, or where a new document belongs**. Without such a rule, duplication is the default outcome and contradiction is a matter of time.

---

## Decision

**Documentation is organised by how a document changes, not by what it is about.**

Specifically:

### 1. Five directories, each a change policy

| Directory | Holds | Changes by |
|---|---|---|
| `constitution/` | Mission, Product Constitution, Development Rules, and the frozen Intelligence Core | ADR, or explicit recorded amendment |
| `architecture/` | Domain model, data model, technology choices | Explicit Product Owner approval |
| `foundation/` | Derived guides elaborating the above | Freely, contradicting nothing above |
| `decisions/` | Architecture Decision Records | Never edited; superseded only |
| `work/` | Roadmap and sprint specifications | Freely, as work proceeds |

### 2. Four governance tiers, declared by location

**Tier is not a field in any document.** It is declared once, by the directory a document lives in, and stated once, in `docs/README.md`. Repeating it in every file would duplicate exactly what this decision exists to eliminate, and would make every relocation an edit.

**The escape rule.** If improving a Tier 3 document requires contradicting a Tier 1 or Tier 2 document, the change stops and escalates. A derived document never wins an argument with its owner.

### 3. Every document declares six fields

```
Status · Owns · Inherits · Does not own · Precedence · Amendment
```

**`Owns` and `Does not own` are the anti-duplication mechanism.** Two documents claiming the same territory becomes a defect findable in a single reading rather than a contradiction discovered years later.

### 4. A new document must pass three questions

1. What does it own that no existing document owns? *No answer means it is a section, not a document.*
2. What does it inherit, and what does it explicitly not own?
3. Which tier does it live in?

### 5. Retirement is defined

Superseded documents are retired and the successor states what it replaces. Obsolete Tier 1 documents require an ADR. Empty or purposeless files are deleted without ceremony. **An ADR is never deleted** — it is superseded by another that names it.

### 6. A sprint is not finished until its specification exists as a file

In `work/sprints/`. This makes explicit what the Development Rules already required.

### 7. Naming

Lowercase kebab-case, no numeric prefixes, no spaces. Documentation is written in English. A directory is created when its first document exists.

---

## What was done to the frozen Intelligence Core

Recorded explicitly, because ADR-0001 permits the Core to change only by ADR.

**The nine Core documents were relocated** from `docs/03 Intelligence/` to `docs/constitution/intelligence-core/` and renamed to kebab-case, using `git mv` so history is preserved. A README was added to that directory stating the Core's declared precedence order and its open questions.

**Their content was not amended.** The only edits inside the nine documents, and inside ADR-0001, were **link paths and the filename labels within those links**, repaired so the documents remain readable after the move. No sentence of substance was changed, no principle altered, no open question resolved.

**No `Tier` field was added to them.** Their tier is declared by their location.

This is maintenance of references, not amendment of the architecture. It is recorded here so that the distinction is on the record rather than assumed.

---

## Rationale

**Change policy is the property that matters at the moment of editing.** A contributor about to modify a document needs one fact before anything else: what does changing this cost? Organising by that fact puts the answer in the path. Organising by topic hides it.

**Location declaring tier is a single source of truth applied to governance itself.** The alternative — a `Tier:` field in 22 files — would have been this decision violating its own principle.

**`Owns` / `Does not own` converts duplication from a discovery problem into a review problem.** Duplication in a growing corpus is normally found when two documents are amended and quietly diverge, which can take years. Declared ownership makes the overlap visible immediately.

**The three-question gate stops documents that should have been sections.** Most documentation debt is not wrong content; it is content in a new file that belonged in an existing one.

**Requiring a sprint specification file closes the gap that lost two artifacts.** A process artifact that lives only in a conversation is not an artifact.

**Numbers were removed because they encode a decision the filesystem cannot maintain.** Reading order belongs in a README, which can be edited when the order changes; a folder prefix cannot, which is how two folders came to be numbered `03`.

---

## Consequences

### Positive

- Every document's change policy is knowable from its path.
- Duplication becomes detectable by reading two headers.
- The Intelligence Core is grouped as the unit it already was, with its precedence order stated where it lives rather than inferred.
- New contributors have a defined entry point and reading order in `docs/foundation/`.
- Three contradictions capable of misdirecting development were removed.
- Two artifacts that gated future work now exist as files.
- Cross-document links no longer require URL encoding, removing friction from every link written.

### Limitations

- **Every existing external link to the old paths is broken.** Links inside this repository were repaired and verified; anything outside it — bookmarks, notes, other tools — was not.
- **The tier system is only as good as the discipline applied to it.** Nothing mechanically prevents a Tier 3 document from contradicting a Tier 1 one; the escape rule is a convention, not an enforcement.
- **Documents are now more expensive to create**, by design. The three-question gate is friction, and that friction is the point.
- **One ownership overlap survives and is deliberately unresolved.** Dashboard scope is defined in `product-principles.md` §6 (Tier 1) and narrowed in `product-architecture.md` §1.3 (Tier 2). They do not contradict, but a Tier 2 document narrowing a Tier 1 one without declaring it is an ambiguity. It awaits a decision rather than being resolved here.
- **This decision does not validate the corpus's content.** It governs structure and change policy. Whether each document is correct is a separate question.

---

## Scope

The directory structure of `docs/`, the four governance tiers, the six-field document header, the rules for introducing and retiring documents, the naming convention, and the requirement that a sprint specification exist as a file.

It also covers the relocation of the frozen Intelligence Core and the repair of references within it.

## Out of Scope

This decision does **not** cover, approve, or validate:

- The **content** of any document, including the Intelligence Core, which remains frozen and unamended.
- The **Data Model**, which is drafted and awaits approval.
- **Memory governance** — what may be remembered, for how long, under whose consent. Still owed, and still blocking the first feature that persists player data.
- Any of the **36 open architectural questions** recorded by ADR-0001.
- Product scope, roadmap sequencing, technology choices, or the application codebase.

---

## Future Evolution

**Extend before amending.** A new documentation need is almost always a new document in an existing tier, not a change to this structure.

**A new tier requires an ADR.** Four tiers is a deliberate ceiling; a fifth would be evidence that the change-policy model is being used to encode something else.

**Adding a directory does not.** A directory is created when its first document exists, within the tier its change policy dictates.

**This decision is expected to outlive the current corpus.** It describes how documents are governed, not which documents exist — so it remains valid as the corpus grows, and it changes only if the governance model itself proves wrong.

---

_This record establishes documentation governance for Atlas and records the relocation of the frozen Intelligence Core. It changes only by supersession through a subsequent ADR._
