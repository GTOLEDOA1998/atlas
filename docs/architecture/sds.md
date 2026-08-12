# Atlas Software Design Specification

> **Status:** Under construction. Six sections complete, three blocked in part by open decisions. **Not approved.** G1 is resolved (ADR-0003); the SDS cannot close before F2 is approved.
> **Owns:** everything a developer needs to implement Atlas that no approved document already states — consistency boundaries, persistence behaviour, data structure, access control, media and asynchrony, the perception and intelligence contracts, and how the architecture's invariants are enforced.
> **Inherits:** the Intelligence Core, frozen by [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) · the Product Constitution · [`product-architecture.md`](product-architecture.md) · [`data-model.md`](data-model.md) · [`tech-stack.md`](tech-stack.md) · [`development-rules.md`](../constitution/development-rules.md).
> **Does not own:** what Atlas is, how it thinks, what entities exist, how code is styled, or where the work stands. Each has an owning document and §1 names it.
> **Precedence:** every document above wins over this one. Where the SDS appears to contradict any of them, the SDS is defective.
> **Amendment:** explicit Product Owner approval. **Scope fixed by DM-021: the SDS describes the complete product. Sprints consume it; it is not written per sprint.**
> **Amended 2026-08-04** by **DM-018**: the athlete is `Player` the person (crosses clubs) plus `RosterMembership` the club relationship; §2 gains a nineteenth root, `Assignment` lives inside `RosterMembership`, and the subject-scoped access regime is settled. **DM-023** removed `Profile`. DM-017B absorbed by DM-018; DM-017A remains open. **DM-025** resolves §5.6's persistence question: the Recording Authority assertion is a dedicated tenant-scoped `RecordingAssertion` structure (`data-model.md` §2.4b).
> **Phase:** Software Design Specification — step 3 of the sequence set by ADR-0001. The Aggregate Map (§2) and the Persistence Model (§3) are sections of this phase, not phases of their own.

---

# §1 · Inheritance and non-duplication

## The rule

> **A section of this document exists only if it owns knowledge no approved document owns. If it restates one, the section is the defect.**

This is why the SDS opens with an index rather than an introduction. Everything below is already decided and is **not repeated here**.

| To know | Read | Not the SDS because |
|---|---|---|
| Why Atlas exists | [`manifesto.md`](../constitution/manifesto.md) | Mission |
| What Atlas is as a product | [`product-principles.md`](../constitution/product-principles.md) | Product constitution |
| How Atlas thinks, reasons, prioritises, trains, remembers | [`intelligence-core/`](../constitution/intelligence-core/README.md) | Frozen by ADR-0001 |
| What entities exist and what is never persisted | [`data-model.md`](data-model.md) | Domain, not design |
| Domain structure, navigation, modules, layers | [`product-architecture.md`](product-architecture.md) | Domain model |
| Which technologies are used | [`tech-stack.md`](tech-stack.md) | Fixed unless approved |
| How code is written, reviewed, committed | [`development-rules.md`](../constitution/development-rules.md) | Development constitution |
| Where the work stands | [`roadmap.md`](../work/roadmap.md) | Work record |
| Which decisions are still open | [`open-decisions.md`](../work/open-decisions.md) | Living register |

## What the SDS deliberately does not contain

**No DDL, no column lists, no index design.** §4 fixes structure, identity, constraints and integrity rules — the decisions. Their translation into schema is the migration artifact, and it is implementation.

**No module-by-module public contracts.** Specifying the surfaces of thirteen modules before their consumers exist is the speculative flexibility `development-rules.md` §1 forbids. What is genuinely needed — that the layer dependency rule be checkable — lives in §9.

**No restatement of any anti-goal, principle or invariant.** They are cited where they bind and never reproduced.

---

# §2 · Aggregate Map

*The consistency boundaries of the domain.*

## 2.1 Where the boundaries come from

Atlas already has a system that determines consistency boundaries: **the four data classes.** The class fixes regenerability, and regenerability is what a consistency boundary protects. Five rules follow, and every boundary below is justified by one of them.

**R1 — A Fact and the Interpretation derived from it never share a boundary.** An interpretation regenerates *entirely*; a fact is never rewritten.

**R2 — A Decision never shares a boundary with the Interpretation that justified it.** The human boundary. Recomputing Atlas's judgement must not touch a person's authorship.

**R3 — Different ownership rules force different boundaries.** Player Memory follows the player between clubs while the club's record of the athlete stays with the club — two ownership rules that DM-018 resolved by splitting the athlete into `Player` (the person, crossing clubs) and `RosterMembership` (club-scoped).

**R4 — What can exist without X cannot live inside X.** A `Declaration` can exist with no occasion. A `Priority` outlives the analysis that raised it.

