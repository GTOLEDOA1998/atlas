# Atlas Glossary

> **Status:** Foundational — the official vocabulary of the Atlas domain.
> **Why this exists:** [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) names shared language as a reason to freeze the Intelligence Core: *"Contributors reasoning in the same vocabulary produce compatible work; contributors inventing their own do not."* The vocabulary was defined across nine documents. This assembles it into one place.
> **The rule:** **one term, one definition.** A term appearing here means this and nothing else, in documentation, in conversation, and in code.
> **Owns:** the canonical vocabulary — which term is used for which concept, the reserved and forbidden names, and the terms deliberately absent.
> **Inherits:** the whole corpus. Every term names the document that owns its concept.
> **Does not own:** any concept's definition. Where a term belongs to a Core document, that document governs and this entry is a pointer, never a paraphrase that could drift.
> **Amendment:** adding a term is routine. Changing a definition owned by the Intelligence Core requires an ADR.

---

## Reserved and forbidden names

Read this before naming anything.

| Name | Status |
|---|---|
| **`Session`** | **Forbidden as a domain name.** Reserved exclusively for authentication (`@supabase/supabase-js`). A domain `Session` alongside the auth `Session` produces wrong-import bugs that cost hours. Use `TrainingSession` or `SessionContext` |
| **`Coach`** | Reserved for **the human**. The AI surface is the **Assistant**. Naming the assistant "Coach" collides in routes, in code, and in the coach's own mental model |
| **`Project`** | **Does not exist.** Its container role is the Player; its bounded-pursuit role is the Objective or Plan |
| **`Video`** | The evidence, never the analysis of it |

---

## Terms

### Assistant

**Is** — the single reasoning surface of Atlas. One intelligence with global context over a player, manifesting through several surfaces: conversation, analysis narrative, plan proposals, priority explanations.

**Is not** — a chatbot beside an analysis engine. Not a set of agents. Not a module (`features/ai/` does not exist). Not the human coach. Not the perception pipeline, which measures rather than interprets.

**Owner** — [`product-architecture.md`](../architecture/product-architecture.md) §5.

