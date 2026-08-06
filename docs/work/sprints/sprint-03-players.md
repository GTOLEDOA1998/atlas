# Sprint 3 — Players · Implementation Plan

> **Status:** Prepared, not started. **Blocked** until F2, G1 and F3 are approved (§3.0).
> **Tier:** 4 — Work. It plans execution; it decides nothing about the domain.
> **Owns:** what Sprint 3 implements, in what order, with what dependencies, and how each piece is known to be done.
> **Inherits, and never restates:** [`roadmap.md`](../roadmap.md) S3 · [`product-architecture.md`](../../architecture/product-architecture.md) · [`data-model.md`](../../architecture/data-model.md) · [`sds.md`](../../architecture/sds.md) · [`dbds.md`](../../architecture/dbds.md) · [`memory-governance.md`](../../constitution/memory-governance.md) · [`development-rules.md`](../../constitution/development-rules.md).
> **Does not own:** any domain rule, schema column, access policy, or entity definition — those live in the documents above and this plan points at them. Where this plan appears to decide a domain question, this plan is defective and the question is registered in [`open-decisions.md`](../open-decisions.md).
> **Amendment:** freely, as work proceeds.

---

## 1 · Objective

Build the first persistent domain data: a coach can create a player, find them fast, and open a profile that is the coherent home for their history — with ownership enforced at the data layer, not the interface. This is the roadmap's S3 completion criterion, and this plan does not restate it.

Every structure, column, policy and invariant Sprint 3 touches is already fixed in the DBDS and the SDS. **Sprint 3 makes no domain decisions.** If implementation reaches a point where one seems required, it stops and the question is registered (§6), never resolved in code.

---

## 2 · Scope

### In

Derived from [`roadmap.md`](../roadmap.md) S3 and [`product-architecture.md`](../../architecture/product-architecture.md) §9.1 (`features/players`, `features/club`):

| # | In scope | Owning document |
|---|---|---|
| A | The seven startup structures — `Club`, `Membership`, `User`, `Player`, `RosterMembership`, `Assignment`, `RecordingAssertion` | [`dbds.md`](../../architecture/dbds.md) Part II |
| B | Default-deny access policies and the authorisation chain | `dbds.md` Part IV · `sds.md` §5 |
| C | Tenancy bootstrap: a registering coach becomes a club-of-one with an owner membership and a `User` record | `product-architecture.md` §7.3 · `memory-governance.md` §2.2 · provisioning mechanism specified in `sds.md` §5.6 · display-name source is an implementation note (§6) |
| D | Roster: create a player (with `RosterMembership` and coach `Assignment`), list with search | `roadmap.md` S3 · `dbds.md` Part II |
| E | Account ↔ person linking (optional `User` on a `Player`) | `product-architecture.md` §2.1 |
| F | Player profile shell with tabs, each an honest empty state | `product-architecture.md` §8.3 · `ux-principles.md` U4 |
| G | The header player switcher in S2's reserved context region | `product-architecture.md` §8.1 · sprint-02 R1 |
| H | Isolation verification between clubs | `sds.md` §9.3 ⚠️ DM-020 |

### Out, and why

| Out of scope | Because |
|---|---|
| Videos, analyses, priorities, objectives, training | Later sprints (S4–S8). The profile tabs for them ship as empty states (F), never as invented data — `product-architecture.md` §1.5 |
| The progress / evolution tab's data | Depends on measurements that do not exist until S6 — `roadmap.md` S3 risk |
| Club management UI, groups, invitations | v1.1 — `product-architecture.md` §9.2. Sprint 3 ships the club *boundary*, not its interface |
| `Declaration`, guardian roles, delegation | Blocked by DM-014, and not needed for a roster. Not in the startup set |
| An assignment targeting a group or session | DM-017A, open. Sprint 3 assigns a coach to a player only |
| Any change to the shipped authentication flow | `development-rules.md` §2 forbids touching Sprint 1 out of scope — see the display-name note (§6) |

