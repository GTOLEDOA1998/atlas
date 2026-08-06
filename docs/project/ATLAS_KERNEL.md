# Atlas Kernel

> **Type:** Extraction, not authority. The Kernel restates nothing and governs nothing; it names the irreducible core already declared elsewhere and points to it. Where any statement here appears to conflict with a Constitution document or an ADR, that document governs and this file is defective.
> **Not a source of truth.** Governance is mapped by [`ATLAS_SOURCE_OF_TRUTH.md`](ATLAS_SOURCE_OF_TRUTH.md); identity and principles are owned by the Constitution and the Intelligence Core. This Kernel is subordinate to both.
> **Evidence:** each statement is **VERIFIED** (cited), **INFERENCE** (derived from cited evidence), or **INSUFFICIENT EVIDENCE**.
> **Revision:** HEAD `57ccbe6` + uncommitted working tree · 2026-08-05.

---

## 1. Purpose

The Kernel is the smallest set of permanent facts without which Atlas stops being Atlas. It exists so that a contributor arriving after the current corpus can locate the irreducible core in one page and reach its owning document for everything else. It is **not** a manifesto, a summary, a roadmap, or a second authority. (**INFERENCE**, from the compression objective of this extraction task.)

## 2. Atlas Identity

- Atlas is a **table tennis coaching intelligence platform**. **VERIFIED** — `README.md:3`, `manifesto.md`, `product-principles.md`; the prior "AI employees" framing is declared *"obsolete and must not influence Atlas"* (`reasoning-model.md:436`).
- **AI amplifies the coach; the coach is the final decision-maker.** **VERIFIED** — `README.md:7`; immutable per `coaching-dna.md` Level 1 and `human-decision-authority.md`.
- **The coach is the primary user; the player is the subject of analysis, not a user in v1.0.** **VERIFIED** — `product-architecture.md` Part VII.
- Where positioning statements appear to conflict, they are catalogued, not resolved, in the Source of Truth (§5 of that file). **VERIFIED** — `ATLAS_SOURCE_OF_TRUTH.md` GAP-4.

## 3. Permanent Principles

The only principles the repository declares **immutable** are Level 1 Atlas DNA — *"not subject to revision by ADR"* (`ADR-0001:46`). They are the irreducible set; each is owned by `coaching-dna.md` and is named here, not re-explained (see [`glossary.md`](../foundation/glossary.md) and the Core for definitions).

| # | Principle | Classification | Canonical source | Evidence |
|---|---|---|---|---|
| 1 | Player safety | VERIFIED · immutable | `coaching-dna.md` | `ADR-0001:46` |
| 2 | Long-term development over short-term correction | VERIFIED · immutable | `coaching-dna.md` | `ADR-0001:46` |
| 3 | Honest recommendations | VERIFIED · immutable | `coaching-dna.md` | `ADR-0001:46` |
| 4 | Evidence-based coaching | VERIFIED · immutable | `coaching-dna.md` | `ADR-0001:46` |
| 5 | Respect for uncertainty | VERIFIED · immutable | `coaching-dna.md` | `ADR-0001:46` |
| 6 | Explainability | VERIFIED · immutable | `coaching-dna.md` | `ADR-0001:46` |
| 7 | Human decision authority | VERIFIED · immutable | `human-decision-authority.md`, `coaching-dna.md` | `ADR-0001:46` |

Two structural laws are declared permanent because the rest depends on them:

- **The Decision Hierarchy is fixed and non-reorderable:** Atlas DNA → Club → Coach → Group → Player Context → Current Session → Recommendation; higher levels constrain lower ones. **VERIFIED** — `intelligence-core/README.md:44`.
- **Identity is derived from history and never tangled with it** (`memory-governance.md:252`) — *"the single structural property on which this entire policy depends"* (`:254`). **VERIFIED.**

Excluded here by rule: technology, feature structure, and any sprint decision are not permanent principles (§5, §8).

## 4. Canonical Knowledge

The Kernel does not hold knowledge; it indexes where permanent knowledge lives and defers to it.

