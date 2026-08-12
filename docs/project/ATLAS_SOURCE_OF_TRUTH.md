# Atlas Source of Truth

> **Type:** Governance map. It describes the authority structure that already exists in the repository. It introduces no governance, resolves no ambiguity, and recommends no change.
> **Evidence policy:** every statement is **VERIFIED** (cited as `path:line`), **INFERENCE** (derived from cited evidence, not stated verbatim), or **INSUFFICIENT EVIDENCE**. No governance is invented.
> **Governance placement of this file:** `docs/project/` is not one of the five directories the governance model declares (`docs/README.md:50`, `ADR-0002:41`). This document therefore has **no declared tier** (see §5, GAP-1). It owns nothing normative and is subordinate to every document it maps.
> **Repository revision:** HEAD `57ccbe6` plus uncommitted working-tree changes. **Date:** 2026-08-05.

---

## 1. Purpose

This document answers one question for every important aspect of Atlas: **which document is authoritative, and how may it change.** It is a lookup table over governance the repository already declares in two places — the directory model in `docs/README.md` and `ADR-0002`, and the per-document header fields (`Owns`, `Precedence`, `Amendment`).

It exists because that governance, while consistently declared, is distributed across ~30 document headers. This file consolidates it **by pointing, not by restating** — the anti-duplication mechanism `ADR-0002:61` establishes. Where the repository is ambiguous, this document marks the ambiguity and does not resolve it.

---

## 2. Governance Hierarchy

Atlas declares governance on **two distinct axes**. They are related but not identical, and the repository keeps them separate.

### Axis A — Change-policy tiers (who may change a document)

**VERIFIED** — `docs/README.md:50-56`, `ADR-0002:41-51`. Tier is declared by directory location, not by a field in the document (`ADR-0002:51`).

| Tier | Directory | Change policy | Evidence |
|---|---|---|---|
| **Tier 1** | `constitution/` and `decisions/` | ADR, or explicit recorded amendment; ADRs are never edited, only superseded | `README.md:52,55`; `ADR-0002:43,71` |
| **Tier 2** | `architecture/` | Explicit Product Owner approval | `README.md:53`; `ADR-0002:44` |
| **Tier 3** | `foundation/` | Freely, provided it contradicts nothing above | `README.md:54`; `ADR-0002:45` |
| **Tier 4** | `work/` | Freely, as work proceeds | `README.md:56`; `ADR-0002:47` |

**The escape rule** (VERIFIED — `README.md:74`, `ADR-0002:53`): if changing a Tier 3 document requires contradicting Tier 1 or Tier 2, the change stops and escalates. "A derived document never wins an argument with its owner."

### Axis B — Precedence in conflict (which document wins)

**VERIFIED** — reconstructed from the `Precedence` header field of each document. The uniform rule across the corpus is: *where a document conflicts with the one it inherits, the inheriting document is defective.*

```
Atlas DNA — Level 1                     immutable; not amendable even by ADR
   (coaching-dna.md)                    ADR-0001:46 · intelligence-core/README.md:7
        │
   coaching-dna.md governs everything   intelligence-core/README.md:13
        │
   Intelligence Core (9 documents)      frozen; changes only by ADR — ADR-0001
        │
   Product Constitution                 manifesto · product-principles · development-rules
        │
   memory-governance.md                 "Atlas DNA … Then the Intelligence Core.
        │                                Then this document" — memory-governance.md:7
   product-architecture.md              "Core governs, then Product Constitution" — :6
        │
   data-model.md                        "…then product-architecture.md" — :8
        │
   sds.md                               "every document above wins over this one" — :7
        │
   dbds.md                              "every document above wins" — :7
        │
   foundation/ (Tier 3)                 below constitution and each principle's owner
        │                                principles.md:8 · decision-framework.md:8
   work/ (Tier 4)                       "the owning document is right and this
        │                                register is stale" — open-decisions.md:7
   prompts/master.md + modes            "the constitution wins over this manual" — :7
```

**VERIFIED nuance:** the two axes are not interchangeable. `memory-governance.md` lives in `constitution/` (Tier 1, change-cost) yet its precedence header places it **below the entire Intelligence Core** (`memory-governance.md:7`). Tier measures *cost to change*; precedence measures *who wins a conflict*. A Tier 1 document can still be declared defective against the Core.

