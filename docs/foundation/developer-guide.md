# Atlas Developer Guide

> **Status:** Foundational — the practitioner's manual for turning the frozen architecture into code.
> **Tier:** 3 — Foundation. It elaborates the constitution and architecture; it contradicts nothing above it, and if it ever appears to, it is defective.
> **Owns:** the bridge from the approved architecture to code in `app/` — the codebase anatomy, which client and pattern to use where, the migration and feature workflow, the invariants every change must honour, and the map from "what I am about to build" to the document that governs it.
> **Inherits:** [`development-rules.md`](../constitution/development-rules.md) (how we build) · [`tech-stack.md`](../architecture/tech-stack.md) (the choices) · [`product-architecture.md`](../architecture/product-architecture.md) · [`data-model.md`](../architecture/data-model.md) · [`sds.md`](../architecture/sds.md) · [`dbds.md`](../architecture/dbds.md) (what we build) · [`glossary.md`](glossary.md) (the vocabulary) · [`work/sprints/sprint-03-execution-runbook.md`](../work/sprints/sprint-03-execution-runbook.md) (the current execution sequence).
> **Does not own:** the documentation reading order, governance, and doc conventions — those are [`docs/README.md`](../README.md); the domain rules themselves — each has an owning document; sprint-specific execution — that lives in [`work/sprints/`](../work/sprints/).
> **Amendment:** freely (Tier 3), provided it contradicts nothing in Tier 1 or 2. It is sprint-agnostic: it describes how to work on Atlas, not what any one sprint delivers.

---

## 0 · How to use this guide

Read this once before your first change, and return to §7 (the decision map) before every feature. **This guide never restates a rule — it points at the document that owns it.** The workflow is always the same:

1. Identify what you are building, and find its governing document in §7.
2. Read that document's relevant section. It is the authority; this guide is the map.
3. Implement, honouring the invariants in §5.
4. Validate against the Definition of Done (§8). If a domain question surfaces, **stop** (§6).

> **The single most important habit:** the architecture is frozen and complete. If implementation seems to require a new decision, that is a signal to stop and register it — never to decide it in code.

---

## 1 · The mental model in one screen

Not definitions — those are the [glossary](glossary.md). Just the shape you must hold while coding. Each points at its owner.

- **The Player is the root.** Nothing exists without a subject; everything about a person hangs off exactly one (`product-architecture.md` §1.2, §10.1).
- **`Club` is the tenancy boundary.** Every row carries its owning club from the first table; an independent coach is a club of one (`data-model.md` §1.3).
- **Four data classes decide lifecycle:** Fact · Interpretation · Decision · Context. A record belongs to exactly one, and the class fixes whether it is rewritten, regenerated or versioned (`data-model.md` §1.1).
- **Derived is disposable; recorded is permanent.** Video and measurements are fact; analyses and identity are versioned and regenerable (`product-architecture.md` §10.1).
- **Intelligence is a layer, not a feature.** There is no `features/ai`; every surface consumes the same assembly (`product-architecture.md` §5, §10.1).
- **Nothing is asserted that cannot be traced**, and **nothing cascades to deletion, ever** (`product-architecture.md` §1.5; `dbds.md` G5).

---

## 2 · Codebase anatomy

The app lives in [`app/`](../../app). It is a single Next.js application, organised **by feature, not by technical type** (`development-rules.md` §1).

```
app/src/
  app/                      route tree
    (app)/                  authenticated shell + feature pages
    (auth)/                 login · register · recovery
    auth/                   /auth/callback  (PKCE — owned by Sprint 1)
  features/                 vertical slices — the unit of work
    auth/                   ✅ the REFERENCE implementation — copy its shape
    players/ club/ …        feature slices (see §4)
  components/
    ui/                     shared primitives (shadcn/ui on Base UI)
    layout/                 the shell — sidebar, header, breadcrumbs
    shared/                 cross-feature building blocks (placeholder, empty state)
  lib/
    supabase/               the three clients (see §3)
    validators/             shared zod schemas
    env.ts                  fail-fast public env access
  proxy.ts                  server-side session refresh + route guards
```

**Two things to know before you touch this tree:**

- **This is a modified Next.js.** [`app/AGENTS.md`](../../app/AGENTS.md): read `node_modules/next/dist/docs/` before writing framework code — APIs may differ from what you expect. The server entry is `proxy.ts`, not `middleware.ts` (`tech-stack.md`).
- **Some slices are empty scaffolding with names to reconcile.** `product-architecture.md` §9.3: `features/coach` must become `features/assistant`, and `features/videos` must become `features/media`. **Renaming needs approval** (`development-rules.md` §8) — flag it when you first build into those slices; do not rename unprompted.

---

## 3 · The three Supabase clients — use the right one

`@supabase/ssr` gives Atlas three server/client contexts. Choosing wrong is the most common source of auth bugs.

| Client | File | Use in | Never use in |
|---|---|---|---|
| **Browser** | `lib/supabase/client.ts` | Client Components | Server Components, `proxy.ts` |
| **Server** | `lib/supabase/server.ts` (`createServerSupabaseClient`) | Server Components, Route Handlers, Server Actions — **one per request** | the browser |
| **Proxy** | `lib/supabase/proxy-client.ts` (`updateSession`) | `proxy.ts` only, to refresh the session and rotate cookies | anywhere else |

**Three rules that are not negotiable** (`tech-stack.md` Authentication):