---

## 3 · Dependencies and order

Each story depends only on the ones above it. The order is derived from the DBDS authorisation chain (`User → Membership → Club → records`): nothing can be read safely until the policies exist, and no policy has a subject to evaluate until the tenancy structures exist.

```
S3.0  Precondition gate  (approvals + migration reconciliation)
   │
S3.1 Migration 0001 — the seven startup structures
   │
S3.2 Access policies — default deny + authorisation chain
   │
S3.3 Tenancy bootstrap — club-of-one, owner membership, User record
   │
   ├── S3.4 Roster — create player + RosterMembership + Assignment, search
   │        │
   │        ├── S3.5 Account ↔ person linking
   │        └── S3.6 Player profile shell — tabs as honest empty states
   │                    │
   │                    └── S3.7 Header player switcher
   │
S3.8 Isolation verification   (spans S3.2–S3.7)
```

---

## 4 · Implementation stories

Format is identical for each. **Owning documents** are where the rules live; this plan never copies them. **Acceptance criteria** are observable; **Definition of Done** is [`development-rules.md`](../../constitution/development-rules.md) §7 plus the story's own artifact and verification.

### S3.0 · Precondition gate

| | |
|---|---|
| **Purpose** | Confirm the sprint may start at all. It is a gate, not a build. |
| **Owning documents** | `roadmap.md` (F2, G1, F3 states) · `sds.md` §4.8 |
| **Preconditions** | — |
| **Artifacts at completion** | A recorded confirmation that F2 is approved, memory governance is approved (G1), and the SDS is approved; and that the applied state of `supabase/migrations/0001_atlas_core.sql` has been established |
| **Acceptance criteria** | F2, G1, F3 all approved · the legacy migration's applied state is known and a reconciliation path is chosen (it is declared superseded by `sds.md` §4.8) |
| **Definition of Done** | The three approvals exist and the legacy migration is accounted for. **If any approval is missing, Sprint 3 does not start.** |

### S3.1 · Migration 0001 — the startup schema

| | |
|---|---|
| **Purpose** | Bring the seven startup structures into existence. |
| **Owning documents** | `dbds.md` Part II (structures, columns, constraints) · Part I (identity, tenancy, integrity, versioning) · `sds.md` §4 |
| **Preconditions** | S3.0 |
| **Artifacts at completion** | A migration creating `Club`, `Membership`, `User`, `Player`, `RosterMembership`, `Assignment`, `RecordingAssertion` exactly as the DBDS specifies; the legacy `0001_atlas_core.sql` superseded per `sds.md` §4.8 |
| **Acceptance criteria** | Every structure and column matches the DBDS · opaque system identity on every root (G1) · **nothing cascades to deletion** (G5) · `Player` and `User` are not club-scoped, every other structure carries its `Club` (G3) · no structure introduced that the DBDS does not list |
| **Definition of Done** | §7 met · the migration applies cleanly to an empty database and is reversible or forward-only by an explicit, recorded choice · **no column or constraint was invented** — each traces to the DBDS |

### S3.2 · Access policies

| | |
|---|---|
| **Purpose** | Make every record unreachable unless a rule authorises it. **The highest-consequence story in the sprint.** |
| **Owning documents** | `dbds.md` Part IV · `sds.md` §5 |
| **Preconditions** | S3.1 |
| **Artifacts at completion** | Row-level policies implementing default-deny and the `User → Membership → Club` chain; the subject-scoped rule for `Player` and `IdentityMemory`; the tenant-scoped rule for everything else |
| **Acceptance criteria** | Default deny holds — a record with no authorising rule is unreachable · membership grants visibility, assignment grants authority, and the two are not conflated (`sds.md` §5.2) · a club reaches a person only through a `RosterMembership` it owns · no policy is enforced only in the UI |
| **Definition of Done** | §7 met · every startup structure has an explicit policy · **its verification is S3.8** — and the *method* of verification is ⚠️ **DM-020**, which gates this story's completion |

