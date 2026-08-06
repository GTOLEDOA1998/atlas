# Mode · Design

> **Status:** Active — one of the three modes under [`master.md`](master.md).
> **Answers one question:** *What do we decide, and at what cost?*
> **Owns:** the discipline of deciding — traceability to the source that obliges the decision, the declared alternative, the declared cost, and the declaration of coupling between decisions.
> **Inherits:** [`master.md`](master.md) entirely, including the creation sequence (§4) and the stop rule (§5), which this mode does not restate.
> **Does not own:** the content of any decision already taken · the document header convention, owned by [`ADR-0002`](../docs/decisions/ADR-0002-documentation-governance.md) · the phase sequence, owned by [`ADR-0001`](../docs/decisions/ADR-0001-intelligence-core-frozen.md).
> **May modify:** `docs/`. Never `app/` or `supabase/`.
> **Amendment:** free, as decision and specification formats are learned.

---

## Entry requirement

**A declared problem.** Not a topic, not a document to "improve" — a problem someone can state. If the task is *"improve X"* without saying what is wrong with X, **stop and ask what problem is being solved.**

A document improved without a problem is a document changed for the pleasure of changing it, and in a governed corpus that is how contradictions are introduced.

---

## What this mode covers

The first three phases sequenced by ADR-0001 — **Domain Model, Data Model, Software Design Specification** — plus ADRs, sprint specifications, and amendments to approved documents.

It does not cover the fourth phase. Implementation is [`implement.md`](implement.md), and the separation is not stylistic: ADR-0001 §4 forbids implementation from silently modifying the conceptual architecture.

---

## How to decide

1. **Trace the decision to what obliges it.** Every decision cites the constitution, the Intelligence Core, the architecture, or an observed fact. A decision resting only on judgement is a preference, and preferences do not go in governed documents.
2. **Name the alternative you rejected, and why.** A decision presented without its discarded alternative has not been made — it has been assumed.
3. **Name what the decision costs.** What is lost, what becomes harder, what is foreclosed. **If you cannot find a cost, you have not understood the decision.** A design where everything is free is a design that has not met reality.
4. **Declare coupling.** When two decisions depend on each other, say so. Presenting coupled decisions as independent produces a set that does not fit together — and that failure surfaces only during implementation, when it is expensive.
5. **Do not resolve an open question by inventing an answer.** Where the Intelligence Core deliberately leaves something open, design a structure that survives **any** of the possible answers, and state that you did. Closing a recorded open question is an architectural decision and requires an ADR.
6. **Prefer moving to creating.** Relocating an existing entity, section, or document beats adding one. Run `master.md` §4 before anything new exists.

---

## Restraint

- **Nothing is added for a requirement that does not yet exist.** No layers, generics, configuration, or flexibility for an imagined future.
- **Every new entity must answer: what does it own that nothing else owns?** No answer means it is a field, a relationship, or a section — not an entity, and not a document.
- **A derived document never wins an argument with the document it derives from.** If the change requires contradicting a higher source, it stops and escalates.
- **The smallest decision that fully resolves the problem is the correct one.**

---

## Output

A decision, or a document containing decisions — each with its obliging source, its rejected alternative, and its cost. Plus an explicit statement of **what remains unresolved** after it, and which of that depends on a pending human or governance decision rather than on architecture.

This mode does not write code, and does not begin implementing what it just decided.

---

_This mode converts an understood problem into a recorded decision. It never executes one._
