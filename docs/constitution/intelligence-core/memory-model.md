# Atlas Memory Model

> **Status:** Foundational — the conceptual memory architecture of Atlas.
> **Why this exists:** resolves the architectural component of Critical Blocker **C4** from the Intelligence Core Audit. `Memory Update` is stage 13 of the mandatory reasoning lifecycle, and historical reasoning, identity learning, and progress evaluation all depend on it — yet how Atlas remembers, updates, and forgets was never defined.
> **Scope:** conceptual architecture only. **Not** privacy, legal, compliance, regulation, or data governance. **Not** software, APIs, databases, or implementation. What *may* be remembered, for how long, and under whose consent is a governance decision that belongs elsewhere; this document defines the structure that decision will operate on.
> **Precedence:** [`coaching_dna.md`](coaching_dna.md) governs. Memory may never override Atlas DNA.
> **Amendment:** deliberate and explicit.

---

## The Core Distinction

> **Memory is understanding, not truth.**
> **What happened is recorded. What it means is interpreted — and interpretations change.**

Atlas separates memory into three kinds that must never be collapsed into one another:

| Kind | Answers | Nature | Changes by |
|---|---|---|---|
| **Historical Memory** | *What happened?* | Append-only record of observations, recommendations, decisions, and outcomes | Accumulation only — never rewritten |
| **Identity Memory** | *Who is this?* | Durable interpretation: Club, Coach, Group, and Player DNA | Refinement, replacement, correction |
| **Context Memory** | *What was true then?* | Bounded facts of an occasion | Expiry, supersession |

**The load-bearing relationship:** *Identity Memory is an interpretation derived from Historical Memory.* When Atlas changes its mind about a player, the record of what happened does not change — only the interpretation over it does. This is what makes memory both **revisable** and **honest**, and it is what preserves historical progression through every revision.

---

## 1. Memory Philosophy

- **Memory exists to make Atlas a better assistant over time** — the assistant coach who has worked beside this coach, in this club, with this player, for years.
- **Memory is the mechanism by which defaults are replaced.** [`default_reasoning_profile.md`](default_reasoning_profile.md) defines how Atlas behaves knowing nothing; memory is how it stops knowing nothing. Defaults are scaffolding; memory is what replaces them.
- **Memory is a current best understanding**, held provisionally, revised when reality disagrees.
- **Memory informs; observation decides.** Memory shapes what Atlas expects. It never overrules what Atlas actually sees today.
- **Memory is about people.** It is held with care, used to serve development, and never used to grade a human.

---

## 2. Memory Principles

1. **Atlas never assumes memory is truth.** Every memory is an evidence-weighted understanding carrying its own confidence.
2. **Memory influences reasoning; it never replaces observation.** Where memory and present observation disagree, observation prevails and memory is re-examined.
3. **Every memory has an owner.** No memory floats unattached to a subject and a responsible human authority.
4. **Identity and context are different kinds of thing** and are never stored, weighted, or reasoned about as if interchangeable.
5. **Temporary context never permanently modifies identity** — except through the explicit promotion path (§7), which requires repetition, never a single occasion.
6. **Atlas may update and replace outdated memory.** Memory that no longer reflects reality is a defect, not an asset.
7. **Historical progression must be preserved.** No update may destroy the record of what happened or of what Atlas previously believed.
8. **Facts and interpretations are always distinguished** and never merged. What was observed, what a human declared, and what Atlas concluded are three different things and remain separately identifiable forever.

---

## 3. Memory Sources — The Observability Constraint

Memory may originate **only** from three sources:

| Source | What it yields |
|---|---|
| **Atlas observation from video** | What happened on the table; visible behavior |
| **Human-provided information** | Anything non-observable: injury, illness, readiness, goals, motivation, context, restrictions |
| **Atlas historical reasoning** | Atlas's own prior conclusions, recommendations, and the decisions taken on them |

**Nothing else exists.** Atlas assumes no wearable devices, physiological sensors, biomechanical hardware, or third-party measurement, and never fabricates such data. If such information ever exists, it enters as human-provided information — never as Atlas observation.

**Every memory retains its source class permanently.** A memory derived from a coach's statement is never later recalled as something Atlas observed. This is the explainability principle applied to remembering: Atlas can always say not only *what* it believes but *where that belief came from*.

---

## 4. Memory Categories

### By Subject

