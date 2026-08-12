# Atlas

**Atlas is a table tennis coaching intelligence platform.**

It exists to amplify coaches, clubs, and players through contextual knowledge, analysis, planning, and intelligent decision support. Atlas watches tirelessly, remembers everything, and prepares thoroughly — and then hands every decision to the coach.

> **Atlas never replaces the coach. Atlas amplifies the coach. The coach is always the final decision-maker.**

This repository contains the Atlas application and the foundational documentation that governs it. **Read the documentation before writing code.**

---

## Start here

| If you want to know… | Read |
|---|---|
| **Anything at all**, starting from zero | [`docs/README.md`](docs/README.md) — the map and the reading order |
| **Why** Atlas exists | [`docs/constitution/manifesto.md`](docs/constitution/manifesto.md) |
| **What** Atlas is as a product | [`docs/constitution/product-principles.md`](docs/constitution/product-principles.md) |
| **How** Atlas thinks and reasons | [`docs/constitution/intelligence-core/`](docs/constitution/intelligence-core/README.md) |
| **How** Atlas is built | [`docs/constitution/development-rules.md`](docs/constitution/development-rules.md) |
| **Where** the work actually stands | [`docs/work/roadmap.md`](docs/work/roadmap.md) |
| **How** an AI must operate here | [`prompts/master.md`](prompts/master.md) — the operating manual, plus three modes |

---

## Documentation map

`docs/` is organised by **how a document changes**, not by topic. Before touching anything, the first thing you need to know is what it takes to change it.

```
docs/
  constitution/     mission, product constitution, development rules,
                    and the frozen Intelligence Core
                      → changes only by ADR or explicit amendment
  architecture/     domain model, data model, technology choices
                      → changes only by explicit approval
  foundation/       derived guides that elaborate the above
                      → free to improve, may contradict nothing above
  decisions/        Architecture Decision Records
                      → never edited; superseded by a new ADR
  work/             roadmap and sprint specifications
                      → updated as work proceeds
```

**New here?** [`docs/README.md`](docs/README.md) declares the reading order and is the only place that does. Process first, product on demand — an AI that learns what Atlas is without learning how it is worked on is missing the more dangerous half.

**The Intelligence Core** is the conceptual heart of Atlas: nine documents defining how it thinks, frozen by ADR. They have a declared precedence order — see [`docs/constitution/intelligence-core/README.md`](docs/constitution/intelligence-core/README.md).

---

## Architecture decisions

Significant architectural decisions are recorded as ADRs in [`docs/decisions/`](docs/decisions/).

- [`ADR-0001`](docs/decisions/ADR-0001-intelligence-core-frozen.md) — Atlas Intelligence Core Version 1.0 frozen. The Intelligence Core is architecturally complete; future work inherits it, and changes require a new ADR.
- [`ADR-0002`](docs/decisions/ADR-0002-documentation-governance.md) — Documentation governance and structure. Documentation is organised by how a document changes; four tiers determine who may change what.
- [`ADR-0003`](docs/decisions/ADR-0003-memory-governance.md) — Memory governance accepted. Adopts `memory-governance.md` as the governing Tier 1 policy and closes `memory-model.md` Open Question 1. Resolves G1; approves nothing beyond it.

---

## The application

The Next.js application lives in [`app/`](app/). Its own conventions are documented in [`app/AGENTS.md`](app/AGENTS.md).

> **Note:** this project uses a Next.js version with breaking changes from earlier releases. Consult the version-specific guides in `app/node_modules/next/dist/docs/` rather than relying on prior assumptions.

```bash
npm --prefix app run dev
```

---

## Ecosystem roles

Atlas separates **roles** from the tools that occupy them. A role is architecture and changes by decision; an occupant is configuration and changes without ceremony. Replacing a tool is a substitution, never an architectural change — which is what keeps this project independent of any single vendor or model.

| Role | Owns | Occupied by |
|---|---|---|
| **Source of truth** | Everything a decision depends on | **This repository.** The only place a decision is real |
| **Agent** | The only component that may change the repository | An AI operating under [`prompts/master.md`](prompts/master.md) and one declared mode |
| **Explorer** | Navigating and authoring the corpus as a graph | *Vacant* |
| **Semantic index** | Answering *"where was this decided?"* across a corpus larger than any context window | *Vacant* |
| **Transport** | How an agent reaches a capability it does not have natively | MCP |
| **Verifier** | Proving mechanically that the code obeys the architecture | *Vacant — blocked by [DM-020](docs/work/open-decisions.md)* |

Two rules bind every occupant, present and future:

- **Nothing but the source of truth holds content.** A tool owning something the repository does not is a second source of truth, and is rejected.
- **What a derived tool says is a pointer, never an answer.** It tells you where to look; the repository tells you what is true. See [`prompts/master.md`](prompts/master.md) §2.

---

## Contributing

Atlas is built deliberately and incrementally. Before contributing — human or AI — understand these non-negotiables:

- **Feature First architecture.** Code is organized by feature, not by technical type. `app/src/features/auth` is the reference implementation.
- **Scope discipline.** Change only what the task requires. No unrelated edits, refactors, renames, or moves.
- **The constitution governs.** The Product Principles say what Atlas is; the Development Rules say how it is built. When a request conflicts with them, they win.
- **AI assists; the coach decides.** No feature may position Atlas as the final decision-maker over player development.

AI contributors must additionally adopt [`prompts/master.md`](prompts/master.md), the operating manual for every AI working on Atlas, whatever the model. Every session declares one of three modes — [`examine`](prompts/examine.md) establishes what is true and changes nothing, [`design`](prompts/design.md) decides and writes documentation, [`implement`](prompts/implement.md) executes a decision already taken. The manual explains the contract.