**R5 — What is regenerated as one unit is one unit.** An `Analysis` is superseded whole, with its observations, measurements and findings.

> **Corollary:** *Fact* and *Decision* **may** share a boundary — both are permanent and neither regenerates. That is why `RosterMembership + Assignment` works and `Player + IdentityMemory` does not.

## 2.2 The nineteen roots

| Root | Contains | Owner | Can exist alone |
|---|---|---|---|
| `Club` | `Membership` | itself | yes |
| `User` | — | itself | yes |
| `Player` (the person) | — | **itself — crosses clubs** (DM-018) | yes |
| `RosterMembership` (person-in-club) | `Assignment` | `Club` | **no** — requires a person and a club |
| `Group` | composition | `Club` | yes |
| `IdentityMemory` | supersession chain | **the subject**, not the club | yes |
| `Video` | state machine | `Club` | yes |
| `Analysis` | `Observation` · `Measurement` · `Finding` | `Club` | **no** — requires a video |
| `Priority` | state history · deferrals · alternatives | `Club` | yes |
| `Goal` | — | `Club` | yes |
| `Objective` | `Justification` | `Club` | yes |
| `Plan` | phases · progress indicators · re-evaluation moment | `Club` | ⚠️ DM-016 |
| `Training` | ordered exercise references | `Club` | yes |
| `TrainingSession` | attendance | `Club` | yes |
| `Declaration` | — | `Club` | yes |
| `MetricDefinition` | versions | **Atlas** | yes |
| `LibraryConcept` | `ConceptRelation` | **Atlas** | yes |
| `Exercise` | — | `Club` or coach · **never Atlas** | yes |
| `Conversation` | `Message` · `ContextReference` | `Club` | yes |

## 2.3 The boundaries that are not obvious

**`IdentityMemory` outside its subject — the most important boundary in the map.** Two independent rules force it. By **R1**, if it lived inside `Player`, directed forgetting — which the Memory Model defines as *"re-deriving interpretation, not breaking the model"* — would have to rewrite the player's aggregate. By **R3**, Player Memory follows the player across clubs while the `Player` record belongs to a club, and Coach Memory does **not** transfer to a successor while the `User` does. Three opposing ownership rules for one entity type make it impossible to house inside any subject.

**`Analysis` as an indivisible unit.** By **R5**. A half-written analysis is not a partial analysis; it is a false statement about what Atlas saw.

**`Priority` outside `Analysis`.** By **R4** and DM-005a. A priority moves for reasons that produce no analysis — a coach's decision, an approaching competition, a change in readiness, a periodic review.

**`Objective` outside `Priority`.** By **R2**. This is the boundary DM-005b protects: the justification is frozen at acceptance *precisely because* the boundary is crossed here.

**`Declaration` outside `TrainingSession`.** By **R4**, the cleanest case in the map: DM-001 established that a declaration can exist without an occasion — a guardian telephoning. **What can exist without the session cannot live inside it.**

**`ConceptRelation` inside `LibraryConcept`.** An edge does not exist without its source, and the Core versions *concepts* — a relation is part of a concept's definition and versions with it. **Declared cost:** reverse traversal crosses aggregates, and the Core requires the graph be traversable in any direction. That cost is paid in §4.

## 2.4 References by identity, never by composition

```
Membership ──▶ User             a user exists in several clubs
Assignment ──▶ User             the coach does not belong to the player
Video      ──▶ User (author) · Player (subject)     two distinct people
Analysis   ──▶ Video · MetricDefinition · LibraryConcept
Priority   ──▶ Player · Analysis (N:M) · Priority (deferred, alternatives)
Objective  ──▶ Priority · identity subject
Plan       ──▶ Objective
Training   ──▶ Plan · Exercise (ordered)
TrainingSession ──▶ Training · Player · Video · Declaration
Declaration──▶ subject · declarer · 0:1 TrainingSession
IdentityMemory  ──▶ subject
ContextReference──▶ Analysis · IdentityMemory · LibraryConcept
```

Two rules bind every one of them: references toward a fact must be **enumerable in reverse**, because directed forgetting requires enumerating dependent interpretations rather than orphaning them; and a reference whose target was removed must **degrade honestly** — *"this rested on material that no longer exists"* — never fake grounding and never fall silent.

## 2.5 Atomic writes

| Written atomically | If split |
|---|---|
| `Analysis` + all its observations, measurements, findings | A partial analysis claims Atlas saw less than it saw |
| `Objective` + its `Justification` | An accepted objective exists momentarily without its reasoning |
| `Priority` + the record of its state change | A priority changes with no reason recorded |
| `Declaration` + declarer and authority | An unattributed declaration cannot express a conflict |
| `Training` proposal **and** the coach's modification | The only signal from which Coach DNA is formed is destroyed |

