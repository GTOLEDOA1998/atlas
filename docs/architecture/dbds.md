# Atlas Database Design Specification

> **Status:** **C3 scoped approval — Part II (the seven startup structures) and Part IV (access model) are Approved (2026-08-05)**, as the scoped DBDS required by S3.0. **Full DBDS closure is Pending:** Part I, Part III, Part V and Part VI are *not* part of this approval, and full closure still awaits the Part VIII decisions (F2 is now approved). This is a scoped, partial approval — **not** full closure.
> **Owns:** the physical blueprint — conceptual structures and their columns, technical and business identity, integrity constraints, relationship cardinality, the conceptual access-control model, and expected read and write patterns.
> **Inherits:** [`sds.md`](sds.md) · [`data-model.md`](data-model.md) · [`product-architecture.md`](product-architecture.md) · the Intelligence Core · [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) · [`ADR-0002`](../decisions/ADR-0002-documentation-governance.md).
> **Does not own:** DDL, index design, migration order, or any implementation. Those are Migration 0001 and are implementation, not design.
> **Precedence:** every document above wins. Where this document appears to contradict one, this document is defective.
> **Amendment:** explicit Product Owner approval.
> **Approved 2026-08-05 (C3).** Product Owner approved Part II (seven startup structures) and Part IV (access model) as the scoped DBDS required by S3.0. DM-017A remains Open and its Group/Session Assignment extension is explicitly deferred. This approval does not constitute full DBDS closure.
> **Relation to SDS §4:** SDS §4 fixes the *decisions* — identity strategy, tenancy rule, integrity rules, versioning mechanisms. This document fixes the *blueprint* — the structures and their conceptual columns. **SDS §4 is owed a one-line amendment ceding conceptual columns to this document.** That amendment is not made here.

---

# Part 0 · Method

**Global rules are stated once in Part I and are not repeated per structure.** Eighteen aggregates repeating the same tenancy sentence would be the duplication ADR-0002 exists to eliminate. Part II states only what is specific to each structure.

**Every blocked point is marked ⚠️ at the exact column or constraint it blocks**, never collected in a list at the end. A blueprint that hides its holes is worse than one that has them.

---

# Part I · Global rules

## G1 · Technical identity

Every structure carries an **opaque, system-generated, permanent identifier**. It is never derived from a natural key, because every natural candidate in this domain is mutable: a person renames, a club rebrands, an email moves.

**Two identity spaces are not tenant-scoped:** `MetricDefinition` and `LibraryConcept` are product-owned and globally identified. Everything else is identified within the product but owned within a club.

## G2 · Business identity

The identity a human uses to recognise a record. **It is never unique and is never a key.** Two players may share a name; two exercises may share a title. Business identity exists for display and search, never for integrity.

## G3 · Tenancy

> **Every structure carries its owning `Club`.**

Four exceptions, each for a stated reason:

| Structure | Why it is not club-scoped |
|---|---|
| `User` | An account spans clubs. Access is granted through `Membership` |
| `MetricDefinition` | Product-owned. Global, read-only to tenants |
| `LibraryConcept` · `ConceptRelation` | Product-owned. Global, read-only to tenants |
| `Player` (person) · `IdentityMemory` | **Subject-scoped, not club-scoped.** The person and their identity follow the athlete across clubs; a club reaches them through a `RosterMembership` it owns (DM-018) |

## G4 · Provenance on every interpretation

Every interpretation carries, permanently: **source class** (`observed` · `declared` · `reasoned`), **confidence**, **formation date**, **occasion count** (how many distinct occasions it draws on), and **a reference to what it was derived from** ⚠️ **DM-022 — the granularity of that reference is undecided.**

Without derivation references, directed forgetting is incomputable. Tracked exhaustively for identity memory, they grow without bound.

## G5 · Integrity — nothing cascades to deletion

> **No deletion cascades. Ever.**

Removing a person, a club or a video must never remove the record of a developing athlete. **Archiving is a state, never a deletion.** The only deletion is directed forgetting, and it is a **re-derivation cascade**: the fact is removed, dependent interpretations are enumerated and recomputed, and what cannot be recomputed states that its grounding is gone.

