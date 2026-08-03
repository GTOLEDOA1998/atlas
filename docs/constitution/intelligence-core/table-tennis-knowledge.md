# Atlas Table Tennis Knowledge Model

> **Status:** Foundational — the permanent knowledge model of table tennis that Atlas reasons over.
> **Nature:** This is a *knowledge* document. It defines **what Atlas knows about table tennis** and, more importantly, **how that knowledge is structured and connected**. It contains no software, AI, prompt, or database detail — by design.
> **What it is not:** not a coaching guide (coaching judgment lives in [`coaching_dna.md`](coaching_dna.md)), not a technique manual, not an encyclopedia. It does not attempt to teach the sport or exhaustively catalogue it.
> **Authority:** Every intelligent component of Atlas inherits this model. When a component reasons about the game, it reasons in the vocabulary and relationships defined here.
> **Relationship to Coaching DNA:** this document defines *what is known*; Coaching DNA defines *how that knowledge is used to coach a human*. Knowledge is neutral and descriptive; coaching is judgment and adaptation. The two are complementary and must stay consistent.
> **Amendment:** The *framework* (the concept schema and relationship model) is intended to be stable for decades. The *concepts* it holds may be extended and refined as understanding grows. Changes are deliberate, never incidental.

---

## Purpose

This document gives Atlas a **structured understanding of table tennis** — not a pile of facts, but a connected model in which every concept knows what it depends on, what it leads to, what causes it, what it causes, and how it is recognized.

The central design commitment is this: **Atlas must understand the game as a web of relationships, not as a list of isolated facts.** Knowing "a push is a stroke" is nearly useless. Knowing that a *poor push* is often *caused by* a late contact point, which is often *caused by* slow footwork, which *depends on* balance, and which *leads to* an attackable ball the opponent will punish — that is knowledge Atlas can reason with.

Accordingly, this document does two things:

1. It defines a **universal concept schema** — the shape every piece of table tennis knowledge takes.
2. It defines a **relationship model** — the kinds of connections that bind concepts together into a reasoning web.

It then populates the **knowledge domains** using that schema and those relationships — as a *framework with representative concepts*, not an exhaustive inventory. The goal is that any future concept added to Atlas has an obvious, consistent place and a clear set of connections.

---

## Design Philosophy: Concepts and Relationships, Not Chapters

A manual is organized as chapters to be read in order. This model is organized as **concepts to be traversed in any direction**, because that is how the game is actually reasoned about.

- **Concepts are nodes.** Each is a self-contained unit of understanding, described the same way every time (the concept schema).
- **Relationships are edges.** Each concept is connected to others by typed relationships (the relationship model). Meaning lives as much in the edges as in the nodes.
- **No concept stands alone.** A concept with no relationships is incomplete and, to Atlas, nearly meaningless.
- **The framework outlives its contents.** Specific concepts will be added, split, and refined for decades. The *schema* and *relationship types* are the durable part and must remain stable.

Atlas does not "read the table tennis book from the top." It starts from an observation and traverses the web — from symptom to cause, from cause to prerequisite, from concept to progression, from one domain into another.

---

## The Concept Schema

Every concept in the Atlas knowledge model is described by the same ten attributes. This uniformity is what lets Atlas reason across the entire sport with one consistent method.

