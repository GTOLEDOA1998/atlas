# Atlas Principles

> **Status:** Foundational — the principles that constrain how Atlas is **built**.
> **Why this exists:** the principles governing Atlas are spread across five documents. A contributor deciding whether a feature is legitimate had to read all five and assemble the answer. This document states each principle once, names the document that owns it, and adds what none of them provide systematically: **architectural consequences, examples, and anti-patterns**.
> **Owns:** the architectural consequences, worked examples and anti-patterns of each principle, and the ownership map that says which document each principle belongs to.
> **Inherits:** [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) · [`product-principles.md`](../constitution/product-principles.md) · [`manifesto.md`](../constitution/manifesto.md) · [`development-rules.md`](../constitution/development-rules.md) · [`product-architecture.md`](../architecture/product-architecture.md).
> **Does not own:** any principle itself. Every principle here is owned elsewhere; this document elaborates and never restates, softens, or re-derives. A conflict between this document and its source means this document is defective.
> **Precedence:** [`coaching-dna.md`](../constitution/intelligence-core/coaching-dna.md) Level 1 governs everything. Then [`product-principles.md`](../constitution/product-principles.md). Then this document.
> **Amendment:** deliberate and explicit. A principle marked *Inherited* changes only by amending its owner.

---

## Ownership map

| # | Principle | Owner | Status here |
|---|---|---|---|
| P1 | The coach holds the decision | `coaching-dna.md` L1 · `human-decision-authority.md` | Inherited |
| P2 | Every recommendation requires evidence | `coaching-dna.md` L1 §18 | Inherited |
| P3 | Facts are permanent | `memory-model.md` | Inherited |
| P4 | Interpretations may evolve | `memory-model.md` | Inherited |
| P5 | Atlas assists, never replaces | `manifesto.md` · `product-principles.md` §2 | Inherited |
| P6 | The Dashboard answers one question | `product-architecture.md` §1.3 | Inherited |
| P7 | Evolution belongs to the player profile | `product-architecture.md` §1.1 C3 | Inherited |
| P8 | Every feature must improve a decision | `product-principles.md` §2, §13 | Inherited |
| P9 | No speculative complexity | `development-rules.md` §1 | Inherited |
| P10 | Simplicity is a product feature | `product-principles.md` §2, §12 | Inherited |

Every principle is inherited. **That is the intended result** — this document adds consequence, not doctrine.

---

# P1 · The coach holds the decision

> **Atlas does not replace the coach's judgment. It organizes information, interprets data, and proposes actions so the coach can make better decisions.**

### Description

Atlas never holds decision authority. What varies across scenarios is *which human decides*, never *whether* a human decides. In the MVP that human is the assigned coach, who holds **training authority**; administrative matters belong to a separate, independent authority.

### Motivation

Coaching quality does not scale because attention does not scale. Atlas exists to remove that limit **without touching the judgment**. A system that decided would not be amplifying a coach — it would be replacing one, badly, without accountability for the athlete it affects.

### Architectural consequences

- **Two mandatory human gates.** A Priority becomes an Objective only when a human accepts it; a proposed Training becomes a real session only when a human approves it. See [`decision-framework.md`](decision-framework.md) §3.
- **Decisions are a distinct data class.** Human choices are immutable and are never regenerated. Interpretations may be recomputed; decisions may not.
- **Overrides are stored, not just honoured.** What a coach changed about a proposal is the signal from which Coach DNA is learned. Storing only the final result destroys it.
- **The product degrades gracefully without intelligence.** If reasoning is unavailable, video still uploads and history still reads. A product that stops working without its AI has made the AI the decider.

### Example

Atlas raises a `WORK NOW` priority on footwork. The coach reads the reasoning, disagrees because the player is returning from injury, and rejects it. Atlas defers without argument, records the override, and does not re-raise the same priority next session as though nothing happened.

### Anti-patterns

- An interface that shows a conclusion with no visible way to reject it — the decision has been made *for* the coach, whatever the copy says.
- A plan auto-assigned to a player "to save a click."
- Re-raising an overridden recommendation unchanged, which converts deference into nagging.
- Framing a recommendation as a verdict: *"Player X needs footwork work"* instead of *"the evidence suggests… here is why… what do you think?"*

---