Three referential rules follow:

- A reference from an interpretation to a fact is **enumerable in reverse**.
- A reference from a decision to an interpretation **survives that interpretation's regeneration**, because the justification is frozen.
- A reference to a versioned product-owned record **always carries the version**, never the identity alone.

## G6 · Temporal columns

Every structure records when it was created. **Append-only and immutable structures carry no update timestamp** — its presence would imply a mutation the domain forbids.

## G7 · Versioning mechanisms

| Mechanism | Applies to |
|---|---|
| **Supersession chain** — current record plus ordered priors | `Analysis` · `IdentityMemory` |
| **Definition version** — independent version identity carried by consumers | `MetricDefinition` · `LibraryConcept` · `Exercise` |
| **State history** — no version; an ordered log of transitions with reasons | `Priority` |
| **None** — a change is a new record | `Goal` · `Objective` · `Plan` · `Training` · `Declaration` |

## G8 · Audit

Permanently retained, on every structure it applies to: the source class of every memory · **the Recording Authority under which every subject's memory is held — who asserted it and when (`RecordingAssertion`, DM-025)** · the declarer and their authority on every declaration (DM-014, minimal scope) · that Atlas asserted X on date Y · the original proposal alongside the coach's modification · who accepted an objective, when, and its outcome · what every interpretation derived from ⚠️ DM-022.

**Never retained:** any judgment of a person as a professional.

---

# Part II · The structures

*Conceptual columns only. No types, no keys, no indexes.*

## Tenancy and people

### `Club`

| | |
|---|---|
| **Business identity** | name |
| **Owner** | itself |
| **Lifecycle** | created → active → dissolved. Never removed while it owns records |
| **Columns** | name · kind (independent · institution) · status · created |
| **Persisted** | all of the above |
| **Regenerable** | nothing. Club DNA is `IdentityMemory`, not here |
| **Constraints** | a dissolved club retains every record it owned |
| **Deletion** | none |

### `Membership` — *contained in `Club`*

| | |
|---|---|
| **Columns** | user → · club → · role (owner · coach · staff) · scope · status (active · revoked) · granted by → · granted at |
| **Persisted** | all. This is a *Decision*: who admitted whom is permanent |
| **Constraints** | a revoked membership is retained, never removed. Role vocabulary is closed |
| **Audit** | who granted it and when, permanently |

> Roles are fixed by `product-architecture.md` §2.7. **Membership grants visibility; it does not grant training authority** — that is `Assignment`.

### `User`

| | |
|---|---|
| **Business identity** | display name |
| **Owner** | itself. **Not club-scoped** — an account spans clubs |
| **Columns** | account reference · display name · locale · avatar reference · created |
| **Persisted** | all of the above |
| **Constraints** | credentials are never stored here — they belong to authentication · **closure is a state, never deletion of what the person authored** |
| **Deletion** | none. An account is closed; its authorship remains |

> **There is no separate profile structure** (DM-023). `User` carries the identity of its holder directly, because it is the referent of every authorship in the blueprint and the subject of Coach Identity Memory — and [`memory-governance.md`](../constitution/memory-governance.md) §5 requires that subject to be unambiguous. Display attributes serve the interface; no reasoning consults them.

### `Player` (the person) · `RosterMembership` (the person in a club) — DM-018

The athlete is two structures, mirroring `User` + `Membership`: the person, held once and crossing clubs, and the club relationship, owned by a club.

#### `Player` — the person

| | |
|---|---|
| **Business identity** | given name + family name |
| **Owner** | **itself. Not club-scoped** — the person crosses clubs, like `User` |
| **Lifecycle** | created → active → *(optionally links an account)* → archived. **A transfer opens a new `RosterMembership`; it never mints a new person** |
| **Columns** | user → **(optional)** · given name · family name · birth date or age band — **only what is true of the person regardless of club** |
| **Deletion** | none except directed forgetting |

