# Atlas Architectural Roadmap

> **Status:** Foundational — the real state of construction.
> **Nature:** architectural, not commercial. It tracks what is **built**, what **blocks** what, and what "finished" means for each phase. It contains no dates, no pricing, and no market commitments.
> **Why this exists:** [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) sequences work as Domain Model → Data Model → SDS → Implementation, and [`development-rules.md`](../constitution/development-rules.md) §5 defines the sprint cycle. Neither records where the work actually stands.
> **The rule:** this document reflects reality, including where reality is uncomfortable. A phase is *Complete* only when its completion criterion is objectively met.
> **Owns:** the state of every phase and sprint, the dependency graph between them, what blocks what, and the debt each phase carried forward.
> **Inherits:** [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) for phase sequencing · [`development-rules.md`](../constitution/development-rules.md) §5 for the sprint cycle.
> **Does not own:** what a sprint specified (its own file in [`sprints/`](sprints/)) · dates, pricing, or commercial commitments.
> **Amendment:** updated at the end of every phase.

---

## State at a glance

| Phase | Deliverable | State |
|---|---|---|
| **F0** | Intelligence Core | ✅ **Frozen** — ADR-0001 |
| **F1** | Domain Model | ✅ **Approved** |
| **S1** | Authentication | ✅ **Complete** |
| **S2** | Application Shell | ✅ **Complete** |
| **D1** | Documentation foundation and governance | ✅ **Complete** — ADR-0002 |
| **F2** | Data Model | ✅ **Approved** — 2026-08-05, by explicit Product Owner decision on the F2 Final Audit; prerequisites (G1, DM-013/14/15) met; DM-016/017A/019/022 deliberately deferred |
| **DM** | Open architectural decisions | 🟡 **Five open** — DM-016 · DM-017A · DM-019 · DM-020 · DM-022 *(DM-013/14/15 resolved 2026-08-05)* |
| **G1** | Memory governance | ✅ **Resolved** — [`memory-governance.md`](../constitution/memory-governance.md) accepted as Tier 1 policy by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md) (2026-08-05); `memory-model.md` Open Question 1 closed |
| **F3** | Software Design Specification · Database Design Specification | 🚧 **In progress** — [`sds.md`](../architecture/sds.md) written, **not approved**; [`dbds.md`](../architecture/dbds.md) written, **Part II + Part IV C3-scoped-approved (2026-08-05)**, full DBDS closure still pending (Part VIII decisions) |
| **S3** | Players | 🟢 **Gate green, not started** — the five S3.0 start criteria (§7) are all met (2026-08-05); planned in [`sprints/sprint-03-players.md`](sprints/sprint-03-players.md) with an execution [`runbook`](sprints/sprint-03-execution-runbook.md). Migration 0001 (S3.1) has not begun |
| **S4+** | Media · Perception · Analysis · Objectives · Training · Library · Assistant | ⬜ Sequenced below |

**The S3.0 entry gate is now GREEN (5/5, 2026-08-05): F2 approved, G1 resolved, DBDS Part II+IV C3-approved, legacy migration reconciled (archived), bootstrap specified.** Migration 0001 (S3.1) has not begun. The remaining downstream items are a migration-application path (CLI/link or dashboard, credentials) for when S3.1 runs, and the five open decisions where they bite in later sprints. *(DM-013/14/15 were resolved 2026-08-05.)*

---

## Dependency graph

```
F0 Intelligence Core  ✅ frozen
        │
        ▼
F1 Domain Model  ✅
        │
        ├──────────────▶ S1 Authentication  ✅
        │                        │
        │                        ▼
        │                S2 Application Shell  ✅
        │
        ├──────────────▶ D1 Documentation governance  ✅  (ADR-0002)
        │
        ▼
F2 Data Model  ✅ approved
        │
        │  ┌── G1 Memory governance  ✅ resolved (ADR-0003)
        │  │
        ▼  ▼
F3 Software Design Specification  🚧 sds.md written
        │
        ▼
   Database Design Specification  🚧 Part II + IV C3-approved · full closure pending
        │                            the physical blueprint; inherits the SDS,
        │                            not a new phase (ADR-0001 unchanged)
        ▼
S3 Players  🔒  planned: sprint-03-players.md + execution runbook
        │
        ▼
S4 Media ──▶ S5 Perception ──▶ S6 Analysis
                                    │
                                    ▼
                          S7 Objectives ──▶ S8 Training
                                    │
                          S9 Library ──▶ S10 Assistant
```