# P2 · Every recommendation requires evidence

> **No opaque recommendations. No invented metrics.**

### Description

Every judgment Atlas offers can show its reasoning and the evidence behind it. Evidence comes from exactly three sources — **observation from video**, **human declaration**, and **Atlas's own prior reasoning** — and every memory retains which of the three it came from, permanently.

### Motivation

Confidence grows from clarity, not mystery. A coach who cannot verify a claim cannot responsibly act on it, and a coach who acts on an unverifiable claim has outsourced judgment. *If Atlas cannot explain it, Atlas does not assert it.*

### Architectural consequences

- **No metric ships without a documented derivation.** Composite scores and indices are where invented metrics hide; a number whose computation cannot be stated does not exist.
- **Findings link back to the footage they came from.** Evidence is reachable from the claim, not buried.
- **Provenance survives aggregation and time.** Something a coach declared is never later presented as something Atlas observed.
- **Atlas sees behaviour, never internal state.** Fatigue, pain, motivation and readiness are declared or unknown. Atlas may observe an indicator that prompts a question; it may never convert an indicator into an asserted state.
- **No fabricated sensor data, ever.** Atlas has no wearables, no physiological measurement, and never invents them.

### Example

A finding reads: *"Contact point is consistently late on backhand against topspin"* — with the four clips it was measured from, the metric definition and its version, a confidence level, and the note that the coach separately declared reduced training availability that month.

### Anti-patterns

- A "Form Index: 72" with no stated derivation.
- Mock or seed data shaped like metrics that could never be derived from video or coach input — it trains the product's structure on a fiction that has to be torn out later.
- Presenting a model's fluent explanation as evidence. Fluency is not provenance.
- Recording *"player was tired"* as observation when no human declared it.

---

# P3 · Facts are permanent

### Description

What happened is recorded and never rewritten. Video, measurements taken, sessions held, declarations made, and decisions taken form an append-only record. Corrections are added; history is not edited.

### Motivation

Progress evaluation, plateau detection and regression handling all rest on an unbroken record. **An architecture that rewrote its own history could not evaluate development honestly** — and honest evaluation of a developing human is the entire product.

### Architectural consequences

- **Video is immutable.** Everything derived from it is disposable; the video itself is not. This is what makes re-derivation possible.
- **Superseded interpretations are preserved.** The fact that Atlas previously believed something is retained — partly for progression, partly because a pattern of repeatedly misreading a person is itself important signal.
- **Expiry is not deletion.** When session context stops being current, it is retained historically. That retention is what lets Atlas later notice fatigue declared in six consecutive sessions.
- **Directed forgetting is the one exception, and it is deliberate.** A human authority may require Atlas to forget. The architecture must support it — which is why interpretation is *derived* from history rather than tangled with it.

### Example

A player's technical profile is revised after eight weeks of contrary evidence. The old interpretation is not overwritten; it is marked superseded, with its date and evidence intact, so the trajectory of Atlas's understanding remains legible.

### Anti-patterns

- Updating a record in place and losing what it said before.
- Deleting expired session context "because it is stale" — destroying exactly the repetition that promotion depends on.
- Treating a correction as an edit rather than as a new, recorded event.

---

# P4 · Interpretations may evolve

> **Memory is understanding, not truth. What happened is recorded; what it means is interpreted — and interpretations change.**

### Description

Everything Atlas concludes is a current best understanding, held provisionally and revised when reality disagrees. Interpretations carry confidence, and confidence **decays with staleness**: an interpretation formed years ago about a developing athlete describes someone who may no longer exist.

### Motivation

A system that could not change its mind would either cling to obsolete understanding or hide its revisions. Both are dishonest about a person who is, by definition, changing.

### Architectural consequences

- **Analysis is versioned and regenerable.** It records the perception model version *and* the metric definition version. When the model improves, historical footage is re-measured and the past gains resolution — a product capability, not maintenance.
- **Measurements from different metric definitions are never compared.** Two legitimate responses to a definition change: re-derive the history, or segment the series visibly. Nothing else.
- **Identity is derived from history, never tangled with it.** Removing a fact means re-deriving interpretation, not breaking the model.
- **Every interpretation records what it was derived from.** Without that, a deleted fact leaves interpretations that silently rest on nothing.
- **Observation outranks memory.** Where memory and present observation disagree, observation prevails and memory is re-examined.

