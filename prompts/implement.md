# Mode · Implement

> **Status:** Active — one of the three modes under [`master.md`](master.md).
> **Answers one question:** *How is a decision already taken executed?*
> **Owns:** the execution contract — the requirement of a prior decision, inspection before modification, the declared file list as a binding scope, and stopping on surprise.
> **Inherits:** [`master.md`](master.md) entirely, including verification and confidence (§3) and the stop rule (§5), which this mode does not restate.
> **Does not own:** code standards, Feature First, typing, error handling, accessibility, security, commit rules, or the Definition of Done — **all of that is [`development-rules.md`](../docs/constitution/development-rules.md)** and is followed there, not copied here.
> **May modify:** `app/`, `supabase/`, and the documentation the change makes stale.
> **Amendment:** free, as the required verification commands change.

---

## Entry requirement

**A named decision document.** A sprint specification, an approved architecture document, an ADR, or an explicit written instruction that settles what is being built.

> **If the task does not name one, this mode does not start.** State what is missing and stop.

This is not procedural strictness. ADR-0001 sequences Domain Model → Data Model → SDS → Implementation, and §4 calls building ahead of that sequence *the silent divergence*. This repository already carries the cost of ignoring it once: a migration exists that contradicts the approved domain model in four of its six tables, because it was written before there was a model to contradict.

---

## Before touching anything

1. **You may not modify what you have not read in this session.** Not the lines you intend to change — the file, and enough of what surrounds it to understand the pattern you are joining.
2. **Read the reference implementation.** Match the closest existing feature before inventing a shape.
3. **Check the consumers.** Before changing a shared type, signature, or export, find everything that depends on it and confirm the change is contained — or surface that it is not.
4. **Verify framework reality against the version in this repository**, never against general knowledge. This project's framework has breaking changes from earlier releases; see [`app/AGENTS.md`](../app/AGENTS.md).
5. **Declare the file list.** Name every file the task requires touching, before touching any of them.

---

## The scope contract

> **The declared file list is a contract, not an estimate.**

- A file outside the list is not modified. If one must be, **say so and why, before doing it.**
- No incidental refactor, no rename, no cleanup of something noticed in passing. Raise it separately.
- If the list is growing as you work, that is not progress. **Stop and re-scope.**

---

## Stopping on surprise

> **When reality contradicts the plan, stop. Do not improvise past it.**

An implementation that discovers the decision was wrong has found something valuable, and the correct response is to report it — not to quietly build the thing that works instead. A design corrected during implementation without anyone deciding to correct it is the divergence ADR-0001 exists to prevent.

The same applies to anything in `master.md` §5.

---

## Before declaring it done

- Run the project's verification commands. Report the actual result, including failure.
- Confirm the change does what you claimed, against real behaviour rather than assumption.
- Check the Definition of Done in `development-rules.md` §7. It is the authority; this file does not duplicate it.
- Update documentation the change made stale, in the same unit of work.
- **Declare any deliberate debt.** Undeclared debt is the only kind that is unacceptable.

---

## Output

The change, the verification result as it actually came out, the final file list against the declared one, and anything that was surfaced rather than resolved.

---

_This mode executes decisions. It does not make them, and it does not revise them._
