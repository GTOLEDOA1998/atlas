# Atlas Data Model

> **Status:** ✅ **Approved** (F2) — 2026-08-05, by explicit Product Owner decision, on the basis of the F2 Final Audit (*F2 READY: YES*). Its declared prerequisites are met: **G1 resolved** ([`ADR-0003`](../decisions/ADR-0003-memory-governance.md)) and the Part VII decisions **DM-013 · DM-014 · DM-015 resolved**. The open decisions DM-016 · DM-017A · DM-019 · DM-020 · DM-022 are **deliberately deferred** and do not gate F2; they remain Open. This is the contractual Data Model base for subsequent development. **Approving F2 approves neither the DBDS, the legacy-migration reconciliation, the Sprint 3 gate (S3.0), nor any implementation.**
> **Amended 2026-08-04** by **DM-023** (`Profile` withdrawn; `User` carries its holder's identity, §2.3) and **DM-018** (the athlete is `Player` the person plus `RosterMembership` the club relationship; identity follows the person; §1.5, §2.4, §2.5, Part III). DM-017B was absorbed by DM-018; DM-017A remains open. Further amended by **DM-025** (`RecordingAssertion` · §2.4b — the Recording Authority assertion persisted as a dedicated Decision, one per `(subject, club)`, also its own L4 tombstone).
> **Amended 2026-08-05**, by explicit Product Owner decision, resolving the three Part VII decisions: **DM-013** — `Training : TrainingSession` is **1:1**; one `Training` designs exactly one occasion, so the coach's modification has an unambiguous home (§2.19, §2.8). **DM-014** — the **minimal** authority model is persisted: a `Declaration` records its **declarer** and the **authority** under which it was made, and the declarer may be a party **without a `User` account**; a full `Guardian` / `Delegation` / administrative-authority model remains **out of scope** (§1.2, §2.9). **DM-015** — `LibraryConcept` and `Exercise` are a **curated knowledge/practice family outside the four data classes**, retaining their existing ownership and versioning (§1.1, §2.20, §2.21). No other content was changed.
> **Approved 2026-08-05 (F2).** The Product Owner formally approved this document as the contractual Data Model, moving it from *Candidate* to *Approved*. Approval rests on the F2 Final Audit (*F2 READY: YES*) and on the met prerequisites (G1 via ADR-0003; DM-013/14/15 resolved). No architectural content was changed by the approval; the deferral of DM-016 · DM-017A · DM-019 · DM-020 · DM-022 was accepted, and those decisions remain Open.
> **Owns:** what Atlas persists · the four data classes and their lifecycles · entity responsibilities, ownership, permanence, regenerability and versioning · the subject invariant · the global never-persist list.
> **Inherits:** the Intelligence Core — chiefly [`memory-model.md`](../constitution/intelligence-core/memory-model.md), [`current-session.md`](../constitution/intelligence-core/current-session.md), [`training-model.md`](../constitution/intelligence-core/training-model.md), [`priority-engine.md`](../constitution/intelligence-core/priority-engine.md), [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md), [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) — and [`product-architecture.md`](product-architecture.md).
> **Does not own:** how Atlas reasons (Intelligence Core) · SQL schema, indexes, access policies, migrations (SDS phase) · interface language (`product-architecture.md` Part VIII) · what *may* be remembered under whose consent (Governance — [`memory-governance.md`](../constitution/memory-governance.md), resolved by ADR-0003).
> **Precedence:** the Intelligence Core governs, then the Product Constitution, then `product-architecture.md`. Where this document appears to conflict with any of them, this document is defective.
> **Amendment:** deliberate and explicit. Changes touching the Intelligence Core require an ADR.
> **Phase:** Data Model — step 2 of the sequence set by [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md).

---

# Part I — Foundations

## 1.1 The four data classes

Whether a record is permanent, regenerable or versioned is answered systematically once every record belongs to **exactly one** class.

| Class | Nature | Rewritten | Regenerated | Versioned |
|---|---|---|---|---|
| **Fact** | It happened | Never | No | No |
| **Interpretation** | What Atlas concludes | Superseded, prior retained | **Yes, entirely** | Yes |
| **Decision** | What a human chose | Never | **No** | No |
| **Context** | What was true for a bounded period | No | No | No |

> **The governing rule:** a record belongs to one class. Mixing them is this model's primary failure mode — a fact that is rewritten destroys history; an interpretation treated as fact cannot be corrected; a decision that is regenerated erases human authorship.

**Decisions are never regenerated.** You may recompute what Atlas thought. You may not recompute what a person chose.

**On Context.** The class is bounded by *the lifetime of what it describes*, not by the occasion on which it was stated ([`current-session.md`](../constitution/intelligence-core/current-session.md) §4). Some context expires with its session; some outlives it and expires only by human action. Both are Context; they differ in lifetime, not in kind.

**One family of records does not fit these four classes** — curated and tenant-authored knowledge (§2.20, §2.21). By **DM-015 (resolved)** this family is **declared outside the four-class system**: curated knowledge/practice with its own lifecycle rules (curated · versioned · retired-never-deleted), retaining provenance where it applies, evidence links, ownership and versioning. It is not memory about the player and is not forced into Fact/Interpretation/Decision/Context (Part VII).

## 1.2 Mandatory provenance

Every memory retains its source class permanently: `observed` (video) · `declared` (human) · `reasoned` (Atlas's own prior conclusion).

**Every interpretation must record what it was derived from.** This is not optional metadata — it is what makes directed forgetting possible. If you cannot identify which interpretations rested on a deleted fact, you cannot re-derive them, and the model lies silently.

**A `declared` record must also record who declared it.** [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §9 resolves who *decides* when two people disagree; the model cannot even represent that disagreement without the declarer. **By DM-014 (resolved)** a declaration persists its **declarer** and the **authority** under which it was made; the declarer may be a party **without a `User` account** (e.g., a Guardian reporting by telephone), recorded minimally — a full `Guardian`/`Delegation`/administrative-authority model is out of scope (§2.9, Part VII).

## 1.3 Tenancy

Every row carries its ownership scope from the first table. Retrofitting means rewriting every policy and query against live production data.

**`Club` is the boundary.** An independent coach is a club of one member; a club is the same shape with more. Only the number of people with access differs.

**Access to a club is held through `Membership`**, not inferred from having a player assigned. Without it a coach with an empty roster belongs to nothing and cannot create their first player — the cold start [`product-architecture.md`](product-architecture.md) Part III describes.

**Two person-structures are not club-scoped**, because a person crosses clubs: `User` and `Player`. Their club-scoped relationships — `Membership` and `RosterMembership` respectively — carry the boundary, and a club sees a person only through a relationship it owns. `IdentityMemory` is likewise subject-scoped, not club-scoped (§2.15).

## 1.4 Confidence and decay

Every interpretation carries confidence, and confidence **decays with staleness**.

Model consequence: storing a confidence value is not enough. Store **when it was formed** and **how many distinct occasions it draws on** — without recorded repetition, the promotion of context into identity is uncomputable.

## 1.5 The subject invariant

> **Everything hangs off an identity subject: Club · Coach · Group · Player.**

These are the four subjects [`memory-model.md`](../constitution/intelligence-core/memory-model.md) §4 and the Identity Hierarchy of [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) already declare. Nothing is subjectless: no orphan analysis, no orphan objective, no orphan memory.

**The person remains the root of the aggregate.** Most records hang off a `Player`, and every record about a person hangs off exactly one. The invariant widens *which subjects may exist*; it does not weaken the requirement that one always does.

**The subject and the tenancy anchor are now distinct for the athlete (DM-018).** `Player` is the person and the identity subject; `RosterMembership` is the person-within-a-club and the tenancy anchor. A club-scoped fact hangs off the person as *subject* and is owned through the club as *tenant* — the same two-reference shape `Video` already carries with author and subject (§2.4, §2.7).

---

# Part II — Entities

## Tenancy and people

### 2.1 `Club` · *Fact* — the tenancy boundary and an identity subject

| | |
|---|---|
| **Responsibility** | The ownership scope of every record, and the institution whose philosophy shapes recommendations |
| **Lifecycle** | Created → active → dissolved. Never hard-deleted while it owns records |
| **Relations** | `1:N Player, Group` · `N:M User` via `Membership` · `1:1 IdentityMemory` (Club DNA) |
| **Permanent** | That it existed and what it owned |
| **Regenerable** | Nothing. Its *interpretation* (Club DNA) entirely |

> An independent coach is a club of one. Whether Club DNA applies where no institution exists is **deliberately unanswered** — see Part V.

### 2.2 `Membership` · *Decision* — access and role within a club

| | |
|---|---|
| **Responsibility** | That a person holds a role in a club, at a scope, with a status. `owner` · `coach` · `staff` |
| **Origin** | A human admitted another. Permanent |
| **Relations** | `N:1 User` · `N:1 Club` |
| **Regenerable** | **No.** Who admitted whom is a human choice |

Declared by [`product-architecture.md`](product-architecture.md) §2.7 and restored here; its absence made the ownership boundary unenforceable and the cold start unrepresentable.

### 2.3 `User` · *Fact* — the account and the human holding it

**`User` is not `Player`**: a coach analysing a twelve-year-old, or scouting an opponent, creates a player with no account, and in the MVP that is the normal case. The separation is between an account and *the person analysed* — never between an account and *the person holding it*. **There is no separate profile entity** (DM-023).

| | |
|---|---|
| **Responsibility** | The account, and the identity of the human who holds it |
| **Owner** | Itself. Not club-scoped — an account spans clubs, and access is granted through `Membership` |
| **Lifecycle** | Registered → active → closed. **Closure is not deletion of what the person authored** |
| **Relations** | `N:M Club` via `Membership` · `N:M Player` via `Assignment` · `0:1 Player` (the account link) · `1:1 IdentityMemory` where the subject is a coach |
| **Permanent** | That the account existed, and everything it authored |
| **Regenerable** | Nothing. Its *interpretation* — Coach DNA — entirely |

**It carries the identity attributes of its holder directly** — the name a coach is known by and how they are addressed. These serve the interface, not reasoning: no Core document consults them, and Atlas concludes nothing from them.

**It is the referent of authorship across the whole model.** Membership granted, assignment made, player created, objective accepted, training modified, declaration made — every one names a `User`, and each is permanent because a human did it.

**It is the subject of Coach Identity Memory.** A structure that is the subject of a durable interpretation about a human being is a domain entity, not a technical convenience. [`memory-governance.md`](../constitution/memory-governance.md) §5 requires that subject to be unambiguous, and it holds that Coach Identity **follows the person and is never inherited by a successor**.

**Never persist** — credentials of any kind, owned by authentication · any evaluation of the person as a professional.

### 2.4 `Player` + `RosterMembership` — the person and the club relationship (DM-018)

The athlete is **two structures**, exactly as the coach is `User` + `Membership`: the **person**, held once and following the athlete across clubs, and the **club relationship**, owned by a club and ending when the athlete leaves it. [`product-architecture.md`](product-architecture.md) §2.2 states the principle this materialises: *"the person is held once; roles are held through membership."*

#### `Player` · *Fact* — the person being developed

| | |
|---|---|
| **Responsibility** | The person themselves. Held once |
| **Owner** | **Itself — not club-scoped.** The person crosses clubs, so `Player` cannot belong to one, exactly as `User` does not (§1.3, §1.5) |
| **Lifecycle** | Created by a coach → active → *(optionally links an account)* → archived. **Never hard-deleted** except by directed forgetting. **A transfer does not create a new person** — it opens a new `RosterMembership` |
| **Relations** | `0:1 User` (nullable) · `1:N RosterMembership` · `1:1 IdentityMemory` (Player DNA — **follows the person**) |
| **Carries** | Only what is true of the person regardless of club: identity attributes, birth date or age band |

**Permanent** — that the person exists; creation date.
**Never persist** — medical diagnoses; inferred internal states (fatigue, pain, motivation), which are declared or unknown; biometric identifiers derived from video (Part IV).

> Level, age band and playing style are coaching data. Where they are Atlas's conclusion rather than a human's statement, they belong to `IdentityMemory` with confidence and provenance — not to this record as bare attributes.

#### `RosterMembership` · *Fact* — the person within one club

| | |
|---|---|
| **Responsibility** | That a person is on a club's roster. **The tenancy anchor for everything that happened in that club** |
| **Owner** | `Club` |
| **Lifecycle** | Enrolled → active → left / transferred out. **Its history stays with the club** when the person moves on ([`memory-governance.md`](../constitution/memory-governance.md) §9.1) |
| **Relations** | `N:1 Player` · `N:1 Club` · `N:M Coach` via `Assignment` · hosts the club-scoped record of the athlete: `Video, Goal, Objective, Plan, Priority, Declaration` are owned through the club and reference the `Player` as subject |

> **The split follows the governance line exactly.** What describes the person — identity — hangs off `Player` and follows them. What describes the relationship — the roster, the assignments, the club's history of the athlete — hangs off `RosterMembership` and stays with the club. A club-scoped fact already carries both its owning `Club` and its subject `Player`; the person reference follows the athlete, the ownership does not.

### 2.4b `RecordingAssertion` · *Decision* — permission to hold memory (DM-025)

The persisted form of the Recording Authority's assertion, required before any memory about a subject may be stored ([`memory-governance.md`](../constitution/memory-governance.md) §2, §3). *"Recording Authority"* is the human role; **`RecordingAssertion` is the recorded Decision.**

| | |
|---|---|
| **Responsibility** | That a human holding administrative authority asserted that memory about a subject may be held, within a club |
| **Origin** | A human assertion at registration or roster entry. Permanent |
| **Owner** | `Club` — one per `(subject, club)` pair. **It does not travel**: a new club asserts its own ([`memory-governance.md`](../constitution/memory-governance.md) §9.1) |
| **Relations** | `N:1 Club` · `subject` (kind ∈ club · coach · group · player + reference) · `asserted_by → User` |
| **Regenerable** | **No.** Recomputing what a human authorised is forbidden (§2.3) |

**Carries** — subject kind and reference · club · who asserted (`User`) · when · status (`active` · `revoked`) with its revocation date.

> **It is its own L4 tombstone.** Directed forgetting at level L4 removes the subject and its content; this record survives, because it never held any attribute of the person — only *that a subject existed, under whose authority, and when it was withdrawn* ([`memory-governance.md`](../constitution/memory-governance.md) §8.2). No separate tombstone structure is needed.

**Resolvability, not per-record columns.** [`memory-governance.md`](../constitution/memory-governance.md) §3 requires every stored memory to carry its Recording Authority. Unlike source class and subject — which vary per record — the assertion is **invariant across all records about one subject within one club**, so "carries" is satisfied by resolving `(subject, club) → RecordingAssertion`. It is neither embedded in the subject's structures nor duplicated per record. *(Whether to denormalise a reference for query performance is a physical concern, not this decision.)*

**Never persist** — the Guardian's separate identity where the asserter acts for a minor; the acting `User` (a club member) is recorded. *(The declarer-side Guardian question is resolved by DM-014 for `Declaration` at minimal scope; it does not change `RecordingAssertion`, and neither is in the startup set.)*

### 2.5 `Assignment` · *Decision* — who coaches whom

Carries **training authority** ([`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §2). Distinct from `Membership`: membership is a role in an institution, assignment is authority over a person's development. A temporary coach holds a scoped, time-bounded assignment.

**It lives within a `RosterMembership`** — the athlete's relationship with a club, which is where training authority exists and where it ends. This is what DM-018 dissolved from the former DM-017.2: once the club–player relationship is a named structure, the home of an assignment is no longer a separate decision. A departing coach's assignment stays with the `RosterMembership` it was made in; it does not follow the person.

> ⚠️ **DM-017A** remains open: whether an `Assignment` may also target a `Group` or a `Session`, not only a player-in-club. [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §4 grants a coach authority over *"players, groups and sessions"*; this document models the player case. The others, if adopted, are additional targets — they do not reopen where a player assignment lives.

**Regenerable** — no. Who assigned whom is a human choice and is permanent.

### 2.6 `Group` · *Fact* — context, never authority

| | |
|---|---|
| **Responsibility** | A training group as the club defines it. Atlas imposes no taxonomy and infers nothing from a group's name |
| **Relations** | `N:1 Club` · `N:M Player` · `1:1 IdentityMemory` (Group DNA) · `1:N Goal, Objective` |
| **Lifecycle** | Formed → active → dissolved. **Group Memory does not survive dissolution as an attribute of its members** |

A genuine layer of the Decision Hierarchy ([`training-model.md`](../constitution/intelligence-core/training-model.md) Part VII), not a scheduling detail. It holds **no authority whatsoever**.

## Evidence

### 2.7 `Video` · *Fact* — the rock everything rests on

| | |
|---|---|
| **Responsibility** | The immutable evidence |
| **Owner** | `Club`. **Two distinct references to people:** `author` (who uploaded) and `subject` (who is analysed) — different people in nearly every case |
| **Lifecycle** | `uploaded → processing → ready \| failed`. A state machine from day one |
| **Regenerable** | Nothing. It is the source |
| **Versioned** | No. Re-encodings are derived artifacts |

> Deleting a video invalidates every interpretation derived from it. The model must be able to **enumerate** those interpretations, not merely orphan them.

### 2.8 `TrainingSession` · *Fact* — the occasion

What actually happened: date, attendance, what was worked, coach observations. **Append-only once it occurred.**

`N:1 Training` (the design it ran) · `N:M Player` (attendance) · `0:N Video` · `0:N Declaration`.

### 2.9 `Declaration` · *Context* — what a human stated

The unit is **the declaration, not the occasion.** Its lifetime is the lifetime of what it describes.

| Kind | Examples | Expires |
|---|---|---|
| **Momentary** | Readiness, energy, notes about today | With the session |
| **Ongoing** | Injury, illness, medical restriction | **Only by human action. Never by time** |
| **Occasion fact** | Space, equipment, attendance, group composition | With the session |

| | |
|---|---|
| **Subject** | A `Player`, or a `Group` where the statement concerns the group's conditions |
| **Occasion** | `0:1 TrainingSession`. **A declaration may exist without one** — a guardian reporting an injury by telephone binds training immediately |
| **Declarer** | Recorded permanently, with the authority under which it was made (§1.2). **By DM-014 (resolved)**: the declarer and its authority are persisted; the declarer may be a party **without a `User` account**, recorded minimally. A full `Guardian`/`Delegation`/administrative-authority model is out of scope |

> **The safety asymmetry.** Atlas never assumes an injury has healed, a restriction has lifted, or an illness has passed. **Absence is unknown, never safe** — a query returning nothing means *not stated*, never *not so*.

**Expiry is not deletion.** An expired declaration stops being current and is retained, which is what lets Atlas later notice fatigue declared in six consecutive sessions. **Promotion** into identity requires repetition across occasions, never a single event.

**Never persist** — observable indicators converted into asserted state. Atlas may observe protective movement; it may not record "pain".

## Interpretation

### 2.10 `Analysis` · *Interpretation*

| | |
|---|---|
| **Responsibility** | One interpretive pass over one video |
| **Lifecycle** | Requested → completed → **superseded by re-analysis**. Never updated in place |
| **Relations** | `N:1 Video` (1:N by design) · `1:N Observation, Measurement, Finding` |
| **Regenerable** | **Completely.** When the model improves, historical footage is re-analysed and the past gains resolution |
| **Versioned** | **Mandatory:** perception model version **and** metric definition version |

**A distinction that looks contradictory and is not.** The interpretation is disposable. *The fact that Atlas asserted X on date Y* is historical and permanent, and is carried by the supersession chain of the interpretation itself — a pattern of repeatedly misreading a person is important signal.

**An `Analysis` does not own priorities.** It is evidence that raises, confirms or moves them (§2.14).

### 2.11 `Observation` · *Interpretation* — what was seen

| | |
|---|---|
| **Responsibility** | What Atlas perceived in footage, whether or not it is quantifiable |
| **Provenance** | `observed`, always |
| **Regenerable** | Yes, entirely, with the analysis that produced it |

Classified as *Interpretation* rather than *Fact* because perception is falible: a model's output is never a fact. It therefore carries confidence, and **any surface presenting "what Atlas saw" must present that confidence with it.**

> Its absence was the gap that made the precursor of an injury unrecordable. `data-model.md` permits observing protective movement; without this entity there was nowhere to put it. Separating observation from interpretation is a coaching law ([`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) §5), and both halves must exist for the separation to mean anything.

### 2.12 `Measurement` + `MetricDefinition`

**`MetricDefinition`** — product-owned and versioned. States **how** a value is computed from observables. Without it the timeline lies.

**`Measurement`** · *Interpretation* — a value against a definition **and its version**.

> Rule: **never compare measurements from different definitions.** On a definition change there are two legitimate responses — re-derive the history (preferred; video is immutable) or segment the series visibly. Nothing else.

A measurement is a quantified observation; an observation is not always a measurement. Both exist; neither replaces the other.

### 2.13 `Finding` · *Interpretation* — what it means

| | |
|---|---|
| **Responsibility** | What Atlas concludes from observations and measurements, with confidence |
| **Relations** | `N:1 Analysis` · `N:N Observation, Measurement` (its evidence) · `0:N LibraryConcept` (what it resolves against) |
| **Regenerable** | Yes, entirely |

**Evidence is reachable from every finding** — the footage it came from, in one step. A finding whose evidence cannot be reached must not be presented as settled.

### 2.14 `Priority` · *Interpretation* — a standing commitment about a subject

| | |
|---|---|
| **Subject** | A `Player`. **Not an analysis** |
| **Responsibility** | What deserves attention now: `WORK NOW` · `MONITOR` · `WAIT`, with reasoning, evidence, confidence, alternatives and **stated deferrals** |
| **Lifecycle** | Raised → moves between the three states over time → closed. **It outlives the analysis that raised it** |
| **Relations** | `N:1 Player` · `N:N Analysis` (the evidence that raised, confirmed or moved it) · `0:1 Objective` |
| **Regenerable** | Its *content* yes; its *identity and history* no. A re-analysis updates a priority; it does not replace the set |

A priority moves for reasons that produce no analysis at all: a coach's decision, an approaching competition, a change in readiness, a periodic review. Modelled as a child of an analysis, none of those could touch it.

**Every state change is recorded with its reason.** `MONITOR` carries the trigger that would move it; `WAIT` carries the condition it waits for. Without those the two holding states are a quiet graveyard, and stability — a virtue, per [`priority-engine.md`](../constitution/intelligence-core/priority-engine.md) Part VI — is unmeasurable.

**Never persist** — composite scores without a documented derivation. Prioritisation is reasoned, never totalled.

### 2.15 `IdentityMemory` · *Interpretation* — the DNA of a subject

One per identity subject: **Club · Coach · Group · Player.** Carries confidence, provenance, formation date, occasion count, and its supersession chain. Derived from the record; never tangled with it.

| Subject | Ownership rule |
|---|---|
| **Player** | **Follows the player** across coach and club changes. It describes the athlete, not the relationship |
| **Coach** | Belongs to that person. **Does not transfer to a successor**, who begins on defaults |
| **Group** | Belongs to the group as the club defines it. Does not survive dissolution |
| **Club** | Belongs to the club. Never inferred from other clubs |

**Never persist** — evaluations of a person as a professional. Memory is never used to grade a human.

## Decision

### 2.16 `Goal` · *Decision* — what a human wants

Declared by a coach, a player, or an authority for a group or club. Aspirational, possibly unmeasurable. **Subject:** any identity subject.

**A goal never becomes an objective directly.** It passes through prioritisation, because wanting something is not evidence that it is the right thing to work on now.

### 2.17 `Objective` · *Decision* — what a period of training must change

| | |
|---|---|
| **Subject** | Any identity subject. A group objective is first-class |
| **Lifecycle** | Proposed → **accepted by the appropriate authority** → active → achieved / abandoned / replaced |
| **Relations** | `N:1 Priority` · `1:1 Justification` · `1:N Plan` |
| **Regenerable** | **No.** A human decision is not recomputed |
| **Versioned** | No. An objective that changes is a new objective |

**`Justification`** — at the moment of acceptance, the objective retains the reasoning, evidence and confidence that justified it, **independently of the priority and analysis that produced them.** Re-analysis is the product's normal and desirable operation; without this, improving the perception model would leave every active objective unexplainable.

> The justification is a snapshot. It does not improve when the analysis improves, so an objective may display reasoning the current interpretation no longer supports. **That divergence must be visible, not hidden.**

The six required properties of an objective are fixed by [`training-model.md`](../constitution/intelligence-core/training-model.md) Part II and adopted verbatim.

### 2.18 `Plan` · *Decision*

The sequenced route serving one or more objectives. **Progress indicators and a re-evaluation moment are defined in advance**; without them, later evaluation is retrospective storytelling.

### 2.19 `Training` · *Decision* — the design of a session

| | |
|---|---|
| **Responsibility** | What Atlas proposed **and** what the coach did with it |
| **Lifecycle** | Proposed by Atlas → accepted / modified / rejected → executed → evaluated |
| **Relations** | `N:1 Plan` · `1:N Exercise` · **`1:1 TrainingSession`** — **resolved by DM-013: one `Training` designs exactly one occasion.** A design is not reused across occasions; the coach's modification therefore has one unambiguous home (§2.8) |
| **Permanent** | The original proposal and the modification, separately |

> **Retaining the original proposal alongside the modified version is not auditing — it is learning.** A coach's modification is the plan working as intended, and it is the only signal from which Coach DNA is formed. Storing only the final result destroys it.

### 2.20 `Exercise` — tenant-owned, never Atlas-owned

The concrete practice: a drill, a routine, a feed. **Owned by the club or the coach who authored it. Atlas owns no exercises and never will.**

> Atlas supplies objectives, reasoning, sequencing and constraints; **the coach supplies the exercises.** A model that dictated exercises would replace the coach's expertise rather than amplify it. This is a permanent limitation of the product, accepted deliberately.

**By DM-015 (resolved):** outside the four data classes — curated/authored practice, tenant-owned, versioned (§1.1, Part VII).

## Knowledge, conversation, and the assistant

### 2.21 `LibraryConcept` + `ConceptRelation` — the knowledge graph

**`LibraryConcept`** carries the Core's ten attributes: purpose · description · **observable indicators** · common errors · possible causes · consequences · related · dependencies · progressions · training implications.

**`ConceptRelation`** carries the eight typed, directional relationships: `requires` · `develops into` · `is composed of` · `causes` · `is evidence of` · `trades off against` · `matters more in` · `shapes`.

> `shapes` — cross-domain influence — is the most important: a technical error is very often a physical, mental or tactical problem wearing a technical mask. A model that nested concepts in a hierarchy rather than a graph would make that reasoning impossible.

**Observable indicators are the hinge** between perception and knowledge. Without them the Library is a glossary.

**Owned by Atlas, not by any tenant.** The ten knowledge domains are deliberately not modelled: the Core calls them *"a convenience for organising concepts"*.

**By DM-015 (resolved):** outside the four data classes — curated knowledge, Atlas-owned, versioned (§1.1, Part VII).

### 2.22 `Conversation` + `Message` + `ContextReference` · *Fact*

**`Conversation`** — anchored to a subject. **`Message`** — what was said, with author and moment. **`ContextReference`** — **what was consulted** to produce an important recommendation.

`ContextReference` resolves the paradox of an ephemeral context: if the assembly is never stored, how is a recommendation explained six months later? **By storing the references, not the assembly.** They survive directed forgetting with honest degradation — *"this rested on material that no longer exists"* rather than faked grounding or silence.

### 2.23 Assistant Context — **not an entity**

Assembled per request from memory and library. **Never persisted.**

**Never persist** — the assembled prompt; reasoning traces as fact; model outputs as observation. An interpretation is always an interpretation.

## 2.24 Withdrawn entities

| Withdrawn | Reason |
|---|---|
| `Workspace` | The tenancy boundary is `Club`, the name the Core and the Domain Model already use |
| `SessionContext` | The unit is the declaration. `CurrentSession` remains a Core concept and is not an entity name |
| `HistoricalRecord` | The append-only record is the union of the Fact and Decision entities. A parallel ledger duplicates every fact and can diverge from it |
| `CoachIdentity` · `PlayerIdentity` | Absorbed by `IdentityMemory`, which already handles all four subjects |

---

# Part III — Conceptual diagram

Grouped by data class, because the class determines the lifecycle.

```
╔═══ TENANCY · the ownership boundary ═══════════════════════════╗
║  Player (person, crosses clubs) ──1:N── RosterMembership        ║
║                                              │  N:1             ║
║  Club ──1:N── RosterMembership ──────────────┘                 ║
║    ├──1:N── Group ──N:M── RosterMembership                      ║
║    └──N:M── User  via Membership { role · scope · status }      ║
║                    User ──N:M── RosterMembership via Assignment ║
╚═════════════════════════════════════════════════════════════════╝

╔═══ FACTS · append-only, never rewritten ═══════════════════════╗
║   Video ──author──▶ User        TrainingSession                 ║
║     └───subject──▶ Player            ├── attendance             ║
║                                      └── 0:N Declaration        ║
║   Conversation ──1:N── Message ──0:N── ContextReference         ║
╚═════════════════════════════════════════════════════════════════╝

╔═══ CONTEXT · bounded by the life of what it describes ═════════╗
║   Declaration ──▶ Player | Group      declarer + authority      ║
║     momentary · ongoing · occasion fact                         ║
║     expires by time, or ONLY by human action, or with the day   ║
╚═════════════════════════════════════════════════════════════════╝
                            │  derived from
                            ▼
╔═══ INTERPRETATIONS · regenerable, versioned, with confidence ══╗
║   Analysis (model vX) ──1:N── Observation                       ║
║      │                 ──1:N── Measurement ──N:1── MetricDefn   ║
║      └─────────────────1:N── Finding ──0:N──▶ LibraryConcept    ║
║                                  │                              ║
║   Priority ──N:1── Player   ◀────┘ evidence, N:N with Analysis  ║
║     WORK NOW · MONITOR · WAIT · deferrals · state history       ║
║                                                                 ║
║   IdentityMemory ──▶ Club | Coach | Group | Player              ║
╚═════════════════════════════════════════════════════════════════╝
                   │  a human accepts  ◀── the human boundary
                   ▼
╔═══ DECISIONS · immutable, never regenerated ═══════════════════╗
║   Membership     Assignment     RecordingAssertion              ║
║                                 per (subject, club) · own L4     ║
║                                 tombstone                        ║
║                                                                 ║
║   Goal ····▶ Objective ──1:N── Plan ──1:N── Training            ║
║  (declared)     │                              ├── proposal     ║
║                 ├── 1:1 Justification (frozen) └── modification ║
║                 └── N:1 Priority   traceability                 ║
║                                          1:N── Exercise         ║
╚═════════════════════════════════════════════════════════════════╝

╔═══ KNOWLEDGE · outside the four classes (DM-015 resolved) ══════╗
║   LibraryConcept ◀──N:M──▶ LibraryConcept   (Atlas-owned)       ║
║   Exercise                                  (tenant-owned)      ║
╚═════════════════════════════════════════════════════════════════╝

    Assistant Context does NOT appear: assembled per request,
    never persisted.
```

**Three boundaries order the diagram:** Facts and Context feed Interpretations; Interpretations stop at the human; Decisions never cross back.

---

# Part IV — Never persist · global list

| Forbidden | Source |
|---|---|
| **Biometric identifiers derived from video** — facial embeddings, gait signatures | The gravest: biometric data of minors. A vision pipeline produces these naturally unless explicitly forbidden |
| Physiological or sensor data | Atlas has none and never fabricates it |
| Medical diagnoses | Atlas informs; it does not diagnose or prescribe |
| Inferred internal states as fact — fatigue, pain, motivation | Observable behaviour, never internal state |
| Composite metrics or priority scores without a documented derivation | Prioritisation is reasoned, never totalled |
| Assembled prompts, reasoning traces as fact, model outputs as observation | §2.23 |
| Judgments about a person's worth | Memory is never used to grade a human |
| Cross-owner aggregates | Collective intelligence is out of scope and requires an ADR |
| Credentials of any kind | Owned by authentication |

---

# Part V — What blocks approval

**Memory governance — RESOLVED.** Five questions without which the first table must not be created — all now answered by [`memory-governance.md`](../constitution/memory-governance.md), accepted by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md) (2026-08-05):

1. What may be remembered about **a minor**, and for how long?
2. Who consents — player, guardian, club — and how is it recorded?
3. Which parts of Player Memory **travel with the player** on a club change?
4. How much superseded-interpretation history is retained? *(Currently unbounded)*
5. What exactly does directed forgetting mean: withdrawal from the subject, deletion of the fact, or both?

The structure above is built to accommodate restrictive answers. **The decision has been made** — it lives in `memory-governance.md` and was accepted by ADR-0003; this section no longer blocks F2 approval.

**Deliberately deferred, and recorded so it is not closed by accident.** Whether **Club DNA applies where no club exists** is an open question of the Intelligence Core ([`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md), Open Question 5). This model does not answer it, and is shaped so that either answer can be adopted without restructuring. Closing it requires an ADR.

---

# Part VI — Traceability of approved decisions

| # | Decision | Where it is reflected |
|---|---|---|
| **DM-001** | The unit is the declaration, with its own lifetime | §2.9 `Declaration` — the unit is the statement, `0:1 TrainingSession`; §1.1 restates Context as bounded by lifetime, not occasion |
| **DM-002** | `CurrentSession` is a concept, not an entity | §2.24 — `SessionContext` withdrawn. The term appears nowhere as an entity name |
| **DM-003** | `Training` = design · `TrainingSession` = occasion | §2.19 and §2.8, each with its own class — Decision and Fact |
| **DM-004** | `Observation` exists, class *Interpretation* | §2.11, distinct from `Measurement` (§2.12) and `Finding` (§2.13); §2.10 relations |
| **DM-005a** | The `Priority` is the player's; the analysis is evidence | §2.14 — subject `N:1 Player`, `N:N Analysis`; §2.10 states an analysis does not own priorities |
| **DM-005b** | The `Objective` retains its justification | §2.17 — `1:1 Justification`, frozen at acceptance, with the divergence stated |
| **DM-006** | The tenancy boundary is `Club` | §1.3, §2.1; §2.24 withdraws `Workspace` |
| **DM-007** | Club DNA without a club: deferred | Part V, recorded as a deliberate deferral; §2.1 notes it |
| **DM-008** | `Exercise` is never Atlas's | §2.20; §2.21 confines the Atlas-owned graph to concepts |
| **DM-009** | `HistoricalRecord` withdrawn | §2.24; §2.10 relocates the "Atlas asserted X" requirement to the supersession chain |
| **DM-010** | The invariant becomes "identity subject" | §1.5; §2.16 and §2.17 give `Goal` and `Objective` any subject; §2.6 `Group` gains objectives |
| **DM-011** | Spanish terms reassigned | Header, *Does not own* — interface language belongs to `product-architecture.md` Part VIII |
| **DM-012** | `IdentityMemory` is the single name | §2.15; §2.24 retires `CoachIdentity` and `PlayerIdentity` |
| **DM-018** | The athlete is the person (`Player`) plus the club relationship (`RosterMembership`); identity follows the person, history stays with the club | §1.5; §2.4 both structures; §2.5 `Assignment` lives in `RosterMembership`; §1.3 tenancy; Part III diagram |
| **DM-023** | `Profile` withdrawn; `User` carries its holder's identity | §2.3 |
| **DM-025** | The Recording Authority assertion is a dedicated `Decision` structure, one per `(subject, club)`, that is also its own L4 tombstone; `§3` "carries" satisfied by resolvability, not per-record columns | §2.4b `RecordingAssertion` |
| **DM-013** | `Training : TrainingSession` = **1:1** — one design serves exactly one occasion; the coach's modification has one unambiguous home | §2.19 (relation), §2.8; Part VII |
| **DM-014** | The **minimal** authority model is persisted — a `Declaration` records its declarer and the authority under which it was made; the declarer may be a party without a `User` account. A full `Guardian`/`Delegation`/administrative-authority model is out of scope | §1.2, §2.9; Part VII |
| **DM-015** | `LibraryConcept` and `Exercise` are a curated knowledge/practice family **outside the four data classes**, keeping their existing ownership and versioning | §1.1, §2.20, §2.21; Part VII |

## DM-010 · the required demonstration of simplicity

The condition attached to DM-010 was that the new invariant maintain or improve the simplicity of the model. Measured by **rules plus exceptions plus unresolved cases**:

| | Before | After |
|---|---|---|
| Rules | 1 — *everything hangs off a Player* | 1 — *everything hangs off an identity subject* |
| Standing exceptions | 1 — `IdentityMemory` already had four subjects and violated the rule | **0** |
| Unresolved cases | 1 — group objectives had no root (recorded as Open Question 6) | **0** |
| Workarounds required | 1 — a group objective would have to be a template instantiated per player | **0** |
| **Total** | **4** | **1** |

The old invariant was already false in the model that declared it: `IdentityMemory` carried Club, Coach, Group and Player subjects without anyone calling it a violation. The new invariant does not add a subject — **it names the four that were already in use** and removes the exception, the unresolved case and the workaround. Open Question 6 is closed by it.

The cost is real and lands elsewhere: queries and access policies over goals and objectives lose a guaranteed Player. That is a cost in the SDS, not a loss of simplicity in the model.

---

# Part VII — Decisions raised by the redesign · now RESOLVED

Three questions were forced by writing the model and are not covered by DM-001 … DM-012. They were raised here as *not taken*; on **2026-08-05** the Product Owner resolved all three. The original questions are preserved below (**OPEN → DECIDED → RESOLVED**), each followed by its resolution.

### DM-013 · Does one `Training` serve one occasion or many? — **RESOLVED**

*Question (as raised):* `Training` is the design; `TrainingSession` is the occasion. If one design serves several occasions, a coach who modifies it differently on two of them has two modifications and one place to record them — and the modification is the only signal from which Coach DNA is formed. If it serves exactly one, a reusable design has no home. Flagged as unresolved when DM-003 was proposed; §2.19 states the relation and marks it.

**Resolution (PO, 2026-08-05):** `Training : TrainingSession` = **1:1**. One `Training` designs exactly one occasion; a design is **not** reused across occasions, so the coach's modification has one unambiguous home. Consequence: no reuse mechanism for `Training` across sessions is designed. Reflected in §2.19 and §2.8.

### DM-014 · Does the model persist the authority model beyond `Assignment`? — **RESOLVED (minimal scope)**

*Question (as raised):* `Declaration` must record its declarer, and [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §9 defines conflicts between a guardian and a coach. Today only `Assignment` is persisted: there is no `Guardian`, no `Club` as an authority, no `Delegation`, no temporary-coach scope. Without them the conflicts the Core resolves cannot be represented, and a guardian — who may hold no account — cannot be recorded as the source of a safety-binding statement.

**Resolution (PO, 2026-08-05):** persist the **minimum** required to represent declarations and the safety obligations the Constitution already establishes — and no more.

- A `Declaration` persists its **declarer** and the **authority** under which it was made (the two authority domains of [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §2).
- The **declarer may be a party without a `User` account** — e.g., a Guardian reporting an injury by telephone. Such a party is recorded **minimally** (enough to attribute the declaration and its authority), so the provenance of a safety-relevant declaration is preservable.
- **`Guardian` is a role/authority on the declaration, not a standalone entity at this stage.** A full `Guardian` entity, Guardian UI, a general `Delegation` system, a complete administrative-authority architecture, and temporary-coach scope are **explicitly out of scope** (v1.1 / future).

This resolves who may be recorded as a declarer and under what authority (`§1.2`, `§2.9`); it does **not** build the authority-management system. It changes no entity in the Sprint 3 startup set (`Declaration` is a later sprint).

### DM-015 · What class do `LibraryConcept` and `Exercise` belong to? — **RESOLVED**

*Question (as raised):* §1.1 requires every record to belong to exactly one of four classes. Curated knowledge and authored practice fit none: they did not happen, they are not concluded from evidence, they are not a choice about a player, and they are not true for a period. Either a fifth class exists, or this family is declared outside the four-class system. The gap predates this redesign; writing a class for every entity is what exposed it.

**Resolution (PO, 2026-08-05):** **declared outside the four-class system** — no fifth class is created. `LibraryConcept` and `Exercise` are a **curated knowledge/practice family** with their own lifecycle rules (curated · versioned · retired-never-deleted). They keep everything already decided: `LibraryConcept` remains **Atlas-owned**, `Exercise` remains **club/coach-owned** (DM-008), both remain **curated + versioned**, and provenance/evidence links (e.g., `Finding → LibraryConcept`) are unaffected. The four data classes continue to govern only the player record (Fact/Interpretation/Decision/Context); this family is a parallel, non-memory category. Reflected in §1.1, §2.20, §2.21.

---

## Open questions

1. **Promotion threshold** — how much repetition turns context into identity. Unanswered in three Core documents.
2. **Decay rate per subject** — a club's philosophy ages slowly; a junior's technical profile fast.
3. **When to re-derive identity rather than refine it.**
4. **Non-discrete sessions** — video covering several sessions does not fit `TrainingSession`.
5. **Conflicting declaration authority** — whose *declaration of fact* prevails is unsettled, distinct from who decides.

*(Former Open Question 6 — whether a `Goal` may exist without a `Player` — is closed by DM-010.)*

---

_This document constitutes the Data Model phase sequenced by ADR-0001, redesigned against the approved decisions and, on 2026-08-05, the three Part VII decisions DM-013 · DM-014 · DM-015. It inherits the Intelligence Core and may not contradict it. With Part VII resolved and G1 accepted by ADR-0003, it was **approved by the Product Owner on 2026-08-05 (F2)** as the contractual Data Model._
