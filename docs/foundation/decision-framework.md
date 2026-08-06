# Atlas Decision Framework

> **Status:** Foundational — how evidence becomes training, at the product level.
> **Why this exists:** [`reasoning-model.md`](../constitution/intelligence-core/reasoning-model.md) defines how Atlas *thinks* — a thirteen-stage cognitive lifecycle. It does not say what the product **produces**, what a coach **sees**, or where a human **must** intervene. This document answers those three questions and nothing else.
> **Owns:** the product-level pipeline — the eight artifacts a coach can see and name, the two mandatory human gates, and the mapping from those artifacts onto the reasoning lifecycle.
> **Inherits:** [`reasoning-model.md`](../constitution/intelligence-core/reasoning-model.md) · [`priority-engine.md`](../constitution/intelligence-core/priority-engine.md) · [`training-model.md`](../constitution/intelligence-core/training-model.md) · [`current-session.md`](../constitution/intelligence-core/current-session.md).
> **Does not own:** how Atlas reasons (`reasoning-model.md`), what deserves attention (`priority-engine.md`), how training is designed (`training-model.md`), who holds authority ([`human-decision-authority.md`](../constitution/intelligence-core/human-decision-authority.md)). It **maps onto** them; it never restates them.
> **Precedence:** the Intelligence Core governs. A conflict means this document is defective.
> **Amendment:** deliberate and explicit.

---

## The pipeline

Eight product artifacts, in a fixed order. Each is a thing a coach can see, name and question.

```
   EVIDENCE          video and human declaration
        │            ────────────────────────────  automatic
        ▼
   OBSERVABLES       what was seen, neutrally
        │            ────────────────────────────  automatic
        ▼
   MEASUREMENTS      values under a versioned metric
        │            ────────────────────────────  automatic
        ▼
   FINDINGS          what it means, with confidence
        │            ────────────────────────────  automatic
        ▼
   PRIORITIES        what deserves attention now
        │                + what was deferred, and why
        │
   ═════╪═══════════════════════════════  ⬤ GATE 1 — the coach accepts
        ▼
   OBJECTIVES        what must change
        │            ────────────────────────────  proposed automatically
        ▼
   TRAINING          how it will be worked
        │
   ═════╪═══════════════════════════════  ⬤ GATE 2 — the coach approves
        ▼
   FOLLOW-UP         what actually happened, re-measured
        │
        └──────────▶ returns to EVIDENCE
```

**Everything above Gate 1 is Atlas's understanding. Everything below is the coach's commitment.**

---

## 1 · Mapping onto the reasoning lifecycle

One process, two views. The reasoning model describes the cognition; this document names its outputs.

| Product artifact | Reasoning stages it results from |
|---|---|
| **Evidence** | *(input — precedes reasoning)* |
| **Observables** | 1 Observation |
| **Measurements** | 1 Observation *(quantified)* |
| **Findings** | 2 Evidence Collection · 3 Context Integration · 4 Pattern Recognition · 5–6 Hypothesis Generation & Validation · 7 Confidence Estimation · 8 Alternative Explanations |
| **Priorities** | 9 Recommendation Generation · 10 Recommendation Ranking |
| ⬤ **Gate 1** | **11 Human Decision** |
| **Objectives** | *(Training Model Part IV, steps 1–3)* |
| **Training** | *(Training Model Part IV, steps 4–9)* |
| ⬤ **Gate 2** | **11 Human Decision** *(again)* |
| **Follow-up** | 12 Learning From Decision · 13 Memory Update |

Two things this mapping makes visible that neither document states alone:

**A single Finding hides eight cognitive stages.** What a coach reads as one sentence is the compressed output of hypothesis generation, validation, confidence estimation and the retention of alternatives. The interface must be able to expand it back out — that is what makes a finding questionable rather than merely readable.

**Stage 11 occurs twice.** The reasoning model has one Human Decision stage; the product has two distinct gates, because accepting *what to work on* and approving *how to work it* are different decisions, taken at different moments, with different information.

---

## 2 · The eight steps

### Evidence · automatic

**What it is** — video, plus what humans declare.

**Why it is first** — you cannot observe what was never captured. This is also the boundary of what Atlas can ever know: exactly three sources, and no others. No wearables, no physiological sensors, no fabricated measurement.

**The asymmetry** — video yields **behaviour**; humans supply **everything non-observable**: injury, illness, readiness, motivation, restrictions, availability. Neither substitutes for the other. *Absence of a declaration is unknown, never safe* — no report of injury is not a report of health.