1. **Purpose** — *why the concept exists.* What is it for in the game? A concept without a purpose is trivia.
2. **Description** — *what it is.* A clear, neutral account of the concept itself.
3. **Observable indicators** — *how it is recognized.* The signs by which its presence, quality, or absence can be perceived. This is the bridge from raw observation to knowledge.
4. **Common errors** — *how it typically goes wrong.* The recurring failure modes associated with the concept.
5. **Possible causes** — *why it goes wrong.* The underlying reasons behind the errors — frequently rooted in *other* concepts, often in *other domains*.
6. **Consequences** — *what results.* What follows from the concept's quality or failure, again often reaching into other concepts and domains.
7. **Related concepts** — *what it connects to.* The neighboring nodes in the web.
8. **Dependencies** — *what must exist first.* The prerequisite concepts this one rests on.
9. **Progressions** — *what it develops into or toward.* The next stages along the developmental path.
10. **Training implications** — *what kind of work it implies.* In general, descriptive terms — the nature of practice the concept calls for. (This describes the *knowledge*, not a prescription for a specific player; personalization is the coaching layer's job.)

Attributes **3, 5, and 6** (indicators → causes → consequences) are what make the model *diagnostic*: they let Atlas move from *what is seen* to *why it happens* to *what it will lead to*. Attributes **7, 8, and 9** (related, dependencies, progressions) are what make it *connected*: they place every concept in the web.

---

## The Relationship Model

Concepts connect through a small set of **typed relationships**. These types are deliberately few and stable; the richness comes from how densely they link the concepts. Every relationship is directional and meaningful.

1. **Dependency (`requires`)** — A cannot be developed or performed well without B. Prerequisite structure. *Example: controlled stroke mechanics require balance and a stable base.*
2. **Progression (`develops into`)** — A is an earlier stage on a path toward B. Developmental sequencing over time. *Example: a controlled drive progresses toward a topspin attacking stroke.*
3. **Composition (`is composed of`)** — A is built out of B, C, D. Whole-and-parts structure. *Example: a playing style is composed of technical tendencies, tactical preferences, physical traits, and mental temperament.*
4. **Causation (`causes`)** — A produces or leads to B. The backbone of error and consequence reasoning. *Example: a late contact point causes loss of control and an attackable ball.*
5. **Indication (`is evidence of`)** — A is an observable sign of B. The link from indicators to underlying concepts. *Example: repeatedly being late to the ball is evidence of a footwork or anticipation limitation.*
6. **Tension / Trade-off (`trades off against`)** — improving or emphasizing A tends to cost B. Where coaching choices become real. *Example: maximum power trades off against consistency and recovery.*
7. **Contextual relevance (`matters more in`)** — A's importance rises or falls in context C. *Example: serve quality matters more under score pressure and against strong receivers.*
8. **Cross-domain influence (`shapes`)** — a concept in one domain conditions a concept in another. The connective tissue between domains. *Example: fatigue (physical) shapes error rate (technical) and composure (mental) under pressure (situation).*

**The most important relationship type is cross-domain influence.** The domains below are a convenience for organizing concepts, but the game does not respect those boundaries: a "technical error" is very often a physical, mental, or tactical problem wearing a technical mask. Atlas must always be willing to follow a relationship *out of* the domain where a symptom appears.

---

## The Knowledge Domains

Table tennis knowledge is organized into ten domains. Each is a **concept space**, not a chapter. For each domain this document gives its purpose, the shape of the concepts it contains, its principal internal concepts, and — crucially — how it connects to the others. Where useful, one concept is expanded through the full schema as an **illustrative template** (explicitly *not* an exhaustive definition).

### Domain 1 — Technical Skills

**Purpose in the model:** the substrate. Technical skills are the physical execution primitives of the game — the raw acts from which everything tactical, situational, and stylistic is built.

**Concept space includes:** grip; ready position; balance and base; footwork and movement; weight transfer and the kinetic chain; contact quality (timing, contact point, bat angle, spin production); the stroke families (control strokes, attacking strokes, blocking/counter strokes, defensive strokes, serves, and receives); recovery to ready position. These are described as capabilities and qualities, not as a checklist of named shots.

**Internal relationships:** most technical concepts *depend on* balance and base; strokes are *composed of* contact-quality elements; control strokes *progress into* attacking strokes; every stroke *requires* recovery to remain usable in a rally.

**Cross-domain influence:** technical skills are *shaped by* physical development (Domain 3) and mental state (Domain 4); they are *deployed by* tactics (Domain 2); their failures are diagnosed through error patterns (Domain 10).

**Illustrative concept (template): Contact Point (timing of the ball strike)**
- *Purpose:* to strike the ball at the moment that gives the intended control, speed, and spin.
- *Description:* the point in the ball's flight, relative to the body and the table, at which contact is made.
- *Observable indicators:* clean, consistent ball flight; the player appearing "on time" and balanced at contact; reproducible outcomes on similar balls.
- *Common errors:* contacting late; contacting too early; inconsistent contact point across repetitions.
- *Possible causes:* slow or incorrect footwork; poor anticipation; imbalance; misjudged incoming spin or speed.
- *Consequences:* loss of control, spin, or power; an attackable ball offered to the opponent; forced compensations elsewhere in the stroke.
- *Related concepts:* footwork, balance, anticipation, spin production.
- *Dependencies:* balance and base; adequate footwork to arrive in position.
- *Progressions:* from a consistent contact point on predictable balls toward reliable contact under variable, high-pressure conditions.
- *Training implications:* work that varies feed and demands positioning, so contact timing is trained under realistic uncertainty rather than only in repetition.

### Domain 2 — Tactical Concepts

**Purpose in the model:** the purposeful use of technical skills. Tactics turn *ability to execute* into *ability to win points*.

**Concept space includes:** point construction (opening, developing, and finishing a point); serve and the following ball; receive strategy; placement and patterns; spin and pace variation; tempo control; exploiting weaknesses and protecting one's own; the transition between defense and attack; adaptation to the opponent over a match.

**Internal relationships:** tactical concepts *depend on* the technical skills they employ (a tactic one cannot execute is not a real option); many tactics *trade off against* one another (aggression vs. control); most *matter more in* specific match situations (Domain 5).

**Cross-domain influence:** tactics are *constrained by* technical and physical capacity, *governed by* mental composure and decision speed, *expressed through* playing style (Domain 6), and *enabled or limited by* equipment (Domain 7).

### Domain 3 — Physical Development

**Purpose in the model:** the athletic foundation that makes technical execution possible and repeatable.

**Concept space includes:** agility and movement speed; reaction and anticipation-supporting quickness; balance and core stability; explosive power; endurance and repeatability; coordination; flexibility; and physical resilience (injury resistance and recovery capacity).

**Internal relationships:** power *trades off against* control if untrained; endurance *shapes* the persistence of every other quality across a match.

**Cross-domain influence:** physical qualities *shape* technical skills (Domain 1) directly — most notably, **fatigue shapes error rate and decision quality** — and *matter more in* long matches and late-game situations (Domain 5). Physical resilience is the concept through which the safety priority of Coaching DNA reaches into the knowledge model: fatigue and injury are knowledge facts with consequences, and the coaching layer treats them as paramount.

### Domain 4 — Mental Aspects

**Purpose in the model:** the psychological layer that governs whether skill and tactics survive contact with pressure.

**Concept space includes:** attention and focus; composure under pressure; decision speed and clarity; confidence; resilience (recovery from errors and setbacks); competitiveness; emotional regulation; and pre-performance routine.

**Internal relationships:** confidence and resilience *shape* one another; emotional regulation *is evidence of*, and a dependency for, composure.

**Cross-domain influence:** mental state *shapes* both technical execution (Domain 1) and tactical decision-making (Domain 2), and *matters more in* high-pressure match situations (Domain 5). A technical error under match points is frequently a mental-domain problem wearing a technical mask — a canonical case of following a relationship out of its apparent domain.

### Domain 5 — Match Situations

**Purpose in the model:** the contexts in which all other domains combine and are tested. Situations are not skills; they are *conditions that change what other concepts mean*.

**Concept space includes:** serving vs. receiving; leading vs. trailing; neutral vs. high-pressure scores (close games, game and match points); momentum and its shifts; early vs. late in a match; and the ongoing adaptation between two specific opponents.

**Internal relationships:** situations are primarily linked to other domains by **contextual relevance** — they are the `matters more in` targets for concepts across the whole model.

**Cross-domain influence:** situations *amplify* the mental domain (pressure), *tax* the physical domain (late-match fatigue), and *reshape* tactical priorities (what is worth risking when leading vs. trailing). Match situations are where Atlas's reasoning must weigh several domains at once.

### Domain 6 — Playing Styles

**Purpose in the model:** stable identities that describe *how a given player tends to play* — the compositional signature across the other domains.

**Concept space includes:** offensive/attacking orientations; blocking and counter-hitting orientations; defensive orientations; all-round orientations; and positional tendencies (close-to-table vs. mid-distance). Styles are treated as **compositions**, not categories to be forced onto a player.

**Internal relationships:** a style *is composed of* technical tendencies, tactical preferences, physical traits, and mental temperament. Each style carries characteristic **trade-offs** (e.g., a far-from-table defensive orientation trades reach and time against initiative).

**Cross-domain influence:** style *shapes* which tactics are natural (Domain 2), which physical qualities matter most (Domain 3), and which equipment suits the player (Domain 7). Style is also a lens for **error interpretation**: the same observable error can mean different things for different styles.

### Domain 7 — Equipment Considerations

**Purpose in the model:** the tools, understood as **enablers and constraints of style and technique** — never as a ranking of "best gear."

**Concept space includes:** the blade (its speed/control character); rubber families (their broad behavioral categories, e.g. spin-oriented, disruptive, or control-oriented surfaces); the sponge's contribution; and grip type. Equipment concepts are described by *what behavior they enable and what they cost*, not by brand or specification.

**Internal relationships:** equipment choices carry inherent **trade-offs** (speed vs. control, spin vs. predictability).

**Cross-domain influence:** equipment *shapes and is shaped by* playing style (Domain 6) — the relationship runs both ways — and *conditions* which technical skills (Domain 1) and tactics (Domain 2) are effective. Atlas treats equipment as context for interpreting a player's game, not as an independent lever to optimize.

### Domain 8 — Training Methodology

**Purpose in the model:** the knowledge of *how capability is built* — the structure of practice that turns a concept from absent to reliable.

**Concept space includes:** the spectrum from closed, predictable practice to open, variable, match-like practice; fixed vs. random practice structures; multi-feed (multiball) work; repetition vs. variability; feedback and its timing; load management and recovery as part of training; periodization over time; and the principle of transfer (practice must carry into real play).

**Internal relationships:** methodology concepts *depend on* the learning progressions (Domain 9) they serve; closed practice *progresses into* open practice; repetition and variability *trade off against* each other and must be balanced.

**Cross-domain influence:** methodology is the **operator** that moves concepts along their progressions in every other domain. It is *governed by* the safety and long-term-development priorities that live in Coaching DNA — the knowledge model describes how training works; the coaching layer decides how to apply it to a person.

### Domain 9 — Learning Progressions

**Purpose in the model:** the *ordering* of development — what must be learned before what, and in what sequence capability naturally grows.

**Concept space includes:** prerequisite chains (foundational qualities before advanced skills); the general stages of skill acquisition (an early understanding-focused stage, a refining stage, and an automatic stage); the movement from consistency to variability to pressure-tolerance; and maturity- and readiness-appropriate sequencing.

**Internal relationships:** progressions are expressed almost entirely through the **dependency** and **progression** relationship types — they *are* the structure those edges form across the whole model.

**Cross-domain influence:** progressions constrain training methodology (Domain 8) — practice that violates prerequisite order is inefficient or harmful — and connect to Coaching DNA's long-term athlete development: the knowledge model supplies the *natural order*; the coaching layer respects it for a specific athlete.

### Domain 10 — Error Patterns

**Purpose in the model:** the diagnostic overlay across all other domains. Error patterns are how Atlas reasons **from a visible symptom to a root cause**, wherever that cause lives.

**Concept space includes:** the distinction between a *symptom* and a *root cause*; recurring error families (technical, tactical, physical-caused, and mental-caused); **compensations** (a player masking one limitation by distorting something else); and **error cascades** (one failure producing a chain of downstream failures).

**Internal relationships:** error patterns are built almost entirely from the **causation** and **indication** relationship types, chained together: indicator → possible cause → deeper cause → consequence.

**Cross-domain influence:** error patterns *reach into every domain*. Their defining principle is that **the domain where an error appears is not necessarily the domain where it originates.** This domain exists precisely to stop Atlas from "fixing" a symptom in the wrong place.

---

## The Diagnostic Chain — How the Web Is Traversed

The domains and schema exist to support one central act of reasoning, which every analytical component of Atlas inherits:

> **Observable indicator → possible cause(s) → deeper cause(s), across domains → consequence(s) → the concept(s) that must develop → training implication.**

A single traversal illustrates the connectedness (illustrative, not prescriptive):

- **Indicator:** the player is repeatedly late to the ball on one wing.
- **Possible cause (technical):** contact point too late.
- **Deeper cause (technical → physical):** slow footwork; insufficient movement speed.
- **Deeper cause (physical → progression):** footwork rests on balance and base, which may be underdeveloped.
- **Cross-domain amplifier (mental/situation):** the lateness worsens under score pressure, implicating composure and decision speed.
- **Consequence (tactical):** attackable balls conceded; points lost in predictable patterns.
- **Concept to develop (progression + methodology):** balance and footwork first, trained from closed toward open practice, in prerequisite order.

The knowledge model's job is to make this traversal *possible and consistent*. It deliberately stops at "training implication" — **turning implications into a plan for a specific player is the coaching layer's responsibility, not the knowledge model's.**

---

## Relationship Model — Consolidated Summary

For quick reference, the eight relationship types that bind the model:

| Type | Reads as | Primary use |
|------|----------|-------------|
| Dependency | A **requires** B | Prerequisite structure, learning order |
| Progression | A **develops into** B | Developmental sequencing over time |
| Composition | A **is composed of** B, C | Wholes and parts (e.g. styles) |
| Causation | A **causes** B | Errors → consequences; root-cause chains |
| Indication | A **is evidence of** B | Observation → underlying concept |
| Tension / Trade-off | A **trades off against** B | Where coaching choices arise |
| Contextual relevance | A **matters more in** C | Situational weighting |
| Cross-domain influence | A **shapes** B (across domains) | The connective tissue of the whole model |

**Guiding rule:** knowledge in Atlas is only complete when a concept carries its relationships. A fact without edges is not yet knowledge.

---

## Boundaries — What This Document Deliberately Excludes

To keep the knowledge model clean and durable, it intentionally does **not**:

- **Teach the sport.** It names concept *types* and their relationships; it is not a coaching or technique manual.
- **Exhaustively enumerate techniques.** It defines the *framework* and representative concepts; the concept set is meant to grow within the schema, not to be complete on day one.
- **Make coaching decisions.** What to prioritize, how to adapt to a person, when to intervene — all of that lives in Coaching DNA. This document supplies neutral, descriptive knowledge for that judgment to use.
- **Encode individual players.** It is the general model of the sport; the specific athlete (Player DNA) belongs to the coaching layer.
- **Contain any implementation.** No software, AI, prompt, data, or storage concepts appear here, and none should be added.

Where this model and Coaching DNA meet, the division is firm: **knowledge is what is true about the game; coaching is what to do about it for a person.** Atlas keeps them distinct so that neither corrupts the other.

---

## Closing Statement

Table tennis, to Atlas, is not a list of strokes and rules. It is a connected web in which a symptom on the table can be traced to its cause, a cause to its prerequisite, a prerequisite to its natural developmental order, and every concept to its consequences across the technical, tactical, physical, mental, situational, and stylistic dimensions of the game.

This document defines the shape of that web — the uniform way every concept is described, and the typed relationships that connect them — so that every intelligent part of Atlas understands the sport the same way, reasons across domains rather than within silos, and treats knowledge as connected understanding rather than isolated fact. The framework is built to hold twenty years of growing knowledge without changing its shape.

---

_This document defines what Atlas knows about table tennis and how that knowledge is connected. The framework (schema and relationship model) is stable; the concepts it holds may grow. It changes only by explicit, deliberate amendment — never as a side effect of building a feature._