**Deliberately not atomic:** an `Analysis` and the priorities it moves. They cross the R1 boundary and are eventually consistent — which is what lets a coach's override move a priority with no analysis at all.

**`Assignment` lives inside `RosterMembership`** (DM-018): training authority exists within the athlete's relationship with a club and ends with it. What remains of the former DM-017 is **DM-017A** only — whether an assignment may *also* target a group or a session.

**Blocked:** the boundaries of `Plan` (DM-016). *(The `TrainingSession` boundary is unblocked: DM-013 fixed `Training : TrainingSession` at `1:1`, so `TrainingSession` references exactly one `Training` — root-vs-contained is now a physical choice, not a domain question.)*

---

# §3 · Persistence Model

*The persistence behaviour the domain requires.*

## 3.1 Five behaviours

| Behaviour | Meaning | Class |
|---|---|---|
| **Append-only** | Written, never modified; the series grows | *Fact* |
| **Immutable-on-commit** | Written once at a human decision point | *Decision* |
| **Superseding** | A current version plus retained priors | *Interpretation* |
| **Stateful** | A living record whose state changes, **always with the reason recorded** | State machines |
| **Curated** | Deliberately authored and versioned over years | Knowledge/practice — a family **outside the four data classes** (DM-015) |

## 3.2 One deletion mechanism

`memory-model.md` §7 defines five forgetting mechanisms. **Four delete nothing:**

| Mechanism | What it actually does |
|---|---|
| **Expiry** | Ceases to be current. **Retained** — this is what lets Atlas notice fatigue declared six sessions running |
| **Supersession** | A newer human declaration replaces it. The prior remains |
| **Decay** | Loses present-tense authority. *"Age is not evidence of continued truth."* Not deleted |
| **Correction** | Replaced, **and the correction itself is recorded** |
| **Directed forgetting** | **The only real deletion. Always human-initiated** |

> **No automatic process deletes anything, ever.** And directed forgetting is not a delete cascade but a **re-derivation cascade**: the fact is removed and what rested on it is recomputed. Its execution design is blocked by **G1**.

## 3.3 Behaviour by root

| Root | Strategy · Identity | Update | Delete | Version |
|---|---|---|---|---|
| `Club` | Append-only + slow attributes · permanent | attributes, memberships | never while owning records | no |
| `User` | Append-only + mutable profile · **permanent across all club changes** | profile | closure ≠ deletion of authored records | no |
| `Player` (person) | Append-only · **crosses clubs** (DM-018) | intrinsic attributes only | **never except directed forgetting** | no — its interpretation, yes |
| `RosterMembership` | Append-only · club-scoped | status only | **never — retained with the club on transfer** | no |
| `Group` | Append-only + mutable composition | composition | dissolution ≠ deletion | no |
| `IdentityMemory` | **Superseding** · per subject | refined or replaced, **prior retained** | only via directed forgetting → re-derivation | supersession chain + formation date + occasion count |
| `Video` | Append-only + bounded state machine | state transitions only | directed forgetting, **enumerating dependents first** | no |
| `Analysis` | **Superseding, fully regenerable** | **never in place** | superseded ones retained — **volume unbounded** | **mandatory:** perception model **and** metric definition version |
| `Priority` | **Stateful** · permanent, outlives its analyses | state changes, **each with its reason** | closed, not deleted | not versioned; its history is the transitions |
| `Goal` | Immutable-on-commit | **none.** A changed goal is a new goal | retired | no |
| `Objective` | Immutable content + bounded outcome state | outcome only | abandoned, not deleted | no — *"an objective that changes is a new objective"* |
| `Plan` | Immutable-on-approval | indicators fixed **in advance** | replaced | no |
| `Training` | **Two immutable records**: proposal and modification | none — modification is a second record | rejected, not deleted | no |
| `TrainingSession` | Mutable before, **append-only after** | only before it occurs | never | no |
| `Declaration` | Immutable content + validity state | validity only | **never. Expiry is not deletion** | no |
| `MetricDefinition` | **Curated, versioned** | new version only | never while a measurement references it | **yes** |
| `LibraryConcept` | **Curated, versioned** | new version only | retired, never deleted | **yes** — refining must not silently invalidate analyses |
| `Exercise` | Curated by the tenant, versioned | new version only | retired | **yes**, by the same principle |
| `Conversation` | Strictly ordered append-only | additions only | directed forgetting only | no |

## 3.4 Concurrency and consistency