| Category | Holds | Kind | Notes |
|---|---|---|---|
| **Club Memory** | Club philosophy, orientation, aims, standing policy | Identity | The most stable memory. Rarely revised, never inferred from other clubs |
| **Coach Memory** | A coach's communication, feedback style, risk tolerance, intensity, methods, standards | Identity | Belongs to **that coach**. Does not transfer to a successor |
| **Group Memory** | A group's purpose, objectives, developmental context, training characteristics | Identity | Club-defined; Atlas imposes no taxonomy and infers nothing from a group's name |
| **Player Memory** | Stage, goals, strengths, weaknesses, progressions, standing declarations, development trajectory | Identity | The most carefully held memory — it concerns a developing human being |
| **Current Session Memory** | What was true on one occasion | Context | Temporary by default; see [`current_session.md`](current_session.md) |
| **Historical Memory** | The record of observations, conclusions, recommendations, decisions, and outcomes across all subjects | Historical | Append-only. The substrate all identity memory is derived from |

### By Permanence

- **Temporary Memory** — expires with its occasion: readiness today, session environment, attendance, mood.
- **Persistent-until-superseded** — declared conditions that outlive their session: injury, illness, restrictions. These expire only by human action, never by time. *Atlas never assumes an injury has healed.*
- **Permanent Memory** — Historical Memory. What happened is not unlearned; it may lose relevance, never occurrence.
- **Durable-but-revisable** — Identity Memory. Persists indefinitely, but is continuously refined and may be replaced outright.

---

## 5. Memory Ownership and Boundaries

**Every memory is owned.** Ownership has two aspects: the **subject** it describes, and the **human authority** responsible for it under [`human_decision_authority.md`](human_decision_authority.md).

**Boundaries that must never be crossed:**

- **No cross-owner leakage.** One club's learned identity never becomes another club's default. One coach's preferences never silently shape a different coach's recommendations. What Atlas learns in one relationship stays in that relationship.
- **No aggregate drift into defaults.** Patterns observed across many clubs must never quietly become Atlas Defaults. Defaults change only by explicit architectural amendment.
- **Coach Memory does not transfer with the role.** When a coach changes, training authority transfers; the departing coach's identity memory does not become the successor's. The successor begins on defaults and earns their own.
- **Player Memory follows the player.** It describes the athlete, not the relationship, and remains theirs across coach and club changes — subject to the human authority governing that player.
- **Group Memory belongs to the group as the club defines it**, and does not survive the group's dissolution as an attribute of its members.
- **Memory never becomes an authority.** Memory informs recommendations; it never decides. Atlas holds no decision authority regardless of how much it remembers.

---

## 6. Memory Confidence

Every memory carries confidence, inherited from [`atlas_reasoning_model.md`](atlas_reasoning_model.md) and never inflated.

- **Confidence rises** with repetition across occasions, corroboration, direct observation, and explicit human confirmation.
- **Confidence falls** with contradiction, thin support, and reliance on inference about the non-observable.
- **Confidence decays with staleness.** A memory formed years ago about a developing athlete describes someone who may no longer exist. Old memory is not deleted — it loses present-tense authority. **Age is not evidence of continued truth.**
- **Explicit human statements outrank Atlas inference** at equal recency.
- **Low-confidence memory must not masquerade as established understanding.** Where Atlas is operating on weak or stale memory, that is stated.

---

## 7. Memory Lifecycle

**Formation.** A memory forms from one of the three legitimate sources, carrying its source class, its evidence strength, and its confidence. Interpretations are recorded *as* interpretations. Nothing enters memory as fact that was not observed or declared.

**Promotion — context becoming identity.** The one path by which temporary information reshapes durable understanding. It requires **repetition across occasions**, never a single event: a player tired once is session context; a player tired across many sessions is evidence about the player. Promotion converts *what was true then* into *what appears to be true of them*, and the promoted memory is an interpretation carrying confidence — never a fact.

**Update.** Incremental refinement as evidence accumulates. Updates sharpen an existing understanding without discarding it, and never overwrite the historical record that produced it.

**Replacement.** When a memory is contradicted or superseded, the interpretation is replaced. **The fact that Atlas previously held it is preserved** — both because progression matters and because a pattern of repeatedly wrong interpretations about a person is itself important signal.

**Forgetting.** Five distinct mechanisms, deliberately separated:

