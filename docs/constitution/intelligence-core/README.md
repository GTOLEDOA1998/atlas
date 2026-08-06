# Atlas Intelligence Core

Nine documents defining **how Atlas thinks**. Frozen at version 1.0 by [`ADR-0001`](../../decisions/ADR-0001-intelligence-core-frozen.md).

> **Tier 1.** Every document here changes **only by ADR**. Implementation must never silently modify the conceptual architecture: where implementation reveals a definition is wrong, the response is a new ADR amending the Core — never an implementation that diverges while the documents continue to assert otherwise.
>
> **Level 1 Atlas DNA is immutable** and is *not* subject to revision by ADR.

---

## Precedence

[`coaching-dna.md`](coaching-dna.md) governs everything. Where any other document appears to conflict with it, Coaching DNA wins and the other document is defective.

```
                    coaching-dna.md
                    the conscience
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
table-tennis-      reasoning-model.md   default-reasoning-
knowledge.md       the method           profile.md
the material             │              the baseline
      │                  ▼
      │           priority-engine.md
      │           what deserves attention
      │                  │
      └─────────────────▶▼
                  training-model.md
                  attention → training

  Cross-cutting, applying at every stage:

    human-decision-authority.md   who decides
    memory-model.md               how Atlas remembers and forgets
    current-session.md            what is true today
```

## The Decision Hierarchy

Every recommendation must flow through this order. It is neither optional nor re-orderable:

```
Atlas DNA → Club DNA → Coach DNA → Group DNA → Player Context → Current Session → Recommendation
```

Higher levels constrain lower ones. A lower level may personalize but never contradict a higher one.

---

## The nine documents

| # | Document | Defines |
|---|---|---|
| 1 | [`coaching-dna.md`](coaching-dna.md) | How Atlas thinks as a coach — the conscience, the Identity and Decision hierarchies |
| 2 | [`table-tennis-knowledge.md`](table-tennis-knowledge.md) | What Atlas knows about the sport — the concept schema and relationship model |
| 3 | [`reasoning-model.md`](reasoning-model.md) | How Atlas reasons — the thirteen-stage lifecycle |
| 4 | [`priority-engine.md`](priority-engine.md) | What deserves attention — WORK NOW / MONITOR / WAIT |
| 5 | [`training-model.md`](training-model.md) | How priorities become training |
| 6 | [`default-reasoning-profile.md`](default-reasoning-profile.md) | How Atlas behaves before personalization exists |
| 7 | [`human-decision-authority.md`](human-decision-authority.md) | Who holds final human authority in every scenario |
| 8 | [`current-session.md`](current-session.md) | What is true today — context, never identity |
| 9 | [`memory-model.md`](memory-model.md) | How Atlas remembers, updates, replaces and forgets |

---

## Open questions

The freeze was declared with **36 recorded open architectural questions** across six documents. They are known, bounded and deliberate — inheritance points for future work, not defects concealed by the freeze.

Three are load-bearing for work already underway:

- **The promotion threshold** from context to identity — appears unresolved in three documents at once
- **The decay rate** of stale memory — differs by subject and is unspecified
- **Memory governance** — what may be remembered, for how long, under whose consent. Deliberately excluded from the Core and **still owed to Governance**. It currently blocks the first feature that persists player data.

---

## Product-facing names

Where the product uses a different name for a Core concept, it is a **label, not a second architecture**:

| Product name | Core concept |
|---|---|
| Sporting Memory | The Memory Model — Historical · Identity · Context |
| Assistant | The single reasoning surface. *Coach* is reserved for the human |