**Relates to** — assembles [Context](#context) from [Memory](#memory) and [Library](#library); produces [Recommendations](#recommendation); persists as `Conversation` and `Message`.

---

### Analysis

**Is** — a versioned interpretation of one [Video](#video): what was observed, what it means, and with what confidence. Records the perception model version *and* the metric definition version. Regenerable and disposable.

**Is not** — a fact. Not the source of truth (the video is). Not unique per video — one video may have many analyses across model versions. Not a verdict.

**Owner** — `product-architecture.md` §2.7; data lifecycle in the [Data Model](../architecture/data-model.md).

**Relates to** — derived from a [Video](#video); contains [Observations](#observation), [Measurements](#measurement), [Findings](#finding) and [Priorities](#priority); is the [Evidence](#evidence) an [Objective](#objective) traces back to.

---

### Club

**Is** — the ownership boundary and the tenancy anchor. An independent coach's space **or** an institution — the same shape; only the number of people with access differs. Every row carries its owning club from the first table.

**Is not** — a team. Not a group. Not optional: retrofitting tenancy means rewriting every access policy against live data. **It replaces `Workspace`**, which is withdrawn (see *terms deliberately absent*).

**Owner** — `product-architecture.md` §7.3; entity in [`data-model.md`](../architecture/data-model.md) §2.1.

**Relates to** — owns [Players](#player) (through a `RosterMembership`), [Videos](#video) and everything derived from them; access is held through `Membership`; the boundary that [Memory](#memory) must never leak across.

---

### Coach

**Is** — a **role**, not an entity: a human holding **training authority** over assigned players. In the MVP, the primary user of Atlas.

**Is not** — a database table. Not a job title. Not interchangeable with administrative authority, which is independent and may sit with a Guardian, a club, or an adult player. Not the Assistant.

**Owner** — [`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md) §4.

**Relates to** — a `User` holding an assignment over [Players](#player); accumulates Coach DNA in [Memory](#memory), which **does not transfer to a successor**.

---

### Context

**Is** — the material the [Assistant](#assistant) assembles at the moment of reasoning, from [Memory](#memory) and [Library](#library), to ground a response in this player and this moment.

**Is not** — persisted. Not a record. Not the same as [Session Context](#session-context), which is a bounded set of facts about one occasion. Persisting assembled context would freeze an interpretation and let it survive the deletion of its own evidence.

**Owner** — `product-architecture.md` §5.3.

**Relates to** — read from [Memory](#memory) and [Library](#library); its *references* are persisted so a [Recommendation](#recommendation) stays explainable later.

---

### Dashboard

**Is** — the triage surface answering exactly one question: *"¿Qué necesita mi atención hoy?"* It renders the [Priority](#priority) output plus analyses awaiting review.

**Is not** — a reporting surface. Not a metrics wall. Not where [Progress](#progress) lives. Not an activity feed.

**Owner** — [`product-principles.md`](../constitution/product-principles.md) §6; scope fixed by `product-architecture.md` §1.3.

**Relates to** — renders [Priorities](#priority); links into [Player](#player) profiles.

---

### Evidence

**Is** — what supports or contradicts an understanding, drawn from exactly three sources: **observation from video**, **human declaration**, and **Atlas's own prior reasoning**. Every piece retains its source class permanently.

**Is not** — assumption. Not inference presented as observation. Not sensor or physiological data, which Atlas does not have and never fabricates. Not the fluency of a model's explanation.

**Owner** — [`reasoning-model.md`](../constitution/intelligence-core/reasoning-model.md) Part II; source constraint in [`memory-model.md`](../constitution/intelligence-core/memory-model.md) §3.

**Relates to** — collected from [Videos](#video) and declarations; weighed into [Findings](#finding); every [Recommendation](#recommendation) must reach back to it.

---

### Finding

**Is** — what Atlas concludes an [Observation](#observation) or [Measurement](#measurement) *means*, carrying calibrated confidence and its supporting evidence.

**Is not** — an observation (that is neutral). Not a measurement (that is a number). Not a [Priority](#priority) — a finding may be true and still not deserve attention now. Not a verdict.

**Owner** — `reasoning-model.md` Parts III–V.

**Relates to** — derived from [Observations](#observation) and [Measurements](#measurement); candidate input to the [Priority](#priority) ranking.

---

### Goal

**Is** — what a human wants, declared: *"Win the regional in March."* Aspirational, possibly unmeasurable, and an **input** to reasoning.

**Is not** — an [Objective](#objective). Not something Atlas produces. Not automatically actionable — a goal passes through prioritization, because wanting something is not evidence it is the right thing to work on now.

**Owner** — held in Player Memory (`memory-model.md` §4).

**Relates to** — informs [Priority](#priority) ranking; may eventually be served by an [Objective](#objective), never by becoming one directly.

---

### Knowledge

**Is** — what Atlas understands about table tennis: a connected web of concepts and typed relationships, neutral and descriptive.

**Is not** — coaching judgment (that is Coaching DNA). Not [Memory](#memory), which is about specific people. Not tenant data. Not a technique manual.

**Owner** — [`table-tennis-knowledge.md`](../constitution/intelligence-core/table-tennis-knowledge.md).

**Relates to** — persisted as the [Library](#library); consumed by the [Assistant](#assistant) as a context source.

---

### Library

**Is** — the persistence of the [Knowledge](#knowledge) model: concepts described by ten fixed attributes, connected by eight typed relationships. Product-owned reference material.

**Is not** — tenant data. Not a list of drills. Not a hierarchy of chapters — it is a graph traversed in any direction, and cross-domain relationships are its most important edges.

**Owner** — schema owned by `table-tennis-knowledge.md`; persistence by the [Data Model](../architecture/data-model.md).

**Relates to** — [Exercises](#training) reference its concepts; its **observable indicators** are the hinge connecting a [Measurement](#measurement) to a concept.

---

### Measurement

**Is** — a value derived from a [Video](#video) according to a named, **versioned** metric definition.

**Is not** — a [Metric](#metric), which is the definition rather than the value. Not an interpretation. Not comparable across metric-definition versions.

**Owner** — [Data Model](../architecture/data-model.md); requirement established by `product-architecture.md` §1.1 C2.

**Relates to** — produced by perception from a [Video](#video); references a [Metric](#metric); feeds [Findings](#finding) and [Progress](#progress).

---

### Memory

**Is** — what Atlas understands about specific people over time, in three kinds that are never collapsed: **Historical** (what happened — append-only), **Identity** (who this is — derived from Historical, revisable), **Context** (what was true then — expires or promotes).

**Is not** — truth. Not [Knowledge](#knowledge), which is about the sport rather than a person. Not an authority — memory informs recommendations and never decides. Not shared across owners.

**Owner** — [`memory-model.md`](../constitution/intelligence-core/memory-model.md).

**Relates to** — derived from [Videos](#video), declarations and prior reasoning; the substrate the [Assistant](#assistant) reads. *"Sporting Memory"* is its product-facing name, not a second architecture.

---

### Metric

**Is** — a versioned **definition** stating how a value is computed from observable data.

**Is not** — the value itself (that is a [Measurement](#measurement)). Not a composite score, unless that composite's derivation is documented — composites are where invented metrics hide.

**Owner** — [Data Model](../architecture/data-model.md).

**Relates to** — governs [Measurements](#measurement); a change to it forces either re-derivation of history or a visible break in the series.

---

### Objective

**Is** — what a period of training is meant to change: the trainable translation of a `WORK NOW` [Priority](#priority), **accepted by a human**. Traceable, specific, bounded, achievable in sequence, observable in its effects, and understood by the player.

**Is not** — a [Goal](#goal), which is declared rather than derived. Not a [Priority](#priority), which is a judgment rather than a commitment. Not regenerable — it is a human decision, and decisions are not recomputed.

**Owner** — [`training-model.md`](../constitution/intelligence-core/training-model.md) Part II.

**Relates to** — descends from a [Priority](#priority); served by [Training](#training); its outcome measured through [Progress](#progress).

---

### Observation

**Is** — what was seen, registered neutrally, before any interpretation. Behaviour visible in video.

**Is not** — interpretation. Not internal state — fatigue, pain and motivation are **not observable**; they are declared or unknown. Atlas may observe an indicator that prompts a question; it may never convert an indicator into an asserted state.

**Owner** — `reasoning-model.md` Part I; observability constraint in [`current-session.md`](../constitution/intelligence-core/current-session.md) §2.

**Relates to** — extracted from a [Video](#video); the raw material of [Evidence](#evidence) and [Findings](#finding).

---

### Player

**Is** — the person being developed. The root entity of the domain and the only one with longitudinal continuity.

**Is not** — a user account. A player may have no account at all, and in the MVP almost none do. Not a role. Not deletable in the ordinary course — only through directed forgetting.

**Owner** — `product-architecture.md` §1.2, §2.1.

**Relates to** — optionally linked to a `User`; assigned to [Coaches](#coach); owns [Videos](#video), [Goals](#goal), [Objectives](#objective), [Memory](#memory) and [Progress](#progress). Everything hangs off a player.

---

### Priority

**Is** — Atlas's judgment of what deserves attention now, in one of three states — **`WORK NOW`**, **`MONITOR`**, **`WAIT`** — carrying its reasoning, evidence, confidence, and an explicit account of what was deferred and why.

**Is not** — a ranked dump of everything noticed. Not an [Objective](#objective) until a human accepts it. Not a [Finding](#finding) — a finding may be true and still not deserve attention. Not a decision.

**Owner** — [`priority-engine.md`](../constitution/intelligence-core/priority-engine.md).

**Relates to** — produced from [Findings](#finding); rendered by the [Dashboard](#dashboard); a `WORK NOW` item may become an [Objective](#objective).

> **Deferral is a first-class output.** A priority list without stated deferrals is incomplete: a coach cannot judge a recommendation without knowing what it displaced.

---

### Progress

**Is** — change in a [Player](#player) measured over time against comparable [Measurements](#measurement) and standing [Objectives](#objective).

**Is not** — a single measurement. Not a score. Not a Dashboard concern — it lives in the player profile. Not comparable across metric-definition versions without re-derivation.

**Owner** — `product-architecture.md` §1.1 C3.

**Relates to** — computed from [Measurements](#measurement) over time; evaluated against [Objectives](#objective); the reason [Metrics](#metric) must be versioned.

---

### Recommendation

**Is** — a proposal to the human holding authority, carrying its reasoning, its evidence, its confidence, and its alternatives.

**Is not** — a verdict, a command, or an action. Not something Atlas may execute. Not valid without evidence.

**Owner** — `reasoning-model.md` Part VI; authority in `human-decision-authority.md`.

**Relates to** — produced from [Findings](#finding) and [Priorities](#priority); becomes an [Objective](#objective) or a [Training](#training) only once a human accepts it.

---

### Session Context

**Is** — what was true on one training occasion: environment, attendance, group composition, declared readiness, declared injury, declared restrictions. **Context, never identity.**

**Is not** — a [Training Session](#training-session), which is the occasion itself. Not identity — *a bad day is not a new identity*. Not uniform in lifetime: momentary declarations expire with the session, while **ongoing declarations such as injury expire only by human action, never by time**.

**Owner** — [`current-session.md`](../constitution/intelligence-core/current-session.md).

**Relates to** — attaches to a [Training Session](#training-session); expires into the historical record; may reshape identity **only through repetition across occasions**.

> **Expiry is not deletion.** Retention of expired context is what lets Atlas later notice fatigue declared in six consecutive sessions.

---

### Training

**Is** — the design of a session: what will be worked on, of what character, at what load, serving a stated [Objective](#objective). Proposed by Atlas, accepted, modified or rejected by the coach.

**Is not** — a [Training Session](#training-session), which is the occasion where it happens. Not a prescription. Not a drill list — Atlas supplies the reasoning that makes training purposeful; the coach supplies the craft that makes it real.

**Owner** — `training-model.md`.

**Relates to** — sequenced by a `Plan` serving an [Objective](#objective); composed of exercises referencing [Library](#library) concepts; executed as a [Training Session](#training-session).

---

### Training Session

**Is** — a training occasion that actually happened: date, attendance, what was worked on, what the coach observed.

**Is not** — an authentication session (that name is forbidden here). Not the *design* of a session, which is a [Training](#training). Not [Session Context](#session-context), which is what was true that day.

**Owner** — [Data Model](../architecture/data-model.md), inheriting `current-session.md` §5.

**Relates to** — executes a [Training](#training); carries one [Session Context](#session-context); may produce [Videos](#video).

---

### Video

**Is** — the immutable evidence. Carries two distinct references to people: the **author** who uploaded it and the **subject** who is analysed — different people whenever a coach films a player.

**Is not** — an [Analysis](#analysis). Not versioned; re-encodings are derived artifacts. Not regenerable — it is the source everything else is derived from.

**Owner** — `product-architecture.md` §2.7.

**Relates to** — belongs to a [Player](#player) as subject; carries a processing state machine; yields [Observations](#observation) and [Measurements](#measurement) through perception.

---

## Terms deliberately absent

| Term | Why |
|---|---|
| **Session** | Forbidden. See reserved names |
| **Project** | Does not exist in this domain |
| **Agent** | Implementation detail, not a domain concept. Atlas presents one [Assistant](#assistant) |
| **Score**, **Index**, **Rating** | No composite exists without a documented derivation. If one is ever introduced, it enters as a [Metric](#metric) with a stated computation |
| **Cohort** | Collective intelligence is out of scope and unmodelled |
| **Workspace** | **Withdrawn** (`data-model.md` §2.24). The ownership boundary is [Club](#club) — the name the Core and the Domain Model already use |

---

_This document is the official vocabulary of Atlas. One term, one definition. Where a term is owned by an Intelligence Core document, that document governs. It changes only by explicit, deliberate amendment._