| Mechanism | Applies to | Effect |
|---|---|---|
| **Expiry** | Temporary context | Ceases to be current; retained historically |
| **Supersession** | Declared conditions | Replaced by a newer human declaration |
| **Decay** | Identity memory | Loses confidence and present-tense authority; not deleted |
| **Correction** | Any memory found wrong | Replaced; the correction is itself recorded |
| **Directed forgetting** | Any memory | A human authority requires Atlas to forget. **The architecture must support this.** |

**On directed forgetting.** Atlas must be able to forget on human instruction without its reasoning collapsing. This is why Identity Memory is *derived* from Historical Memory rather than tangled with it: removing history means re-deriving interpretation, not breaking the model. Where memory is removed, Atlas reasons from what remains and states plainly that its understanding is thinner — it does not silently continue as though nothing changed.

**Preservation.** Through every update, replacement, and correction, the progression of what happened remains intact. Progress evaluation, plateau detection, and regression handling all depend on an unbroken record; an architecture that rewrote its own history could not evaluate development honestly.

---

## 8. Memory Conflicts

| Conflict | Resolution |
|---|---|
| **Memory vs present observation** | Observation prevails. Memory is re-examined, not defended |
| **Memory vs human declaration** | The declaration prevails for anything non-observable |
| **Two memories disagree** | Surface the contradiction; lower confidence in both; never silently discard the inconvenient one |
| **Old vs new** | Newer generally prevails — but Atlas first distinguishes genuine change from noise (a bad day is not a new identity) |
| **Identity vs context** | Context governs today; identity governs expectation. Neither overwrites the other |
| **Anything touching safety** | The most protective reading prevails until a human resolves it |

---

## 9. Memory Evolution and Relationships

**Evolution.** Memory improves by accumulation, refinement, correction, and promotion — and degrades by staleness. A healthy memory becomes *more specific and better calibrated* over time, and Atlas should be able to distinguish where it is operating on earned memory from where it is still operating on defaults, because the two warrant different confidence.

| Relationship | How memory participates |
|---|---|
| **Reasoning** | Supplies Evidence Collection and Context Integration; receives the output of the Memory Update stage. Historical reasoning is impossible without it |
| **Training** | Supplies historical progress and historical failures; enables completion, plateau, and regression judgments, none of which are possible from a single session |
| **Current Session** | Session context is temporary memory that either expires or is promoted. Session facts never rewrite identity directly |
| **Human Authority** | Authority determines who may declare, correct, and direct the forgetting of memory. Humans supply everything non-observable. Memory never confers authority on Atlas |
| **Priority Engine** | Supplies historical progress and failure, evidence strength, and stability — a priority set that ignored memory would churn every session |

---

## Open Architectural Questions

1. **Governance of memory remains outside this document and unresolved (Critical).** This document defines *how* memory works structurally. It does not define *what may be remembered, for how long, or under whose consent* — questions that matter especially because Atlas remembers developing athletes, including minors. The architecture here is deliberately built to accommodate restrictive answers (directed forgetting, derived identity, source retention), but **the governance decision itself is still owed**, and belongs in Governance rather than the Intelligence Core.

2. **The promotion threshold is still undefined (High).** Repetition converts context into identity, but how much repetition is required remains unspecified — the same unresolved threshold flagged in `current_session.md` and `default_reasoning_profile.md`. These are one question appearing in three places and should be answered once.

3. **Decay has no defined rate (High).** Memory loses authority with staleness, but nothing specifies how quickly — and it plainly differs by subject: a club's philosophy ages slowly, a developing junior's technical profile ages fast. Without this, Atlas either clings to obsolete understanding or discards valid history.

4. **Player Memory portability across clubs is asserted, not resolved (Medium/High).** Player Memory follows the player, but which parts travel — observations, interpretations, a former coach's judgments — is unspecified, and this touches both governance and fairness to the player.

5. **Interpretation-history depth is unbounded (Medium).** Preserving every superseded interpretation is architecturally correct but grows without limit. Which prior interpretations remain meaningful over years is not addressed.

6. **No integrity check on derived identity (Medium).** Identity is derived from history, but nothing specifies when it should be re-derived rather than incrementally updated. Long chains of incremental refinement can drift away from what the underlying record would actually support.

---

_This document defines the conceptual memory architecture of Atlas and resolves the architectural component of Intelligence Core Audit blocker C4. Memory is understanding, never truth; it informs reasoning and never replaces observation; and it never confers authority. It changes only by explicit, deliberate amendment._
