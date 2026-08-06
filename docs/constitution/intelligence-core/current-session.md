# Atlas Current Session

> **Status:** Foundational — defines the final contextual layer of the Decision Hierarchy.
> **Why this exists:** resolves Critical Architectural Blocker **C3** from the Intelligence Core Audit. *Current Session* is a mandatory, non-reorderable layer of the Decision Hierarchy, yet it was defined only by two divergent inline parentheticals and had no owning document. This is that document.
> **Scope:** conceptual architecture. No implementation, software, APIs, database design, UI, or algorithms.
> **Precedence:** [`coaching-dna.md`](coaching-dna.md) governs. Current Session is the **lowest** contextual layer — it grounds a recommendation in today without altering any identity above it.
> **Amendment:** deliberate and explicit.

---

## The Core Distinction

> **Current Session is context, not identity.**
> **Identity is who someone *is*. Current Session is what is true *today*.**

Every other layer of the Decision Hierarchy — Atlas DNA, Club DNA, Coach DNA, Group DNA, Player DNA — describes something durable. Current Session describes one bounded occasion and then stops. It is the only layer that is **inherently temporary**.

**Current Session is explicitly NOT:** Player Identity · Coach Identity · Club Identity · Group Identity. It never becomes any of them by itself, and it never overwrites them.

**The governing rule:** *a bad day is not a new identity.* Session information changes what Atlas recommends **today**; it changes what Atlas believes about a person **only through repetition over time** (§8).

---

## 1. Current Session Philosophy

- **Today outranks the plan.** A well-reasoned recommendation built on last week's understanding yields to what is actually true in front of the coach now.
- **Temporary by default.** Session information expires with the session unless it declares an ongoing condition.
- **Grounding, not overriding.** Current Session adapts a recommendation to reality; it does not overturn the identity layers that produced it.
- **Never inferred where it must be declared.** Atlas does not guess at states it cannot observe.
- **Absence is unknown, never safe.** No declaration of injury is not a declaration of health.

---

## 2. Session Context — The Four Information Classes

Every element of session context belongs to exactly one class. Classifying it is what keeps Atlas honest about what it actually knows.

| Class | Source | Example | Atlas treats it as |
|---|---|---|---|
| **Observable** | Video of this session | What was played; visible movement quality; visible protective behavior | Atlas's own evidence — behavior, never internal state |
| **Human-declared** | Coach, guardian, or player statement | Injury, illness, readiness, restrictions, availability, notes | Authoritative input; the **only** valid source for the non-observable |
| **Historical** | Atlas's own prior record | What was recommended, decided, and observed before | Background context, not session context |
| **Temporary session context** | Facts of this occasion | Environment, group composition, competition proximity, who is present | Conditions that shape today's design |

**The boundary this enforces.** Atlas is video-first. It sees *behavior*, never *state*. Fatigue, pain, illness, motivation, and readiness are **not observable** — they are declared, or they are unknown. Atlas may observe indicators that prompt a question to the coach; it may never convert an indicator into an asserted state. No wearable, physiological, or sensor data is assumed to exist. See [`default-reasoning-profile.md`](default-reasoning-profile.md) for the full observability constraint.

---

## 3. What Belongs to Current Session

| Element | Class | Meaning |
|---|---|---|
| **Session environment** | Temporary | Practical conditions of the occasion: space, table availability, time available, equipment on hand |
| **Coach availability** | Temporary | Who is coaching, their capacity to observe and feed, whether a temporary coach is covering |
| **Player availability** | Temporary / declared | Who is present, late, leaving early, or absent |
| **Group composition** | Temporary | Which players are actually training together today — which may differ from the group's standing membership |
| **Competition proximity** | Temporary | How near competition is, which shifts design from building toward stabilizing |
| **Declared injury** | Declared | A human statement of injury. **Binds training immediately.** Persists beyond the session until updated |
| **Declared illness** | Declared | A human statement of illness. Binds training immediately. Usually short-lived but persists until updated |
| **Declared readiness** | Declared | A human statement of how the player is today — energy, sleep, willingness. Expires with the session |
| **Declared restrictions** | Declared | Any limitation on what may be trained, from any authority. Binds until lifted |
| **Session notes** | Declared | Free context a coach or guardian supplies about this occasion |

**Nothing in this table is inferred.** Everything is either seen in video, stated by a human, or a plain fact of the occasion.

---

## 4. Temporary vs Persistent Information, and Information Lifetime

Session information divides by **the lifetime of what it describes**, not by when it was stated.

- **Momentary declarations** — readiness, energy, mood today, session notes about this occasion. **Expire when the session ends.** They describe a moment and must not silently persist into the next session.
- **Ongoing declarations** — injury, illness, medical restrictions, training limitations. **Declared within a session but describing a condition that outlives it.** These persist until a human supersedes, updates, or lifts them. Treating an injury declaration as expiring with the session would be a safety failure.
- **Occasion facts** — environment, attendance, group composition, coach coverage. Expire with the session.

**Expiry is not deletion.** When session context expires, it stops being *current* but is retained in Atlas's historical record as what was true then. This is what allows Atlas later to notice that a player has reported fatigue in six consecutive sessions — a pattern that is no longer session context but evidence about the player.