| Root | Concurrency | Consistency |
|---|---|---|
| `IdentityMemory` | single deriver; **must not race directed forgetting** | **eventual by design** — it is derived |
| `Analysis` | single writer per run; **two runs must not interleave** | **strong and atomic**: the whole analysis or nothing |
| `Priority` | **the hot spot** — see rule 2 below | eventual w.r.t. analysis · **immediate w.r.t. the coach** |
| `Declaration` | **medium and significant** — several declarers about one player | strong within; **fresh read mandatory** — rule 1 |
| `Video` | single writer (upload pipeline) | strong within |
| everything else | low | strong within, eventual across |

## 3.5 The three consistency rules the domain imposes

**1 · The safety read admits no lag.**

> **No design of training may read stale safety context.**

`current-session.md` §7: *"Declared conditions bind immediately. No accumulation of evidence is required before honouring an injury declaration."* This is not a transaction but a read requirement: `Declaration` is read at design time, never from a prior session's snapshot. And its corollary — **zero rows means *not declared*, never *not so*.** An empty read treated as "healthy" is a safety failure, not an optimisation.

**2 · The coach's decision wins without negotiation.**

If an analysis completes while a coach is overriding the same priority, there is no tie to break. *"The coach's decision governs immediately and without argument."* Concurrency resolves by authority, not by timestamp.

**3 · Conflicting declarations are both kept.**

`memory-model.md` §8: *"surface the contradiction; lower confidence in both; **never silently discard the inconvenient one**."* Two incompatible declarations both persist as current and are presented as a conflict. Last-write-wins would violate the Core. Which prevails is a recorded open question of the Core and **must not be closed by choosing the most recent**.

## 3.6 Domain events

| Aggregate | Events |
|---|---|
| `Club` | created · member admitted · role changed · member removed · dissolved |
| `Player` | created · assigned · attributes declared · account linked · **transferred** · archived · **forgetting directed** |
| `Video` | uploaded · processing started · ready · failed · re-analysed *(does not modify it)* |
| `Analysis` | requested · completed · failed · **superseded** |
| `Priority` | raised · **state changed, with reason** · deferred · closed · **coach override** |
| `Objective` | proposed · **accepted** · achieved · abandoned · replaced · **justification diverged from current interpretation** |
| `Training` | proposed · accepted · **modified by the coach** · rejected · executed · evaluated |
| `Declaration` | declared · expired · superseded · **promoted to identity** |
| `IdentityMemory` | formed · refined · superseded · **decayed** · re-derived |
| `MetricDefinition` | versioned · **history re-derived** |

Five are emphasised because they are **not notifications — they are learning signal.** The override, the training modification, the promotion, the decay and the justification divergence are inputs to reasoning.

## 3.7 Audit

In Atlas the trail is not for auditors. **It is the material from which Coach DNA is formed.**

Permanently retained: the source class of every memory (`observed` / `declared` / `reasoned`) · **the Recording Authority under which each subject's memory is held — who asserted it and when (`RecordingAssertion`, DM-025)** · the declarer and their authority on every declaration (DM-014, minimal scope) · that Atlas asserted X on date Y · the original proposal alongside the coach's modification · who accepted an objective, when, and its outcome · what every interpretation was derived from ⚠️ DM-022.

**Never audited:** judgment of a person as a professional. *"Memory is never used to grade a human."*

---

# §4 · Physical data design

*Scope fixed by DM-021: the complete product.*

## 4.1 What this section fixes, and what it does not

It fixes **structure, identity, constraints and integrity rules**. It does not write DDL, columns or indexes — those are the migration artifact and belong to implementation. The criterion is that a developer writing that migration makes **no architectural decision**.

## 4.2 Identity

Every aggregate root carries an **opaque, system-generated, permanent identity**. It is never derived from a natural key, because every natural candidate in this domain is mutable: a person's name changes, a club renames, an email moves.

**Two identities are not tenant-scoped:** `MetricDefinition` and `LibraryConcept` are product-owned and their identity is global.

**Player identity survives a transfer (DM-018).** `Player` is the person and is not club-scoped; a transfer opens a new `RosterMembership` and never mints a new person, so Player Memory follows the athlete as `memory-model.md` §5 requires. The person's identity is the stable anchor `memory-governance.md` §10 demands across a change of club.

## 4.3 Tenancy — the rule that binds every structure

> **Every record carries its owning `Club` from the first structure that exists.**

`data-model.md` §1.3: retrofitting means rewriting every policy and query against live production data. The two exceptions are `User`, which spans clubs, and the product-owned knowledge and metric definitions.

**`IdentityMemory` is the hard case.** It is scoped to its subject rather than to a club, because Player Memory follows the player. Its access rule is therefore not the general one, and §5 owns it. **Resolved by DM-018:** the subject is `Player` the person, which crosses clubs, so identity has a stable cross-club anchor to hang from.

## 4.4 Structural decisions already fixed