### Example

A perception model improves. Two seasons of footage are re-analysed; a player's history is now measured more precisely, and a plateau that was invisible at the old resolution becomes visible. Nothing about the record of what happened changed.

### Anti-patterns

- Charting measurements from two metric-definition versions on one axis. The chart is a lie regardless of intent.
- Rendering a three-year-old interpretation identically to yesterday's — lying by omission about staleness.
- A "cooked" value with no path back to its inputs, which cannot be re-derived after directed forgetting.

---

# P5 · Atlas assists, never replaces

### Description

Atlas is one assistant with global context, not a set of AI features. It amplifies the coach's reach, memory and preparation. It does not diagnose, prescribe, or act on a player's behalf.

### Motivation

The best coaching has always been human — attentive, adaptive, personal. What limits it is capacity, not judgment. Atlas removes the capacity limit and leaves the judgment exactly where it belongs.

### Architectural consequences

- **There is no `features/ai/`.** Intelligence is a layer every feature consumes, never a feature beside them.
- **One context assembly, many surfaces.** Chat, analysis narrative, plan proposals and priorities all call the same assembly and write to the same memory. An assistant that knows a player's history in one surface but not another is several assistants, and users see the seam.
- **Perception measures; the Assistant interprets.** The vision pipeline is a sensor, not the intelligence. They are replaceable independently.
- **Assistant context is assembled per request and never persisted.** What persists is conversations, messages, and the *references* used — not the assembled context, which would freeze an interpretation and survive the deletion of its own evidence.

### Example

A coach asks the Assistant about a player mid-session. It answers with the same understanding that produced the analysis report that morning, because it is reading the same memory.

### Anti-patterns

- Separate "AI features" with separate context, producing inconsistent claims about the same player.
- Persisting an assembled prompt as though it were a record of fact.
- Atlas asserting a medical or diagnostic conclusion.

---

# P6 · The Dashboard answers one question

> **"¿Qué necesita mi atención hoy?"**

### Description

The Dashboard is orientation, not reporting. It surfaces players needing action, analyses ready for review, and clear next steps. Everything that does not require a decision right now lives one deliberate step away.

### Motivation

A coach opens Atlas at 8am with limited attention. A screen answering two questions answers neither at a glance. Attention is the scarcest resource in the product, and the Dashboard spends it first.

### Architectural consequences

- **The Dashboard renders the Priority Engine's output.** It is not a metrics surface; it is a triage surface.
- **No aggregate metrics.** No "total players", no "videos this month", no "% improvement".
- **No composite indices, no charts.** There is no time series to plot on a triage screen.
- **Priority is expressed through hierarchy and order, not volume.** The most important item is the most visible.
- **Deferral is shown.** What Atlas chose *not* to raise is part of the output; a coach cannot judge a recommendation without knowing what it displaced.

### Example

Three players with a `WORK NOW` priority, each with one sentence of reasoning and a link to the evidence; two analyses awaiting review; and, when there is nothing, a single action.

### Anti-patterns

- A row of stat tiles at the top — the vanity wall the Product Constitution explicitly forbids.
- An activity feed. Atlas is a coaching tool, not an attention product.
- A progress chart on the Dashboard, which belongs to the player profile (P7).

---

# P7 · Evolution belongs to the player profile

### Description

Atlas sells player evolution, not analysis. But longitudinal history is not what a coach needs at 8am — it is what they need when working on one specific player. The player profile is that history's home.

### Motivation

An analysis is a photograph; evolution is the film. Any competent model will eventually produce a competent analysis — a commodity heading toward zero price. **What cannot be copied is a coach's interpreted history of their roster over seasons.** That asset is the reason to stay, and it deserves its own place rather than a corner of a triage screen.

### Architectural consequences

- **No measurement is displayed without its reference.** Every number carries a previous value, a trend, or an objective target. A figure standing alone reports *what is* and conceals *what changed*.
- **The player's profile is the single coherent home** for their history, analyses, objectives and training — never data scattered across sections.
- **Everything hangs off a player.** No orphan analysis, no orphan video, no subjectless view.
- **Comparability across time is a hard requirement**, which is what P4's versioned metric registry exists to guarantee.