---

## 3. Canonical Documents

For each topic: the authoritative document, its authority axis, and evidence. Change process is per §2 (by tier) unless the header narrows it.

| Topic | Canonical document | Authority | Change process (VERIFIED source) | Evidence |
|---|---|---|---|---|
| **Project Identity — why** | `manifesto.md` | Tier 1 | Explicit deliberate amendment (`:5`) | Status: *"the vision document… answers why Atlas exists"* (`manifesto.md:3`) |
| **Product — what Atlas is** | `product-principles.md` | Tier 1 | Explicit amendment (`:precedence`) | Status: *"Product Constitution — the single source of truth for what Atlas is as a product"* |
| **How Atlas thinks (AI reasoning)** | Intelligence Core (9 docs), governed by `coaching-dna.md` | Tier 1 | **ADR only**; Atlas DNA immutable | `intelligence-core/README.md:5,13`; `ADR-0001:44,46` |
| **Domain / Architecture** | `product-architecture.md` | Tier 2 | Deliberate+explicit; ADR if touching Core (`:7`) | `Owns` §2.7 entities, navigation, modules (`:29`) |
| **Domain Model / persistence** | `data-model.md` | Tier 2 | Deliberate+explicit; ADR if touching Core (`:9`) | OWNS *"what Atlas persists… the never-persist list"* (`:5`) |
| **Database (physical blueprint)** | `dbds.md` | Tier 2 | Explicit Product Owner approval (`:8`) | OWNS *"the physical blueprint… conceptual columns…"* (`:4`) |
| **DDL / migrations** | *(implementation, not a document)* | — | — | `dbds.md` *"Does not own: DDL, index design, migration order"* (`:6`) |
| **Software design / Security (access control)** | `sds.md` (§5 access control) | Tier 2 | Explicit Product Owner approval (`:8`) | OWNS *"…access control…"* (`:4`); `dbds.md:465`: *"SDS §5 is authoritative"* |
| **Memory — how it works** | `memory-model.md` | Tier 1 | ADR only | Core document 9 (`intelligence-core/README.md:63`) |
| **Memory — governance (what may be stored)** | `memory-governance.md` | Tier 1 | Explicit+recorded; ADR if touching Core (`:8`) | OWNS *"the definition of persistent memory… retention… directed forgetting"* (`:4`) |
| **Technology choices** | `tech-stack.md` | Tier 2 | Explicit Product Owner approval (`:7`) | OWNS *"which technologies are used at each layer"* (`:4`) |
| **Development rules / Git workflow** | `development-rules.md` | Tier 1 | Explicit amendment (`:precedence`) | Status: *"single source of truth for how Atlas is built"*; §6 Git Rules |
| **Vocabulary** | `glossary.md` | Tier 3 | Adding a term routine; Core definitions need ADR (`:9`) | OWNS *"the canonical vocabulary… reserved and forbidden names"* (`:6`) |
| **UX behaviour** | `ux-principles.md` | Tier 3 | Deliberate+explicit (`:9`) | OWNS *"the ten behavioural principles"* (`:5`) |
| **Product pipeline (artifacts + gates)** | `decision-framework.md` | Tier 3 | Deliberate+explicit (`:9`) | OWNS *"the eight artifacts… two mandatory human gates"* (`:5`) |
| **Architecture→code bridge** | `developer-guide.md` | Tier 3 | Freely, contradicting nothing above (`:8`) | OWNS *"the bridge from the approved architecture to code"* (`:5`) |
| **Roadmap / Project State** | `roadmap.md` | Tier 4 | Updated at end of every phase (`:10`) | OWNS *"the state of every phase and sprint… what blocks what"* (`:7`) |
| **Sprint planning** | `sprints/sprint-03-players.md`; execution in `…-execution-runbook.md` | Tier 4 | Freely (`:8`,`:9`) | OWNS *"what Sprint 3 implements…"* (`:5`) |
| **Open decisions** | `open-decisions.md` | Tier 4 | Freely (`:8`) | OWNS *"the state of every architectural decision…"* (`:4`) |
| **Architecture↔execution trace** | `traceability-matrix.md` | Tier 4 | Freely (`:8`) | OWNS *"the bidirectional trace…"* (`:5`) |
| **AI contributor operation / Prompt system** | `prompts/master.md` + modes (`examine`/`design`/`implement`) | *(undeclared tier — see GAP-2)* | Deliberate+explicit (`master.md:8`); modes free (`:9`) | OWNS *"the identity of an AI contributor… the precedence order… the mode ceiling"* (`master.md:4`) |
| **Recovery record** | `project/PROJECT_RECOVERY_REPORT.md` | *(undeclared tier — GAP-1)* | Tier-4-equivalent, self-declared | Its own header |
| **Release process** | — | — | — | **INSUFFICIENT EVIDENCE** (see GAP-3) |