**Human involvement** — declaring. Not a gate, but the only route by which the non-observable enters at all.

---

### Observables · automatic

**What it is** — what was seen, registered neutrally.

**Why it comes before measurement** — measuring before observing smuggles interpretation into what looks like raw data. Once a number exists, its framing is invisible.

**The hard boundary** — Atlas sees behaviour, never state. Protective movement is observable; *pain* is not. Slower recovery between points is observable; *fatigue* is not. Atlas may observe an indicator and **ask**; it may never convert an indicator into an asserted state.

**Failure mode** — recording only faults. The reasoning model requires seeing the whole player: strengths are observations too, and a system that records only problems produces a distorted history.

---

### Measurements · automatic

**What it is** — a value computed from observables under a **named, versioned** metric definition.

**Why it comes before findings** — a finding without a measurement is an opinion. Measurement is what makes a claim checkable and, crucially, **comparable to the same player eight weeks ago**.

**Why versioning is not optional** — if a definition changes silently between model versions, the timeline lies while looking correct. Two legitimate responses: re-derive history from the immutable video, or break the series visibly. Nothing else.

**Failure mode** — composite scores. An index with no documented derivation is an invented metric wearing the costume of a measurement.

---

### Findings · automatic

**What it is** — what Atlas concludes the measurements mean, with calibrated confidence, its evidence, and the alternatives it kept alive.

**Why it comes before priorities** — prioritizing before understanding ranks symptoms. A late contact point is a symptom; slow footwork may be the cause; balance may be the cause of that. **Treating what is visible instead of what is responsible guarantees the problem returns.**

**What must reach the coach** — the conclusion, its evidence, its confidence, and the fact that alternatives exist. Confidence is stated, never implied; thin evidence must read as thin.

**Failure mode** — presenting one explanation as the only one, or offering token alternatives that were never seriously entertained.

---

### Priorities · automatic

**What it is** — the short, honest set of things deserving attention now, each as `WORK NOW`, `MONITOR` or `WAIT`, **plus an explicit account of what was set aside and why**.

**Why it comes before objectives** — a coach cannot act on twelve true statements at once. The value here is as much in what is withheld as in what is raised: every item raised spends some of the coach's attention, which is the scarcest resource in the product.

**Why deferral is an output, not an omission** — a coach cannot judge a recommendation without knowing what it displaced. A priority list without stated deferrals is incomplete.

**Why priorities should be stable** — priorities that change every session teach nothing and erode trust. Stability is a virtue, not inertia.

**Failure mode** — surfacing everything noticed. That is not thoroughness; it is offloading judgment onto the coach.

---

### ⬤ Gate 1 — the coach accepts a priority

**The first mandatory human decision.**

**What crosses** — a `WORK NOW` priority becomes an Objective **only when a human accepts it**. `MONITOR` and `WAIT` items are watched or held; training never quietly re-introduces what prioritization deliberately deferred.

**Why the gate is here and not earlier** — everything above is Atlas's understanding, and understanding can be wrong without consequence. Below this line, a commitment is made about a developing human being. That is where accountability must attach to a person.

**Why not later** — placing the gate after training design would ask the coach to approve a plan whose premise they never examined. The premise is the decision.

**What the interface must provide** — accept, modify, or reject, each equally reachable. A conclusion with no visible way to reject it has made the decision *for* the coach.

**What is recorded** — the decision, its author, its moment, and the override if there was one. Overrides are how Atlas learns this coach.

---

### Objectives · proposed automatically, owned by the coach

**What it is** — what a period of training is meant to change.

**Why it comes before training** — every element of training must trace to an objective, and every objective to a priority. **Activity is not development.** An objective nobody can trace to a priority should not exist.

**What Atlas contributes** — translating a priority into something bounded and observable, and locating the player's current position on the relevant progression so design begins from where they actually are rather than from an ideal.

**Why it cannot be regenerated** — it is a human decision. Interpretations may be recomputed; commitments may not.

---

### Training · proposed automatically

**What it is** — the design of the work: character of practice, load, context, progression indicators, and the moment it will be reconsidered.

**Why indicators are set in advance** — deciding beforehand what would show this is working is what makes later evaluation an assessment rather than retrospective storytelling.

**What Atlas does not do** — prescribe drills. Specific practice belongs to the coach, who knows their players, their hall, their equipment and their time. Atlas supplies the reasoning that makes training purposeful.

**Constraints that bind rather than trade off** — safety, injury, fatigue, prerequisites, and the realism of the session. These are not weighed against expected benefit. An unrunnable plan is not a plan.

---

### ⬤ Gate 2 — the coach approves the training