| Decision | Source |
|---|---|
| A `Player`'s account reference is **optional**. Most players never have one | `product-architecture.md` §2.1 — *"the decision with the widest blast radius"* |
| A `Video` carries **two distinct person references** — author and subject | §2.7. Collapsing them breaks permissions and attribution |
| An `Analysis` carries **two version references** — perception model and metric definition | Without both, the timeline lies |
| A `Measurement` references a definition **and its version**. Measurements from different definitions are never compared | `data-model.md` §2.12 |
| A `Priority` carries its full state history with a reason per transition, its deferral account and its alternatives | `priority-engine.md` Part VIII |
| An `Objective` carries a `Justification` frozen at acceptance, structurally independent of the priority that produced it | DM-005b |
| A `Declaration` carries its declarer and the authority under which it was made; the declarer may be a party without a `User` account, recorded minimally | `data-model.md` §1.2, §2.9 (DM-014, minimal scope) |
| Every interpretation carries provenance, confidence, formation date and occasion count | §1.2, §1.4 |
| A `Training` holds the proposal and the modification as **two records**, never one edited | `training-model.md` Part VIII |

## 4.5 Integrity — what must never cascade

> **Nothing cascades to deletion. Ever.**

This is the single most important integrity rule in Atlas and the one the repository has already violated once. Removing a person, a club or a video must not remove the record of a developing athlete. The only deletion is directed forgetting, and it is a **re-derivation cascade**: the fact is removed, its dependent interpretations are enumerated and recomputed, and what cannot be recomputed states that its grounding is gone.

**Referential rules:**

- A reference from an interpretation to a fact is **enumerable in reverse**, so directed forgetting can find its dependents.
- A reference from a decision to an interpretation **survives the interpretation's regeneration** — the justification is frozen, so the objective never dangles.
- A reference to a versioned product-owned record always carries the version, never just the identity.
- Archiving is a state, never a deletion. `Player`, `Group` and `Club` are archived or dissolved; their records remain.

## 4.6 Versioning mechanism

| Mechanism | Applies to |
|---|---|
| **Supersession chain** — a current record plus its ordered priors | `Analysis` · `IdentityMemory` |
| **Definition version** — an independent version identity referenced by consumers | `MetricDefinition` · `LibraryConcept` · `Exercise` |
| **State history** — no version, an ordered log of transitions with reasons | `Priority` |
| **None** — a change is a new record | `Goal` · `Objective` · `Plan` · `Training` |

## 4.7 Blocked

| Blocked point | By |
|---|---|
| Whether `Plan` is a structure of its own | **DM-016** |
| Whether an `Assignment` may also target a group or a session | **DM-017A** |
| The granularity of derivation tracking | **DM-022** *(new — §10)* |

## 4.8 Inherited risk

The legacy `0001_atlas_core.sql` (now archived — see below) is referenced by no document, enables no access control, and contradicts the domain model in four of its six tables — most gravely by requiring every player to hold an account.

> **This specification declares it superseded in full.** It is not evolved. Its identity strategy, its tenancy (absent), its cascade rules and its vocabulary all predate the approved domain model.
>
> **Reconciled (C4) — 2026-08-05.** Its applied state is now **established: not applied** — the Supabase `public` schema has 0 tables, none of the six legacy tables exists, and there is no applied migration history. By Product Owner authorisation the artifact was **archived** from `supabase/migrations/` to `supabase/legacy/0001_atlas_core.sql` (content unchanged), so no migration tool treats it as pending. No SQL was run and Supabase was not modified.

---

# §5 · Access control design

*The section of greatest consequence in this document.*

## 5.1 The governing rule

> **Default deny. A record is unreachable unless a policy authorises it, and enforcement is at the data layer — never in the interface.**

`tech-stack.md`: *"UI-level checks are convenience, not security."* `product-architecture.md` §7.3: the club boundary ships in v1.0 even though the club interface does not.

## 5.2 The authorisation chain

```
User ──▶ Membership ──▶ Club ──▶ every record scoped to that club
                                        │
Assignment ──────────────────────────▶ actions carrying training authority
```

**Membership grants visibility. Assignment grants authority.** They are different questions and must not be conflated: a `staff` member of a club may see a roster without holding training authority over anyone in it.

## 5.3 The four access regimes

| Regime | Applies to | Rule |
|---|---|---|
| **Tenant-scoped** | almost everything | readable and writable only through a membership in the owning club |
| **Product-owned, read-only** | `MetricDefinition` · `LibraryConcept` | readable by every tenant, writable by none |
| **Tenant-authored** | `Exercise` | owned by the club that authored it. **Never Atlas-owned** (DM-008) |
| **Subject-scoped** | `IdentityMemory` · `Player` (person) | follows its subject, not the club. **The only regime that crosses a club boundary.** A club reaches a person through a `RosterMembership` it owns (DM-018) |

## 5.4 The rules that follow from the Core