---

# Completed

## F0 · Intelligence Core — ✅ Frozen

**Objective.** Settle how Atlas thinks, reasons, prioritizes, trains and remembers *before* implementation, so construction is a bounded problem rather than an open-ended design one.

**Result.** Nine documents constituting the conceptual architecture, frozen by ADR-0001 with declared precedence and non-overlapping ownership.

**Completion criterion — met.** Internally consistent, four critical blockers resolved, changes only by ADR.

**Carried forward.** 36 recorded open architectural questions. Known and bounded, not defects concealed by the freeze. Three of them are load-bearing for later phases: the **repetition threshold** for context becoming identity, the **decay rate** of stale memory, and **Player Memory portability** across clubs.

---

## F1 · Domain Model — ✅ Approved

**Objective.** Convert the frozen Core into entities, relationships, navigation and module structure.

**Result.** [`product-architecture.md`](../architecture/product-architecture.md). Established: the Player as root entity; account ≠ person; Goal / Priority / Objective as three distinct concepts; `Session` forbidden as a domain name; `Project` does not exist; coach-first with the club boundary modelled from day one; one Assistant rather than AI modules.

**Completion criterion — met.** Approved, and consistent with the Core and the Product Constitution.

**Decisions recorded.** Collective intelligence explicitly out of scope. The Dashboard answers one question. Evolution belongs to the player profile.

---

## S1 · Authentication — ✅ Complete

**Objective.** A production-ready authentication system.

**Dependencies.** None.

**Result.** Cookie-based sessions via `@supabase/ssr`; server-side route guards in `proxy.ts`; full password recovery; PKCE email callback; environment validation; safe redirect handling; 15 mapped error codes.

**Completion criterion — met.** Lint and build green; all auth routes functional; server-side protection verified.

**Debt carried.** Supabase dashboard configuration (redirect URLs, email templates) is a manual step, documented but outside version control.

---

## S2 · Application Shell — ✅ Complete

**Objective.** The persistent structure every future feature renders inside, so no feature has to invent where it lives, how it is navigated to, or what it looks like.

**Dependencies.** S1 · F1.

**Result.** Single persistent layout; navigation registry as single source of truth; seven sidebar destinations; derived breadcrumbs; five UI primitives; shared placeholder and empty-state; Dashboard on simulated data behind a service boundary; mobile drawer. Exactly four client components.

**Completion criterion — met.** Lint and build green; zero broken links; no component imports the mock; simulated data visibly labelled.

**Risks realized.** One: passing icon component references across the server/client boundary. Caught by build, fixed.

**Debt carried.** Responsive behaviour, focus trapping and touch targets were **not visually verified**. The mobile drawer relies on Base UI's modal dialog for that behaviour but this has not been confirmed in a browser.

---

# In progress

## D1 · Documentation foundation and governance — ✅ Complete

**Objective.** Reduce documentation debt and leave a single source of truth per topic, so a new contributor can understand Atlas from `docs/foundation/` alone and every document declares what it takes to change it.

**Dependencies.** F1 ✅.

**Result.** Five foundation documents (principles, glossary, decision framework, UX principles, roadmap). A full audit of the corpus. Reorganisation from topic folders to **change-policy folders** — `constitution/`, `architecture/`, `foundation/`, `decisions/`, `work/` — with four governance tiers, recorded in [`ADR-0002`](../decisions/ADR-0002-documentation-governance.md). Two artifacts that existed only in conversation were persisted: the Data Model and the Sprint 2 specification.

**Completion criterion — met.** Zero broken links across the repository · zero empty directories · every derived document declares `Owns` / `Inherits` / `Does not own` · every concept has exactly one owning document · git history preserved on all 14 tracked moves.

**Contradictions resolved.** Three, all originating from a superseded copy of the tech stack: the UI primitive library (Radix vs Base UI), the authentication implementation status (described as pending after Sprint 1 delivered it), and the product positioning ("AI employee platform" vs "coaching intelligence platform").

**Debt carried.** One ownership overlap remains and is deliberately unresolved: Dashboard scope is defined in `product-principles.md` §6 (Tier 1) and narrowed in `product-architecture.md` §1.3 (Tier 2). They do not contradict each other, but a Tier 2 document narrowing a Tier 1 one without declaring it is an ambiguity awaiting a decision.