> **The account reference is optional** — most players never hold one, *"the decision with the widest blast radius"*. **Dominant hand, playing style, level and stage are absent from this structure**: where declared they belong to a club-scoped record, where concluded they are `IdentityMemory`. The person carries only its own invariant identity.

#### `RosterMembership` — the person within one club

| | |
|---|---|
| **Business identity** | player + club |
| **Owner** | `Club`. **The tenancy anchor for the club's record of the athlete** |
| **Columns** | club → · player → · status · enrolled at · left at · dominant hand · playing style (declared, club-scoped) |
| **Lifecycle** | enrolled → active → left / transferred out. **Retained with the club** when the person moves on |
| **Constraints** | (player, club) is a uniqueness constraint among active memberships, not a key · hosts `Assignment` · a club sees a person only through a `RosterMembership` it owns |
| **Deletion** | none. Departure is a state |

### `Group` · `GroupMembership`

| | |
|---|---|
| **Columns** | `Group`: club → · name · purpose (club-defined) · status · created — `GroupMembership`: group → · player → · since · until |
| **Constraints** | **Atlas imposes no group taxonomy** and infers nothing from a name. A dissolved group retains its history; its DNA does not survive as an attribute of its members |
| **Deletion** | none. Dissolution is a state |

### `Assignment` — *contained in `RosterMembership`* (DM-018)

| | |
|---|---|
| **Columns** | coach (user) → · roster membership → · scope · authority kind · granted by → · from · until |
| **Persisted** | all. A *Decision* — permanent |
| **Constraints** | `until` supports the temporary coach, *"scoped and time-bounded"*. **Carries training authority; `Membership` does not** · a departing coach's assignment stays with the `RosterMembership`; it does not follow the person |

> **DM-018 settled where an assignment lives:** inside the athlete's club relationship. ⚠️ **DM-017A** remains open — whether an assignment may *also* target a `Group` or a `Session`. If so, those are additional target kinds; they do not change that a player assignment lives in a `RosterMembership`.

### `RecordingAssertion` (DM-025)

| | |
|---|---|
| **Business identity** | subject + club |
| **Owner** | `Club`. Tenant-scoped — even for a `Player` subject who crosses clubs, each club's assertion is its own |
| **Columns** | club → · subject kind (club · coach · group · player) · subject → · **asserted by (user) →** · asserted at · status (active · revoked) · revoked at |
| **Persisted** | all. A *Decision* — permanent, never regenerated |
| **Constraints** | one per `(subject, club)` · **absence of an active row forbids storing any memory about the subject** (`memory-governance.md` §2.3, §3) · never edited — revocation is a status change, and a new club creates its own row (§9.1) |
| **Deletion** | **none. It is its own L4 tombstone** — it survives directed forgetting and retains only *that a subject existed, under whose authority, and when withdrawn* (`memory-governance.md` §8.2) |

> **`memory-governance.md` §3 is satisfied by resolvability.** Every stored memory carries its Recording Authority by resolving `(subject, club) → RecordingAssertion` — the assertion is invariant across all records about one subject in one club, so it is not a per-record column. A denormalised reference for query speed, if ever added, is a physical choice, not part of this structure.

## Evidence

### `Video`

| | |
|---|---|
| **Business identity** | captured date + subject |
| **Columns** | club → · **author (user) →** · **subject (player) →** · storage reference · duration · captured at · state · failure reason · uploaded at |
| **Persisted** | all |
| **Regenerable** | nothing. It is the source |
| **Constraints** | **two distinct person references.** State is closed: `uploaded · processing · ready · failed`. **`failed` always carries a reason** — silence is not a state. There is no `analysed` state |
| **Deletion** | directed forgetting only, **after dependent interpretations are enumerated** |

### `TrainingSession` · `Attendance`

| | |
|---|---|
| **Columns** | `TrainingSession`: club → · **training → (`N:1` a single `Training`, per DM-013 `1:1` — one design, one occasion)** · occurred at · coach (user) → · conditions note · frozen — `Attendance`: session → · player → · presence |
| **Constraints** | mutable before it occurs, **append-only after**. `frozen` is the boundary |
| **Deletion** | none |