- **No cross-owner leakage.** What Atlas learns in one relationship stays in that relationship. One club's learned identity never becomes another's default.
- **A departing coach's identity memory does not transfer to their successor**, even though the assignment does.
- **A guardian's safety declaration binds training** even though a guardian holds no technical authority — so the right to write a `Declaration` is not the right to design training. (DM-014: the declarer and its authority are persisted; the guardian may hold no account.)
- **Video storage access is mediated, never public.** A footage reference is not a URL anyone holding it may open.

## 5.5 Unblocked — DM-014 resolved

The declaration policy blocker is cleared. **DM-014 (resolved, minimal scope)** gives `Declaration` a complete subject to evaluate a policy against: the declarer and the authority under which it was made are persisted, and the declarer may be a party without a `User` account. The declaration write rule can therefore be specified (a party holding the relevant administrative authority — including a Guardian without an account — may write a safety-binding `Declaration`; writing one is not the right to design training). The subject-scoped regime is settled by DM-018; DM-017A affects only whether assignments extend to groups and sessions, and does not gate the declaration policy. *(`Declaration` is not in the Sprint 3 startup set; this unblocks a later sprint.)*

## 5.6 Tenancy bootstrap — the provisioning mechanism

The authorisation chain (§5.2) has no first link until a coach belongs to a club. A registering coach must therefore acquire a domain `User`, a club-of-one, an owner `Membership`, and the club's own `RecordingAssertion` before any record — their first player included — can be reached under default deny.

**Everything of the domain is fixed upstream; this section fixes only the realisation.**

- **The domain content is settled.** An independent coach *is* a club-of-one and the club boundary exists from the first table ([`product-architecture.md`](product-architecture.md) §7.3), with no user-facing club-setup step in v1.0 (*"only the club interface waits"*).
- **The authority is settled.** *"Registration is a club-level administrative matter. The club asserts"* ([`memory-governance.md`](../constitution/memory-governance.md) §2.2) — the assertion is a registration-time, club-level act, and the club is the Recording Authority for its own subject.
- **The persistence is settled.** DM-025 makes the assertion a dedicated `RecordingAssertion` structure, one per `(subject, club)`, also its own L4 tombstone ([`data-model.md`](data-model.md) §2.4b).

What remains — and all this section adds — is **which component provisions these records, when, in what order, and atomically with what.** It changes no entity, relationship, ownership rule, invariant, authority or lifecycle state; it realises them.

### 5.6.1 Trigger and timing

> **The bootstrap is lazy, server-side, and idempotent — and never part of the shipped authentication flow.**

Sprint 1's authentication is frozen ([`development-rules.md`](../constitution/development-rules.md) §2): the `auth` account and the PKCE callback belong to it and are not touched. The `auth` record therefore already exists before the domain knows anything, and it lives **outside** Migration 0001's schema — so the bootstrap **cannot and must not** be atomic with sign-up.

The trigger is a **state condition, not an event**: the first authenticated server-side request whose session is valid but whose account resolves to **no `Membership`**. That absence is exactly the cold start `data-model.md` §1.3 names — *"a coach with an empty roster belongs to nothing and cannot create their first player."* It is evaluated at the server authorisation boundary Sprint 1 already established, after the session is validated and before the first default-denied domain read, and never in the client.

Because the condition is *no membership*, the bootstrap runs **at most once per account**: once the `Membership` exists, every later request observes it and the bootstrap is a no-op. There is no separate club-setup step for the coach to perform — the cold start provisions silently on first presence.

### 5.6.2 What is provisioned, and in what order

Four records. Order is fixed only by reference availability — the two self-owned roots first, then the two records that point at both.

| Order | Record | Key content | Depends on |
|---|---|---|---|
| 1 | `User` | account reference (the `auth` account) · display name | — |
| 2 | `Club` | kind `independent` · status active | — |
| 3 | `Membership` | `user →` · `club →` · role `owner` · granted-by self | 1 · 2 |
| 4 | `RecordingAssertion` | subject kind `club` · subject → the new club · asserted-by → the `User` · status active | 1 · 2 |

`Membership` and `RecordingAssertion` are mutually independent; either may be written third. The **display-name source** is the Sprint 3 implementation note — default to the email, editable in Settings ([`sprints/sprint-03-players.md`](../work/sprints/sprint-03-players.md) §6) — and is not decided here.

**No other subject is asserted at bootstrap.** The coach as a memory *subject* acquires their own Recording Authority only when coach memory is first formed, which does not happen at registration; a roster player's `RecordingAssertion` is written when the player is created (S3.4), not here.

### 5.6.3 Atomicity and failure

> **The four records are one atomic unit — all commit or none do.**