---

## F2 · Data Model — ✅ Approved

**Objective.** Define what Atlas persists, under whose ownership, with what lifecycle, and what it must never store — before a single table exists.

**Document.** [`architecture/data-model.md`](../architecture/data-model.md).

**Dependencies.** F1 ✅ · Core ✅.

**Held.** Four data classes (Fact · Interpretation · Decision · Context) with lifecycle determined by class; mandatory provenance; Assistant Context established as **never persisted**; versioned metric definitions; the global never-persist list. The framework of Part I survived a full adversarial audit unchanged.

**Redesigned.** A domain audit found three entities with the wrong responsibility, one Core concept absent, and the reserved-names table contradicted in two of its four rows. Thirteen decisions were approved and the document was rebuilt against them: `Observation` restored; `Priority` relocated from the analysis to the player; the declaration replaced the per-occasion container; `Workspace`, `SessionContext`, `HistoricalRecord`, `CoachIdentity` and `PlayerIdentity` withdrawn; the subject invariant widened to the four identity subjects. Four amendments to [`product-architecture.md`](../architecture/product-architecture.md) followed and are recorded in its Amendment line.

**Completion criterion — met.** Approved and **G1 resolved**. G1 was resolved by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md) on 2026-08-05, and the three Part VII prerequisites DM-013/14/15 were answered the same day (recorded in `data-model.md`). **The Product Owner approved F2 on 2026-08-05** on the basis of the F2 Final Audit; the document is now *Approved* and is the contractual Data Model base. DM-016/017A/019/022 were deliberately deferred and remain Open.

**Risks.** The largest is that ownership boundaries and metric versioning are nearly free before the first row and nearly impossible after. Getting either wrong means migrating live data about real people.

---

## G1 · Memory governance — ✅ Resolved

**Objective.** Decide what may be remembered, for how long, and under whose consent.

**Document.** [`memory-governance.md`](../constitution/memory-governance.md) — a Tier 1 constitution policy answering all five questions below. **Accepted 2026-08-05 by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md)**, which adopts it as it stands and formally closes `memory-model.md` Open Question 1. It no longer blocks downstream work.

**Dependencies.** None. It is a policy decision, not a technical one — which is why nothing unblocks it except making it.

**Why it blocked (historical).** `memory-model.md` Open Question 1 and ADR-0001 both recorded this as owed and **deliberately excluded** from the Intelligence Core. It blocked S3 — S3 creates the first persistent record of a person, frequently **a minor** — until it was resolved by ADR-0003.

**Five questions.**

1. What may be remembered about a minor, and for how long?
2. Who consents — player, guardian, club — and how is it recorded?
3. Which parts of Player Memory travel with the player when they change club?
4. How much superseded-interpretation history is retained? *(Currently unbounded)*
5. What exactly does directed forgetting mean: withdrawal from the subject, deletion of the fact, or both?

**Completion criterion — met.** A Governance document answering all five, recorded as an ADR — `memory-governance.md`, recorded by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md).

---

## DM · Open architectural decisions — 🟡 Five open

**Register.** [`open-decisions.md`](open-decisions.md).

**State.** DM-001 … DM-012 approved, plus **DM-021** (the SDS covers the whole product), **DM-023** (`Profile` withdrawn), **DM-018** (the athlete is `Player` the person plus `RosterMembership` the club relationship; the former DM-017B is absorbed), **DM-025** (the `RecordingAssertion` structure), and — on **2026-08-05** — the three Part VII decisions **DM-013** (`Training : TrainingSession` = 1:1), **DM-014** (minimal authority model persisted on `Declaration`), and **DM-015** (`LibraryConcept`/`Exercise` a curated family outside the four classes). Each is recorded in the document it changed (`data-model.md`, reflected in `dbds.md`/`sds.md`). **DM-016, DM-017A, DM-019, DM-020 and DM-022 remain open.** DM-016 moves a boundary in the Aggregate Map; DM-020 gates SDS §9. The former DM-026 and DM-027 were withdrawn as non-architectural — the provisioning mechanism is now specified in `sds.md` §5.6 and the display-name source a Sprint 3 implementation note.

**Dependencies.** None. Each is a decision, not work.

**Completion criterion.** The register is empty, or every remaining entry is a deliberate deferral recorded as such — the form DM-007 took.