### `Declaration`

| | |
|---|---|
| **Business identity** | subject + kind + date |
| **Columns** | club → · subject (player · group) · **declarer → (a `User`, or a minimally-recorded party without an account — DM-014)** · **declarer authority (the authority domain/role under which it was made — DM-014)** · kind (momentary · ongoing · occasion) · content · declared at · **session → (optional)** · valid from · superseded by → · expired at |
| **Persisted** | all. Content is immutable; only validity changes |
| **Constraints** | **the session reference is optional** — a guardian telephoning creates a declaration with no occasion. **An ongoing declaration expires only by human action, never by time** |
| **Deletion** | **none. Expiry is not deletion.** An expired declaration is retained, which is what lets Atlas notice fatigue declared across six sessions |

> **The safety asymmetry is a constraint, not a convention.** No rule may expire an ongoing declaration on a timer. And **an empty result means *not declared*, never *not so*** — a reader that treats absence as health is a safety failure.

> **DM-014 (resolved), minimal scope.** The **declarer** and the **authority** under which it was made are persisted; the declarer may be a party **without a `User` account** (e.g., a Guardian by telephone), recorded minimally so the provenance of a safety-relevant declaration is preservable. `Guardian` is a role/authority on the declaration, **not a standalone entity here**; a full `Guardian` entity, `Delegation`, `Club`-as-authority and temporary-coach scope are out of scope.

## Interpretation

### `Analysis`

| | |
|---|---|
| **Columns** | club → · video → · **perception model version** · **metric definition set version** · state · requested at · completed at · superseded by → · confidence |
| **Persisted** | all |
| **Regenerable** | **entirely**, with everything it contains |
| **Constraints** | **both version references are mandatory.** Never updated in place — a re-analysis is a new record that supersedes |
| **Audit** | that Atlas asserted this on this date survives supersession |

### `Observation` — *contained in `Analysis`*

| | |
|---|---|
| **Columns** | analysis → · what was seen · footage timestamp · confidence · provenance (`observed`) |
| **Constraints** | **behaviour, never state.** Protective movement may be recorded; pain may not. **No person-identifying biometric derivative may exist in this structure** |

### `Measurement` — *contained in `Analysis`*

| | |
|---|---|
| **Columns** | analysis → · **metric definition → + version** · value · unit · footage timestamp · confidence |
| **Constraints** | **the version is mandatory.** Measurements from different definitions are never compared |

### `Finding` — *contained in `Analysis`*

| | |
|---|---|
| **Columns** | analysis → · meaning · confidence · evidence references (observations, measurements) · library concept → *(optional)* |
| **Constraints** | **evidence must be reachable in one step.** A finding whose evidence cannot be reached is not presentable |

### `Priority` · `PriorityTransition` · `PriorityDeferral`

| | |
|---|---|
| **Columns** | `Priority`: club → · **player →** · state · reason · confidence · expected benefit · risks · re-evaluation condition · opened at · closed at — `PriorityTransition`: priority → · from · to · reason · trigger kind · actor → *(null when Atlas)* · at — `PriorityDeferral`: priority → · displaced priority → · reason |
| **Constraints** | the subject is the **player**, never the analysis. State vocabulary is closed: `WORK NOW · MONITOR · WAIT`. **`MONITOR` requires a re-evaluation condition; `WAIT` requires the condition it waits for** — without them the holding states are a graveyard |
| **Deletion** | closed, never deleted |
| **Audit** | **every transition carries its reason.** *"Explain every change"* is a structural requirement |

### `IdentityMemory` ⚠️ **DM-022**

| | |
|---|---|
| **Columns** | **subject kind (club · coach · group · player) + subject →** · content · confidence · formation date · occasion count · provenance · superseded by → · **derivation references ⚠️ DM-022** |
| **Owner** | **the subject, not the club.** For a player the subject is `Player` the person, which crosses clubs (DM-018) |
| **Regenerable** | **entirely**, from the record |
| **Constraints** | one per subject. **Player memory follows the player; coach memory does not transfer to a successor.** Two opposite rules on one structure |
| **Deletion** | only through directed forgetting, as re-derivation |

