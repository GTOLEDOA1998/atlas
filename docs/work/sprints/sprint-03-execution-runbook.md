# Sprint 3 — Execution Runbook · Migration 0001 → Sprint 3 close

> **Status:** Prepared. An operational runbook, not a plan of record. **It decides nothing.**
> **Tier:** 4 — Work. It sequences execution; it owns no domain rule, schema column, policy or entity.
> **Owns:** the *operational* order of execution — environment preparation, the legacy-migration verification procedure, the decomposition of Migration 0001 into dependent steps, the bootstrap component's consumed/produced contracts, and the end-of-sprint validation procedure.
> **Inherits, and never restates:** [`sprint-03-players.md`](sprint-03-players.md) (the WHAT and the story order) · [`dbds.md`](../../architecture/dbds.md) · [`sds.md`](../../architecture/sds.md) (§5.6 the bootstrap mechanism) · [`data-model.md`](../../architecture/data-model.md) · [`product-architecture.md`](../../architecture/product-architecture.md) · [`memory-governance.md`](../../constitution/memory-governance.md) · [`tech-stack.md`](../../architecture/tech-stack.md) · [`development-rules.md`](../../constitution/development-rules.md).
> **Does not own:** any rule in the documents above. Where a step needs a rule, it *points* at the owning document and section — the engineer reads it there. Where this runbook appears to decide a domain question, this runbook is defective and the question belongs in [`open-decisions.md`](../open-decisions.md).
> **Language:** English, to match the rest of the corpus (interface copy remains Spanish — `product-architecture.md` Part VIII).
> **Amendment:** freely, as work proceeds.

---

## How to read this runbook

Six phases, executed in order. Every step carries the same six fields: **Objetivo · Entradas · Salidas · Criterio de finalización · Riesgos · Dependencias.** A step never begins until its dependencies are *Done*. No step reinterprets architecture: it names the owning document, and the engineer reads the rule at the source.

**Hard boundaries for the whole runbook** (`development-rules.md` §2, §8): the Feature First layout is fixed; Sprint 1's authentication flow is not touched; no new dependency, entity, column, policy semantic or decision is introduced. Everything traceable to an owning document, or it does not happen.

**Phase map**

```
P1 Environment ─▶ P2 Legacy 0001 (verify only) ─▶ P3 Migration 0001 ─▶ P4 Bootstrap ─▶ P5 Roster ─▶ P6 Validation
   what must exist    what must be verified          tables + RLS         features/club    S3.4–S3.7    close criteria
```

---

# Phase 1 · Environment preparation

*What must exist before Supabase is opened.*

### Step 1.0 — Precondition gate (S3.0)

- **Objetivo:** confirm Sprint 3 may start at all — it is a gate, not a build.
- **Entradas:** `roadmap.md` phase states (F2, G1, F3/DBDS) · `sprint-03-players.md` §7.
- **Salidas:** a recorded confirmation that F2 is approved, G1 (memory governance) is approved as an ADR, and the DBDS startup structures (Part II) and access model (Part IV) are approved.
- **Criterio de finalización:** the three approvals exist and are recorded. **If any is missing, Phase 1 stops here** (`sprint-03-players.md` S3.0 DoD).
- **Riesgos:** starting on unapproved F2/G1 — the exact silent divergence ADR-0001 §4 forbids. The migration would be rewritten against real data later.
- **Dependencias:** none.

### Step 1.1 — Working branch and scope

- **Objetivo:** an isolated branch off `main`, one feature for the sprint.
- **Entradas:** `development-rules.md` §2 (one feature per sprint), §6 (small commits).
- **Salidas:** a Sprint 3 branch; a shared understanding that only `features/players`, `features/club`, `supabase/migrations`, and the header context region (S2 reserved) are in scope.
- **Criterio de finalización:** branch created; scope written down; `main` untouched.
- **Riesgos:** scope creep into auth or shell files (`development-rules.md` §2 forbids touching Sprint 1 out of scope).
- **Dependencias:** 1.0.