**Why it is tracked here.** Seven decisions gating the SDS existed only in conversation. That is the failure ADR-0002 was written to end, and it recurred within weeks of the ADR being accepted.

---

## F3 · Software Design Specification — 🚧 In progress

**Objective.** The technical design realizing the Domain and Data models: schema, access policies, storage, processing pipeline, service boundaries.

**Dependencies.** F2 approved · G1 resolved. Sections may be written before those land; neither document can close until they do.

**Written, not approved.** Both documents now exist; each declares its own state and this roadmap does not restate it.

| Document | State |
|---|---|
| [`sds.md`](../architecture/sds.md) — the contract between the approved architecture and the implementation | **Written.** Ten sections; by its own status line, *six complete, three blocked in part by open decisions*. Scope fixed by **DM-021**: it describes the complete product, and sprints consume it. §5.6 (the tenancy-bootstrap provisioning mechanism) is **specified**, closing the last specification gap. **Not approved** |
| [`dbds.md`](../architecture/dbds.md) — the physical blueprint | **Written. Part II (seven startup structures) + Part IV (access model) C3-scoped-approved 2026-08-05**, with DM-017A's Group/Session extension explicitly deferred. **Full DBDS closure still pending** — Part I/III/V/VI and the Part VIII decisions are outside the C3 approval |

The Aggregate Map and the Persistence Model, previously tracked here as prepared-but-unwritten, are **§2 and §3 of the SDS** — sections of this phase, not phases of their own. The DBDS likewise inherits the SDS rather than succeeding it. **ADR-0001 is unchanged** and its four-phase sequence stands.

**Completion criterion.** A developer can implement S3 without making architectural decisions.

**Risk — realized and retired.** The recorded risk was *skipping the SDS*. It was not skipped: both documents exist and Sprint 3 is planned entirely by reference to them. The live risk is now **approval**, not authorship — the documents cannot close before F2 and G1 land.

---

## Implementation support — ✅ In place

Not a phase. Three artifacts written to carry the implementation, recorded here because their existence is state. Each declares its own ownership; this roadmap does not restate any of them, and the reading order is declared only in [`docs/README.md`](../README.md).

| Artifact | Tier | Carries |
|---|---|---|
| [`foundation/developer-guide.md`](../foundation/developer-guide.md) | 3 | The bridge from the frozen architecture to code in `app/` — codebase anatomy, which client and pattern to use where, the invariants every change must honour, and the map from a task to the document governing it. Sprint-agnostic |
| [`sprints/sprint-03-execution-runbook.md`](sprints/sprint-03-execution-runbook.md) | 4 | The step-by-step execution of Migration 0001 through Sprint 3 close, in six phases |
| [`traceability-matrix.md`](traceability-matrix.md) | 4 | Where each architectural element lands in execution and whether it is done — invariants, the seven startup structures, approved and open decisions, and the story ↔ phase ↔ validation cross-index |

**Documentation support is closed.** No further support documents are planned; the next artifacts produced by this project are code and migrations.

---

# Planned

## S3 · Players

**Objective.** The roster and the player profile — the first persistent domain data.

**Dependencies.** F2 · G1 · F3.

**Expected result.** Roster with search; player profile with tabs; the player switcher in the header's reserved context region; account ↔ person linking; the first real access-policy enforcement.

**Completion criterion.** A coach can create a player, find them fast, and open a profile that is the coherent home for their history. Ownership boundaries enforced at the data layer, not the UI.

**Risks.** *Evolution has nothing to plot* — the profile's progress tab depends on measurements that do not exist until S6. Ship the profile with an honest empty state rather than inventing data.

**Prepared by S2.** Navigation entry flips from `planned` to `live`; page primitives exist; the service-boundary pattern is established; the header context region is waiting.

**Gate green, not started.** Two work documents exist and this roadmap does not restate them: [`sprints/sprint-03-players.md`](sprints/sprint-03-players.md) holds the stories, their order and their acceptance criteria, and fixes in §7 the five criteria that must hold before Migration 0001 may begin; [`sprints/sprint-03-execution-runbook.md`](sprints/sprint-03-execution-runbook.md) sequences the execution in six phases. **All five S3.0 criteria are met (2026-08-05):** F2 approved, G1 resolved, DBDS Part II+IV C3-approved, legacy migration reconciled (archived to `supabase/legacy/`), bootstrap specified. Migration 0001 (S3.1) has not begun.

---

## S4 · Media