---

## 4. Conflict Resolution

**A repository-wide conflict rule exists and is uniform. VERIFIED.**

- **The derived document is defective.** Every Tier 2+ document states, in its `Precedence` field, that where it conflicts with a document it inherits, *this document is defective* (`data-model.md:8`, `dbds.md:7`, `sds.md:7`, `product-architecture.md:6`, `memory-governance.md:7`, `decision-framework.md:8`, `principles.md:8`, `open-decisions.md:7`).
- **The escape rule** governs cross-tier conflicts: a Tier 3 document contradicting Tier 1/2 stops and escalates (`README.md:74`, `ADR-0002:53`).
- **The anti-duplication mechanism** is the `Owns`/`Does not own` pair: two documents claiming the same territory is a findable defect, not a silent contradiction (`README.md:82`, `ADR-0002:61`).
- **The Core changes only by ADR**, and resolving a recorded open question is itself an ADR (`ADR-0001:44,95`). Atlas DNA Level 1 is outside even that (`ADR-0001:46`).
- **Prompts never override documents:** *"the constitution wins over this manual"* (`master.md:7`).

**Where the rule is silent:** conflicts *between two Tier 4 work documents* have no declared tiebreaker beyond "the owning document is right" (`open-decisions.md:7`), which resolves register-vs-owner but not work-doc-vs-work-doc. **INFERENCE:** because each work document declares a distinct `Owns`, a direct Tier-4-vs-Tier-4 conflict is not expected; but no explicit rule for it exists → **INSUFFICIENT EVIDENCE** for a declared tiebreaker at that level.

---

## 5. Governance Gaps

Each gap is evidence-backed. None is resolved here.

**GAP-1 · `docs/project/` has no declared tier or change policy.** VERIFIED. The governance model enumerates exactly five directories (`README.md:50-56`, `ADR-0002:41`); `docs/project/` is not among them, yet it now holds `PROJECT_RECOVERY_REPORT.md` and this document. Their change policy is self-declared, not governed by the model. *Category: missing ownership.*

**GAP-2 · `prompts/` sits outside the four-tier model.** VERIFIED. The tier table covers `docs/` only (`README.md:50`); `prompts/master.md` declares its own precedence (*"the constitution wins over this manual"*, `master.md:7`) but no directory tier assigns its change cost. **INFERENCE:** it behaves as a Tier-1-adjacent operating layer, but the model does not place it. *Category: ambiguous ownership.*

**GAP-3 · No canonical Release Process document.** INSUFFICIENT EVIDENCE. `tech-stack.md` describes deployment infrastructure (Vercel + GitHub) but no document owns a release/versioning process. *Category: missing canonical source.*

**GAP-4 · Dashboard-scope ownership overlaps across tiers — self-declared and unresolved.** VERIFIED. `ADR-0002:130`: Dashboard scope is defined in `product-principles.md §6` (Tier 1) and narrowed in `product-architecture.md §1.3` (Tier 2); *"a Tier 2 document narrowing a Tier 1 one without declaring it is an ambiguity. It awaits a decision."* *Category: duplicate/ambiguous authority — acknowledged by governance itself.*

**GAP-5 · The required G1 ADR — NOW RESOLVED.** `memory-governance.md` (G1) completion required recording as an ADR (`roadmap.md` G1 section; `ADR-0001:95`). **`ADR-0003` was created on 2026-08-05**, adopting `memory-governance.md` and closing `memory-model.md` Open Question 1. The gap is closed; recorded here for traceability.