- **How Atlas thinks** — the nine-document Intelligence Core, frozen by `ADR-0001`, governed by `coaching-dna.md`. **VERIFIED** — `intelligence-core/README.md`.
- **What Atlas is / how it is built** — the Product Constitution (`manifesto.md`, `product-principles.md`, `development-rules.md`). **VERIFIED** — their Status lines.
- **Which document owns what, and who resolves conflicts** — `ATLAS_SOURCE_OF_TRUTH.md`. **VERIFIED.**
- The Kernel relates to these as a pointer of last resort, never as a replacement (Rule 4 of this extraction). **INFERENCE.**

## 5. Engineering Philosophy

Only stances the repository declares as permanent posture, not workflow.

- **The repository is the only source of truth; a derived tool's output is a pointer, never an answer.** **VERIFIED** — `README.md` Ecosystem roles; `master.md:§2`.
- **Architecture changes only by deliberate, recorded decision; extend before amending.** **VERIFIED** — `ADR-0001:44,90`, `ADR-0002`.
- **Simplicity over premature abstraction; built incrementally.** **VERIFIED** — `development-rules.md:16,15`.
- **A tool occupying a role is a substitution, not an architectural change** — technology is replaceable, the roles are not. **VERIFIED** — `README.md` Ecosystem roles; `tech-stack.md:7`.

Workflow, sprint mechanics, and Definition of Done are excluded; they live in `development-rules.md` §5–§7. **VERIFIED** — that document.

## 6. AI Behavioral Model

Permanent constraints on any AI contributor, whatever the model.

- **The AI never becomes the decider.** **VERIFIED** — `coaching-dna.md` Level 1; `human-decision-authority.md`.
- **The AI is one of several, model-agnostic; restraint is the primary skill.** **VERIFIED** — `master.md:§1`.
- **The manual never overrides the Constitution; every session declares exactly one mode** (`examine` / `design` / `implement`). **VERIFIED** — `master.md:7`; `README.md` Contributing; `prompts/{examine,design,implement}.md`.

## 7. Current State

The Kernel records no state; it names where authoritative state lives.

- **Authoritative project state** — `roadmap.md`, which *"Owns the state of every phase and sprint"* (`roadmap.md:7`). At the stated revision it records S1 and S2 Complete and S3 Blocked. **VERIFIED.**
- **Open architectural decisions** — `open-decisions.md`. **VERIFIED.**
- **Recovery context** — `PROJECT_RECOVERY_REPORT.md`. **VERIFIED.**
- **Implementation maturity:** no domain persistence or AI-layer code exists; the realized surface is authentication and the application shell. **VERIFIED** — established in `PROJECT_RECOVERY_REPORT.md §3`.

## 8. Boundaries — what the Kernel excludes, and where it lives

| Excluded topic | Owning document |
|---|---|
| Domain structure, navigation, modules, invariants | `product-architecture.md` |
| What is persisted; data classes; never-persist list | `data-model.md` |
| Physical blueprint | `dbds.md`; DDL & migration order are implementation (`dbds.md:6`) |
| Consistency, access control, media, contracts | `sds.md` |
| Technology choices | `tech-stack.md` |
| Memory permission, retention, forgetting | `memory-governance.md` |
| Vocabulary | `glossary.md` |
| UX behaviour | `ux-principles.md` |
| Roadmap, sprint planning, open decisions, execution | `roadmap.md`, `sprints/`, `open-decisions.md`, `traceability-matrix.md` |
| AI operating manual & modes | `prompts/master.md` + modes |
| Governance map & conflict resolution | `ATLAS_SOURCE_OF_TRUTH.md` |
| Testing standard; release/deployment process | **INSUFFICIENT EVIDENCE** — no canonical owner; testing is gated by open decision DM-020 (`open-decisions.md`), deployment infrastructure is described in `tech-stack.md` |

---

_This file names the permanent core of Atlas and points to its owners. It owns no rule, resolves no conflict, and changes only to correct a citation or to track a change made elsewhere by its proper process._