**Objective.** Getting footage in, effortlessly, from courtside.

**Dependencies.** S3 · F3.

**Expected result.** Upload; storage; the `uploaded → processing → ready → failed` state machine; playback; assignment to a player.

**Completion criterion.** Upload works from a phone at the table, tolerates interruption, and never leaves a video in an unknown state.

**Risks.** Asynchrony must be real from the first version. Retrofitting it touches UI, state, notifications and data model simultaneously. **This is the sprint where that is decided permanently.**

---

## S5 · Perception

**Objective.** Video → canonical measurements.

**Dependencies.** S4 · the canonical metric set.

**Expected result.** A pipeline producing versioned measurements against documented definitions.

**Completion criterion.** Every measurement traces to a metric definition with a stated computation. Re-running an improved model over historical video produces comparable results.

**Risks.** The **canonical metric set is an open question** and cannot be deferred past the first measurement stored. Also: a vision pipeline naturally produces person-identifying embeddings — these are **forbidden**, and that must be enforced at the pipeline, not discovered later.

---

## S6 · Analysis

**Objective.** Measurements → findings → priorities.

**Dependencies.** S5 · S9 Library (for the concept graph findings resolve against).

**Expected result.** The analysis report — findings with evidence and confidence, priorities with reasoning, and **stated deferrals**.

**Completion criterion.** Every finding reaches back to the footage that produced it in one action. The Dashboard's simulated service is replaced and its sample-data notice removed.

**Risks.** The shape of `AttentionItem` was fixed in S2 against the Priority Engine's documented output. If real output differs, the contained damage is one file — by design.

---

## S7 · Objectives · S8 · Training

**Objective.** The two human gates and everything below them.

**Dependencies.** S6.

**Expected result.** Accepting a priority into an objective; plans with progression indicators and re-evaluation moments set in advance; training proposals the coach accepts, modifies or rejects — **with the original proposal retained alongside the modification**.

**Completion criterion.** Both gates are real: nothing proceeds automatically past either. Overrides are recorded.

**Risks.** Storing only the final version of a modified proposal destroys the only signal from which Coach DNA is learned.

---

## S9 · Library

**Objective.** Persist the knowledge graph.

**Dependencies.** F3.

**Expected result.** Concepts under the ten-attribute schema; the eight typed relationships; browsable and quick to consult mid-session.

**Completion criterion.** The graph is traversable in any direction, and cross-domain relationships work — following a technical symptom to a physical cause is the reasoning that makes Atlas useful.

**Risks.** Modelling concepts as a hierarchy instead of a graph would make diagnostic reasoning impossible. Also: **seeding it is a content problem, not an engineering one**, and is easy to underestimate.

---

## S10 · Assistant

**Objective.** One intelligence with global player context.

**Dependencies.** S6 · S9 · Memory.

**Expected result.** Conversation anchored to a player; one context assembly serving every surface; persisted context references so a recommendation stays explainable later.

**Completion criterion.** The Assistant gives the same answer in chat as the analysis report gives that morning, because both read the same memory. Assembled context is **not** persisted.

**Risks.** Building it as a separate feature with its own context. Users detect the seam immediately, and it contradicts the Domain Model.

---

# After the MVP

Recorded so they are not rediscovered as surprises.

| Version | Work | Note |
|---|---|---|
| v1.1 | Club UI, groups, invitations | Boundary already modelled; only the interface waits |
| v1.1 | Notifications | Depends on the media state machine |
| v1.2 | Guardian visibility | Authority model already settled |
| v1.2 | Competitions · Equipment advisor | |
| v1.3 | Exportable reports · Billing | |
| v2.0 | Player mode | **Reactivates heightened conservatism** — the Core's weakest safety configuration returns |
| v2.0 | Native capture · Live analysis | |
| — | Collective intelligence | **Out of scope. Requires an ADR amending `memory-model.md` §5** |

---

## How to update this document

At the end of every phase:

1. Move the phase to its section and set the state honestly. A phase with unverified criteria is **not** Complete.
2. Record **risks realized**, not just risks anticipated — that is where the learning is.
3. Record **debt carried** explicitly. Debt that is not written down is debt that is not paid.
4. Re-check the dependency graph. A newly discovered blocker belongs here the day it is found, not the day it stops the work.

---

_This document records the real state of Atlas construction. It changes at the end of every phase, and it reflects reality including where reality is uncomfortable._