## Decision

### `Goal`

| | |
|---|---|
| **Columns** | club → · **subject (club · coach · group · player)** · declared by → · statement · declared at · retired at |
| **Constraints** | immutable. **A changed goal is a new goal** |

### `Objective` · `Justification`

| | |
|---|---|
| **Columns** | `Objective`: club → · subject · priority → · state · statement · horizon · accepted by → · accepted at · outcome · outcome at — `Justification`: objective → *(1:1)* · frozen reasoning · frozen evidence references · frozen confidence · frozen at · grounding still exists |
| **Constraints** | content immutable; only the outcome state changes. **`Justification` is written atomically with acceptance.** `grounding still exists` is what lets an objective say honestly that its evidence is gone rather than display an unfounded rationale |
| **Audit** | who accepted, when, and the outcome — permanently |

### `Plan` ⚠️ **DM-016**

| | |
|---|---|
| **Columns** | club → · **objective → ⚠️ DM-016** · phases · progress indicators · re-evaluation moment · approved by → · approved at · state |
| **Constraints** | **progress indicators and the re-evaluation moment are set before approval.** Without them, later evaluation is retrospective storytelling |

### `Training` · `TrainingModification` · `TrainingExercise`

| | |
|---|---|
| **Columns** | `Training`: club → · plan → · proposal content · proposed at · state — `TrainingModification`: training → · modified content · modified by → · rationale · at — `TrainingExercise`: training → · **exercise → + version** · order · emphasis |
| **Constraints** | **the modification is a second record, never an edit of the first.** Storing only the final result destroys the only signal from which Coach DNA is formed |

### `Exercise`

| | |
|---|---|
| **Owner** | **the club or the coach who authored it. Never Atlas** |
| **Columns** | club → · author → · name · description · version · retired at |
| **Constraints** | **By DM-015: outside the four data classes** — a curated/authored practice family (curated · versioned · retired-never-deleted), not player memory. Ownership unchanged: Atlas holds no exercises |

## Knowledge and conversation

### `MetricDefinition`

| | |
|---|---|
| **Owner** | **Atlas.** Global, read-only to tenants |
| **Columns** | identity · version · name · computation description · unit · superseded by |
| **Constraints** | **never retired while a measurement references it.** No metric exists without a documented derivation |

### `LibraryConcept` · `ConceptRelation`

| | |
|---|---|
| **Owner** | **Atlas.** Global, read-only to tenants |
| **Columns** | `LibraryConcept`: identity · version · the ten Core attributes, of which **observable indicators** is the hinge to perception — `ConceptRelation`: source concept → + version · target concept → · relation type · directional |
| **Constraints** | **By DM-015: outside the four data classes** — a curated knowledge family (curated · versioned · retired-never-deleted), Atlas-owned. Relation vocabulary is closed at the Core's **eight types**. A relation versions with its source concept. **Refining a concept must not silently invalidate analyses that referenced a prior version** |

### `Conversation` · `Message` · `ContextReference`

| | |
|---|---|
| **Columns** | `Conversation`: club → · subject (player) → · opened at · closed at — `Message`: conversation → · author kind (human · atlas) · author → · content · sequence · at — `ContextReference`: message → · referenced kind · referenced → · grounding still exists |
| **Constraints** | strictly ordered, append-only. **The assembled context is never stored** — only what was consulted |

---

# Part III · Relationships and consistency boundaries

## By identity, never by composition

Every reference between aggregate roots is by identity. Composition exists **only** inside a boundary: `Club → Membership` · `RosterMembership → Assignment` (DM-018) · `Group → GroupMembership` · `Analysis → Observation · Measurement · Finding` · `Objective → Justification` · `Priority → PriorityTransition · PriorityDeferral` · `Training → TrainingModification · TrainingExercise` · `TrainingSession → Attendance` · `Conversation → Message → ContextReference` · `LibraryConcept → ConceptRelation`.

## Cardinalities that carry a decision