### S3.3 · Tenancy bootstrap

| | |
|---|---|
| **Purpose** | Turn a registered coach into a club-of-one with an owner membership and a `User` record — the cold start. |
| **Owning documents** | `product-architecture.md` §7.3 · `memory-governance.md` §2.2 · `features/club` (`product-architecture.md` §9.1) |
| **Preconditions** | S3.2 |
| **Artifacts at completion** | The `features/club` slice: on a coach's first authenticated presence, a `Club` (kind: independent), an owner `Membership`, a `User` record, and the club's own `RecordingAssertion` exist |
| **Acceptance criteria** | A coach with a valid session belongs to exactly one club and can therefore create their first player · the club asserts the Recording Authority under which future records exist (`memory-governance.md` §2.2) · no player can be created by a coach with no membership |
| **Definition of Done** | §7 met · the cold start works end to end from a fresh account · **the provisioning mechanism is taken from the `sds.md` §5.6 specification, and the display-name source from the implementation note (§6) — neither is decided in this story** |

### S3.4 · Roster

| | |
|---|---|
| **Purpose** | Create and find players. |
| **Owning documents** | `dbds.md` Part II (`Player`, `RosterMembership`, `Assignment`) · `product-architecture.md` §8.4 (`/players`, `/players/new`) · `product-principles.md` §7 |
| **Preconditions** | S3.3 |
| **Artifacts at completion** | The `features/players` slice: create a player (opening a `RosterMembership` and a coach `Assignment`), and a search-first roster list |
| **Acceptance criteria** | Creating a player opens its `RosterMembership` in the coach's club, a self-`Assignment` carrying training authority, and its `RecordingAssertion` — no player memory exists before the assertion authorising it (`memory-governance.md` §3) · a player with no account is the normal case (`user →` optional) · roster search is the fastest path to a player (`product-principles.md` §7) · a coach sees only players in a club they belong to |
| **Definition of Done** | §7 met · a coach creates a player and finds them by search · the roster renders from real rows behind the S2 service-boundary pattern · no attribute of the *person* is stored on a club-scoped structure and vice versa (`dbds.md` `Player` vs `RosterMembership`) |

### S3.5 · Account ↔ person linking

| | |
|---|---|
| **Purpose** | Let a player optionally be linked to an account. |
| **Owning documents** | `product-architecture.md` §2.1 · `dbds.md` `Player` (`user →` optional) |
| **Preconditions** | S3.4 |
| **Artifacts at completion** | The ability to associate a `Player` with a `User`, and the absence of that association as the default |
| **Acceptance criteria** | The link is optional and absent by default · linking never makes a club-scoped fact follow the person, nor the reverse · an unlinked player is fully functional |
| **Definition of Done** | §7 met · a player can be created, listed and opened whether or not linked · the link is `0:1` and never required |

### S3.6 · Player profile shell

| | |
|---|---|
| **Purpose** | The coherent home for a player, with tabs that will fill in later sprints. |
| **Owning documents** | `product-architecture.md` §8.3 (the six tabs) · `ux-principles.md` U4 (no unexplained empty screen) · `product-principles.md` §7 |
| **Preconditions** | S3.4 |
| **Artifacts at completion** | `/players/[id]` with its tabs; each tab whose data arrives in a later sprint renders an honest, explained empty state |
| **Acceptance criteria** | Every tab exists and resolves — zero broken links · empty tabs say *why* they are empty and what will fill them, never a blank or a fabricated figure (`product-architecture.md` §1.5) · the profile is the single home for the player, not data scattered across sections |
| **Definition of Done** | §7 met · the profile opens for any player · no tab invents data · the breadcrumb resolves the player's name rather than the raw id (the S2 extension point) |

### S3.7 · Header player switcher

