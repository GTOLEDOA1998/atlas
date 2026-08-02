# Atlas

**Atlas is a table tennis coaching intelligence platform.**

It exists to amplify coaches, clubs, and players through contextual knowledge, analysis, planning, and intelligent decision support. Atlas watches tirelessly, remembers everything, and prepares thoroughly — and then hands every decision to the coach.

> **Atlas never replaces the coach. Atlas amplifies the coach. The coach is always the final decision-maker.**

This repository contains the Atlas application and the foundational documentation that governs it. **Read the documentation before writing code.**

---

## Start here

| If you want to know… | Read |
|---|---|
| **Why** Atlas exists | [`docs/01 Vision/product_manifesto.md`](docs/01%20Vision/product_manifesto.md) |
| **What** Atlas is as a product | [`docs/02 Product/product_principles.md`](docs/02%20Product/product_principles.md) |
| **How** Atlas thinks and reasons | [`docs/03 Intelligence/`](docs/03%20Intelligence/) |
| **How** Atlas is built | [`docs/10 Governance/development_rules.md`](docs/10%20Governance/development_rules.md) |
| **How** an AI assistant must operate here | [`prompts/software_architect_master.md`](prompts/software_architect_master.md) |

---

## Documentation map

```
docs/
  01 Vision/          why Atlas exists
  02 Product/         what Atlas is  — the Product Constitution
  03 Intelligence/    how Atlas thinks — coaching DNA, domain knowledge, reasoning
  04 Architecture/    how Atlas is built — stack and technical decisions
  05 Database/        data and schema           (not yet written)
  06 AI Engineering/  AI implementation         (not yet written)
  07 UX/              experience and design     (not yet written)
  08 Business/        clients, pricing          (not yet written)
  09 Roadmap/         sequencing and MVP        (not yet written)
  10 Governance/      how we work — the Development Rules
```

**The Intelligence layer** is the core of Atlas and is read in this order:

1. [`coaching_dna.md`](docs/03%20Intelligence/coaching_dna.md) — how Atlas thinks as a coach (the conscience; includes the Identity and Decision hierarchies)
2. [`table_tennis_knowledge.md`](docs/03%20Intelligence/table_tennis_knowledge.md) — what Atlas knows about the sport (the material)
3. [`atlas_reasoning_model.md`](docs/03%20Intelligence/atlas_reasoning_model.md) — how Atlas reasons (the method that joins them)
4. [`priority_engine.md`](docs/03%20Intelligence/priority_engine.md) — how Atlas decides what deserves attention first (the bridge from reasoning to training)
5. [`training_model.md`](docs/03%20Intelligence/training_model.md) — how Atlas turns priorities into training (where analysis becomes coaching)
6. [`default_reasoning_profile.md`](docs/03%20Intelligence/default_reasoning_profile.md) — how Atlas behaves before it knows anyone (the baseline all personalization overrides)
7. [`human_decision_authority.md`](docs/03%20Intelligence/human_decision_authority.md) — who holds the final human decision in every scenario (Atlas never does)
8. [`current_session.md`](docs/03%20Intelligence/current_session.md) — what is true today (context, never identity)
9. [`memory_model.md`](docs/03%20Intelligence/memory_model.md) — how Atlas remembers, updates, replaces and forgets knowledge over time (understanding, never truth)

---

## Architecture decisions

Significant architectural decisions are recorded as ADRs in [`docs/10 Governance/`](docs/10%20Governance/).

- [`ADR-0001`](docs/10%20Governance/ADR-0001-atlas-intelligence-core-v1-frozen.md) — Atlas Intelligence Core Version 1.0 frozen. The Intelligence Core is architecturally complete; future work inherits it, and changes require a new ADR.

---

## The application

The Next.js application lives in [`app/`](app/). Its own conventions are documented in [`app/AGENTS.md`](app/AGENTS.md).

> **Note:** this project uses a Next.js version with breaking changes from earlier releases. Consult the version-specific guides in `app/node_modules/next/dist/docs/` rather than relying on prior assumptions.

```bash
npm --prefix app run dev
```

---

## Contributing

Atlas is built deliberately and incrementally. Before contributing — human or AI — understand these non-negotiables:

- **Feature First architecture.** Code is organized by feature, not by technical type. `app/src/features/auth` is the reference implementation.
- **Scope discipline.** Change only what the task requires. No unrelated edits, refactors, renames, or moves.
- **The constitution governs.** The Product Principles say what Atlas is; the Development Rules say how it is built. When a request conflicts with them, they win.
- **AI assists; the coach decides.** No feature may position Atlas as the final decision-maker over player development.

AI assistants must additionally adopt [`prompts/software_architect_master.md`](prompts/software_architect_master.md), the operating manual for every AI working on Atlas.