| Relationship | Cardinality | Why it matters |
|---|---|---|
| `Player` → `User` | **0:1, optional** | Most players hold no account |
| `Player` → `RosterMembership` | **1:N** | One person, one membership per club they belong to (DM-018) |
| `RosterMembership` → `Club` | **N:1** | The tenancy anchor; retained with the club on transfer |
| `Video` → person | **two references**, author and subject | Collapsing them breaks permissions and attribution |
| `Video` → `Analysis` | 1:N | Re-analysis is normal, not exceptional |
| `Analysis` ↔ `Priority` | **N:M** | An analysis is evidence, not owner |
| `Priority` → `Objective` | 0:1 | Only `WORK NOW` items are trained |
| `Objective` → `Justification` | **1:1, atomic** | An accepted objective is never momentarily unexplained |
| `Declaration` → `TrainingSession` | **0:1, optional** | A declaration may exist with no occasion |
| `IdentityMemory` → subject | 1:1 per subject | Four subject kinds |
| `Objective` → `Plan` | ⚠️ **DM-016** | Determines whether `Plan` is a root |
| `Training` → `TrainingSession` | **1:1** (DM-013) | One design, one occasion; the coach's modification lives in `Training`, unambiguously |
| `Assignment` → `RosterMembership` | **N:1**, contained | Settled by DM-018. ⚠️ DM-017A: whether a group or session may also be a target |

## Atomic write groups

`Analysis` with all contained records · `Objective` with `Justification` · `Priority` with its transition · `Declaration` with declarer and authority · `Training` with its modification · **a subject-in-a-club with its `RecordingAssertion`** — no memory about a subject may exist before the assertion authorising it (`memory-governance.md` §3).

**Deliberately not atomic:** an `Analysis` and the priorities it moves.

---

# Part IV · Security

## Ownership and tenancy boundary

**`Club` is the boundary.** Every structure carries it except the four in G3.

## Conceptual access model

> **Default deny. A record is unreachable unless a rule authorises it, and enforcement is at the data layer.**

```
User ──▶ Membership ──▶ Club ──▶ every record scoped to that club
                                        │
Assignment ──────────────────────────▶ actions carrying training authority
```

| Regime | Structures | Rule |
|---|---|---|
| **Tenant-scoped** | almost everything | reachable only through an active membership in the owning club |
| **Product-owned, read-only** | `MetricDefinition` · `LibraryConcept` · `ConceptRelation` | readable by every tenant, writable by none |
| **Tenant-authored** | `Exercise` | owned by the authoring club |
| **Subject-scoped** | `IdentityMemory` · `Player` (person) | follows its subject across clubs — **the only regime that crosses the boundary.** A club reaches a person through a `RosterMembership` it owns (DM-018) |

## Authorisation rules

- **Membership grants visibility. Assignment grants authority.** A `staff` member may see a roster while holding authority over no one in it.
- **No cross-owner leakage.** One club's learned identity never becomes another's default.
- **A departing coach's identity memory does not transfer to their successor**, though the assignment does.
- **A guardian's safety declaration binds training** though a guardian holds no technical authority — so *the right to write a `Declaration` is not the right to design training* (DM-014: the declarer and its authority are persisted; the guardian may have no account).
- **Storage access is mediated and time-bounded.** Holding a footage reference is not authorisation.

## Write constraints

| Constraint | Applies to |
|---|---|
| No update path exists | append-only and immutable structures |
| Only state transitions may be written | `Video` · `Declaration` validity · `Objective` outcome |
| Every state change writes its reason | `Priority` |
| A modification writes a new record, never an edit | `Training` |
| No write may delete by cascade | **all** |

---

# Part V · Access patterns

*No indexes. Patterns only.*

## Read

| Pattern | Frequency | Note |
|---|---|---|
| Today's attention for one coach — open priorities across the roster | **Very high** | The Dashboard. The single hottest read in the product |
| **Current declarations for a player** | **Very high, and safety-critical** | Read before every training design. Must never be served stale |
| Roster search within a club | High | *"The most fluid part of Atlas"* |
| One player's profile with history | High | Composes several aggregates |
| The current analysis for a video, with its findings | Medium | Whole-aggregate read |
| Everything that happened with a player — the timeline | Medium | **Composition across Fact and Decision structures**, since no ledger exists |
| Library graph traversal | Medium | **Reverse traversal crosses aggregates** — a declared cost of the `ConceptRelation` boundary |
| Superseded analyses | Low | Retained but rarely read |