| | |
|---|---|
| **Purpose** | Carry *which player* in the header, per the four navigation planes. |
| **Owning documents** | `product-architecture.md` §8.1 · sprint-02 R1 (the reserved centre region) |
| **Preconditions** | S3.6 |
| **Artifacts at completion** | The switcher rendered in the header's reserved context region, driving the contextual plane |
| **Acceptance criteria** | The switcher fills the region S2 left empty — no new header structure is invented · switching player changes context without a full navigation · it is a switcher and a search, never a growing list in the chrome (`product-architecture.md` §8.1) |
| **Definition of Done** | §7 met · the switcher works on desktop and mobile · the header still composes as three regions |

### S3.8 · Isolation verification

| | |
|---|---|
| **Purpose** | Demonstrate — not assert — that a coach in one club cannot reach a player in another. |
| **Owning documents** | `sds.md` §9.3 · `dbds.md` Part IV |
| **Preconditions** | S3.2 (spans S3.2–S3.7) |
| **Artifacts at completion** | A demonstration that cross-club access is denied at the data layer |
| **Acceptance criteria** | Two clubs, two coaches: neither reads nor writes the other's players, memberships or assignments · the demonstration exercises the data layer, not the UI (`sds.md` §9.3) |
| **Definition of Done** | §7 met · **the required level of verifiability is ⚠️ DM-020**, which is open; until it resolves, this story has no completion criterion and the sprint cannot close on isolation |

---

## 5 · Validations

What is verified at the end of each story. All derive from [`development-rules.md`](../../constitution/development-rules.md) §4/§7 and [`sds.md`](../../architecture/sds.md) §9; none is new.

| After | Verify |
|---|---|
| Every story | `lint`, `build` and type-check green (`development-rules.md` §7) · zero broken links · only in-scope files touched |
| S3.1 | The migration applies to an empty database · the schema matches the DBDS structure for structure · nothing cascades to deletion |
| S3.2 | Default deny holds for every startup structure · no policy lives only in the UI |
| S3.3 | The cold start succeeds from a fresh account · a coach with no membership cannot create a player |
| S3.4–S3.5 | A player is created, found by search, opened, and optionally linked · person data and club data are on the correct structures |
| S3.6 | Every profile tab resolves · no empty tab is unexplained · no tab fabricates data |
| S3.7 | The switcher drives context from the reserved region · the header layout is unchanged in structure |
| S3.8 | Cross-club isolation demonstrated at the data layer — **method pending DM-020** |

**The layer rule** (`sds.md` §9.2) is checkable statically throughout: `features/players` and `features/club` consume downward only and never import upward.

---

## 6 · Risks — open decisions that still affect this sprint

Only those that touch Sprint 3 — whether by gating a §7 criterion or by blocking closure. **This plan does not decide their effect; it inherits it** from the owning documents ([`data-model.md`](../../architecture/data-model.md), [`dbds.md`](../../architecture/dbds.md), [`roadmap.md`](../roadmap.md)). Full register: [`open-decisions.md`](../open-decisions.md).

| Decision | Effect on Sprint 3 | Severity |
|---|---|---|
| **DM-020** — required level of verifiability | **S3.2 and S3.8 have no completion criterion until it resolves.** The sprint can build the policies but cannot *close* on "enforced at the data layer" without a decided verification standard | **Blocking for closure** |
| **DM-013 · DM-014 · DM-015** — the Data Model's Part VII | **Subsumed by §7 criterion 1.** [`data-model.md`](../../architecture/data-model.md) gates F2's approval on these, so criterion 1 (F2 approved) cannot hold until they are answered. They do not touch the seven startup structures — their effect on the sprint is the F2 gate, not the schema. **Inherited from the Data Model, not decided here** | Gate F2 approval |
| **DM-016 · DM-017A · DM-019 · DM-022** — outside the startup set | Touch structures the startup set does not include; not in the Data Model's Part VII, and the scoped DBDS approval (§7 criterion 3: Part II + Part IV) carries no blocker for them. Sprint 3 assigns a coach to a player only, so DM-017A adds no target. They gate none of §7's criteria | None (on the gate) |