**No circular authority was found.** INFERENCE — the inheritance chain (Core → Constitution → product-architecture → data-model → sds → dbds; foundation and work below their owners) is acyclic across all `Precedence`/`Inherits` fields inspected. `roadmap.md` and `sprints/` reference each other but own different things (`roadmap.md:9` *"Does not own: what a sprint specified"*), so the mutual reference is not circular authority.

---

## 6. Validation

Per canonical document: `Owns` / `Does Not Own` / authority / change process / depends on. **`Referenced By` is populated only with VERIFIED inbound links; it is not exhaustively enumerated** (marked *partial*).

| Document | Owns (verbatim, abbreviated) | Does Not Own | Authority | Changed By | Depends On (Inherits/Precedence) |
|---|---|---|---|---|---|
| `coaching-dna.md` | The conscience; Identity & Decision hierarchies | — | Tier 1 / **top of precedence** | Level 1 immutable; rest by ADR (`:7`) | Governs everything (`ic/README:13`) |
| Intelligence Core (other 8) | How Atlas knows/reasons/prioritizes/trains/remembers/authority/session | Persistence, tech, product structure | Tier 1 | ADR only (`ADR-0001:44`) | `coaching-dna.md` |
| `manifesto.md` | Why Atlas exists | What/how | Tier 1 | Explicit amendment (`:5`) | — |
| `product-principles.md` | What Atlas is as a product | How it is built | Tier 1 | Explicit amendment | Intelligence Core |
| `development-rules.md` | How Atlas is built; "done"; Git | What Atlas is | Tier 1 | Explicit amendment | — |
| `memory-governance.md` | Persistent-memory permission/retention/forgetting | How memory works structurally; what is persisted in shape (`:6`) | Tier 1 (precedence below Core) | Explicit+recorded; ADR if Core (`:8`) | Atlas DNA → Core (`:7`) |
| `product-architecture.md` | Entities, navigation, modules, layers (`:29`) | Reasoning, schema, tech, governance (`:33`) | Tier 2 | Deliberate+explicit; ADR if Core (`:7`) | Core, Constitution (`:6`) |
| `data-model.md` | What Atlas persists; data classes; never-persist (`:5`) | Reasoning; SQL/migrations; interface language (`:7`) | Tier 2 | Deliberate+explicit; ADR if Core (`:9`) | Core → Constitution → product-architecture (`:8`) |
| `sds.md` | Implementation contract: boundaries, access, media, contracts (`:4`) | What/how/entities/style/state (`:6`) | Tier 2 | Product Owner approval (`:8`) | every doc above (`:7`) |
| `dbds.md` | Physical blueprint: structures, columns, constraints, access model (`:4`) | DDL, indexes, migration order (`:6`) | Tier 2 | Product Owner approval (`:8`) | sds, data-model, product-architecture, Core, ADRs (`:5`) |
| `tech-stack.md` | Technologies per layer + status (`:4`) | Feature structure; persistence; domain (`:6`) | Tier 2 | Product Owner approval (`:7`) | development-rules (`:5`) |
| `glossary.md` | Canonical vocabulary; reserved names (`:6`) | Any concept's definition (`:8`) | Tier 3 | Term routine; Core defn ADR (`:9`) | The whole corpus (`:7`) |
| `ux-principles.md` | Ten behavioural principles + tests (`:5`) | Feeling vocabulary; visual language; anti-goals (`:7`) | Tier 3 | Deliberate+explicit (`:9`) | product-principles §3-4, product-architecture (`:6`) |
| `principles.md` | Architectural consequences + anti-patterns + ownership map (`:5`) | — | Tier 3 | Deliberate+explicit (`:9`) | coaching-dna Level 1 → product-principles (`:8`) |
| `decision-framework.md` | The eight artifacts + two human gates (`:5`) | — | Tier 3 | Deliberate+explicit (`:9`) | Intelligence Core (`:8`) |
| `developer-guide.md` | Architecture→code bridge (`:5`) | Reading order, governance, domain rules (`:does-not-own`) | Tier 3 | Freely, contradicting nothing above (`:8`) | dev-rules, tech-stack, arch docs, runbook |
| `roadmap.md` | Phase/sprint state; blocks; debt (`:7`) | What a sprint specified; dates/pricing (`:9`) | Tier 4 | End of every phase (`:10`) | ADR-0001, development-rules §5 (`:8`) |
| `open-decisions.md` | State of every open decision (`:4`) | Decision content; resolved decisions (`:6`) | Tier 4 | Freely (`:8`) | ADR-0001, ADR-0002 (`:5`) |
| `sprint-03-players.md` | What Sprint 3 implements + order + DoD (`:5`) | Any domain rule/schema/policy (`:7`) | Tier 4 | Freely (`:8`) | roadmap, arch docs, memory-governance, dev-rules |
| `sprint-03-execution-runbook.md` | Operational execution order (`:5`) | Any rule in the docs it points at | Tier 4 | Freely (`:9`) | sprint-03-players, arch docs |
| `traceability-matrix.md` | Architecture↔execution trace + status (`:5`) | Content of any element; execution order | Tier 4 | Freely (`:8`) | arch docs, roadmap, open-decisions, sprints |
| `prompts/master.md` | AI-contributor identity, precedence, mode ceiling (`:4`) | What/how/persistence/vocabulary/state (`:does-not-own`) | Undeclared tier (GAP-2) | Deliberate+explicit (`:8`) | product-principles, dev-rules, Core, ADRs |
| `ADR-0001` / `ADR-0002` / `ADR-0003` | The three recorded architectural decisions (Core frozen · doc governance · memory governance accepted) | — | Tier 1 (decisions) | **Never edited; superseded only** (`ADR-0002:71`) | — |