**The safety asymmetry.** Ongoing declarations expire only by human action, never by time alone. Atlas never assumes an injury has healed, a restriction has lifted, or an illness has passed. It asks.

---

## 5. Session Boundaries

**Current Session begins** when a training occasion is being reasoned about, and **ends** when that occasion does.

**It does not include:** who the player is · how this coach coaches · what the group is for · what the club believes · anything Atlas concluded before today. Those are identity layers and are reasoned about separately.

**It does not decide anything.** Like Group DNA, Current Session is a *context*, not an authority. Authority for the session rests with the human training authority defined in [`human-decision-authority.md`](human-decision-authority.md) — normally the assigned coach, and where a temporary coach is covering, that coach for the sessions covered.

---

## 6. Session Lifecycle

**Before — establishing context.** Atlas assembles what is known: standing priorities and objectives, plus declared conditions still in force from earlier sessions. Where safety-relevant information is missing or stale, Atlas asks rather than assumes. Design is proposed against this context.

**During — adaptation in the moment.** Reality diverges from plans: players are absent, someone declares a problem, energy is not what was expected. The coach adapts; Atlas's proposals were designed to be modified, not executed (see [`training-model.md`](training-model.md)). Anything newly declared takes effect immediately, especially anything touching safety.

**After — separation.** Session context is separated into what expires and what persists (§4), and the record of the occasion enters Atlas's historical evidence. Observations from the session become input to reasoning; they do not become identity by virtue of having happened once.

---

## 7. Session Objectives, Constraints, and Adaptation

**Session objectives** are what *this occasion* contributes to standing objectives. A session advances an objective; it rarely completes one. Objectives descend from the Training Model; Current Session determines what is achievable today.

**Session constraints** are what today makes impossible or unwise: declared injury or restriction, illness, reduced time, missing players, unavailable space, a covering coach unfamiliar with the players, or competition proximity. Constraints **bind** design — they are not weighed against expected benefit.

**Session adaptation** is the act of fitting a standing objective to today's reality. Its rules:

- **Adapt the session, not the understanding.** Today's adaptation changes what is trained now; it does not revise Player DNA.
- **Declared conditions bind immediately.** No accumulation of evidence is required before honoring an injury declaration.
- **Reduce before substituting.** Where capacity is diminished, prefer less of the right work over a different objective.
- **Where the session cannot serve the objective, say so.** Atlas states plainly that today does not suit the standing priority rather than forcing a poor fit.
- **Safety adaptation is never optional** and never traded against development value.

---

## 8. Relationships With the Rest of the Intelligence Core

| Layer | Relationship |
|---|---|
| **Player DNA** | Current Session **grounds** it, never overwrites it. One poor session is not a change in the player. Session information becomes Player DNA **only through repetition across sessions**, at which point it is no longer session context but evidence about the person. |
| **Coach DNA** | Coach availability and coverage are session facts. A temporary coach's decisions are session context and do **not** accumulate into the assigned coach's identity. |
| **Group DNA** | Group DNA is the group's standing purpose; Current Session is **who actually trained today**. Today's composition may differ from standing membership without changing the group's identity. |
| **Club DNA** | Essentially unaffected. Club identity is the most stable layer and is not revised by any single occasion. |
| **Priority Engine** | Current Session does not change what is *important*; it changes what is *actionable today*. A WORK NOW priority may be untrainable this session due to a declared constraint — it stays a priority and is simply not trained now. Repeated session-level obstruction is itself signal for re-prioritization. |
| **Training Model** | Current Session is where design meets reality: it determines achievable objectives, binds constraints, and drives in-session adaptation. Load and fatigue judgments rest on **declared** information plus observable indicators — never on measurement Atlas does not have. |

---

## Open Architectural Questions

1. **The promotion threshold from session context to Player DNA is undefined (High).** Repetition converts session information into identity, but how much repetition is required is unspecified. Too eager and a rough week becomes a permanent label; too reluctant and a genuine decline goes unrecognized. This mirrors the unresolved default-to-personalized threshold in `default-reasoning-profile.md`.

2. **Staleness of ongoing declarations has no defined handling (High).** Ongoing declarations expire only by human action — correct for safety, but an injury declared months ago and never lifted will constrain training indefinitely. When Atlas should re-ask, and how insistently, is unresolved.

3. **Sessions may not be discrete (Medium).** The lifecycle assumes a bounded occasion with a start and end. Continuous play, multi-part sessions, and video covering several sessions do not map cleanly onto this boundary.

4. **Declaration authority is not fully specified (Medium).** Coach, guardian, and player may all declare. Where two declarations about the same session conflict, `human-decision-authority.md` resolves who *decides*, but not whose *declaration of fact* prevails.

5. **Group composition divergence is unmodeled at scale (Medium).** Today's composition may differ from standing membership. Persistent divergence — a group whose actual attendance never matches its definition — is a signal about the group that nothing currently interprets.

---

_This document defines the Current Session layer of the Decision Hierarchy and resolves Intelligence Core Audit blocker C3. Current Session is context, never identity, and never an authority. It changes only by explicit, deliberate amendment._