**Two implementation dependencies, not architectural decisions.** A classification audit withdrew both from the open-decisions register as non-domain (they change no entity, relationship, ownership, invariant, authority, lifecycle or model rule):

- **The tenancy-bootstrap provisioning mechanism** (S3.3) — which component instantiates the club-of-one, owner membership and `User`, and when. The domain content is fixed (`product-architecture.md` §7.3, `memory-governance.md` §2.2); the mechanism is specified in [`sds.md`](../../architecture/sds.md) §5.6 (trigger, order, atomicity, failure, and the runtime / migration / Sprint 3 split), and S3.3 realises it.
- **The `User` display-name source** (S3.3) — Sprint 1's registration collects only email and password, and the DBDS gives `User` a display name that serves only the interface. This is an implementation/UX choice for S3.3: default to the email, editable in Settings, without touching the shipped auth flow (`development-rules.md` §2). Decided when S3.3 is built; recorded here so it is not decided silently in code.

**Resolved and load-bearing for this sprint:** DM-018 (`Player` + `RosterMembership`) and DM-023 (`User` carries identity, no `Profile`). Both are already reflected in the DBDS the stories point at.

---

## 7 · Criteria to begin Migration 0001

Migration 0001 is S3.1. It may begin only when **all** of the following hold:

1. **F2 approved** — the Data Model is no longer Candidate.
2. **G1 approved** — [`memory-governance.md`](../../constitution/memory-governance.md) is accepted, recorded as an ADR per its completion criterion.
3. **The DBDS startup structures are approved** — at least Part II for the seven structures and Part IV for their access model.
4. **The legacy migration is reconciled** — `0001_atlas_core.sql`'s applied state is known and it is superseded per `sds.md` §4.8.
5. **The tenancy-bootstrap provisioning mechanism is specified** in [`sds.md`](../../architecture/sds.md) §5.6 — ✅ **met.** The `User` structure's provisioning is now fixed (trigger, order, atomicity, failure, and the runtime / migration / Sprint 3 split). (The display-name source is an S3.3 implementation note, §6, and does not gate the migration.)

**The open decisions add no criterion beyond the five above.** DM-013, DM-014 and DM-015 are already inside criterion 1: [`data-model.md`](../../architecture/data-model.md) gates F2's approval on them, so criterion 1 (F2 approved) cannot hold until they are answered. DM-016, DM-017A, DM-019 and DM-022 touch structures outside the startup set and the scoped DBDS approval, so they gate none of criteria 1–5. This plan inherits these positions from the owning documents; it does not decide them.

---

## 8 · Self-audit of this plan

**Does it reuse the existing architecture correctly?** Yes. Every story names its owning document and states rules by reference. No schema column, policy, or entity definition is written here — the DBDS and SDS hold them.

**Does it duplicate any rule?** No rule is restated. The tables carry *pointers* (document + section), not content. The one place duplication was tempting — listing each structure's columns per story — was deliberately avoided; the stories say "as the DBDS specifies."

**Does any story take a domain decision?** No. Two gaps surfaced during writing; a later classification audit found neither is architectural. The provisioning *mechanism* is specified in [`sds.md`](../../architecture/sds.md) §5.6; the display-name source is an S3.3 implementation/UX note (§6). Both are implementation dependencies, not domain decisions, and neither is answered here.

**Can the sprint be implemented from this plan plus the owning documents?** Yes, once §7's criteria hold. A future implementation session needs this plan for *what and in what order*, and the DBDS/SDS/memory-governance for *how and under what rules*. It needs no other source, and it makes no architectural decision — every such decision is either already in an owning document or registered as open.

**Over-specification removed:** an earlier draft of S3.4 listed the columns of `Player` and `RosterMembership`; removed in favour of a pointer to the DBDS, since restating them here would create a second place for them to drift.

---

_This document plans the execution of Sprint 3. It inherits the approved architecture and decides nothing about the domain. It changes freely as the work proceeds._
