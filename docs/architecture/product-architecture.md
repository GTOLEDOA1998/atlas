# Atlas Product Architecture

> **Status:** Foundational — the product and domain architecture of Atlas. It answers **what Atlas is made of**.
> **Why this exists:** [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) sequences future work as Domain Model → Data Model → SDS → Implementation. This document is the **Domain Model** phase. It converts the frozen Intelligence Core into the entities, relationships, navigation, and module structure the application is built on.
> **Companion documents:** [`manifesto.md`](../constitution/manifesto.md) defines *why Atlas exists*. [`product-principles.md`](../constitution/product-principles.md) defines *what Atlas is as a product*. The Intelligence Core defines *how Atlas thinks*. This document defines *what Atlas is structurally*.
> **Precedence:** The Intelligence Core governs, then the Product Constitution. Where this document appears to conflict with either, this document is defective.
> **Amendment:** deliberate and explicit. Changes touching the Intelligence Core require an ADR.
> **Amended 2026-08-03**, with explicit Product Owner approval, by four of the thirteen Data Model decisions: **DM-002** and **DM-003** (§2.5, reserved names) · **DM-005a** (§2.7, a Priority is the player's and an Analysis is evidence) · **DM-010** (§10.1, the invariant becomes the identity subject; §2.7 follows). No other content was changed.
> **Amended 2026-08-04**, with explicit Product Owner approval, by **DM-023** (`Profile` withdrawn from §2.7; §2.1 states no separate profile entity exists) and **DM-018** (the athlete is `Player` the person plus `RosterMembership` the club relationship; §2.1 and the §2.7 entity map). DM-017B was absorbed by DM-018; DM-017A remains open. No other content was changed.

---

## What This Document Inherits

It invents nothing. Every concept below already exists in the frozen Core or descends from it.

| From | Inherited |
|---|---|
| [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) | Atlas DNA; the Decision Hierarchy; safety as precondition |
| [`memory-model.md`](../constitution/intelligence-core/memory-model.md) | Historical / Identity / Context Memory; source classes; confidence; the five forgetting mechanisms; ownership boundaries |
| [`training-model.md`](../constitution/intelligence-core/training-model.md) | **The definition of Objective**; progression; readiness; the priority→training sequence |
| [`priority-engine.md`](../constitution/intelligence-core/priority-engine.md) | WORK NOW / MONITOR / WAIT; deferral as first-class output; the vital few |
| [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) | Training vs Administrative authority; role definitions; delegation |
| [`reasoning-model.md`](../constitution/intelligence-core/reasoning-model.md) | Evidence, confidence, the reasoning lifecycle |
| [`product-principles.md`](../constitution/product-principles.md) | Product Constitution; the coach as primary user; the Decision Filter; the anti-goals |

## What This Document Owns

Entities and their relationships · the improvement cycle · navigation and information architecture · the page inventory for v1.0 · module boundaries · the layered functional architecture · naming reserved and forbidden.

## What This Document Does Not Own

How Atlas reasons (Core) · database schema, indexes, access policies (Data Model, next phase) · technology choices ([`tech-stack.md`](tech-stack.md)) · memory governance — consent, retention, what may be remembered (owed to Governance) · pricing, roadmap, commercial scope.

---

# Part I — The Product Commitment

## 1.1 Atlas does not sell analysis. Atlas sells player evolution.

An analysis is a photograph. Evolution is the film.

Any competent vision model will eventually produce a competent analysis; a single analysis is a commodity heading toward zero price. What cannot be copied is **the interpreted history of a coach's roster accumulated over seasons**. That asset takes years to build, belongs to the coach and their players, and makes leaving expensive.

Three binding structural consequences:

**C1 — No measurement is ever displayed without its reference.** Every number carries where it came from and where it is going: previous value, trend, or objective target. A figure standing alone reports *what is* and conceals *what changed*. Product Principles §12 forbids the vanity-metrics dashboard; this is the constructive form of that prohibition.

**C2 — Measurements must remain comparable across time.** If a metric's definition changes between model versions, the timeline silently lies. Because video is immutable, the correct response is **re-derivation**: when perception improves, historical footage is re-measured so the past gains resolution. This requires a versioned canonical metric registry from the first measurement ever recorded.

**C3 — Evolution is the flagship of the player profile, not of the Dashboard.** Longitudinal history is where the product's value accumulates, but it is not what a coach needs at 8am. The Dashboard triages; the player profile is where evolution lives. See §1.3 and Part VIII.

## 1.2 The Player is the principal entity

| | Entity | Why |
|---|---|---|
| **Root of the aggregate** | **Player** | Nothing else has meaning without a player to be about |
| **Unit of value** | **Analysis** | What the coach came for |
| **Unit of engagement** | **Assistant conversation** | What brings them back |

The Player is principal because it is the only entity with **longitudinal continuity**. Everything else is an event; the Player is the thread the events hang on.

This is already the Core's position. `memory-model.md` §4 calls Player Memory *"the most carefully held memory — it concerns a developing human being."* Product Principles §7 states *"the player is the unit."*

**Consequence:** no screen exists without a subject. No orphan analysis, no orphan video, no orphan metric.

## 1.3 The Dashboard answers exactly one question

> **"¿Qué necesita mi atención hoy?"**

Nothing else. Historical evolution, roster browsing, and exhaustive reporting each have their own home and are one deliberate step away.

This is `product-principles.md` §6 held literally — *"orientation, not exhaustive reporting"* — and it is what `priority-engine.md` already produces: a short, honest set of priorities with stated deferrals. **The Dashboard is the Priority Engine's output rendered.**

A Dashboard that also shows evolution is a Dashboard answering two questions, which means it answers neither at a glance.

## 1.4 Atlas organizes; the coach decides

> **Atlas does not replace the coach's judgment. It organizes information, interprets data, and proposes actions so the coach can make better decisions.**

This restates in product-architecture terms what `coaching-dna.md` holds as immutable Level 1 DNA and `human-decision-authority.md` calls the Invariant. It is recorded here because structure must express it, not merely respect it:

- **Every recommendation is a proposal with a visible decision point.** An interface that presents Atlas's conclusion without an obvious way to accept, modify, or reject it has made Atlas the decider regardless of what the copy says.
- **Atlas never acts on the coach's behalf.** No auto-assigned plan, no silently applied change.
- **Deferral is shown, not hidden.** `priority-engine.md` makes what Atlas chose *not* to raise a first-class output. A coach cannot judge a recommendation without knowing what it displaced.
- **Override is cheap and never argued with.** Overrides are signal that refines understanding, never friction to be discouraged.

## 1.5 Every recommendation is traceable to observable evidence or a defined rule

> **No opaque recommendations. No invented metrics.**

`memory-model.md` §3 already binds this at the memory layer: exactly three legitimate sources exist — Atlas observation from video, human-provided information, and Atlas's own prior reasoning — and Atlas *"assumes no wearable devices, physiological sensors, biomechanical hardware, and never fabricates such data."* This document extends the same constraint to everything the product displays.

Structural consequences:

- **No metric ships without a documented derivation.** If we cannot state how a number is computed from observable data, the number does not exist. This applies to composite scores and indices most of all — they are where invented metrics hide.
- **Evidence is reachable from every claim**, not buried in a detail view. Findings link back to the footage they came from.
- **Provenance is permanent and visible.** A memory formed from a coach's statement is never later presented as something Atlas observed.
- **Thin evidence is stated as thin.** `memory-model.md` §6: low-confidence memory must not masquerade as established understanding.
- **Binding on Sprint 2:** simulated data used to build the interface must be shaped like metrics that are genuinely derivable from video and coach input. Mock data that could never exist trains the product's structure on a fiction and has to be torn out later.

---

# Part II — The Domain

## 2.1 Account is not Person

**`User` is an account. `Player` is a person who can be analyzed. They are different entities.**

The decision with the widest blast radius, and getting it wrong forces a migration later.

Three cases make the separation mandatory:

1. A coach analyzes a twelve-year-old who **does not have and should not have** an account.
2. A coach scouts an **opponent** who will never use Atlas.
3. A roster exists **regardless of how many players register**.

Therefore `Player.user_id` is **nullable**. In the MVP, where the coach is the only user (Part VII), **almost no player has an account** — which makes this separation not an edge case but the normal state.

**There is no separate profile entity.** The separation is between an account and *the person who is analysed* — never between an account and *the person who holds it*. `User` carries the identity of its holder directly: it is the subject of every membership, every assignment, every authorship, and of that person's Coach Identity Memory. A second structure holding the same person's display attributes would give Atlas two candidate subjects for one human, which [`memory-governance.md`](../constitution/memory-governance.md) §5 forbids by requiring every memory to have exactly one.

**The athlete is a person and a club relationship, not one fused record (DM-018).** `Player` is the person — held once, crossing clubs, the subject of Player Identity Memory, which the Core requires to follow the athlete. `RosterMembership` is the person **within one club** — the tenancy anchor, where assignments live and where the club's history of the athlete stays when they move on. This is §2.2's principle — *the person held once, roles through membership* — applied to the athlete exactly as `User` + `Membership` already applies it to the coach. What describes the person follows the person; what describes the relationship stays with the club.

## 2.2 Coach and Player are roles, not sibling entities

**`Coach` is not an entity.** It is a role held over a scope, defined by [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §4.

The same person may coach the youth squad and play in the first team. Modelling coaches and players as separate tables duplicates the human and guarantees permanent inconsistency. Roles are held through membership; the person is held once.

`Guardian` is likewise a role, carrying administrative authority and no technical authority unless explicitly delegated.

## 2.3 Goal, Priority, and Objective are three different things

**The most important precision in this document.** Collapsing these breaks the Intelligence Core, which assigns each a distinct owner and lifecycle.

| Concept | Definition | Origin | Owned by |
|---|---|---|---|
| **Goal** | What the human wants. *"Win the regional in March."* Declarative, aspirational, possibly unmeasurable. | **Human-declared** | Player Memory (`memory-model.md` §4) |
| **Priority** | What deserves attention now. `WORK NOW` / `MONITOR` / `WAIT`, with reasoning, evidence, confidence and stated deferrals. | **Atlas judgment** | Priority Engine |
| **Objective** | What a period of training is meant to change — the trainable translation of a `WORK NOW` priority. | **Derived from a priority** | Training Model, Part II |

`training-model.md` Part II already fixes the Objective's six required properties: traceable, specific enough to design around, bounded, achievable in sequence, observable in its effects, and owned by the player's understanding. **This document adopts that definition verbatim and adds nothing to it.**

The chain runs one way and never skips:

```
Goal  ──┐
        ├──▶  Priority  ──▶  Objective  ──▶  Plan  ──▶  Training
Analysis┘      (WORK NOW)      (trainable)   (sequenced)  (session)
```

> **A Goal never becomes an Objective directly.** It passes through prioritization, because someone wanting something is not evidence that it is the right thing to work on now. This is `priority-engine.md`'s governing belief — *maximize meaningful long-term development, not the number of corrections* — expressed structurally.
>
> Where a stated Goal is too vague to prioritize against, translating it into something measurable is the Assistant's job, and the translation is surfaced for the coach to confirm. Atlas never quietly reinterprets what a human said they wanted.

## 2.4 Plan

A **Plan** is the sequenced route serving one or more Objectives across a horizon: phases, progression, and re-evaluation points. `Objective : Plan` is 1:N — a failed approach can be replaced without discarding the objective or its history.

Plans inherit `training-model.md` Part IV step 8: **progress indicators and a re-evaluation moment are defined in advance.** A plan without them makes later evaluation retrospective storytelling.

## 2.5 Reserved and forbidden names

**`Session` is forbidden as a domain name.** It is already bound to `@supabase/supabase-js` and appears throughout `AuthContext`, `AuthProvider` and `useAuth`. A domain `Session` coexisting with the auth `Session` produces wrong-import bugs that cost hours.

| Concept | Name |
|---|---|
| Authentication session | `Session` — **reserved exclusively for auth** |
| The design of a training session | `Training` |
| A training occasion that happened | `TrainingSession` |
| A recording occasion | `Video` |
| What was true on one occasion | `CurrentSession` — Core term, Context Memory only ([`current-session.md`](../constitution/intelligence-core/current-session.md)). **A concept, never an entity name** |

**`Coach` is reserved for the human.** The AI surface is the **Assistant**. Naming the assistant "Coach" when the user *is* the coach is a defect: it collides in routes, in code, and in the coach's own mental model.

## 2.6 `Project` does not exist

Its two functions are already served: the **container** is the Player, the **bounded pursuit** is the Objective or Plan.

Nobody in this domain thinks *"I will create a project."* They think *"I will fix her backhand."* An extra nesting level with no domain meaning is paid for in every URL, breadcrumb and query for the life of the product.

## 2.7 Entity map

```
User                              the account and the human holding it
  │                               in the MVP: a coach. See §2.1
  ├──N:M── Club                   via Membership { role, scope, status }
  │                               role ∈ owner · coach · staff
  │
  └──0:1── Player                 rare in the MVP; see §2.1

Player ──1:N── RosterMembership   the person, held once, crosses clubs (DM-018)
Club ──1:N── RosterMembership     roster; the tenancy boundary
Coach ──N:M── RosterMembership    assignment; carries training authority

Player ──1:N── Goal               human-declared · any identity subject (§10.1)
Player ──1:N── Objective          derived from priorities · any identity subject
Player ──1:N── Priority           standing; WORK NOW / MONITOR / WAIT + deferrals
Player ──1:N── Plan
Player ──1:N── Video
Player ──1:1── SportingMemory     Part IV
Player ──1:N── Measurement        canonical, versioned, comparable over time

Video  ──N:1── User               author of the upload  ─┐  two distinct
Video  ──N:1── Player             subject of the footage ─┘  references
Video  ──1:N── Analysis           re-derivable; 1:N by design

Analysis ──1:N── Observation      what was seen
Analysis ──1:N── Finding          what it means, with confidence
Analysis ──N:M── Priority         evidence that raises, confirms or moves one
Priority ──0:1── Objective        only WORK NOW items are trained

Plan ──1:N── Training ──1:N── Exercise ──N:1── Technique  (Library)

Conversation ──N:1── Player
Conversation ──1:N── Message ──0:N── Reference → Analysis · Video · Technique
```

**Two references on `Video`, deliberately.** `author` (who uploaded) and `subject` (who is analyzed) are different people in nearly every MVP case, since the coach films the player. Collapsing them breaks permissions and attribution.

**`Analysis` is derived, never source of truth.** The video is the immutable fact; the analysis is a versioned interpretation, regenerable and discardable. This is `memory-model.md`'s core distinction — *"what happened is recorded, what it means is interpreted"* — applied to the pipeline.

---

# Part III — The Improvement Cycle

Objectives, Plans, Videos, Analyses and Trainings are not five features. They are five positions on one loop, and the loop is the product.

```
                    ┌──────────────── GOAL ◀─── declared by coach or player
                    │                  │
                    ▼                  ▼
            ┌───▶ VIDEO ────────▶ ANALYSIS
            │    evidence         observation + reasoning
            │                          │
            │                          ▼
            │                      PRIORITY
            │                   WORK NOW / MONITOR / WAIT
            │                          │
            │                    ◀── the coach decides here
            │                          ▼
            │                     OBJECTIVE
            │                    what must change
            │                          │
            │                          ▼
            │                        PLAN
            │                  sequenced progression
            │                          │
            │                          ▼
            │                      TRAINING
            │                   what happens on the table
            │                          │
            └──────────────────────────┘
                    new evidence

        ┌─────────────────────────────────────────────┐
        │   SPORTING MEMORY                           │
        │   reads every stage · interprets the delta  │
        │   across cycles · feeds every stage back    │
        └─────────────────────────────────────────────┘
```

**The loop is closed by comparison, not by completion.** A product that analyses and stops is used three times and abandoned. Value is created when cycle *n+1* is measured against cycle *n* — which is only possible if C2 holds.

**The coach's decision point sits between Priority and Objective**, by §1.4. Atlas may propose the whole chain; nothing below that line is committed without a human accepting it.

**Two entry points.**

*Cold start.* A new coach has an empty roster, no history and no priorities. The first video is entered without an objective; the first analysis **proposes** priorities for the coach to confirm. Onboarding runs `Player → Video → Analysis → proposed Priority → Objective`.

*Steady state.* From the second cycle onward the loop runs objective-first: training is designed against a standing objective, and video is captured as evidence of whether it is working.

**Processing is asynchronous from day one.** Analysing video takes minutes. `Video` therefore carries a state machine (`uploaded → processing → ready → failed`) from the first version. Retrofitting asynchrony touches UI, state, notifications and data model simultaneously.

**The empty state is the most important screen in v1.0.** Every new coach sees it; most never see the populated dashboard we are tempted to design first. It offers exactly one action.

---

# Part IV — Sporting Memory

## 4.1 It is a name, not a new architecture

**"Sporting Memory" is the product-facing name for the Memory Model already frozen in [`memory-model.md`](../constitution/intelligence-core/memory-model.md).** A label for interface copy — not a second memory architecture.

Defining it independently would create precisely the drift ADR-0001 identifies as *"the most common origin of architectural incoherence in long-lived products."* The mapping is exact and total:

| Product surface | Core concept | Nature |
|---|---|---|
| *"Everything that happened"* — timeline, videos, completed trainings, decisions taken | **Historical Memory** | Append-only. Never rewritten |
| *"What Atlas understands about this player"* — strengths, recurring limiters, stage, trajectory | **Identity Memory** (Player DNA) | Derived from Historical. Refined, replaced, corrected |
| *"What is true today"* — readiness, injury, availability | **Context Memory** ([`current-session.md`](../constitution/intelligence-core/current-session.md)) | Expires or is promoted |

## 4.2 The property that makes it work

> **Identity Memory is derived from Historical Memory, never tangled with it.**

Everything the product needs follows from that single structural fact:

- **Interpretation improves without rewriting history.** A better model re-derives understanding over an unchanged record.
- **Directed forgetting is survivable.** Removing history means re-deriving interpretation, not breaking the system (`memory-model.md` §7).
- **Being wrong is itself signal.** Superseded interpretations are preserved; a pattern of repeatedly misreading a player matters.
- **Progression is unbroken.** Plateau detection and regression handling are impossible on a record that rewrites itself.

## 4.3 What Sporting Memory adds at product level

Nothing architecturally. Three things experientially:

1. **A visible timeline** — Historical Memory rendered, so the coach can see the record Atlas reasons over.
2. **A legible player model** — Identity Memory shown as *"what Atlas currently understands about this player, and how confident it is"*, with its evidence. §1.5 made concrete.
3. **Provenance on every claim** — every memory permanently retains its source class (`memory-model.md` §3).

## 4.4 The constraint the product must respect

`memory-model.md` §6: **confidence decays with staleness.** *"A memory formed years ago about a developing athlete describes someone who may no longer exist."*

The interface must therefore distinguish **earned memory** from **defaults**, and **current understanding** from **stale understanding**. A UI that renders a three-year-old interpretation identically to yesterday's is lying by omission.

---

# Part V — One Assistant, Not a Set of AI Modules

## 5.1 There is no "AI module"

The Core does not describe a chatbot beside an analysis engine. It describes **one reasoning system** with a conscience, a knowledge model, a reasoning lifecycle, a priority engine and a memory. The product must present it the same way.

**Structurally this means there is no `features/ai/`.** Intelligence is a layer that all features consume, never a feature beside them.

## 5.2 Perception measures. The Assistant interprets.

| | **Perception** | **Assistant** |
|---|---|---|
| Does | Video → canonical measurements | Measurements + memory + knowledge → understanding |
| Nature | A sensor. Mechanical | A reasoner. Contextual, confidence-bearing |
| Knows about the player | Nothing | Everything |
| Replaceable | Independently | Independently |

Perception is not "the AI." It is the eye. `memory-model.md` §3 constrains it to observation from video only — no fabricated sensor data, ever.

## 5.3 One context assembly, many surfaces

The coach perceives a single assistant because there **is** a single assistant: every intelligent surface calls the same context assembly and writes back to the same memory.

```
                    ┌────────────────────────┐
                    │   CONTEXT ASSEMBLY     │
                    │  one function, one     │
                    │  contract, one memory  │
                    └───────────┬────────────┘
                                │
     ┌──────────┬───────────────┼───────────────┬──────────┐
     ▼          ▼               ▼               ▼          ▼
  Analysis   Priorities      Plan          Assistant   Proactive
  narrative  explained     proposals          chat       nudges
```

An assistant that knows a player's history in chat but not in the analysis report is not one assistant wearing several hats — it is several assistants, and coaches detect the seam immediately.

**Context providers are composable.** In v1.0 there are two: Sporting Memory and Library. That the assembly takes providers rather than hard-wiring them costs nothing today and is what keeps Part VI cheap later.

---

# Part VI — Collective Intelligence

## 6.1 Explicitly out of scope

**Collective intelligence — learning across players to improve recommendations — is out of the MVP. It is not implemented and it is not modelled.**

It must not condition any Sprint 2 decision. No cohort dimensions are added to entities for its sake, no aggregation is designed, no consent flow is built for it.

## 6.2 Why it is nonetheless recorded here

Two reasons, and only two.

**It conflicts with the frozen Core as currently written.** [`memory-model.md`](../constitution/intelligence-core/memory-model.md) §5 states two boundaries absolutely: *"No cross-owner leakage — what Atlas learns in one relationship stays in that relationship"* and *"No aggregate drift into defaults."* Any future move toward collective learning requires an **ADR amending §5**, not a downstream reinterpretation. Recording it now means the constraint is discovered before the work, not during it.

**One seam keeps it cheap, and that seam already exists for other reasons.** §5.3's context assembly takes composable providers because a single assistant needs to combine memory and library today. If collective intelligence is ever approved, it enters as a third provider — the Assistant, the domain, the memory model and the UI are untouched.

```
CONTEXT ASSEMBLY
  ├── Sporting Memory   (this player)             ── v1.0
  ├── Library           (curated knowledge)        ── v1.0
  └── ⟨ future provider ⟩                          ── not designed, not modelled
```

That is the entire preparation. **No further accommodation is made**, in keeping with `development-rules.md` §1: *do not add layers, generics, config options, or "flexibility" for requirements that do not yet exist.*

## 6.3 One thing that is required anyway

**Canonical, versioned metrics** are needed for C2 — comparability of a single player's timeline across model versions. They are a prerequisite for collective intelligence too, but they are not *for* it, and they would be required if collective intelligence were permanently abandoned.

Player attributes such as level, age band and playing style arrive for coaching reasons — `memory-model.md` §4 puts stage, strengths and trajectory in Player Memory — not as cohort scaffolding. They are modelled as coaching data and nothing more.

---

# Part VII — Users and Tenancy: Coach First, Club Ready

## 7.1 The decision

**The coach is the primary user of the MVP. There is no player mode.**

In v1.0, players are **subjects of analysis, not users of the product**. The entire interface optimizes one thing: the coach's daily working flow.

This is `product-principles.md` §1 held exactly: *"Atlas is built for table tennis coaches — the decision-makers responsible for player development... It is not a casual consumer app."*

## 7.2 What this decision buys

It removes the weakest configuration the Core supports.

`human-decision-authority.md` §8 requires **heightened conservatism where no coach holds training authority**, and Open Question 1 flags *a minor with no coach* as the weakest safety configuration Atlas supports. Because the MVP has a coach by construction, **that configuration does not occur.** Atlas operates in its strong configuration throughout: a qualified professional holds training authority and is present to catch reasoning errors.

The heightened-conservatism path remains defined in the Core and re-enters if a player mode is ever built. It is not needed now.

## 7.3 Tenancy

The coach may be **independent** or **club-affiliated**. Both are first-class in v1.0; only the club *interface* waits.

**The club boundary exists in the model from the first table.** Retrofitting multi-tenancy means rewriting every access policy, query and index against live production data — the most expensive migration there is. Cost today: an ownership scope on every row and one policy. Cost in six months: weeks, at risk.

> **The club UI ships in v1.1. The club boundary ships in v1.0.**

This is not speculative flexibility of the kind `development-rules.md` §1 warns against. It is a data-shape decision that is nearly free before launch and nearly impossible after.

## 7.4 Guardians and players later

`human-decision-authority.md` fully defines the Guardian and Player roles. The MVP builds neither surface. When they arrive — guardian visibility, player self-service — the authority model is already settled and no renegotiation is required.

---

# Part VIII — Navigation and Information Architecture

**Convention:** routes and code in **English**; interface copy in **Spanish**.

## 8.1 Four planes of navigation

| Plane | Carries | Where |
|---|---|---|
| **Structural** | Stable destinations | Sidebar |
| **Contextual** | *Which player* we are working on | Header — player switcher |
| **Sectional** | Facets of one player | Tabs within the player profile |
| **Assistant** | Available everywhere, context-aware | Persistent surface + `⌘K` |

> Structure belongs in the sidebar; **the subject belongs in the header**. Listing players in the sidebar stops scaling past roughly fifteen and conflates *where I am* with *who I mean*. Product Principles §7 demands roster navigation be the most fluid part of Atlas — which means a switcher and a search, not a growing list in the chrome.

## 8.2 Sidebar

```
ATLAS

  Inicio              /overview           ◀ "¿Qué necesita mi atención hoy?"
  Asistente           /assistant          ⌘K

DESARROLLO
  Jugadores           /players            ◀ the unit of work
  Vídeos              /videos
  Análisis            /analysis
  Entrenamientos      /training

RECURSOS
  Biblioteca          /library

CLUB                                      ◀ hidden for independent coaches
  Club                /club

─────────────────────────────
  [avatar]  Nombre        ⌄   ◀ Ajustes · Tema · Cerrar sesión
```

Five deliberate decisions:

- **Seven destinations.** Above roughly eight a sidebar stops being scanned and starts being read. Product Principles §3: *minimal, focused, calm*.
- **Settings and Logout are not navigation.** They live in the user menu. Spending primary space on them is waste.
- **`Asistente`, not `Coach`.** §2.5 — the coach is the user.
- **No `Evolución` entry.** Evolution lives inside the player profile (§1.1 C3, §1.3).
- **`/overview` is retained** rather than renamed to `/dashboard`, because `OVERVIEW_ROUTE` is already referenced by shipped authentication code. Renaming modifies Sprint 1 for cosmetic gain.

## 8.3 The player profile is where history lives

```
/players/[id]                 Resumen        ◀ who this player is right now
/players/[id]/progress        Evolución      ◀ the longitudinal view
/players/[id]/videos          Vídeos
/players/[id]/analysis        Análisis
/players/[id]/objectives      Objetivos
/players/[id]/training        Entrenamientos
```

This is Product Principles §7 structurally: *"a player's profile is the natural home for their history, analyses, and training — one coherent place, not data scattered across sections."*

## 8.4 Page inventory for v1.0

| Route | Page | Notes |
|---|---|---|
| `/` | Redirect | Shipped |
| `/overview` | Dashboard | Priorities and next actions. One question only |
| `/assistant` | Assistant — conversations | |
| `/assistant/[id]` | Conversation | |
| `/players` | Roster | Search-first |
| `/players/new` | Add player | |
| `/players/[id]` + 5 tabs | Player profile | §8.3 |
| `/videos` | Video library | |
| `/videos/upload` | Upload | Courtside-fast (Principles §8) |
| `/videos/[id]` | Player + timeline | |
| `/analysis` | Analyses across the roster | |
| `/analysis/[id]` | Report — findings, evidence, priorities | **The screen that converts** |
| `/training` | Plans and sessions | |
| `/training/[id]` | Training detail | |
| `/library` | Techniques and exercises | |
| `/library/[slug]` | Technique detail | |
| `/club` | Club | Club-affiliated coaches only |
| `/settings` · `/settings/profile` · `/settings/preferences` | Settings | |

**22 routes.** Authentication (`/login`, `/register`, `/forgot-password`, `/reset-password`, `/auth/callback`) is shipped.

---

# Part IX — Modules

Vertical feature slices, per `development-rules.md` §1 Feature First, with `features/auth/` as the reference implementation.

## 9.1 Core — v1.0

Removing any of these breaks the improvement cycle.

| Module | Slice | Owns |
|---|---|---|
| **Identity & Access** | `features/auth` | ✅ Shipped |
| **Tenancy** | `features/club` | Ownership boundary. Model in v1.0, UI in v1.1 |
| **Players** | `features/players` | Roster, profiles, assignment, account↔player linking |
| **Media** | `features/media` | Upload, storage, state machine, playback |
| **Perception** | `features/perception` | Video → canonical measurements |
| **Analysis** | `features/analysis` | Findings, evidence, priorities |
| **Objectives** | `features/objectives` | Goals, objectives, plans |
| **Training** | `features/training` | Sessions, exercises, execution |
| **Library** | `features/library` | Techniques, taxonomy |
| **Sporting Memory** | `features/memory` | Historical · Identity · Context |
| **Assistant** | `features/assistant` | Context assembly, reasoning surfaces, conversation |
| **Shell** | `components/layout` | Layout, navigation, breadcrumbs |
| **Settings** | `features/settings` | Preferences, account |

## 9.2 Future

| Version | Module | Depends on |
|---|---|---|
| v1.1 | Club UI, groups, invitations | Tenancy already modelled |
| v1.1 | Notifications | Media state machine |
| v1.2 | Guardian visibility | Authority model already settled |
| v1.2 | Competitions and matches | Players |
| v1.2 | Equipment advisor | Library |
| v1.3 | Exportable reports | Analysis, Memory |
| v1.3 | Billing | Tenancy |
| v2.0 | Player mode (self-service) | Reactivates heightened conservatism (§7.2) |
| v2.0 | Native mobile capture | Media |
| v2.0 | Live analysis | Perception |
| — | Collective Intelligence | **Out of scope. Requires ADR (Part VI)** |

## 9.3 Scaffolding to reconcile

Empty directories from Session 1 carry a vocabulary predating this document: `features/{analysis, coach, players, settings, training, videos}`. Two collisions matter:

- **`coach`** meant the human coach; the AI surface is `features/assistant` (§2.5).
- **`videos`** → `features/media`, since the slice owns upload, storage and state, not only playback.

All are empty. **The cost of renaming today is zero.**

---

# Part X — Functional Architecture

```
┌─────────────────────────────────────────────────────────┐
│  EXPERIENCE          Shell · Dashboard · Feature UI      │
├─────────────────────────────────────────────────────────┤
│  ASSISTANT           One intelligence.                   │
│                      Context assembly · reasoning        │
├─────────────────────────────────────────────────────────┤
│  SPORTING MEMORY     Historical · Identity · Context     │
│                      The interpretive spine              │
├──────────────────────────────┬──────────────────────────┤
│  DOMAIN                      │  PERCEPTION              │
│  Player · Goal · Objective   │  video → canonical        │
│  Plan · Training · Library    │  measurement             │
├──────────────────────────────┴──────────────────────────┤
│  PLATFORM            Identity · Tenancy · Data           │
│                      ✅ Sprint 1                          │
└─────────────────────────────────────────────────────────┘
```

**Dependency rule: downward only.**

- Experience never reaches Platform past Domain.
- Assistant consumes Memory and Domain; neither consumes the Assistant. **The product degrades gracefully when intelligence is unavailable** — video still uploads, history still reads, plans still display. This is §1.4 structurally: a product that stops working without its AI has made the AI the decider.
- Perception feeds Domain and never talks to the Assistant. Swapping the vision model touches nothing above it.
- Memory sits between Domain and Assistant because it is the only layer converting *records* into *understanding*.

## 10.1 The four invariants

1. **Everything hangs off an identity subject** — Club, Coach, Group or Player. No subjectless view. The Player remains the root of the aggregate and the subject of every record about a person; the other three are the identity subjects the Memory Model already declares.
2. **Derived is disposable; recorded is permanent.** Video and measurements are fact; analyses, findings and identity interpretations are versioned and regenerable.
3. **Intelligence is a layer, not a feature.** It crosses the domain; it never owns it.
4. **Nothing is asserted that cannot be traced.** Every recommendation reaches back to observable evidence or a defined rule (§1.5).

---

# Part XI — Resolved Decisions and Outstanding Work

## 11.1 Resolved

| | Decision |
|---|---|
| **Collective intelligence** | Out of the MVP. Not implemented, not modelled. Does not condition Sprint 2. Future adoption requires an ADR amending `memory-model.md` §5. Part VI |
| **Primary user** | The coach. No player mode in v1.0. `product-principles.md` required **no amendment** — §1, §6 and §7 already state the coach is the user; the earlier individual-first framing was the defect, and it is withdrawn |
| **Dashboard scope** | One question: *"¿Qué necesita mi atención hoy?"* Evolution belongs to the player profile. §1.3, §8.3 |
| **Coach authority** | Recorded as a product-architecture principle with structural consequences. §1.4 |
| **Traceability** | Recorded as a binding invariant, including for Sprint 2 mock data. §1.5, §10.1 |

## 11.2 Outstanding

**Memory governance — still owed.** `memory-model.md` Open Question 1 and ADR-0001 both record that *what may be remembered, for how long, and under whose consent* is undecided and belongs to Governance. This matters especially because Atlas holds data on developing athletes, including minors.

**Does not block Sprint 2**, which persists no player data. It blocks the first feature that does.

**Note on document placement.** Per ADR-0001 Future Evolution this artifact is the **Domain Model** phase; it resides in `01 Vision/` by explicit instruction. Separately, `docs/` contains both `03 Architecture/` and `04 Architecture/` with duplicate `tech-stack.md` files — a governance defect worth resolving independently.

---

# Open Questions

1. **What is the canonical metric set for v1.0?** C2 depends on it and it cannot be deferred past the first measurement stored. §1.5 forbids shipping any metric without a documented derivation.
2. **How much of Identity Memory is shown, and to whom?** §4.3 makes the player model legible to the coach. Whether any of it ever reaches the player or a Guardian is a product and duty-of-care decision.
3. **When does an independent coach become a club coach?** Tenancy exists from day one; the transition path is unspecified.
4. **Does an Objective require an active Plan?** §2.4 allows an objective without a plan; whether the product should is undecided.
5. **Do Groups enter v1.0 or v1.1?** `memory-model.md` §4 treats Group Memory as first-class and coaches work in groups daily, but the roster alone may carry the MVP. Currently scheduled v1.1.

---

_This document defines the product and domain architecture of Atlas and constitutes the Domain Model phase sequenced by ADR-0001. It inherits the Intelligence Core and the Product Constitution and may not contradict either. It changes only by explicit, deliberate amendment._