### Step 1.2 — Toolchain and a green baseline

- **Objetivo:** the app builds and lints *before* any change, so regressions are attributable.
- **Entradas:** `app/package.json` (`build`, `lint`) · `app/AGENTS.md`.
- **Salidas:** `npm run build` and `npm run lint` green on the untouched branch; the Supabase CLI installed and available.
- **Criterio de finalización:** both scripts pass on a clean checkout; `supabase --version` responds.
- **Riesgos:** **This is a modified Next.js** — `AGENTS.md` requires reading `node_modules/next/dist/docs/` before writing code; APIs may differ from training data. Skipping this produces confidently-wrong code. The server entry is `proxy.ts`, not `middleware.ts` (`tech-stack.md`).
- **Dependencias:** 1.1.

### Step 1.3 — Supabase project and credentials

- **Objetivo:** a Postgres/Supabase target the migration and the app can reach.
- **Entradas:** `tech-stack.md` (Supabase + Postgres, RLS authoritative) · `app/src/lib/env.ts`.
- **Salidas:** a Supabase project (local stack via `supabase start`, or a linked cloud project) and `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
- **Criterio de finalización:** `env.ts` no longer fails fast; the app boots against the project; the target for Phase 2's verification is unambiguous (which project, local or cloud).
- **Riesgos:** only the **anon key** is wired today (`env.ts` exposes URL + anon key; no service-role). **RLS is therefore the authoritative boundary** (`tech-stack.md`) — every write in P3/P4 runs under a user session, not a privileged role. Adding a service-role path would be a new dependency/config requiring approval (`development-rules.md` §8) and is out of scope.
- **Dependencias:** 1.2.

### Step 1.4 — Confirm the Sprint 1 auth baseline

- **Objetivo:** a real authenticated session exists to build the cold start on.
- **Entradas:** shipped auth (`features/auth`, `proxy.ts`, `/auth/callback`) · `roadmap.md` S1.
- **Salidas:** register + login + recovery verified end-to-end against the Phase 1.3 project.
- **Criterio de finalización:** a fresh account can register and reach a protected route; `proxy.ts` validates the session server-side (`getUser()`).
- **Riesgos:** treating auth as modifiable. It is frozen; the bootstrap (P4) attaches *after* it, never inside it.
- **Dependencias:** 1.3.

---

# Phase 2 · Legacy `0001` reconciliation — verify only, change nothing

> **✅ Executed 2026-08-05.** Outcome: the legacy migration's applied state was established as **not applied** (Supabase `public` = 0 tables; none of the six legacy tables exists; no applied migration history), and the artifact was **archived** from `supabase/migrations/` to `supabase/legacy/0001_atlas_core.sql` by Product Owner authorisation — no SQL run, Supabase not modified. The authoritative record lives in [`sprint-03-players.md`](sprint-03-players.md) S3.0. The steps below are retained as the reusable procedure (e.g. for a fresh environment).

*Originally: the legacy `0001` existed under `supabase/migrations/`, was declared superseded by `sds.md` §4.8, and its applied state was unverified. This phase establishes facts and records a chosen path.*

### Step 2.1 — Establish the applied state

- **Objetivo:** answer, with evidence, whether the legacy migration was ever applied to the Phase 1.3 target.
- **Entradas:** `supabase/migrations/0001_atlas_core.sql` · `sds.md` §4.8 · the target project's migration history / table list.
- **Salidas:** a recorded finding — *applied* (its tables exist: `profiles`, `players`, `videos`, `analyses`, `observations`, `recommendations`) or *never applied* (absent). This is the S3.0 artifact "the legacy migration's applied state is known."
- **Criterio de finalización:** the finding is written down and unambiguous for the chosen target.
- **Riesgos:** verifying against the wrong project (local vs cloud) and drawing a false conclusion. Note: the repo has **no `supabase/config.toml` and no `.temp` link state**, which suggests never-applied — a suggestion, not proof; confirm against the actual target.
- **Dependencias:** 1.3.

### Step 2.2 — Confirm it is unreferenced and superseded

- **Objetivo:** confirm nothing in the app depends on the legacy schema.
- **Entradas:** `app/src` · `sds.md` §4.8 (declares it superseded in full — wrong tenancy, wrong cascades, `ANALYZED` state, every player forced to hold an account).
- **Salidas:** a recorded confirmation that no code imports or queries the legacy tables (`profiles`, `players.profile_id`, …).
- **Criterio de finalización:** the codebase has zero references to the legacy structures (a search of `src` returns nothing).
- **Riesgos:** assuming supersession without checking usage. *(Baseline check at authoring time: no references found.)*
- **Dependencias:** 2.1.

### Step 2.3 — Record the reconciliation path (do not execute)

- **Objetivo:** capture, at the S3.0 gate, *how* the `0001` slot will be freed for the new migration — without performing it here.
- **Entradas:** 2.1 + 2.2 findings · `sprint-03-players.md` S3.0 (criterion 4: "a reconciliation path is chosen") · `development-rules.md` §8 (renaming files needs approval).
- **Salidas:** a recorded, approved choice (e.g. supersede-in-place vs. renumber the new migration) with its rationale. **The choice is the team's at the gate; this runbook does not make it.**
- **Criterio de finalización:** the path is written down and approved; the number collision with the new Migration 0001 has a decided resolution.
- **Riesgos:** deleting or overwriting the legacy file before its applied state (2.1) is known could destroy or diverge from a live schema. **No edit occurs in Phase 2.**
- **Dependencias:** 2.1, 2.2.

---

# Phase 3 · Migration 0001

*The DB artifact: the seven startup structures plus their default-deny access model (`sprint-03-players.md` S3.1–S3.2). Steps are ordered so each depends only on prior steps. Structure only — **no rows are ever seeded** (`sds.md` §5.6.4).*

**Owning documents for every step below:** `dbds.md` Part I (identity G1, business identity G2, tenancy G3, provenance G4, integrity G5, temporal G6, versioning G7, audit G8) and Part II (each structure's columns and constraints) · `sds.md` §4. **No column or constraint is invented; each traces to the DBDS** (`sprint-03-players.md` S3.1 DoD).

### Step 3.0 — Migration scaffolding

- **Objetivo:** create the new migration file in the freed slot with the identity/tenancy conventions in place.
- **Entradas:** Phase 2.3 recorded path · `dbds.md` G1 (opaque system identity), G6 (created timestamps).
- **Salidas:** an empty, ordered migration file adopting opaque system identity and the created-at convention; reversible-or-forward-only recorded as an explicit choice (`sprint-03-players.md` S3.1 DoD).
- **Criterio de finalización:** the file exists in the correct slot and applies (empty) to a clean database.
- **Riesgos:** number collision unresolved (depends on 2.3); choosing reversibility silently instead of recording it.
- **Dependencias:** Phase 2 complete.

### Step 3.1 — `Club`

- **Objetivo:** the tenancy boundary and first identity subject.
- **Entradas:** `dbds.md` Part II `Club`.
- **Salidas:** the `Club` structure (name · kind independent/institution · status · created).
- **Criterio de finalización:** matches the DBDS structure-for-structure; a dissolved club retains its records (G5).
- **Riesgos:** adding attributes the DBDS does not list.
- **Dependencias:** 3.0.

### Step 3.2 — `User`

- **Objetivo:** the account and the identity of its holder; not club-scoped.
- **Entradas:** `dbds.md` Part II `User` · `data-model.md` §2.3.
- **Salidas:** the `User` structure (account reference · display name · locale · avatar reference · created), with **one `User` per account** (the uniqueness the domain implies by making `User` the holder's identity; also the idempotency key P4 relies on — `sds.md` §5.6.3).
- **Criterio de finalización:** matches the DBDS; credentials never stored here (owned by auth); closure is a state, not deletion.
- **Riesgos:** re-introducing a `Profile` (withdrawn, DM-023) or a mandatory account link.
- **Dependencias:** 3.0. *(Independent of 3.1; either root may be created first.)*

### Step 3.3 — `Membership` *(contained in `Club`)*

- **Objetivo:** access and role within a club — the first link of the authorization chain.
- **Entradas:** `dbds.md` Part II `Membership`.
- **Salidas:** `Membership` (user → · club → · role owner/coach/staff · scope · status · granted-by → · granted-at).
- **Criterio de finalización:** role vocabulary closed to the three values; a revoked membership is retained; grants visibility, **not** training authority.
- **Riesgos:** conflating membership (visibility) with assignment (authority) — `sds.md` §5.2.
- **Dependencias:** 3.1, 3.2.

### Step 3.4 — `Player` *(the person)*

- **Objetivo:** the athlete as a person, held once, not club-scoped.
- **Entradas:** `dbds.md` Part II `Player` (DM-018).
- **Salidas:** `Player` (user → **optional** · given name · family name · birth date or age band — only what is true regardless of club).
- **Criterio de finalización:** the account link is `0:1` and absent by default; dominant hand / style / level absent here (they are club-scoped or `IdentityMemory`).
- **Riesgos:** placing club-scoped attributes on the person (the fused-record error DM-018 dissolved).
- **Dependencias:** 3.2 *(optional `user →` FK target must exist)*.

### Step 3.5 — `RosterMembership` *(the person in a club)*

- **Objetivo:** the tenancy anchor for the club's record of the athlete.
- **Entradas:** `dbds.md` Part II `RosterMembership` (DM-018).
- **Salidas:** `RosterMembership` (club → · player → · status · enrolled/left · dominant hand · playing style — declared, club-scoped).
- **Criterio de finalización:** `(player, club)` unique among active memberships; retained with the club on transfer; hosts `Assignment`.
- **Riesgos:** treating a transfer as a new person (it opens a new membership, never mints a `Player`).
- **Dependencias:** 3.1, 3.4.

### Step 3.6 — `Assignment` *(contained in `RosterMembership`)*

- **Objetivo:** who coaches whom — carries training authority.
- **Entradas:** `dbds.md` Part II `Assignment` (DM-018).
- **Salidas:** `Assignment` (coach user → · roster membership → · scope · authority kind · granted-by → · from · until).
- **Criterio de finalización:** lives inside a `RosterMembership`; `until` supports the temporary coach; carries authority that `Membership` does not.
- **Riesgos:** DM-017A is open — an assignment to a *group or session* is **out of scope**; Sprint 3 assigns a coach to a player only (`sprint-03-players.md` §2 Out).
- **Dependencias:** 3.3, 3.5.

### Step 3.7 — `RecordingAssertion`

- **Objetivo:** the permission-to-hold-memory decision, one per `(subject, club)`.
- **Entradas:** `dbds.md` Part II `RecordingAssertion` (DM-025) · `memory-governance.md` §2, §3, §8.2.
- **Salidas:** `RecordingAssertion` (club → · subject kind club/coach/group/player · subject → · asserted-by user → · asserted-at · status · revoked-at).
- **Criterio de finalización:** one active row per `(subject, club)`; never edited (revocation is a status change); its own L4 tombstone (survives directed forgetting).
- **Riesgos:** modelling it as a per-record column instead of a resolvable structure (`memory-governance.md` §3 is met by resolvability).
- **Dependencias:** 3.1, 3.2 *(references `Club` and the asserting `User`)*.

### Step 3.8 — Enable RLS + default-deny on all seven (S3.2)

- **Objetivo:** make every record unreachable unless a rule authorizes it — the highest-consequence step.
- **Entradas:** `dbds.md` Part IV · `sds.md` §5.1.
- **Salidas:** RLS enabled on all seven structures; a default-deny posture (no permissive default).
- **Criterio de finalización:** a record with no authorizing rule is unreachable; no policy lives only in the UI.
- **Riesgos:** leaving a table without RLS enabled — a silent leak. Verified in Phase 6.
- **Dependencias:** 3.1–3.7.

### Step 3.9 — Authorization-chain policies (S3.2)

- **Objetivo:** implement the four access regimes.
- **Entradas:** `dbds.md` Part IV (regimes table) · `sds.md` §5.2–§5.3.
- **Salidas:** tenant-scoped policies via `User → Membership → Club`; the subject-scoped rule for `Player` (a club reaches a person through a `RosterMembership` it owns); membership grants visibility, assignment grants authority.
- **Criterio de finalización:** every startup structure has an explicit policy; the two questions (visibility vs authority) are not conflated.
- **Riesgos:** **the bootstrap chicken-and-egg** — a just-registered coach has *no* membership yet, so the chain denies everything, including creating their own club. The policy set must permit a session with no membership to create exactly its **own** club-of-one and nothing else. This constraint is realized here and consumed by P4; it is not a new decision — it realizes the cold start (`sds.md` §5.6, `data-model.md` §1.3). **The *method of proving* isolation is `DM-020`, open — it gates S3.2 *closure*, not authoring (`sprint-03-players.md` S3.2 DoD).**
- **Dependencias:** 3.8.

### Step 3.10 — Integrity and empty-DB verification

- **Objetivo:** prove Migration 0001 realizes the DBDS invariants.
- **Entradas:** `dbds.md` G3, G5 · `sprint-03-players.md` §5 (after S3.1).
- **Salidas:** the migration applies cleanly to an empty database; **nothing cascades to deletion** (G5); every structure carries its `Club` except `User` and `Player` (G3).
- **Criterio de finalización:** clean apply on empty DB; no delete-cascade anywhere; no structure exists that the DBDS does not list.
- **Riesgos:** an inherited `on delete cascade` from the legacy mindset — the one integrity rule the repo already violated once (`sds.md` §4.5).
- **Dependencias:** 3.1–3.9.

---

# Phase 4 · Bootstrap implementation

*The realization of `sds.md` §5.6. Component: the **`features/club`** server-side provisioner (`product-architecture.md` §9.1, Tenancy).*

**Contracts consumed (inputs the component relies on):**
- a validated authenticated session — Sprint 1 (`proxy.ts` `getUser()`, `createServerSupabaseClient` in `src/lib/supabase/server.ts`);
- the seven structures + policies of Phase 3, including the self-provisioning allowance of Step 3.9;
- the fixed domain facts of `sds.md` §5.6 — trigger = *no `Membership`*; the four records; the creation order; single atomic unit; idempotency key = one `User` per account.

**Contracts produced (outputs other stories rely on):**
- on first authenticated presence, the atomic quartet `User → Club → Membership → RecordingAssertion(subject=club)`;
- the invariant *"the coach belongs to exactly one club"* that S3.4 roster consumes;
- an idempotent no-op on every later request; a rolled-back, explained, retryable state on failure.

### Step 4.1 — `features/club` slice skeleton

- **Objetivo:** a Feature First home for the provisioner.
- **Entradas:** `development-rules.md` §1 (the `auth` slice is the reference shape).
- **Salidas:** `features/club` with a service and a public barrel (`index.ts`), matching the `auth` layout.
- **Criterio de finalización:** the slice compiles and exposes a clean surface; cross-feature use goes through the barrel.
- **Riesgos:** scattering club logic outside the slice; importing internals across features.
- **Dependencias:** Phase 3 complete.

### Step 4.2 — Trigger detection at the authenticated boundary

- **Objetivo:** detect the *no-`Membership`* state on the first authenticated server-side entry.
- **Entradas:** `sds.md` §5.6.1 · `proxy.ts` (the boundary Sprint 1 established) · `data-model.md` §1.3 (the cold-start condition).
- **Salidas:** a server-side check that resolves the session's account to its `Membership` (or its absence) at first domain entry — **not** in `/auth/callback`, **not** in the `proxy.ts` hot path if it would run a transaction on every request.
- **Criterio de finalización:** the condition is evaluated once per entry, server-side, after session validation and before the first default-denied read; the auth flow is unmodified.
- **Riesgos:** placing the transaction in `proxy.ts` (runs on every matched request — expensive); or in the PKCE callback (owned by Sprint 1, excluded by the `proxy.ts` matcher). The exact seam is Sprint 3 code, but these two are forbidden.
- **Dependencias:** 4.1.

### Step 4.3 — Atomic four-record provisioning

- **Objetivo:** create the quartet as a single all-or-nothing unit.
- **Entradas:** `sds.md` §5.6.2–§5.6.3 · `dbds.md` Part III (atomic write group "a subject-in-a-club with its `RecordingAssertion`") · Step 3.9 self-provisioning allowance.
- **Salidas:** the four records committed together, in the order `User → Club → Membership → RecordingAssertion`.
- **Criterio de finalización:** no reader ever observes a partial state (a `User` without `Membership`, a club without an owner, a club subject without its assertion).
- **Riesgos:** **atomicity cannot be met by four sequential PostgREST inserts under `@supabase/ssr`** — those are independent round-trips, not one transaction. A single transactional path (one server-side database routine invoked once) is required. This is a realization consequence of `sds.md` §5.6.3, not a new decision; flag it, and keep the transactional mechanism inside `features/club`.
- **Dependencias:** 4.2.

### Step 4.4 — Idempotency and concurrency

- **Objetivo:** exactly one bootstrap per account, even under races.
- **Entradas:** `sds.md` §5.6.1, §5.6.3 · Step 3.2 (one `User` per account).
- **Salidas:** a no-op when a `Membership` already exists; concurrent first requests resolve to a single club via the one-`User`-per-account key.
- **Criterio de finalización:** two tabs / a retry racing the original never mint two clubs; the second finds the committed records and no-ops.
- **Riesgos:** relying on read-then-write without the uniqueness anchor (write skew → two clubs).
- **Dependencias:** 4.3.

### Step 4.5 — Failure handling

- **Objetivo:** a failed bootstrap is safe and self-healing.
- **Entradas:** `sds.md` §5.6.3 · `product-principles.md` §8 (honest progress, never leave the user wondering).
- **Salidas:** full rollback on any partial failure; the account returns to the pre-bootstrap state; the next request retries; the UI shows an explained, retryable state, never a blank or a half-built club.
- **Criterio de finalización:** an injected mid-transaction failure leaves zero residue and recovers on the next authenticated request.
- **Riesgos:** surfacing a blank screen instead of an explained state under default deny.
- **Dependencias:** 4.4.

---

# Phase 5 · Roster implementation

*Stories S3.4–S3.7 (`sprint-03-players.md`). Every rule lives in the owning documents named per step; this phase adds only sequencing.*

**User stories covered:** create a player and find them fast (S3.4) · optional account↔person linking (S3.5) · the player profile shell with honest empty tabs (S3.6) · the header player switcher (S3.7).

**Explicitly out of scope** (`sprint-03-players.md` §2 Out): videos, analyses, priorities, objectives, training *data* (S4+; their tabs ship as empty states) · the progress/evolution tab's data (needs S6 measurements) · club management UI, groups, invitations (v1.1) · `Declaration`, guardian roles, delegation (DM-014; not in the startup set) · an assignment targeting a group or session (DM-017A).

### Step 5.1 — Create player + `RosterMembership` + `Assignment` + `RecordingAssertion` (S3.4)

- **Objetivo:** a coach creates a player who becomes rostered, self-assigned, and authorized for memory.
- **Entradas:** `features/players` (`product-architecture.md` §9.1) · `dbds.md` Part II (`Player`, `RosterMembership`, `Assignment`, `RecordingAssertion`) · `memory-governance.md` §3 · P4's "coach belongs to one club".
- **Salidas:** creation opens a `RosterMembership` in the coach's club, a self-`Assignment` carrying training authority, and the player's `RecordingAssertion` — **no player memory exists before the assertion** (`memory-governance.md` §3); rendered behind the S2 service-boundary pattern.
- **Criterio de finalización:** a player with no account is the normal case (`user →` optional); the four writes are consistent with the person/club split; a coach sees only players in a club they belong to.
- **Riesgos:** storing person attributes on the club-scoped structure or vice-versa (`dbds.md` `Player` vs `RosterMembership`); writing memory before the assertion.
- **Dependencias:** Phase 4 complete.

### Step 5.2 — Roster list, search-first (S3.4)

- **Objetivo:** search is the fastest path to a player.
- **Entradas:** `product-architecture.md` §8.4 (`/players`), §8.1 · `product-principles.md` §7.
- **Salidas:** a search-first roster at `/players` rendering real rows.
- **Criterio de finalización:** a coach finds a player by search; the list shows only their club's players.
- **Riesgos:** a growing sidebar list instead of a switcher/search (`product-architecture.md` §8.1).
- **Dependencias:** 5.1.

### Step 5.3 — Account ↔ person linking (S3.5)

- **Objetivo:** a player may optionally be linked to an account.
- **Entradas:** `product-architecture.md` §2.1 · `dbds.md` `Player` (`user →` optional).
- **Salidas:** the ability to associate a `Player` with a `User`, absent by default.
- **Criterio de finalización:** the link is `0:1`, never required; an unlinked player is fully functional; linking never makes a club-scoped fact follow the person.
- **Riesgos:** making the link mandatory (the legacy `profile_id NOT NULL` error).
- **Dependencias:** 5.1.

### Step 5.4 — Player profile shell (S3.6)

- **Objetivo:** the coherent home for a player, tabs that fill in later sprints.
- **Entradas:** `product-architecture.md` §8.3 (the six tabs) · `ux-principles.md` U4 · `product-principles.md` §7.
- **Salidas:** `/players/[id]` with its tabs; every future-data tab renders an honest, explained empty state.
- **Criterio de finalización:** every tab resolves (zero broken links); empty tabs say *why* they are empty and what will fill them; the breadcrumb resolves the player's name (the S2 extension point), never invents data (`product-architecture.md` §1.5).
- **Riesgos:** fabricating placeholder metrics that could never derive from video/coach input (`product-architecture.md` §1.5).
- **Dependencias:** 5.1.

### Step 5.5 — Header player switcher (S3.7)

- **Objetivo:** carry *which player* in the header's reserved context region.
- **Entradas:** `product-architecture.md` §8.1 · `sprint-02` R1 (the reserved centre region).
- **Salidas:** the switcher rendered in the region S2 left empty, driving the contextual plane.
- **Criterio de finalización:** switching changes context without a full navigation; it is a switcher + search, not a growing list; the header still composes as three regions; works on desktop and mobile.
- **Riesgos:** inventing a new header structure instead of filling the reserved region.
- **Dependencias:** 5.4.

---

# Phase 6 · Validation

*What must be true before Sprint 3 is considered done. All criteria derive from `development-rules.md` §7, `sprint-03-players.md` §5, and `sds.md` §9 — none is new.*

### Step 6.1 — Per-story gates (continuous)

- **Objetivo:** every story meets the standing quality bar.
- **Entradas:** `development-rules.md` §7 · `sprint-03-players.md` §5.
- **Salidas:** `lint`, `build`, type-check green; zero broken links; only in-scope files touched; the layer rule holds statically (`features/players`, `features/club` import downward only — `sds.md` §9.2).
- **Criterio de finalización:** all green on every story before it is called done.
- **Riesgos:** committing broken code to `main` (`development-rules.md` §6).
- **Dependencias:** the story under test.

### Step 6.2 — Migration correctness

- **Objetivo:** confirm Migration 0001 is faithful and safe.
- **Entradas:** `sprint-03-players.md` §5 (after S3.1) · `dbds.md` G5.
- **Salidas:** applies to an empty database; schema matches the DBDS structure-for-structure; nothing cascades to deletion.
- **Criterio de finalización:** all three hold.
- **Riesgos:** an undetected cascade or an invented column.
- **Dependencias:** Phase 3.

### Step 6.3 — Access control and the cold start

- **Objetivo:** default deny holds and the cold start works end to end.
- **Entradas:** `sprint-03-players.md` §5 (S3.2, S3.3) · `sds.md` §5.
- **Salidas:** default deny holds for every startup structure; no policy lives only in the UI; a fresh account provisions its club-of-one and can create a first player; a coach with no membership cannot create a player.
- **Criterio de finalización:** all hold from a fresh account.
- **Riesgos:** a permissive policy slipping through; the bootstrap failing silently (P4.5).
- **Dependencias:** Phase 4.

### Step 6.4 — Roster behaviour

- **Objetivo:** the roster and profile behave as specified.
- **Entradas:** `sprint-03-players.md` §5 (S3.4–S3.7).
- **Salidas:** a player is created, found by search, opened, optionally linked; person vs club data on the correct structures; every profile tab resolves; no tab fabricates data; the switcher drives context from the reserved region.
- **Criterio de finalización:** all observable behaviours pass.
- **Riesgos:** fabricated data in an empty tab; person/club data misplaced.
- **Dependencias:** Phase 5.

### Step 6.5 — Cross-club isolation (S3.8) — the residual gate

- **Objetivo:** demonstrate — not assert — that a coach in one club cannot reach another club's players, memberships or assignments.
- **Entradas:** `sds.md` §9.3 · `dbds.md` Part IV · `sprint-03-players.md` S3.8.
- **Salidas:** a demonstration, exercised at the **data layer** (not the UI), that cross-club access is denied for two clubs / two coaches.
- **Criterio de finalización:** cross-club read and write are both denied at the data layer. **⚠️ The required *standard of proof* is `DM-020`, which is open.** The team can *build and demonstrate* isolation now, but the sprint **cannot formally close on isolation** until DM-020 sets the verification standard (`sprint-03-players.md` S3.8 DoD). This is the one residual gate; it is a process decision, not a domain or architecture question, and it is **not** decided in this runbook.
- **Riesgos:** verifying isolation by clicking through the UI — "how leaks are born" (`sds.md` §9.3).
- **Dependencias:** Phases 3–5.

### Step 6.6 — Definition of Done

- **Objetivo:** confirm the sprint is finished by the constitution's checklist.
- **Entradas:** `development-rules.md` §7.
- **Salidas:** requirements complete; no known blocking bugs; self + human review done; docs updated if behaviour/structure changed; the branch builds, runs, and leaves a clean baseline.
- **Criterio de finalización:** every box checked. If any is unchecked, the sprint is not done — regardless of code written. Closure on isolation additionally waits on DM-020 (6.5).
- **Riesgos:** declaring done with 6.5 unresolved.
- **Dependencias:** 6.1–6.5.

---

## What this runbook does not resolve

Two items sit outside execution and are surfaced, not decided:

- **DM-020** — the standard of proof for isolation — gates *closure* of S3.2/S3.8 (Step 6.5). Open decision; the register is [`open-decisions.md`](../open-decisions.md).
- **Phase 2.3** — the legacy reconciliation *path* — is a recorded choice made by the team at the S3.0 gate, not by this runbook.

Everything else is executable from this runbook plus the owning documents it points at, without reinterpreting the architecture.

---

_This runbook sequences the execution of Migration 0001 and Sprint 3. It inherits the approved architecture, decides nothing, and changes freely as the work proceeds._