## Write

| Pattern | Frequency | Note |
|---|---|---|
| Message append | High | Strictly ordered |
| Priority transitions | Medium | Concurrency hot spot: coach override versus analysis completion |
| Declaration | Medium | Several possible declarers about one player |
| Video upload and state transitions | Medium | Single writer per video |
| Analysis completion | Medium | **Large atomic write** — the whole aggregate |
| Re-derivation across the corpus | **Rare, enormous** | ⚠️ DM-019. Rewrites every interpretation |

## By nature

**Append-only:** `Video` content · `TrainingSession` after occurrence · `Declaration` · `Membership` · `Assignment` · `Conversation` · `Message` · `ContextReference` · `PriorityTransition`.

**Regenerable:** `Analysis` and everything it contains · `IdentityMemory` · `Priority` content, never its identity or history.

**High-frequency:** `Priority` · `Declaration` · `Message`.

**Never written after commit:** `Goal` · `Objective` content · `Justification` · `Plan` after approval · `Training` proposal and modification · `RecordingAssertion` content (only its status changes on revocation).

---

# Part VI · Traceability

| | |
|---|---|
| **Consumes** | `sds.md` §2 (boundaries), §3 (behaviour), §4 (decisions), §5 (access), §6 (media state) · `data-model.md` (entities and never-persist) · `product-architecture.md` (domain and tenancy) · the Intelligence Core (safety, memory, authority, prioritisation) |
| **Produces** | the physical blueprint: structures, conceptual columns, cardinalities, integrity constraints, the conceptual access model, and access patterns |
| **Implements later** | SDS §4 in full · SDS §5 conceptually (DM-014 resolved — the declaration policy is unblocked) · SDS §6 storage rules · SDS §9's isolation requirement |
| **Migration 0001 depends on it for** | which structures exist and in what order · every column and constraint · every access rule · what may never cascade |

---

# Part VII · Audit of this document

**Duplications.** None found against the source documents: Part I states each global rule once and Part II never repeats it. **One live risk:** Part IV restates the authorisation chain that SDS §5 owns. It is retained here because the DBDS must be readable alone at the moment the migration is written — but **SDS §5 is authoritative** and any divergence is a defect in this document.

**Unnecessary structures.** None. `PriorityTransition`, `PriorityDeferral`, `TrainingModification` and `Justification` each exist because the Core requires something no other structure can hold — the reason for a change, the displaced alternative, the coach's edit, the frozen rationale.

**Redundant relationships.** One examined and kept: `Analysis → Video` and `Video → Player (subject)` make an analysis reachable from a player by two paths. The direct path does not exist and must not be added — an analysis belongs to footage, not to a person.

**Incorrect consistency boundaries.** None found. Three remain **undetermined** rather than wrong: `TrainingSession`, `Plan`, `Assignment`.

**Aggregate Map violations.** None. Every composition in Part III appears in SDS §2.

**SDS violations.** None found. Two properties were checked explicitly: nothing cascades to deletion anywhere, and no structure lets perception reach the assistant.

**Circular dependencies.** The improvement cycle closes — `Analysis → Priority → Objective → Plan → Training → TrainingSession → Video → Analysis` — and that is deliberate. It has one consequence: **directed forgetting must traverse a cyclic graph and must therefore be cycle-safe or it will not terminate.**

**Implementation risks.** `0001_atlas_core.sql` was **reconciled (C4, 2026-08-05)**: applied state established (not applied — 0 tables), declared superseded by SDS §4.8, and archived to `supabase/legacy/` · after DM-013/014/015 were resolved (2026-08-05), **five** open decisions (DM-016 · DM-017A · DM-019 · DM-020 · DM-022) still block parts of the blueprint. **The startup structures are not blocked** — DM-023, DM-018, DM-025 resolved.

