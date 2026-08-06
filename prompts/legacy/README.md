# Retired prompt corpus

> **Status:** Retired. Authoritative for nothing.
> **Owns:** the retirement status of this directory and the reason each document was superseded.
> **Superseded by:** [`prompts/master.md`](../master.md) and the three modes — [`examine.md`](../examine.md), [`design.md`](../design.md), [`implement.md`](../implement.md).

**Nothing in this directory is loaded, quoted, or followed.** It is kept for a transition period so the new system can be judged against what it replaced, and it will be deleted once that system has been used across several sprints.

## Why it was superseded

These documents **copied the constitution instead of pointing at it**, so they drifted away from it. Three defects prove the point:

- `software_architect_master.md` §10 **defines the Intelligence Core incorrectly**, as "Atlas's AI layer". The Intelligence Core is the nine conceptual documents frozen by [`ADR-0001`](../../docs/decisions/ADR-0001-intelligence-core-frozen.md).
- Its §19 points at `product_principles.md` and `development_rules.md` — filenames that do not exist.
- Its §13 uses `sessions` as a domain term, forbidden by [`product-architecture.md`](../../docs/architecture/product-architecture.md) §2.5.

Seven of its twenty-three sections restated `development-rules.md` or `product-principles.md` verbatim in substance.

## What is here

| Files | Note |
|---|---|
| `software_architect_master.md` | The former operating manual. Its durable content — precedence, confidence policy, inspection discipline — was carried into `master.md` and the modes. |
| 10 role manuals | Every one is marked `**Not implemented yet.**` in its own body. They were never written because a role does not change how an AI reasons; only the mode does. |
| `extraction.md` · `sales.md` · `system.md` | Zero bytes. |

Relative links inside these files were repaired for the move; no other content was changed.
