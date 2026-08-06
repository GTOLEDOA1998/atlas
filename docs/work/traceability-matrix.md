# Atlas Traceability Matrix — Architecture ↔ Execution

> **Status:** Living — the map from every architectural element to where it is realized and verified in execution. Updated as work proceeds.
> **Tier:** 4 — Work.
> **Owns:** the bidirectional trace between architecture (invariants, structures, decisions) and execution (migration steps, feature slices, sprint stories, validations), plus the current implementation status of each link.
> **Inherits:** [`product-architecture.md`](../architecture/product-architecture.md) · [`data-model.md`](../architecture/data-model.md) · [`sds.md`](../architecture/sds.md) · [`dbds.md`](../architecture/dbds.md) · [`memory-governance.md`](../constitution/memory-governance.md) · [`roadmap.md`](roadmap.md) · [`open-decisions.md`](open-decisions.md) · [`sprints/sprint-03-players.md`](sprints/sprint-03-players.md) · [`sprints/sprint-03-execution-runbook.md`](sprints/sprint-03-execution-runbook.md).
> **Does not own:** the content of any element (its owning document does) or the execution order (the runbook does). This matrix records *where* each thing lands and *whether* it is done — never *what* it is or *how* it is sequenced.
> **Amendment:** freely. The **Status** column is updated at the end of every sprint; a new blocker is added the day it is found.

---

## Legend

**Status** — `READY` (all information exists; can be built now, gated only by the S3.0 approval gate) · `BLOCKED` (an open decision prevents *closure* or *authoring*) · `OUT OF SCOPE` (not part of Migration 0001 / Sprint 3) · `DONE` (realized and verified).

Every row traces to an owning document. Where a cell would restate content, it carries a pointer instead.

---

## Matrix A · The four invariants → realization → verification

Source: `product-architecture.md` §10.1, made checkable in `sds.md` §9.1.

| Invariant | Realized in execution | Verified by | Status |
|---|---|---|---|
| Everything hangs off an identity subject | Migration 0001 structures + subject columns (runbook P3.1–P3.7) | A record with no subject cannot be created (P6.2) | READY |
| Derived is disposable; recorded is permanent | No delete-cascade anywhere; archiving as state (P3.10) | Nothing cascades on empty-DB apply (P6.2) | READY |
| Intelligence is a layer, not a feature | Feature slices import downward only; no `features/ai` (P4, P5) | Static layer-rule check (P6.1; `sds.md` §9.2) | READY |
| Nothing is asserted that cannot be traced | Provenance columns on interpretations (G4) — no interpretation in the startup set, enforced from S6 | Deferred to analysis sprints (S6) | OUT OF SCOPE (Sprint 3) |

---

## Matrix B · The seven startup structures

Source: `dbds.md` Part II · `sds.md` §2 (roots) · runbook Phase 3.

| Structure | Data class | DBDS | Migration step | Access regime | Feature slice | Status |
|---|---|---|---|---|---|---|
| `Club` | Fact | Part II `Club` | P3.1 | Tenant boundary | `features/club` | READY |
| `User` | Fact | Part II `User` | P3.2 | Self / cross-club | `features/auth` → `features/club` | READY |
| `Membership` | Decision | Part II `Membership` | P3.3 | Tenant-scoped | `features/club` | READY |
| `Player` | Fact | Part II `Player` | P3.4 | Subject-scoped (crosses clubs) | `features/players` | READY |
| `RosterMembership` | Fact | Part II `RosterMembership` | P3.5 | Tenant-scoped | `features/players` | READY |
| `Assignment` | Decision | Part II `Assignment` | P3.6 | Tenant-scoped (training authority) | `features/players` | READY |
| `RecordingAssertion` | Decision | Part II `RecordingAssertion` §2.4b | P3.7 | Tenant-scoped | `features/club` · `features/players` | READY |
| *Default-deny + chain policies* | — | Part IV | P3.8–P3.9 | all four regimes | `features/club` · `features/players` | READY to author · BLOCKED to close (DM-020) |

---

## Matrix C · Approved decisions realized in Migration 0001

These are settled; the matrix records *where they land in code*. Content: the documents they amended.