This is the DBDS atomic write group *"a subject-in-a-club with its `RecordingAssertion`"* ([`dbds.md`](dbds.md) Part III) applied to the club itself: no reader ever observes a `User` without its `Membership`, a club without an owner, or a club subject without the assertion authorising memory about it ([`memory-governance.md`](../constitution/memory-governance.md) §3). Internal creation order is invisible outside the transaction.

The `auth` record is **not** in this unit — it precedes the domain and is reconciled by it, which is precisely why the mechanism is lazy rather than a single sign-up transaction.

**On failure of any part, the whole unit rolls back.** The account returns to the pre-bootstrap state it was already in — a valid session with no `Membership` — and the *next* authenticated request retries. The coach is never partially provisioned; under default deny a failed bootstrap yields an explained, retryable empty state, never a blank and never a half-built club ([`product-principles.md`](../constitution/product-principles.md) §8).

**Concurrency.** Two simultaneous first requests — two tabs, or a retry racing the original — must not mint two clubs. The idempotency key is the account: Migration 0001 guarantees **one domain `User` per account**, the uniqueness the domain already implies by making `User` the identity of its holder (`data-model.md` §2.3). The second transaction loses the race on that account, finds the committed `User` and `Membership`, and no-ops. The club-of-one is preserved with no new rule.

### 5.6.4 The layer boundary

| Belongs to | What |
|---|---|
| **Migration 0001** | The *structures and guarantees* the bootstrap leans on: the four structures and their constraints as `dbds.md` specifies · opaque identity · the default-deny policies of §5.2 · one `User` per account · one `RecordingAssertion` per `(subject, club)`. **It creates structure, never rows** — no seeded club, no seeded coach |
| **Runtime** | The per-request *behaviour*: evaluating the no-`Membership` condition on an authenticated request and executing the four-record transaction, idempotently, once per account |
| **Sprint 3 code** (`features/club`) | The *component*: the server-side provisioner implementing the trigger, the transaction, idempotency and rollback, wired into Sprint 1's authorisation boundary **without modifying the auth flow** ([`product-architecture.md`](product-architecture.md) §9.1, Tenancy) |

### 5.6.5 What this section does not change

It introduces no entity, relationship, ownership rule, invariant, authority or lifecycle state — it realises them. It gates Sprint 3 story S3.3 as an implementation dependency; with the mechanism now fixed, S3.3 has a complete provisioning contract.

*(Formerly tracked as DM-026 in the open-decisions register; withdrawn there as non-architectural and specified here.)*

---

# §6 · Media and asynchronous processing

## 6.1 Asynchrony is not an optimisation

`product-architecture.md` Part III: *"Processing is asynchronous from day one"*, because retrofitting it *"touches UI, state, notifications and data model simultaneously."*

## 6.2 The state machine

```
uploaded ──▶ processing ──▶ ready
                 └────────▶ failed  (terminal, always with a stated reason)
```

**State transitions are the only mutation a `Video` admits.** The file and its metadata are append-only. `failed` is terminal and carries a reason: silence is not a state.

**A re-analysis does not modify the video.** It produces a new `Analysis`. There is no `analysed` state — that would bind an immutable fact to a regenerable interpretation.

## 6.3 Storage

Footage lives outside the record store. Three rules:

- **Access is mediated and time-bounded.** Possessing a reference is not authorisation; §5's chain is evaluated per access.
- **The store is never publicly readable.** This is video of minors.
- **Deletion follows §3.2**: only directed forgetting, and only after dependent interpretations are enumerated.

## 6.4 Honest progress

`product-principles.md` §8: *"Upload and processing progress are shown plainly. The coach is never left wondering whether it worked."* Upload tolerates interruption and retry, and **no video is ever left in an unknown state** — which is the completion criterion S4 inherits.

## 6.5 Work that is not upload

Analysis runs, re-derivation and identity re-derivation are the same kind of thing: work that takes minutes, can fail, and must be observable. They share the pipeline's failure and retry model.

**Blocked: DM-019** — who triggers mass re-derivation when perception improves, and whether the coach sees it. `product-architecture.md` §1.1 C2 requires the operation; §1.4 forbids *"silently applied change"*. The tension is real and unresolved.

---

# §7 · Perception contract

## 7.1 Perception is a sensor, not an intelligence

`product-architecture.md` §5.2: perception knows **nothing** about the player. It converts footage into canonical measurement and observation. It is replaceable independently, and **it never reads memory and never talks to the Assistant.**

## 7.2 The contract

**In:** a video reference and nothing else. No player history, no identity memory, no objectives.

**Out:** `Observation` records — what was seen, including what is not quantifiable — and `Measurement` records against versioned `MetricDefinition`s. Every output carries the perception model version.

**Never out:** a conclusion about the player, a priority, a recommendation, or any assertion of internal state. Perception may report protective movement; it may never report pain.