- **RLS is the authoritative boundary.** UI checks are convenience; the database decides. Every read/write is subject to Row-Level Security.
- **Only the anon key is configured** (`env.ts` exposes URL + anon key). Every operation runs under the user's session — there is no service-role path, and adding one is a config change requiring approval (`development-rules.md` §8).
- **Validate the token, never trust the cookie.** `proxy.ts` calls `getUser()` (revalidates), never `getSession()` (forgeable). Follow the same rule anywhere you read the user server-side.

---

## 4 · Building a feature slice

The `auth` slice is the reference (`development-rules.md` §1). A new slice mirrors its shape and exposes a clean public surface:

```
features/<feature>/
  <feature>.service.ts      Supabase calls (thin wrappers)
  <feature>.types.ts        shared types
  <feature>.constants.ts    routes + config
  <feature>.errors.ts       error → friendly message
  hooks/                    feature hooks
  components/               feature UI
  index.ts                  the public barrel — the feature's ONLY API
```

**Cross-feature use goes through `index.ts`, never a deep path.** UI renders and validates; a hook owns async + loading/error state; a service wraps the provider (`development-rules.md` §4). Interface copy is **Spanish**; routes and code are **English** (`product-architecture.md` Part VIII).

---

## 5 · Invariants every data change must honour

Before you write a table, a policy, or a persistence call, all of these must hold. Each is owned elsewhere; this is the checklist, not the law.

| Invariant | Owner |
|---|---|
| Every row carries its owning `Club` — except `User` and `Player`, which cross clubs, and the product-owned `MetricDefinition` / `LibraryConcept` | `dbds.md` G3 |
| Opaque, system-generated identity — never a natural key | `dbds.md` G1 |
| **Nothing cascades to deletion.** Archiving is a state; the only deletion is directed forgetting | `dbds.md` G5 · `sds.md` §4.5 |
| Default deny — a record is unreachable unless a policy authorises it, enforced at the data layer | `sds.md` §5.1 |
| Every interpretation carries provenance, confidence, formation date, occasion count | `dbds.md` G4 |
| No memory about a subject exists before its `RecordingAssertion` authorises it | `memory-governance.md` §3 |
| The **never-persist list** — biometrics, inferred internal states, medical diagnoses, composite scores without a documented derivation, cross-owner aggregates, credentials | `data-model.md` Part IV |
| Never name a domain concept `Session`; the AI surface is `Assistant`, not `Coach`; `Project` does not exist | `glossary.md` (reserved names) |

---

## 6 · When to stop

Implementation makes **no** architectural decisions. If you reach a point where the answer is not already in an owning document, stop and register it in [`open-decisions.md`](../work/open-decisions.md) — do not choose in code. This is the failure mode the whole corpus is built to prevent (`development-rules.md` §8; `sds.md` §5.6.5).

**Open decisions you may encounter, and where they bite** (content: `open-decisions.md`):

| If you are building… | Watch for | Effect |
|---|---|---|
| Access-control verification | **DM-020** — the standard of proof for isolation | Gates *closure* of the policy work, not authoring |
| `Declaration`, guardian, delegation | **DM-014** | Out of the startup set; not needed for the roster |
| `Training` / `TrainingSession` / `Plan` | **DM-013 · DM-016** | Aggregate boundaries unresolved |
| `LibraryConcept` / `Exercise` | **DM-015** | Data class undecided |
| Re-derivation across the corpus | **DM-019** | Trigger + visibility unresolved |
| Any interpretation's derivation links | **DM-022** | Granularity undecided |

None of these touches the seven startup structures of Migration 0001 (`sprint-03-players.md` §7).

---

## 7 · The decision map — which document governs what you build

The permanent lookup. Read the governing document's section before writing; it is the authority.

| I am about to build… | Governing document(s) |
|---|---|
| A table, column or constraint | `dbds.md` Part II (blueprint) · `sds.md` §4 (the decisions behind it) |
| An access policy / RLS rule | `dbds.md` Part IV · `sds.md` §5 |
| The tenancy bootstrap (cold start) | `sds.md` §5.6 (the full mechanism) |
| A feature slice | `development-rules.md` §1 · `product-architecture.md` §9 (module map) |
| A route or navigation surface | `product-architecture.md` Part VIII (routes, IA, page inventory) |
| An empty state | `product-architecture.md` §1.5 (no invented data) · `ux-principles.md` U4 |
| Anything that persists a person's data | `memory-governance.md` (permission, ownership, retention, forgetting) |
| Media upload / processing | `sds.md` §6 (state machine, storage, asynchrony) |
| Anything the Assistant consumes | `sds.md` §8 (one assembly, providers, degradation) |
| Perception output | `sds.md` §7 (sensor contract, biometric prohibition) |
| Naming anything | `glossary.md` (one term, one definition; reserved names) |
| The Sprint 3 execution order | `sprint-03-players.md` (stories) · `sprint-03-execution-runbook.md` (steps) |

---

## 8 · Definition of Done

A change is done only when `development-rules.md` §7 holds: requirements complete, no known blocking bugs, self + human review resolved, docs updated if behaviour or structure changed, and the branch builds, runs and leaves a clean baseline. `lint`, `build` and type-check are green; zero broken links; only in-scope files touched; the layer rule holds statically — features import downward only (`sds.md` §9.2).

Where a story's closure depends on an open decision (e.g. isolation on DM-020), it can be **built and demonstrated** but not **closed** until the decision lands. State that honestly; never mark done what is merely written.

---

_This guide is the practitioner's bridge from the frozen architecture to code. It owns no rule and decides nothing. It changes freely as long as it contradicts nothing above it._
