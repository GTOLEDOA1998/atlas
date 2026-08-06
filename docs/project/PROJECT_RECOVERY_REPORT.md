# Project Recovery Report

> **Type:** Historical engineering record. It documents a past stabilization effort and the state of the repository at the time of writing.
> **Governance placement:** This document owns no normative rule. It is subordinate to the constitution ([`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md), [`ADR-0002`](../decisions/ADR-0002-documentation-governance.md), and the Tier 1/2 documents). Where it appears to state a rule, the owning document governs and this record is the defect. Creating the `docs/project/` directory is permitted without an ADR (`ADR-0002`, *Future Evolution*: *"A directory is created when its first document exists"*); its change policy is that of Tier 4 work — updated freely as facts change.
> **Evidence policy:** Every material statement is tagged **VERIFIED** (directly supported by repository evidence, cited as `path:line` or by command), **INFERENCE** (strongly suggested, not explicit), or **RECOMMENDATION**. Where evidence is absent, the text states **INSUFFICIENT EVIDENCE**.
> **Repository revision at time of writing:** HEAD `57ccbe6` (2026-08-03) plus uncommitted working-tree changes. **Report date:** 2026-08-05.

---

## 1. Purpose

This document exists to give a future maintainer a single, evidence-based account of a stabilization effort carried out on the Atlas repository, and of the state the project was left in as a result.

It answers four questions for someone joining the project later: what condition the repository was found in, what an independent audit confirmed and disproved, what was corrected, and under what conditions implementation was cleared to begin. It is not a roadmap, a design document, or a change to the architecture. The architecture was frozen before this effort and remained frozen throughout (**VERIFIED** — `ADR-0001` is unmodified except link-path repairs recorded in `ADR-0002:89`).

**INFERENCE:** the value of writing this down is the same lesson the project already recorded once — a process artifact that lives only in a conversation is not an artifact (`ADR-0002:107`). This record converts the stabilization effort into a durable one.

---

## 2. Recovery Trigger

The recovery was not triggered by a runtime incident, a data loss, or a security breach. **INSUFFICIENT EVIDENCE** exists for any such event. The trigger was a documentation-governance failure, followed by a due-diligence audit that surfaced unversioned state.

Two phases are supported by evidence:

**Phase A — Documentation-governance failure (recorded in `ADR-0002`, dated 2026-08-03).** **VERIFIED.** An audit of the corpus found that the topic-folder scheme had failed in measurable ways (`ADR-0002:17`): the change policy of a document was not knowable from its location; two folders were both numbered `03`; five of eleven folders were empty; a superseded copy of the technology stack survived alongside its replacement and produced three decision-changing contradictions; and **two process artifacts — the Data Model specification and the Sprint 2 specification — existed only in conversation and had never been written to a file** (`ADR-0002:27`).

**Phase B — Independent due-diligence audit (dated 2026-08-05, this record's basis).** **VERIFIED.** A technical audit performed against the working tree established that the reorganized corpus, although internally consistent, existed almost entirely as uncommitted changes, and that the repository's only database artifact had been applied to the live cloud project while contradicting the approved domain model.

**INFERENCE:** Phases A and B are two points in one continuous effort to make the project's real state explicit and durable, rather than two unrelated events.

---

## 3. Audit Summary

### Verified

- The repository has **8 commits**, the most recent dated 2026-08-03 (**VERIFIED** — `git log`).
- The architecture and supporting corpus — `data-model.md`, `sds.md`, `dbds.md`, `product-architecture.md`, `memory-governance.md`, `ADR-0002`, all of `docs/foundation/` and `docs/work/`, and `.gitignore` — are **untracked or modified and uncommitted** (**VERIFIED** — `git status --porcelain` returned 46 entries).
- `supabase/migrations/0001_atlas_core.sql` **exists and has been applied to the live cloud database.** A read-only probe returned `42501 permission denied` for its six tables (they exist) versus `PGRST205` for a control name (absent) (**VERIFIED**). Its schema contradicts the approved domain model: `players.profile_id NOT NULL`, `on delete cascade` throughout, and no row-level security.
- The document set declares this migration **superseded in full** (**VERIFIED** — `sds.md:319`, `dbds.md:479`).
- There is **no test suite, no test runner, and no CI configuration** (**VERIFIED** — 0 test files; no test dependencies in `app/package.json`; no `.github/workflows`).
- The realized application is **3,590 source lines** covering authentication, the application shell, and a dashboard on mock data; there is **no domain-persistence code and no AI-layer code** (**VERIFIED** — `find`/`grep`; no `features/ai`).
- The Sprint 3 start gate is unmet: F2 (Data Model) is *Candidate*, G1 (Memory Governance) is *Drafted*, the DBDS is unapproved, and the ADR that G1's completion criterion requires does not exist (**VERIFIED** — `roadmap.md` state table; `docs/decisions/` contains only ADR-0001 and ADR-0002).
- A product-positioning residue survives in a canonical Tier 2 document: `tech-stack.md:68` retains *"AI as a capable employee,"* a framing `reasoning-model.md:436` declares *"obsolete and must not influence Atlas"* (**VERIFIED**).
- Shipped code metadata carries a non-canonical identity and language: `app/src/app/layout.tsx:19` sets the description to *"AI Platform for Table Tennis"* and `:8` sets `<html lang="en">` while interface copy is Spanish (**VERIFIED**).

### Inferred

- The uncommitted corpus represents a single point of failure for the entire approved architecture (**INFERENCE** — follows from the corpus being untracked and un-pushed).
- The legacy tables are empty, because no application code references them and the migration defines no triggers or seed data (**INFERENCE**; **INSUFFICIENT EVIDENCE** for exact row counts, which require privileged database access).
- The volume of specification relative to code (~7,900 lines of architecture/constitution versus 3,590 SLOC) reflects the documentation-first inversion the project declared as a known risk (**INFERENCE**, supported by `ADR-0001:86`).

### Recommendations

- Commit and push the corpus before further work (**RECOMMENDATION**).
- Resolve the S3.0 approval gate and record the legacy-migration reconciliation path before creating the new migration (**RECOMMENDATION**).
- Carry the four implementation-stage corrections identified during design review (see §5) into the Sprint 3 execution plan (**RECOMMENDATION**).

---

## 4. What Was Confirmed

The audit validated the following as accurate and internally consistent. Statements are factual, not evaluative.

- **Architectural consistency.** No contradiction was found within the domain model, the SDS, or the DBDS. The nine startup and interpretation concepts trace from the frozen Intelligence Core (**VERIFIED** — cross-reference checks; `data-model.md` Part VI traceability table).
- **Governance is documented and locatable.** Authority is layered across two ADRs, four tiers, and a per-document `Owns`/`Does not own` header; an operating manual (`prompts/master.md`) governs AI contributors and declares itself subordinate to the constitution (**VERIFIED**).
- **Project identity is singular** (with one residue, §5). Atlas is a table tennis coaching intelligence platform in which the coach holds final decision authority (**VERIFIED** — `README.md:7`, `manifesto.md`, `reasoning-model.md:436`).
- **Documentation integrity.** Zero broken internal links were found across the corpus at the time of audit (**VERIFIED** — link scan of `docs/`, `prompts/`, `README.md`).
- **The realized code honors its documented boundaries.** The shell receives features as slots and does not import them; route protection derives from a single registry; the session is validated with `getUser()` rather than the forgeable `getSession()`; no `TODO`/`FIXME`/`@ts-ignore`/`eslint-disable` markers exist in `app/src` (**VERIFIED**).

---

## 5. What Was Incorrect

Each item below is a confirmed inconsistency. Cause is stated only where supported.

**5.1 — Corpus not under version control.**
*Wrong:* the approved architecture existed only as uncommitted working-tree changes (**VERIFIED**).
*Cause:* **INSUFFICIENT EVIDENCE** for a specific cause; the pattern matches the failure `ADR-0002:107` names (artifacts not persisted).
*Status:* Open. Correction is a commit/push action, not yet performed at time of writing.

**5.2 — Legacy migration applied and contradictory.**
*Wrong:* `0001_atlas_core.sql` was applied to the live database and contradicts the domain model; it also occupies object names and the `0001` migration slot the startup schema requires (**VERIFIED**).
*Cause:* **INFERENCE** — it predates the approved domain model (`sds.md:319` calls its identity strategy, tenancy, cascade rules, and vocabulary older than the model).
*Status:* Open. Reconciliation is defined as a required pre-step (`sprint-03-players.md` S3.0, criterion 4) but not yet executed.

**5.3 — Roadmap desynchronized from the corpus.**
*Wrong:* `roadmap.md` described F3 as *"two sections prepared / not yet written to a document"* and did not mention the DBDS, while `sds.md` (ten sections) and `dbds.md` existed.
*Cause:* the roadmap was not updated when the SDS and DBDS were written (**INFERENCE**).
*Status:* **Corrected** in the working tree — the F3 section, the state table, the dependency graph, and an implementation-support section were resynchronized (**VERIFIED** — current `roadmap.md`).

**5.4 — Sprint 3 reinterpreted an inherited approval criterion.**
*Wrong:* `sprint-03-players.md` asserted that DM-013/14/15 had *"no effect on Sprint 3"* while simultaneously requiring F2 approval, which `data-model.md:560` gates on exactly those decisions. `traceability-matrix.md` had propagated the same reinterpretation.
*Cause:* the sprint plan restated a gate criterion it does not own, contrary to its own header (*"Inherits, and never restates"*) (**VERIFIED**).
*Status:* **Corrected** in both documents; the gate now defers to its owning documents (**VERIFIED**).

**5.5 — Stale term and stale self-note.**
*Wrong:* `glossary.md` defined `Workspace` as a live ownership-boundary term after `data-model.md:2.24` withdrew it in favor of `Club`; `product-architecture.md:622` describes a `03/04 Architecture` duplication defect already resolved (**VERIFIED**).
*Status:* `Workspace` **corrected** in the glossary (moved to *terms deliberately absent*, redirected to `Club`). The `product-architecture.md:622` note remains (Tier 2; correction requires Product Owner approval).

**5.6 — Positioning residue and code metadata.**
*Wrong:* `tech-stack.md:68` retains the disowned *"capable employee"* framing; `layout.tsx:19` and `:8` carry a non-canonical description and `lang="en"` (**VERIFIED**).
*Status:* Open. Both are single-line corrections; the first is Tier 2 (needs approval), the second is code within Sprint 3's touch surface.

---

## 6. Lessons Learned

Engineering observations supported by the events above. No motivational content.

1. **Unversioned documentation is not durable state.** An approved corpus that is never committed carries the same risk as one that was never written (relates to `ADR-0002:107`).
2. **A migration applied outside version control creates hidden coupling.** The legacy schema's applied state was unknown until probed directly; a schema change that is not recorded in the migration history cannot be reasoned about from the repository alone (§5.2).
3. **Approval state must be asserted only by its owning document.** When a consuming document (a sprint plan) restated an inherited gate criterion, it drifted from the owner and produced a contradiction that was invisible until each document was read against the other (§5.4).
4. **A state-tracking document silently rots when the artifacts it tracks are produced elsewhere.** The roadmap fell out of sync precisely because the SDS and DBDS were written without a corresponding roadmap update (§5.3).
5. **Verification claims require verification.** Two documents asserted a contradiction had been *resolved* while the residue remained live in a third (§5.6, `ADR-0002:25` vs `tech-stack.md:68`).

---

## 7. Decisions Adopted

**No new architectural or domain decision was adopted during this recovery.** The architecture remained frozen; no ADR was opened. This is stated explicitly to prevent a future reader from treating this report as a source of new decisions.

The following are the corrective actions that were **applied and are now part of the working tree** (**VERIFIED**). They are not new rules; they are enforcement of rules the project already held:

- The SDS tenancy-bootstrap provisioning mechanism was specified in `sds.md §5.6`, closing the last specification gap (previously tracked as the withdrawn DM-026).
- The roadmap was resynchronized with the corpus (§5.3).
- The Sprint 3 gate reinterpretation was removed from `sprint-03-players.md` and `traceability-matrix.md` (§5.4).
- The `Workspace`/`Club` glossary inconsistency was corrected (§5.5).
- Three implementation-support artifacts — `developer-guide.md`, `sprints/sprint-03-execution-runbook.md`, `traceability-matrix.md` — exist and are registered in `docs/README.md`.

Items requiring Product Owner action remain **recommendations, not adopted decisions**: approval of F2, the DBDS, and the recording of G1 as an ADR; the legacy-migration reconciliation path; and the Tier 2 corrections in §5.5–§5.6.

---

## 8. New Development Rules

**No new development rule was created.** Development from this point forward follows the existing, already-accepted governance without modification:

- Feature First architecture; scope discipline; the Definition of Done (`development-rules.md`, in particular §1, §2, §6, §7).
- The four-tier documentation model and the six-field document header (`ADR-0002`).
- The mode contract for AI contributors — `examine` / `design` / `implement` — under `prompts/master.md`.
- The Sprint 3 sequence as specified in `sprints/sprint-03-players.md` and executed per `sprints/sprint-03-execution-runbook.md`.

**INFERENCE:** the recovery did not change the project's direction. It restored consistency between the documented direction and the repository's recorded state. A future reader expecting a methodology change will not find one; the change was to state, not to strategy.

Four implementation-stage cautions were identified during design review and are recorded so they are applied when the corresponding code is written (they are cautions for unwritten code, not defects in existing code): fixing `search_path` on any `SECURITY DEFINER` function; keeping tenant provisioning off the request hot path and out of the shell's blocking render; mapping database errors to owned codes before they cross to the client; and not duplicating a startup-time authorization exception that the transactional provisioning function already makes unnecessary. These are traceable to the design review in the project history and to `sds.md §5.6`.

---

## 9. Remaining Work

Ordered; none is architectural.

1. **Commit and push the corpus** (§5.1). Precondition for a clean branch.
2. **Clear the S3.0 gate** (Product Owner): approve F2; answer DM-013/14/15 on which F2 approval is gated (`data-model.md:560`); record G1 as an ADR; approve DBDS Part II and Part IV.
3. **Reconcile the legacy migration** (§5.2): confirm the legacy tables are empty (requires privileged access — currently **INSUFFICIENT EVIDENCE**), determine whether the application was recorded in migration history, choose and record the reconciliation path, and obtain approval to retire `0001_atlas_core.sql`.
4. **Enable a migration-application path.** The Supabase CLI is not installed and the project is not linked; a path (CLI + link, or the dashboard SQL editor) requires Product Owner credentials.
5. **Apply the two remaining documentation/code corrections** (§5.5 `product-architecture.md:622`; §5.6 residue and metadata) at their next permitted amendment.

---

## 10. Recovery Exit Criteria

Objective, measurable conditions. The recovery is complete when all hold.

| # | Criterion | Measurement |
|---|---|---|
| E1 | Corpus committed and pushed | `git status --porcelain` returns 0 entries for `docs/`; `origin/main` contains the corpus |
| E2 | S3.0 gate green | `roadmap.md` shows F2 *Approved*, DBDS *Approved (Part II+IV)*, G1 *Approved*; an ADR resolving G1 exists in `docs/decisions/` |
| E3 | Legacy migration reconciled | `supabase/migrations/` no longer contains a `0001` file contradicting the domain model; the reconciliation path is recorded; a live probe of the legacy table names returns `PGRST205` (absent) or the tables are documented as intentionally retained |
| E4 | Migration path available | A documented, working mechanism exists to apply a migration to the target database |
| E5 | No known live contradiction | The positioning residue (`tech-stack.md:68`) and the stale note (`product-architecture.md:622`) are corrected or explicitly deferred with a recorded reason |

**Note on E2/E3:** these are Product Owner and credentialed actions; they are outside what an AI contributor can complete unaided (**VERIFIED** — approvals require the owner; database access requires credentials).

---

## 11. Appendix

### Timeline (VERIFIED — `git log`, ADR dates, report date)

| Date | Event |
|---|---|
| 2026-07-29 | Initial commit; project and product foundation (commits `9fa999e`, `499b2a9`, `a8b5d47`) |
| 2026-08-01 | Registration flow (`39c74fb`) |
| 2026-08-02 | Intelligence Core v1; Sprint 1 authentication; ADR-0001 (`67e93be`, `03f10ac`, `4ca0d8b`; `ADR-0001` dated 2026-08-02) |
| 2026-08-03 | Documentation governance and reorganization; ADR-0002 (`57ccbe6`; `ADR-0002` dated 2026-08-03) — **Phase A** |
| 2026-08-04 → 08-05 | Corpus completion (SDS §5.6, runbook, developer guide, traceability matrix), gate/glossary/roadmap corrections, and the independent audit — **Phase B** — recorded in the working tree, **uncommitted** |

### Major findings (severity from the audit)

- 🔴 Corpus uncommitted (§5.1)
- 🔴 Legacy migration applied and contradictory (§5.2)
- 🟠 No mechanical verification; DM-020 open
- 🟠 S3.0 approval gate red
- 🟡 Positioning residue and code metadata (§5.6)
- 🟡 Documentation-to-code inversion (declared risk, `ADR-0001:86`)

### Related ADRs

- [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) — Intelligence Core frozen (2026-08-02)
- [`ADR-0002`](../decisions/ADR-0002-documentation-governance.md) — Documentation governance and structure (2026-08-03)
- ADR resolving G1 (memory governance) — **required by G1's completion criterion, does not yet exist**

### Documents referenced

`README.md` · `docs/README.md` · `manifesto.md` · `product-principles.md` · `development-rules.md` · `reasoning-model.md` · `memory-governance.md` · `product-architecture.md` · `data-model.md` · `sds.md` · `dbds.md` · `tech-stack.md` · `glossary.md` · `developer-guide.md` · `ux-principles.md` · `roadmap.md` · `open-decisions.md` · `sprints/sprint-03-players.md` · `sprints/sprint-03-execution-runbook.md` · `traceability-matrix.md` · `prompts/master.md` · `supabase/migrations/0001_atlas_core.sql`

### Audit metadata

- **Audit specification:** ATLAS — Independent Technical Audit (v1.0)
- **Audit date:** 2026-08-05
- **Repository revision audited:** HEAD `57ccbe6` plus uncommitted working-tree changes
- **Verification method:** repository inspection (`git`, file reads, link scan) and one read-only probe of the live database using the public anonymous key already present in `app/.env.local`. No write, no migration, and no privileged access was performed.
- **Unresolved evidentiary gap:** row counts of the applied legacy tables — **INSUFFICIENT EVIDENCE** without privileged database access.

---

_This record documents a past stabilization effort. It owns no rule and changes no decision. It is updated only to correct a factual error or to record the completion of a recovery exit criterion._