## 7.3 The prohibition, enforced here

> **The pipeline must be incapable of emitting person-identifying biometric data** — facial embeddings, gait signatures, or any derived identifier.

`data-model.md` Part IV calls this *"the gravest: biometric data of minors. A vision pipeline produces these naturally unless explicitly forbidden."* This is the explicit prohibition, and it is a property of the contract — **not a review step, not a policy, not a convention.** If the boundary can emit it, the boundary is wrong.

## 7.4 Blocked

**The canonical metric set is a recorded open question of the Core**, not a DM. It cannot be deferred past the first measurement stored, because §1.5 forbids shipping any metric without a documented derivation.

---

# §8 · Intelligence contract

## 8.1 One assembly, many surfaces

`product-architecture.md` §5.3: every intelligent surface calls **the same context assembly** and writes back to the same memory. *"An assistant that knows a player's history in chat but not in the analysis report is not one assistant wearing several hats — it is several assistants, and coaches detect the seam immediately."*

**There is no `features/ai`.** Intelligence is a layer all features consume, never a feature beside them.

## 8.2 Composable providers

The assembly takes providers rather than hard-wiring them. **Two exist in v1.0:** Sporting Memory and Library. A third is not designed, not modelled, and would require an ADR amending `memory-model.md` §5.

## 8.3 What is persisted and what is not

**Never persisted:** the assembled context, the prompt, reasoning traces as fact, model output as observation.

**Persisted:** `ContextReference` — what was consulted to produce an important recommendation. This is what lets a recommendation be explained six months later without storing the assembly, and it degrades honestly when the evidence is gone.

## 8.4 Model output is untrusted until validated

Validation happens server-side, before anything reaches a coach. An output that cannot show its reasoning and its evidence **is not shown**. An output carries the confidence its evidence warrants and never more.

## 8.5 The dependency that is forbidden

> **§8 never depends on §7.**

`product-architecture.md` §5.2: *"Perception feeds Domain and never talks to the Assistant. Swapping the vision model touches nothing above it."* Perception's output reaches the Assistant through the domain, never directly.

## 8.6 Graceful degradation

**The product must work when intelligence is unavailable.** Video still uploads, history still reads, plans still display. *"A product that stops working without its AI has made the AI the decider."*

---

# §9 · Enforcement and verification

## 9.1 What must be mechanically true

The four invariants of `product-architecture.md` §10.1 are not aspirations. Each needs something that fails when it is violated:

| Invariant | What must fail |
|---|---|
| Everything hangs off an identity subject | A record with no subject cannot be created |
| Derived is disposable; recorded is permanent | No path deletes a fact as a side effect of regenerating an interpretation |
| Intelligence is a layer, not a feature | An import from a lower layer to a higher one is rejected |
| Nothing is asserted that cannot be traced | An assertion without reachable evidence is not presentable |

## 9.2 The layer rule, made checkable

`product-architecture.md` Part X fixes the dependency direction as downward only: Experience → Assistant → Sporting Memory → Domain / Perception → Platform. **Experience never reaches Platform past Domain. Perception never reaches the Assistant.** Both are import-boundary properties and are checkable statically.

## 9.3 Isolation between clubs

The completion criterion S3 inherits is *"ownership boundaries enforced at the data layer, not the UI."* **That is a claim that must be demonstrable, not assertable.** Verifying tenant isolation by clicking is how leaks are born.

## 9.4 Blocked

**DM-020** — the level of verifiability Atlas requires before work counts as implemented — is open, and §9 has no completion criterion without it. `development-rules.md` §7 currently defines done as *"builds and runs"*, with no verification requirement at all.

---

# §10 · Open decisions

Five open, none resolved here. The register is [`open-decisions.md`](../work/open-decisions.md). *(DM-013, DM-014, DM-015 were resolved 2026-08-05 by the Product Owner — recorded in `data-model.md`; their SDS references are updated in §2, §3, §4, §5.)*

| # | Lands in |
|---|---|
| DM-016 · `Plan` : `Objective` cardinality | §2, §4 |
| DM-017A · whether an `Assignment` also targets a group or session | §2, §4, §5 |
| DM-019 · trigger and visibility of mass re-derivation | §6 |
| DM-020 · required level of verifiability | §9 |
| **DM-022** · **granularity of derivation tracking** | **§3, §4** |

**Resolved and recorded here:** **DM-021** — the SDS describes the complete product. Sprints consume it; it is not written per sprint. Recorded in the Amendment line of this document.

---

_This document is the contract between the approved architecture and the implementation. It inherits every document above it and may not contradict any of them. It changes by explicit Product Owner approval, and — with G1 resolved by ADR-0003 — it cannot close before F2 is approved._