| Decision | What it fixed | Realized in execution | Status |
|---|---|---|---|
| **DM-006** | Tenancy boundary is `Club` (not `Workspace`) | `Club` column on every scoped structure (P3.1, P3.8) | READY |
| **DM-018** | Athlete = `Player` (person) + `RosterMembership` (club relationship); `Assignment` lives in the membership | P3.4–P3.6; account/person split honoured in S3.4/S3.5 | READY |
| **DM-023** | `Profile` withdrawn; `User` carries its holder's identity | `User` structure (P3.2); no `Profile` table | READY |
| **DM-025** | Recording Authority persisted as `RecordingAssertion`, one per `(subject, club)`, own L4 tombstone | P3.7; club's own assertion in bootstrap P4.3; player's in S3.4 | READY |
| **DM-021** | The SDS describes the whole product; sprints consume it | Runbook and sprint plan point at one SDS | DONE |
| **§5.6 (ex-DM-026)** | The bootstrap provisioning mechanism | Runbook Phase 4 realizes `sds.md` §5.6 | READY |

---

## Matrix D · Open decisions → execution impact

Content and priority: `open-decisions.md`. This matrix adds only *where each bites in execution* and *whether it gates Sprint 3*.

| Decision | Where it bites in execution | Gates Sprint 3? |
|---|---|---|
| **DM-013** — `Training : TrainingSession` cardinality | `TrainingSession` structure (not in startup set) | **Yes — via F2 approval.** Data Model Part VII gates F2's approval on it; subsumed by S3.0 criterion 1 (`data-model.md`, `sprint-03-players.md` §7) |
| **DM-014** — authority model beyond `Assignment` | `Declaration` write rule, guardian (not in startup set) | **Yes — via F2 approval.** Data Model Part VII; subsumed by S3.0 criterion 1 |
| **DM-015** — data class of knowledge/practice | `LibraryConcept`, `Exercise` lifecycle | **Yes — via F2 approval.** Data Model Part VII; subsumed by S3.0 criterion 1 |
| **DM-016** — `Plan : Objective` cardinality | Whether `Plan` is a root | No — S7 |
| **DM-017A** — assignment targets a group/session | Additional `Assignment` target kinds | No — Sprint 3 assigns coach→player only |
| **DM-019** — mass re-derivation trigger/visibility | `Analysis` / `IdentityMemory` update policy | No — S6+ |
| **DM-020** — standard of verifiability | **Closure of S3.2 (policies) and S3.8 (isolation)** | **Yes — blocks *closure* only** (runbook P6.5) |
| **DM-022** — derivation-reference granularity | Directed-forgetting execution on interpretations | No — no interpretation in startup set |

> **Reading:** two kinds of open decision touch Sprint 3, both inherited from the owning documents. **DM-013/14/15 gate the S3.0 *start*** — Data Model Part VII conditions F2's approval on them, and S3.0 criterion 1 requires F2 approved (`data-model.md`, `sprint-03-players.md` §7). **DM-020 gates *closure*** of S3.2/S3.8, not authoring (runbook P6.5). The remaining decisions touch structures outside the startup set. This matrix reflects these positions; it does not decide them.

---

## Matrix E · Domain area → feature slice → sprint

Source: `product-architecture.md` §9.1 (module map) × `roadmap.md` (sprint sequence).

| Domain area | Feature slice | Sprint | Status |
|---|---|---|---|
| Identity & Access | `features/auth` | S1 | DONE |
| Application shell | `components/layout` | S2 | DONE |
| Tenancy | `features/club` | **S3** | READY |
| Players | `features/players` | **S3** | READY |
| Media | `features/media` *(rename from `videos`, §9.3)* | S4 | OUT OF SCOPE |
| Perception | `features/perception` | S5 | OUT OF SCOPE |
| Analysis | `features/analysis` | S6 | OUT OF SCOPE |
| Objectives | `features/objectives` | S7 | OUT OF SCOPE |
| Training | `features/training` | S8 | OUT OF SCOPE |
| Library | `features/library` | S9 | OUT OF SCOPE |
| Assistant | `features/assistant` *(rename from `coach`, §9.3)* | S10 | OUT OF SCOPE |
| Sporting Memory | `features/memory` | S6–S10 | OUT OF SCOPE |
| Settings | `features/settings` | later | OUT OF SCOPE |