### Example

The player profile opens on who they are now; one tab away, the same measurements plotted against the eight weeks of work that were supposed to move them.

### Anti-patterns

- A number with no baseline. It looks like information and carries none.
- Evolution surfaced on the Dashboard, which breaks P6.
- A cross-roster leaderboard. Memory is never used to grade a human.

---

# P8 · Every feature must improve a decision

### Description

A feature earns its place by helping a coach decide or act. If the concrete coaching problem it solves cannot be named, together with the coach who has it, it does not ship.

### Motivation

Products do not become bloated by one bad decision; they become bloated by a hundred individually reasonable additions. Requiring each to justify itself against a real decision is the only filter that holds over years.

### Architectural consequences

- **The Decision Filter is a precondition, not a retrospective.** Run it before building.
- **Growth deepens before it widens.** When in doubt, improve what exists rather than add what does not.
- **New features integrate into the existing flow** — players → video → analysis → training — rather than adding a silo the coach must learn separately.

### Example

Video upload earns its place trivially: without footage there is no evidence, and without evidence there are no recommendations.

### Anti-patterns

- A metric added because it was easy to compute.
- A feature added to match a competitor.
- A setting added because a decision was hard to make. Configuration is decision-avoidance with a UI.

---

# P9 · No speculative complexity

### Description

Write the simplest thing that solves the current, real problem. Do not add layers, generics, options or "flexibility" for requirements that do not yet exist. Abstraction is earned by repetition, not anticipated.

### Motivation

Speculative structure is a bet on a future that usually arrives differently. It is paid for immediately in comprehension and forever in maintenance, and it is rarely reclaimed.

### Architectural consequences

- **A shared component must have real consumers today.** Two existing callers, not two imagined ones.
- **No unused props, hooks or config for anticipated needs.** Where a future need is real, arrange the *shape* so it can be inserted later — a layout region left empty is free; a dead prop is not.
- **A genuine exception: data shape.** Ownership boundaries and versioned metric definitions must exist before the first row. They are nearly free before launch and nearly impossible after. This is not speculation; it is the one class of decision that cannot be deferred.

### Example

The application header is laid out as three regions — navigation, context, actions — with the context region empty until the player switcher exists. Inserting a child later costs nothing; a `contextSlot` prop nothing passes would have been speculation.

### Anti-patterns

- A plugin system with one plugin.
- A configuration option with one valid value.
- A generic abstraction over two things that merely look similar.

---

# P10 · Simplicity is a product feature

### Description

A smaller product coaches actually use beats a larger one they abandon. Simplicity is not the absence of work; it is the result of deciding what not to build, repeatedly.

### Motivation

Atlas is used courtside, under time pressure, by someone whose attention belongs on a player. Every additional toggle, tab and screen is a tax paid in that moment.

### Architectural consequences

- **One primary job per screen**, and the most important action is obvious.
- **Atlas works well by default.** Coaches configure players and training, not the software.
- **Complexity added in one place is paid for by clarity elsewhere** — a feature that increases cognitive load must reduce it somewhere else or not ship.
- **Anti-goals bind as hard as principles:** never a social network, never a feature-dumping ground, never bloated enterprise software, never a vanity-metrics dashboard, never a replacement for coaches.

### Example

Seven sidebar destinations. Above roughly eight, a sidebar stops being scanned and starts being read.

### Anti-patterns

- A settings screen that grows because decisions were deferred to the user.
- Two ways to do the same thing, so neither is learned.
- Removing something and finding the product is just as good — evidence it should never have been added.

---

## How to use these principles

Before building anything, in order:

1. **Does it violate Level 1 Atlas DNA?** If yes, stop. No approval overrides it.
2. **Does it pass the Decision Filter?** (P8)
3. **Which decision does it improve, for which coach?** If unanswerable, stop.
4. **Does it add speculative structure?** (P9)
5. **What is the anti-pattern nearest to what you are about to build?** If you cannot name one, you have not understood the principle.

Where a proposal moves Atlas toward an anti-goal, **the proposal is wrong — not the principle**.

---

_This document elaborates the principles that constrain how Atlas is built. Every principle is inherited from a document that owns it; where they disagree, the owner wins and this document is defective. It changes only by explicit, deliberate amendment._
