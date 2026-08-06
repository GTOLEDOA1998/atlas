# Open Architectural Decisions

> **Status:** Active register. Eight decisions are open.
> **Owns:** the state of every architectural decision between the moment it is raised and the moment it is resolved — its identifier, what it blocks, and who owns it.
> **Inherits:** [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md) for what requires an ADR · [`ADR-0002`](../decisions/ADR-0002-documentation-governance.md) for which document owns which decision.
> **Does not own:** the content of any decision — that belongs to the document that owns it · resolved decisions, which are recorded in the document they changed · anything requiring an ADR once it is answered.
> **Precedence:** this register records state. Where it disagrees with an owning document, the owning document is right and this register is stale.
> **Amendment:** freely, as decisions are raised and closed. A decision enters here the day it is found, not the day it stops the work.

---

## Why this register exists

Seven decisions gate the Software Design Specification and existed only in conversation. [`ADR-0002`](../decisions/ADR-0002-documentation-governance.md) records the cost of that directly: *"A process artifact that lives only in a conversation is not an artifact."* Two artifacts were lost that way once already.

**Decisions DM-001 … DM-012 are approved.** They are not repeated here — they are recorded where they took effect, in [`data-model.md`](../architecture/data-model.md) Part VI, with the amendments they caused noted in [`product-architecture.md`](../architecture/product-architecture.md). DM-007 was approved **as a deferral**: the Core question it concerns remains deliberately unanswered and closing it requires an ADR.

**DM-021 is resolved** and therefore absent from the table below: the SDS describes the complete product, and sprints consume it rather than each producing their own. Recorded in the Amendment line of [`sds.md`](../architecture/sds.md).

**DM-023 is resolved** and likewise absent. `Profile` is withdrawn from the domain: it appeared once in the whole corpus, as a node in one diagram, with no definition, responsibilities, data class or owner anywhere. `User` carries the identity of its holder directly. Recorded in the Amendment line of [`product-architecture.md`](../architecture/product-architecture.md) and stated in [`data-model.md`](../architecture/data-model.md) §2.3.

**DM-018 is resolved** and absent, and it **absorbed the former DM-017B**. The athlete is two structures: `Player` the person (crosses clubs, subject of Player Identity Memory) and `RosterMembership` the person within one club (the tenancy anchor, hosting `Assignment`) — mirroring `User` + `Membership`. A club transfer opens a new membership and never mints a new person, so identity follows the athlete. Recorded in the Amendment lines of [`product-architecture.md`](../architecture/product-architecture.md), [`data-model.md`](../architecture/data-model.md) and [`sds.md`](../architecture/sds.md). **DM-017A** — whether an assignment also targets a group or session — is what remains, renumbered from the former DM-017.

---

## The register

| ID | State | Decision | Owning document | Blocks | Priority |
|---|---|---|---|---|---|
| **DM-013** | Open | Does one `Training` design serve one occasion or many? | [`data-model.md`](../architecture/data-model.md) §2.19 | Closing the Aggregate Map — whether `TrainingSession` is a root. If a design serves many occasions, one modification record cannot hold them | **High** |
| **DM-014** | Open | Does the model persist the authority model beyond `Assignment` — Guardian, Club as authority, Delegation, temporary-coach scope? | [`data-model.md`](../architecture/data-model.md) §1.2, §2.9 | The atomic write of a `Declaration`; representing the guardian/coach conflict the Core resolves. Safety-relevant | **High** |
| **DM-015** | Open | What data class do `LibraryConcept` and `Exercise` belong to? Neither fits the four | [`data-model.md`](../architecture/data-model.md) §1.1 | The coherence of the rule that every record belongs to exactly one class | Medium |
| **DM-016** | Open | Is `Plan : Objective` 1:N or N:M? §2.4 states both in one sentence | [`product-architecture.md`](../architecture/product-architecture.md) §2.4 · [`data-model.md`](../architecture/data-model.md) §2.18 | Closing the Aggregate Map — whether `Plan` is a root or lives inside `Objective` | **High** |
| **DM-017A** | Open | May an `Assignment` also target a `Group` or a `Session`, not only a player-in-club? | [`data-model.md`](../architecture/data-model.md) §2.5 | Additional assignment target kinds. With DM-010 approved, a group objective currently has nobody with authority to accept it. Where a player assignment lives is settled by DM-018 | Medium |
| **DM-019** | Open | Who triggers mass re-derivation when perception improves, and is it visible to the coach? | [`product-architecture.md`](../architecture/product-architecture.md) §1.1, §1.4 | The update policy of `Analysis` and `IdentityMemory`. C2 requires re-derivation; §1.4 forbids silently applied change | Medium |
| **DM-020** | Open | **What level of verifiability must work reach before Atlas considers it implemented?** | [`development-rules.md`](../constitution/development-rules.md) §7 · [`sds.md`](../architecture/sds.md) §9 | SDS §9 has no completion criterion. The Definition of Done today requires only that the work builds and runs — nothing that would catch a tenancy leak | **High** |
| **DM-022** | Open | At what granularity must an interpretation record what it was derived from? | [`data-model.md`](../architecture/data-model.md) §1.2 · [`sds.md`](../architecture/sds.md) §3, §4 | The execution of directed forgetting. Without derivation links it is incomputable; tracked exhaustively for identity memory it grows without bound | Medium |