---

## Matrix F · Concept lineage — Intelligence Core → product → data → Sprint 3

The full chain from the frozen Core to the migration, for the load-bearing threads. Shows that no Sprint 3 structure is invented — each descends from the Core.

| Thread | Intelligence Core source | Product / Data source | Realized in Sprint 3 | Status |
|---|---|---|---|---|
| **Tenancy — `Club` is the boundary** | Identity Hierarchy (`coaching-dna.md`) | `product-architecture.md` §7.3 · `data-model.md` §1.3 | `Club` + `Membership` + default-deny (P3.1, P3.3, P3.8) | READY |
| **Account ≠ person** | Player Memory concerns a developing human (`memory-model.md` §4) | `product-architecture.md` §2.1 · `data-model.md` §2.3–§2.4 | `Player.user →` optional (P3.4, S3.5) | READY |
| **Recording Authority** | Administrative authority order (`human-decision-authority.md` §6) | `memory-governance.md` §2 · `data-model.md` §2.4b | `RecordingAssertion` (P3.7, P4.3, S3.4) | READY |
| **Memory follows the person; history stays with the club** | `memory-model.md` §5 (no cross-owner leakage) | `memory-governance.md` §9 · `data-model.md` DM-018 | Subject-scoped `Player` vs tenant-scoped `RosterMembership` (P3.4–P3.5, P3.9) | READY |
| **Training authority ≠ visibility** | `human-decision-authority.md` §2, §4 | `data-model.md` §2.5 · `sds.md` §5.2 | `Assignment` vs `Membership`, separated in policy (P3.3, P3.6, P3.9) | READY |
| **Nothing cascades / archiving is a state** | Historical memory is permanent (`memory-model.md` §7) | `dbds.md` G5 · `sds.md` §4.5 | No delete-cascade in Migration 0001 (P3.10) | READY |
| **Safety asymmetry — absence ≠ safe** | `current-session.md` §7 | `data-model.md` §2.9 · `sds.md` §3.5 | `Declaration` (not in startup set) | OUT OF SCOPE (S4+) |

---

## Matrix G · Sprint 3 story ↔ runbook phase ↔ validation

Cross-index so the sprint plan, the runbook and the validation stay aligned.

| Story (`sprint-03-players.md`) | Runbook phase | Validation (runbook P6 / sprint §5) | Status |
|---|---|---|---|
| S3.0 Precondition gate | P1 (1.0) + P2 | Approvals recorded; legacy state known | BLOCKED — F2/G1/DBDS approvals; F2 carries the Part VII prerequisite (DM-013/14/15) |
| S3.1 Migration — structures | P3.1–P3.7, P3.10 | P6.2 — applies to empty DB, nothing cascades | READY |
| S3.2 Access policies | P3.8–P3.9 | P6.3 — default deny holds; **P6.5 close gated by DM-020** | READY to author · BLOCKED to close |
| S3.3 Tenancy bootstrap | P4 | P6.3 — cold start end to end | READY |
| S3.4 Roster | P5.1–P5.2 | P6.4 — create + search; person/club data correct | READY |
| S3.5 Account ↔ person linking | P5.3 | P6.4 — link is 0:1, optional | READY |
| S3.6 Player profile shell | P5.4 | P6.4 — tabs resolve; no fabricated data | READY |
| S3.7 Header player switcher | P5.5 | P6.4 — switcher drives context | READY |
| S3.8 Isolation verification | P6.5 | **BLOCKED — method is DM-020** | BLOCKED (closure) |

---

## Summary of the current picture

- **Every startup structure and roster story is `READY`** — all information for the schema and the build exists.
- **The S3.0 *start* gate is blocked** by the F2/G1/DBDS approvals — and F2's approval carries the Data Model's Part VII prerequisite (DM-013/14/15 answered), per `data-model.md`. This is inherited, not a matrix decision.
- **The *closure* gate is DM-020**, for S3.2/S3.8 only.
- **No contradiction forces rework of Migration 0001**; every startup structure traces cleanly from the Intelligence Core (Matrix F).

---

_This matrix maps architecture to execution and records where each element lands and whether it is done. It owns no rule and sequences no work. It changes as execution proceeds._