*Referenced By (partial, VERIFIED inbound links):* the Intelligence Core is referenced by nearly every Tier 2 document's `Inherits` line; `ADR-0001`/`ADR-0002` are referenced by `README.md`, `roadmap.md`, and every `Inherits` field; `sds.md §5.6` is referenced by `sprint-03-players.md` and `roadmap.md`. A complete inbound-reference index was **not computed** and is marked INSUFFICIENT EVIDENCE for exhaustiveness.

---

## 7. Overall Assessment (governance model only)

Evaluation restricted to the governance model. Architecture, code, and database are out of scope by instruction.

**VERIFIED characteristics:**
- Authority is declared in two consistent, separable axes (change-policy tiers; conflict precedence), each traceable to a fixed location (`ADR-0002` for tiers; per-document `Precedence` fields for conflict).
- A single, uniform conflict rule applies corpus-wide ("the derived document is defective"), with an escape rule for cross-tier conflicts.
- An anti-duplication mechanism (`Owns`/`Does not own`) is declared and enforced by header, making overlap a review-time defect (`ADR-0002:61`).
- The change cost of every `docs/` document is knowable from its path without opening it (`ADR-0002:99`).

**VERIFIED limits:**
- Two directories that hold governance-bearing material — `prompts/` and `docs/project/` — sit outside the four-tier model (GAP-1, GAP-2).
- One cross-tier ownership overlap is unresolved and self-declared (GAP-4).
- One process artifact required by the governance itself is absent (GAP-5).
- No canonical source governs release/versioning (GAP-3).

**INFERENCE:** the governance model is internally consistent and self-describing for everything inside `docs/`'s five declared directories; its declared boundaries do not yet extend to `prompts/` or `docs/project/`, which are governed only by their own headers.

No further evaluation is offered, and no change is recommended. This document maps governance; it does not alter it.

---

## Self-review

Each sentence was checked against cited evidence. Actions taken:
- Every authority claim is backed by a `path:line` citation to an `Owns`, `Precedence`, `Amendment`, or governance-document line.
- Statements not directly quoted (the acyclic-authority conclusion, the two-axis relationship, the prompts/project tier placement) are labeled **INFERENCE**.
- Topics with no owning document (Release Process; exhaustive `Referenced By`; a Tier-4-vs-Tier-4 tiebreaker) are labeled **INSUFFICIENT EVIDENCE** rather than assigned an invented owner.
- No tier, rule, precedence, or owner was created. The four gaps are reported, not resolved.

---

_This document maps the governance that exists in the Atlas repository as of the stated revision. It owns no rule and changes no decision. It is updated only to correct a citation or to reflect a governance change made elsewhere by its proper process._