**DM-025 is resolved** and never appeared in the open table above — it lived only in [`memory-governance.md`](../constitution/memory-governance.md) §11 until this review found it blocking Migration 0001. The Recording Authority assertion is persisted as a dedicated `RecordingAssertion` structure (*Decision* class), one per `(subject, club)`, which is also its own directed-forgetting L4 tombstone; `memory-governance.md` §3's "every stored memory carries its Recording Authority" is met by resolving `(subject, club) → RecordingAssertion`, not by a per-record column. Chosen over embedding the assertion in the subject's structures, which would mix a Decision into Fact structures (`data-model.md` §1.1) and could not hold a tombstone surviving L4. Recorded in [`data-model.md`](../architecture/data-model.md) §2.4b, [`dbds.md`](../architecture/dbds.md), [`sds.md`](../architecture/sds.md) §5.6, and the §11 row of `memory-governance.md`.

**DM-026 and DM-027 were withdrawn from this register**, not resolved. A classification audit found neither is an architectural decision — neither changes an entity, relationship, ownership rule, invariant, authority, lifecycle or model rule. Their domain content was already settled ([`product-architecture.md`](../architecture/product-architecture.md) §7.3, [`memory-governance.md`](../constitution/memory-governance.md) §2.2) or already owned elsewhere (the persistence of the Recording Authority assertion is DM-025, `data-model.md`). **DM-026** (the provisioning *mechanism*) is owned by [`sds.md`](../architecture/sds.md) §5.6, where it is now specified. **DM-027** (the display-name source) is an implementation/UX note, now owned by the Sprint 3 work document. Both remain traceable from [`sprints/sprint-03-players.md`](sprints/sprint-03-players.md) as implementation dependencies.

**Four of eight are High.** Reported rather than spread out for appearance: DM-014 fixes a safety-relevant policy, DM-016 moves an Aggregate Map boundary, DM-020 gates the whole of SDS §9, and DM-022 fixes how directed forgetting is computed.

**DM-020 replaces an earlier formulation** that asked whether Atlas should adopt a test framework. That was the wrong question: the framework is a consequence of the standard, not the decision. What must be settled is the **standard of proof** a piece of work meets before it is called done — which today is *"builds and runs"*, and which cannot demonstrate that a coach in one club cannot read a player in another.

**DM-014 and DM-017A both concern the authority model's reach into persistence** — the declarer of a fact, and the targets an assignment may take. They are usefully decided together, though DM-018 has now settled the load-bearing half (where a player assignment lives).

**None requires an ADR** as currently framed. All are Tier 2 amendments or Data Model decisions. The Intelligence Core is not amended by any of them.

---

## How a decision moves through this register

**It enters** the day it is found, whether or not it is blocking anything yet.

**It leaves** when the owning document records the resolution. The row is removed from the table and the decision lives on in the document it changed — not here. This register never becomes a history; [`roadmap.md`](roadmap.md) holds the narrative and the owning documents hold the outcomes.

**It never leaves by being forgotten.** A decision that stops mattering is closed explicitly, with the reason stated in its owning document.
