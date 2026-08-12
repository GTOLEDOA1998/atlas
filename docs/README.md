# Atlas Documentation

Atlas is a **table tennis coaching intelligence platform**. It turns video of play into analysis, and analysis into structured training — while leaving every decision about a player's development with the coach responsible for it.

This directory is organised by **how a document changes**, not by topic. Before touching anything, the first thing you need to know is what it takes to change it — and a topic folder does not tell you that.

---

## Reading order

**This is the only place the reading order is declared.** Every other document points here rather than repeating it — three copies of one list drift, and a drifted onboarding path is worse than none.

### To start working — in this order

| # | Read | Why first |
|---|---|---|
| 1 | [`../README.md`](../README.md) | What Atlas is, and where everything lives |
| 2 | [`../prompts/master.md`](../prompts/master.md) | How an AI operates here: precedence, verification, boundaries, the mode contract |
| 3 | The mode you were invoked in — [`examine`](../prompts/examine.md) · [`design`](../prompts/design.md) · [`implement`](../prompts/implement.md) | What you may change, and when you must stop |
| 4 | [`work/roadmap.md`](work/roadmap.md) | Where the work actually stands |
| 5 | [`work/open-decisions.md`](work/open-decisions.md) | What is still undecided |

Roughly seven hundred lines, and it is the working minimum. **An AI that skips step 2 knows what Atlas is and not what it may do** — which is the more dangerous half to be missing.

### To understand the product — as the task requires it

| # | Read | Owns |
|---|---|---|
| 6 | [`foundation/principles.md`](foundation/principles.md) | What may and may not be built, with its anti-patterns |
| 7 | [`foundation/glossary.md`](foundation/glossary.md) | The vocabulary — one term, one definition |
| 8 | [`foundation/decision-framework.md`](foundation/decision-framework.md) | How evidence becomes training |
| 9 | [`foundation/ux-principles.md`](foundation/ux-principles.md) | How the product must behave |

Read by topic, not front to back. None of it is enough to change the Intelligence Core, which is frozen and changes only by ADR.

### To implement — when building a feature

| # | Read | Owns |
|---|---|---|
| 10 | [`foundation/developer-guide.md`](foundation/developer-guide.md) | The bridge from the frozen architecture to code in `app/` — anatomy, clients, invariants, and the "what am I building → which document governs it" map |
| 11 | [`work/sprints/sprint-03-execution-runbook.md`](work/sprints/sprint-03-execution-runbook.md) | The step-by-step execution of Migration 0001 through Sprint 3 close |
| 12 | [`work/traceability-matrix.md`](work/traceability-matrix.md) | Where each architectural element lands in execution, and whether it is done |

Sprint-agnostic guidance (10) is permanent; the execution artifacts (11, 12) are living Tier 4 work.

---

## Where things live

| Directory | Holds | Tier | Changes by |
|---|---|---|---|
| **`constitution/`** | Mission, product constitution, development rules, and the frozen Intelligence Core | 1 | ADR, or explicit recorded amendment |
| **`architecture/`** | Domain model, data model, technology choices | 2 | Explicit Product Owner approval |
| **`foundation/`** | Derived guides that elaborate the above | 3 | Freely, if they contradict nothing above |
| **`decisions/`** | Architecture Decision Records | 1 | Never edited — superseded by a new ADR |
| **`work/`** | Roadmap and sprint specifications | 4 | Freely, as work proceeds |

---

## Governance

### The four tiers

Recorded decisions: [`ADR-0001`](decisions/ADR-0001-intelligence-core-frozen.md) froze the Intelligence Core; [`ADR-0002`](decisions/ADR-0002-documentation-governance.md) established this governance model; [`ADR-0003`](decisions/ADR-0003-memory-governance.md) accepted the memory-governance policy and closed the Core's memory-governance open question.

**Tier 1 — Constitution.** The nine Intelligence Core documents change only by ADR. `manifesto.md`, `product-principles.md` and `development-rules.md` change only by explicit recorded amendment. ADRs are never edited.

**Tier 2 — Architecture.** Changes require explicit Product Owner approval, recorded in the document's *Amendment* line.

**Tier 3 — Foundation.** Anyone may improve these, **provided they contradict nothing in Tier 1 or 2**.

**Tier 4 — Work.** Anyone may update these as work proceeds.

> **The escape rule.** If improving a Tier 3 document requires contradicting a Tier 1 or 2 document, **the change stops and escalates**. A derived document never wins an argument with its owner.

### Every document declares six fields

```
Status · Tier · Owns · Inherits · Does not own · Amendment
```

**`Owns` and `Does not own` are the anti-duplication mechanism.** Two documents claiming to own the same thing is a defect findable in one reading.

### Adding a document

Three questions, in order. A "no" stops the creation.

1. **What does it own that no existing document owns?** No answer means it is a section of an existing document, not a new one.
2. **What does it inherit, and what does it explicitly not own?**
3. **Which tier does it live in?** That determines its folder and who may touch it.

### Retiring a document

- **Superseded** — retired; the successor states what it replaces.
- **Obsolete by decision** — requires an ADR if it was Tier 1.
- **Empty or purposeless** — deleted without ceremony.
- **An ADR** — never deleted. Superseded by another that names it.

### Sprint closure

A sprint is not finished until its specification exists as a file in `work/sprints/`.

---

## The Intelligence Core

Nine documents defining how Atlas thinks, frozen by [`ADR-0001`](decisions/ADR-0001-intelligence-core-frozen.md). They have a **declared precedence order** — see [`constitution/intelligence-core/README.md`](constitution/intelligence-core/README.md).

Level 1 Atlas DNA is **immutable** and is not subject to revision by ADR: player safety, long-term development, honest recommendations, evidence-based coaching, respect for uncertainty, explainability, and human decision authority.

---

## Conventions

- **Documentation is written in English.** Interface copy is Spanish; routes and code are English.
- **Folder and file names are lowercase kebab-case**, with no numeric prefixes — numbers impose an order that ages badly, and reading order belongs here rather than in the filesystem.
- **A folder is created when its first document exists.** Empty folders promise documentation that is not there.