**Performance risks.** Three, all structural rather than tuning: the Dashboard read crosses many priorities per coach · the timeline is a composition across structures because `HistoricalRecord` was withdrawn — a deliberate trade of read cost for correctness · library reverse traversal crosses aggregates.

**Maintainability risks.** Superseded analyses and superseded identity memory grow without bound — a recorded open question of the Core, not a defect here. And the four-regime access model is only as safe as its least-reviewed rule.

---

# Part VIII · Blocked

## Resolved since drafting — DM-023

`product-architecture.md` §2.7 declared `User ──1:1── Profile` while `data-model.md` had no `Profile` at all. Investigation found the entity appeared **once in the whole corpus**, as a node in one diagram, with no definition, responsibilities, data class or owner anywhere.

**Resolved: `Profile` is withdrawn.** `User` carries the identity of its holder directly. `product-architecture.md` §2.1 and §2.7 and `data-model.md` §2.3 are amended; **the first structure of Migration 0001 is no longer blocked.**

## Resolved since drafting — DM-025

`memory-governance.md` §3 requires every stored memory to carry the Recording Authority under which it exists, and §11 owed the persistence shape to the Data Model. Investigation confirmed the semantics were already fixed (who asserts §2.2, permanence §2.3, no-travel §9.1, tombstone §8.2) and only the structural shape was open.

**Resolved: a dedicated `RecordingAssertion` structure** (*Decision* class), one per `(subject, club)`, that is also its own L4 tombstone. It is not embedded in the subject's structures and not a per-record column — §3 is met by resolvability. Chosen over embedding because embedding mixes a Decision into Fact structures (`data-model.md` §1.1) and cannot hold a tombstone that survives L4. The name is `RecordingAssertion`: *Recording Authority* is the human role, `RecordingAssertion` is the recorded Decision. Added to `data-model.md` §2.4b and this document; the startup set for Migration 0001 grows from six structures to seven.

## Resolved since drafting — DM-018

`Player` did double duty as the person (identity, follows the athlete) and the club roster row (tenancy, owned by a club) — two incompatible ownership rules on one structure. Investigation compared a fused architecture against a split one across five years of evolution; the fused one breaks at the first club transfer.

**Resolved: the athlete is two structures.** `Player` is the person (crosses clubs, subject of Player Identity Memory); `RosterMembership` is the person within one club (the tenancy anchor, hosting `Assignment`). This mirrors `User` + `Membership` for coaches. `Assignment`'s home is settled — the former **DM-017B is absorbed**; **DM-017A** (whether an assignment also targets a group or session) remains open. Amended in `product-architecture.md` §2.1 and §2.7, `data-model.md` §1.5/§2.4/§2.5, and this document.

## The open decisions and where they bite

| # | Blocks in this document |
|---|---|
| ~~DM-013~~ | **Resolved (1:1).** `Training → TrainingSession` is `1:1`; the modification lives in `Training`. The root-vs-contained shaping of `TrainingSession` is now a physical choice, no longer a domain question |
| ~~DM-014~~ | **Resolved (minimal).** `Declaration.declarer` and `.declarer authority` are persisted; the declarer may be a party without an account. Full `Guardian`/`Delegation`/administrative-authority model is out of scope |
| ~~DM-015~~ | **Resolved.** `LibraryConcept` and `Exercise` are a curated knowledge/practice family outside the four data classes; ownership and versioning unchanged |
| DM-016 | `Plan.objective` cardinality · whether `Plan` is a root |
| DM-017A | whether an `Assignment` may also target a group or session |
| DM-019 | the re-derivation write pattern |
| DM-020 | how isolation between clubs is demonstrated |
| DM-022 | derivation references on every interpretation |

---

_This document is the physical blueprint of Atlas. It inherits the SDS and may not contradict it. F2 is approved and G1 is resolved (ADR-0003); **Part II and Part IV are C3-scoped-approved (2026-08-05)**. Full closure still awaits the remaining Part VIII decisions._