**The second mandatory human decision.**

**What crosses** — a proposed Training becomes a real session only when a human approves it, with or without modification.

**Why a second gate** — accepting *what to work on* and approving *how to work it* are different decisions with different information. Between them sits everything today makes possible or impossible.

**Where today enters** — session context binds here: declared injury, reduced time, missing players, a covering coach, competition proximity. Declared conditions **bind immediately**; no accumulation of evidence is required before honouring an injury report.

**What is recorded** — the original proposal **and** what the coach changed. Storing only the final version destroys the only signal that teaches Atlas how this coach coaches.

---

### Follow-up · automatic, on human-supplied input

**What it is** — what actually happened, re-measured against the objective's indicators.

**Why the loop closes here** — a product that analyses and stops is used three times and abandoned. Value is created when cycle *n+1* is measured against cycle *n*.

**What separates afterwards** — session information divides into what expires and what persists. Momentary declarations expire; **ongoing declarations such as injury expire only by human action, never by time**. Everything is retained historically regardless.

**How understanding changes** — session information becomes identity **only through repetition across occasions**. A bad day is not a new identity.

⚠️ **The repetition threshold is undefined.** How much repetition converts context into identity is an open question appearing unresolved in three Core documents.

---

## 3 · Automatic versus human

| Step | Automatic | Human |
|---|---|---|
| Evidence | Capture, storage, processing | **Declares** everything non-observable |
| Observables | Extraction | May correct |
| Measurements | Computation | May dispute |
| Findings | Full reasoning | May reject a conclusion |
| Priorities | Ranking and deferral | May reorder or dismiss |
| **Gate 1** | Proposes | ⬤ **Accepts, modifies, or rejects** |
| Objectives | Drafted from the accepted priority | Owns |
| Training | Designed | Reviews |
| **Gate 2** | Proposes | ⬤ **Approves and adapts** |
| Follow-up | Re-measurement | Supplies what happened |

**Two gates are mandatory. Every other step is overridable at any time.**

The distinction matters: an override is the coach disagreeing with Atlas's understanding, and Atlas defers immediately and without argument. A gate is a decision that **cannot be skipped** — nothing proceeds past it automatically, no matter how confident Atlas is.

**One exception to deference.** On a matter touching player safety, Atlas may state its concern and its evidence **once**, clearly — then defer.

---

## 4 · Why this order

Each step exists because skipping it produces a specific, predictable failure.

| Skipping… | Produces |
|---|---|
| Evidence → straight to findings | Assertion without grounding. The failure mode of every system that sounds authoritative and cannot be checked |
| Observables → straight to measurement | Interpretation disguised as data, with its framing now invisible |
| Measurement → straight to findings | Opinion. Nothing checkable, nothing comparable over time |
| Findings → straight to priorities | Ranked symptoms. The root cause survives and the problem returns |
| Priorities → straight to objectives | Twelve simultaneous objectives, none pursued properly. Motion without progress |
| **Gate 1** | Atlas has decided what a developing athlete works on |
| Objectives → straight to training | Activity that traces to nothing. Sessions that fill time |
| **Gate 2** | A plan that ignores today — the fastest route to injury |
| Follow-up | No idea whether any of it worked. A photograph instead of a film |

**The order is not a workflow convenience. Each step is the precondition for the next being honest.**

---

## 5 · What this framework guarantees

Read from the bottom up, the pipeline is an audit trail:

> A **Training** exists because an **Objective** demanded it.
> The **Objective** exists because a coach accepted a **Priority**.
> The **Priority** exists because a **Finding** supported it.
> The **Finding** exists because **Measurements** and **Observables** showed it.
> Those exist because a **Video** was recorded, or a human said so.

Every claim in Atlas can be walked back to something observable or something a person declared. That is what makes a recommendation questionable rather than merely presented — and a recommendation that cannot be questioned is a failure, no matter how correct it is.

---

## Open questions

1. **The repetition threshold** for context becoming identity — unresolved in three Core documents.
2. **Whether a rejected priority may be re-raised**, and after what change in evidence. Re-raising unchanged converts deference into nagging; never re-raising loses genuine signal.
3. **Whose declaration prevails** when a coach and a guardian state incompatible facts about the same session. Authority over *decisions* is settled; authority over *declarations of fact* is not.
4. **How a Finding is disputed** in the product, and what a dispute does to the memory derived from it.

---

_This document describes the product-level pipeline from evidence to training and names its two mandatory human gates. It inherits the Intelligence Core and may not contradict it. It changes only by explicit, deliberate amendment._
