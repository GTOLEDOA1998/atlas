# Atlas Memory Governance

> **Status:** Constitution — the complete and final governance policy of Atlas on what may be remembered, by whom, under what permission, for how long, and how it ends. **This is intended to be the last governance document.** Future need is an amendment to this document, never a new one.
> **Owns:** the definition of persistent memory · the permission model · what may and may not be stored, and the rule that generates both lists · ownership of every memory · who may create, modify and remove it · retention · directed forgetting · what happens when a relationship ends.
> **Inherits:** [`coaching-dna.md`](intelligence-core/coaching-dna.md) — Level 1 Atlas DNA governs absolutely · [`memory-model.md`](intelligence-core/memory-model.md) — the structure this policy operates on · [`human-decision-authority.md`](intelligence-core/human-decision-authority.md) — who holds which authority · [`product-principles.md`](product-principles.md) · [`data-model.md`](../architecture/data-model.md) — the four data classes.
> **Does not own:** how memory works structurally (`memory-model.md`) · who decides in a training or administrative matter (`human-decision-authority.md`) · what is persisted and in what shape (`data-model.md`) · legal or regulatory obligation, which is a later layer over this one and never a substitute for it.
> **Precedence:** Atlas DNA governs absolutely. Then the Intelligence Core. Then this document. **Where this policy appears to contradict the Core, this policy is defective.**
> **Amendment:** explicit and recorded. A change that would require amending the Intelligence Core requires an ADR.
> **Amended 2026-08-04:** §11 records **DM-025 as resolved** — the persistence shape of the Recording Authority assertion and the L4 tombstone is the `RecordingAssertion` structure ([`data-model.md`](../architecture/data-model.md) §2.4b). The semantics in §2, §3, §8, §9 are unchanged.
> **Accepted 2026-08-05** as the governing Tier 1 memory-governance policy by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md). No substantive content was changed by acceptance; the ADR adopts this document as it stands and closes `memory-model.md` Open Question 1.
> **Resolves:** G1 — the memory-governance blocker recorded in [`ADR-0001`](../decisions/ADR-0001-intelligence-core-frozen.md), [`memory-model.md`](intelligence-core/memory-model.md) Open Question 1, and [`data-model.md`](../architecture/data-model.md) Part V. **Formally resolved by [`ADR-0003`](../decisions/ADR-0003-memory-governance.md) (2026-08-05).**

---

## 0 · What this document is

`memory-model.md` defines **how** Atlas remembers and states plainly that *what may be remembered, for how long, and under whose consent* was deliberately left outside the Intelligence Core. This document is that decision.

It is a policy of **software and product architecture**, not of law. It states what Atlas does. Any obligation imposed later by a jurisdiction is a layer placed **over** this policy — it may constrain Atlas further, and it may never be used to justify doing less than this document requires.

> **The governing sentence.** Atlas remembers a developing human being. Every rule below exists because the subject of the memory is a person whose future is still being decided, and who in the normal case has no account, no voice in the interface, and no way to see what is held about them.

---

# 1 · What constitutes persistent memory

> **Memory is anything that outlives the request that produced it and can influence a later recommendation.**

That single test settles every case:

| Is memory | Is not memory |
|---|---|
| A recorded fact — a video, a session, a declaration | The assembled context of one request |
| An interpretation — a finding, an identity, a priority | A prompt |
| A human decision — an objective accepted, a proposal modified | A reasoning trace |
| A reference recording **what was consulted** | A rendered view, a cache, a search index |

**Three consequences.**

A derived index, a semantic search, a graph view or any regenerable artifact **is not memory** — it holds no permission, confers no rights, and its destruction loses nothing. If destroying it loses something, it was memory misfiled.

**A reference is memory.** Recording *which* analyses and memories produced a recommendation is itself a memory about the subject, and is governed here exactly like the things it points at.

**Transient computation is never governed by this document, and never persisted.** Nothing may be retained by claiming it is "just cache" if a later recommendation could read it.

---

# 2 · Permission — the Recording Authority

## 2.1 Atlas does not obtain consent. Atlas records an assertion of authority.

Atlas has no relationship with the player. `product-principles.md` and the Core are unambiguous: the coach is the voice the player hears, and Atlas never steps between them. In the MVP the player has no account and cannot be asked anything.

Therefore:

> **For every subject about whom memory is held, a human holding administrative authority asserts to Atlas that memory may be held. Atlas records that assertion, honours it, and is accountable for honouring it — not for having verified it.**

The human who asserts is accountable for the right to assert. That is not Atlas evading responsibility; it is the only honest allocation, because Atlas cannot see the family, the club or the agreement behind the assertion.

## 2.2 Who may assert

Derived from `human-decision-authority.md` §6, which orders administrative authority: **Club → Guardian → adult player**.

| Subject | Recording Authority |
|---|---|
| **Player, adult** | The player, or the club acting on registration |
| **Player, minor** | The **Guardian**, through the club that registers them |
| **Coach** | The coach themselves |
| **Group** | The club |
| **Club** | The club |

**Registration is a club-level administrative matter.** The club asserts; the coach does not. A coach may create a player record, but the authority under which that record exists belongs to the club, and the club is accountable for it.

## 2.3 The three binding rules

**Absence is not permission.** No assertion is not an assertion. A subject with no recorded Recording Authority is a subject about whom nothing may be stored. This is the memory counterpart of the Core's safety rule that *absence is unknown, never safe*.

**The assertion is a Decision.** It is permanent, never regenerated, and carries who asserted it and when. Recomputing what Atlas concluded is legitimate; recomputing what a human authorised is not.

**Authority is revocable, and revocation is not retroactive erasure.** Withdrawing authority stops future memory and triggers §8. It does not by itself destroy what exists — the authority chooses the level of forgetting, and §8 defines the levels.

---

# 3 · What may be stored

Only what serves the development of the subject, and only from the three sources `memory-model.md` §3 permits: **observed** in video · **declared** by a human · **reasoned** by Atlas from the first two.

| Class | May be stored |
|---|---|
| **Fact** | That something happened: footage, a session, an attendance, a declaration made, a message sent |
| **Interpretation** | What Atlas concludes, always with confidence, provenance and formation date |
| **Decision** | What a human chose, with who chose it and when |
| **Context** | What was true for a bounded period, with its declarer |

**Every stored memory carries three things without exception:** its **source class**, its **subject**, and the **Recording Authority** under which it exists. A memory missing any of the three is not a memory Atlas may hold.

---

# 4 · What may never be stored

`data-model.md` Part IV holds the enumerated list and **is not repeated here.** This document owns the rule that generates it, so a case the list does not name still resolves:

> **Four prohibitions. Each is absolute and none is tradeable against product value.**

**P-1 · Never store what Atlas cannot observe and no human declared.** Fatigue, pain, motivation, intent and readiness are declared or unknown. Atlas may record protective movement; it may never record "pain". An indicator may prompt a question to a human; it may never become an asserted state.

**P-2 · Never store what identifies a body rather than a person's play.** Facial embeddings, gait signatures and any derived person-identifying biometric are forbidden, and this is the gravest of the four because a vision pipeline produces them naturally unless the boundary makes them impossible. **The prohibition is enforced where the data would be produced, not where it would be written.**

**P-3 · Never store a judgment of a person's worth.** Memory serves development and is never used to grade a human — not a player, and not a coach. A record whose only use is to rank people is forbidden regardless of accuracy.

**P-4 · Never store anything that crosses an ownership boundary.** What Atlas learns in one relationship stays in that relationship. No cross-owner aggregate, no pattern from one club becoming another's default, no learned behaviour leaking into Atlas Defaults.

**The test for any new case:** if a memory cannot be traced to observation or declaration, does not describe play or development, could be used to rank a person, or draws on more than one owner — it is forbidden.

---

# 5 · Ownership

Ownership has two parts, and they are not the same: the **subject** the memory describes, and the **authority** accountable for it.

| Memory | Subject | Held by | On the relationship ending |
|---|---|---|---|
| **Player Identity** | the player | **the player** | **Follows the player** |
| **Player Historical** | the player | **the club** | **Stays with the club** |
| **Coach Identity** | the coach | **the coach** | **Follows the coach. Never inherited by a successor** |
| **Group Identity** | the group | the club | **Does not survive dissolution** as an attribute of any member |
| **Club Identity** | the club | the club | Ends with the club |
| **Context** | its subject | the club | Stays with the club |
| **Decisions** | their subject | **the human who made them** | Stay with the club where they were made |

> **The line that decides every case: what describes the person travels with the person; what describes the relationship stays with the relationship.**

**Memory never becomes authority.** No amount of accumulated understanding gives Atlas any decision. This is Level 1 and is not amendable.

---

# 6 · Who may create, modify and remove

| Action | Fact | Interpretation | Decision | Context |
|---|---|---|---|---|
| **Create** | The act itself — an upload, a session, a message | **Atlas only** | The human who decides | The human who declares |
| **Modify** | **Nobody** | **Atlas only**, by supersession with the prior retained | **Nobody** | **Nobody** — validity changes, content never |
| **Remove** | **Only directed forgetting** (§8) | Only directed forgetting, or supersession | Only directed forgetting | **Never removed. Expiry is not deletion** |

**Three rules bind the table.**

**Atlas creates interpretation and nothing else.** It never creates a fact, never makes a decision, and never declares on a human's behalf.

**No human edits an interpretation.** A human who disagrees **overrides**, and the override is recorded as a decision — which is itself the signal from which Atlas learns that authority. Letting a human rewrite Atlas's conclusion would destroy the record of the disagreement, which is the most valuable part.

**Correction is a new record, never an edit.** A memory found wrong is superseded and the correction is itself recorded.

---

# 7 · Retention

## 7.1 What is permanent

**Historical memory is permanent.** What happened is not unlearned; it may lose relevance, never occurrence. Progress evaluation, plateau detection and regression handling all rest on an unbroken record.

**Decisions are permanent**, because a human made them.

**The supersession record is permanent** — that Atlas held an interpretation on a date and revised it. The Core requires this for two stated reasons: progression matters, and a pattern of repeatedly misreading a person is itself important signal.

## 7.2 What is bounded

> **The content of a superseded interpretation is retained while the development relationship it belongs to is active. When that relationship ends, the supersession record survives and the superseded content is released.**

This is the answer to *"how much superseded history is retained"*, which the Core recorded as currently unbounded.

The bound is principled, not arbitrary: the Core names exactly two purposes for retaining superseded interpretation, and **both are served by the record of the revision rather than by its full content.** Content that can no longer make Atlas a better assistant to this subject is not an asset; it is an accumulating liability about a person.

## 7.3 What retention is not

**Retention is not decay.** Decay is an interpretation losing present-tense authority while remaining recorded — `memory-model.md` §6, and its rate is an open question of the Core, not of governance. **A memory may be simultaneously permanent and untrusted.** This document decides whether a record exists; the Core decides how much it is believed.

---

# 8 · Directed forgetting

`memory-model.md` §7 declares that a human authority may require Atlas to forget and that *the architecture must support this*. It does not say what forgetting means. This does.

## 8.1 Four levels, chosen by the authority

| Level | What happens | Reversible |
|---|---|---|
| **L1 · Withdrawal from reasoning** | The memory stops informing any recommendation. It remains recorded and is not read | **Yes** |
| **L2 · Erasure of interpretation** | Everything Atlas concluded about the subject is destroyed. Facts remain. Understanding is re-derived from what remains, or the subject returns to defaults | Only by re-derivation |
| **L3 · Erasure of fact** | Named evidence is destroyed. Every interpretation that rested on it is **enumerated and re-derived without it**; what cannot be re-derived declares its grounding gone | **No** |
| **L4 · Withdrawal of the subject** | The subject and everything anchored to them is removed, decisions included | **No** |

**The Recording Authority chooses the level.** Atlas does not choose it, does not argue with it, and does not require a reason.

## 8.2 The five rules that make it safe

**Erasure is a re-derivation cascade, never a delete cascade.** Removing a fact removes the fact and *recomputes* what stood on it. Nothing else is destroyed as a side effect. This is why identity is derived from history and never tangled with it.

**Enumeration is a precondition.** A fact whose dependent interpretations cannot be identified may not be erased, because erasing it would leave interpretations silently resting on nothing. If enumeration is impossible, forgetting escalates to L4 rather than proceeding blindly.

**The fact that forgetting was directed is permanent.** At every level, Atlas retains that memory was removed, when, at what level, and by which authority — **never what was removed.** Without it, Atlas cannot distinguish *"nothing was ever recorded"* from *"something was removed"*, and could not honour the Core's requirement to state plainly that its understanding is thinner.

**L4 leaves a tombstone and nothing else.** That a subject existed and was withdrawn, with the date and the authority. No attributes, no content, no residue. It exists so the removal is auditable without the person being retained.

**Atlas states its diminished understanding, and never fabricates around a hole.** Where memory was removed, Atlas reasons from what remains and says so. It does not silently continue as though nothing changed, and it does not fill the gap with inference.

## 8.3 What survives at each level

| | Facts | Interpretations | Decisions | Tombstone |
|---|---|---|---|---|
| **L1** | ✅ | ✅ not read | ✅ | ✅ |
| **L2** | ✅ | ❌ | ✅ | ✅ |
| **L3** | named ones ❌ | re-derived | ✅ **degraded honestly** | ✅ |
| **L4** | ❌ | ❌ | ❌ | ✅ **only this** |

At **L3** a decision survives whose evidence is gone. It is **not** presented as though it were still grounded: it declares that its justification was withdrawn. An unexplainable decision shown as a grounded one would be a lie about a human's reasoning.

---

# 9 · When a relationship ends

## 9.1 A player changes club

**Player Identity Memory follows the player.** It describes the athlete, not the relationship.

**Everything else stays.** Footage, sessions, the coach's judgments, the club's decisions — all describe the relationship and remain with the club that held it. Sending them would be the cross-owner leakage P-4 forbids.

> **The consequence, and it must be stated rather than discovered:** an interpretation arrives at the new club **with its provenance intact and its evidence out of reach.** It presents itself as understanding whose grounding is elsewhere — the same honest degradation L3 produces. It is a starting point, not an established conclusion.

**The new club asserts its own Recording Authority.** Authority does not transfer with the memory; the arriving understanding is held under the new club's assertion or it is not held at all.

## 9.2 A coach leaves a club

**Coach Identity Memory follows the coach**, because the Core holds it belongs to that person and not to the post.

**It is never inherited by a successor.** The successor begins on defaults and earns their own. Inheriting it would make a new coach carry a predecessor's biases into judgments about a developing athlete.

**It arrives constrained, not authoritative.** The Decision Hierarchy already settles this without a new rule: **Club DNA constrains Coach DNA.** An intensity learned under one club's philosophy does not override the philosophy of the next.

**The player memory the coach formed does not travel with them.** It is the player's, not the coach's.

## 9.3 A group dissolves

Group Identity Memory ends with the group and **does not survive as an attribute of its members.** What a group was for never becomes a label on a person.

## 9.4 A club dissolves

Club Identity Memory ends. Historical memory held by the club is subject to §8 at the authority's direction. **Player Identity Memory is not destroyed by the dissolution of a club** — it is the player's, and the player's Recording Authority governs it.

---

# 10 · Identity and history

> **Identity is derived from history and never tangled with it.**

The single structural property on which this entire policy depends. Everything above is only implementable because of it:

- **Forgetting is survivable.** Removing history means re-deriving understanding, not breaking the model.
- **Interpretation improves without rewriting the past.** A better model re-reads an unchanged record.
- **Memory travels without the relationship travelling**, because what describes the person is separable from what describes the club.
- **Being wrong is preserved as signal**, because superseded interpretation is a record and not an overwrite.

**Two things follow that constrain everything downstream.**

**Every interpretation must record what it was derived from**, or forgetting is incomputable and the model lies silently. *(The granularity of that record is DM-022 and is not decided here.)*

**A subject's identity must remain resolvable across the changes in §9**, or memory cannot follow the person the Core says it belongs to. *(How identity behaves across a transfer is DM-018, a domain decision. This policy does not resolve it — it constrains it: whatever is decided must let a player's identity memory reach them at their new club.)*

---

# 11 · What this document does not decide

Stated so nothing here is read as covering more than it does:

| Question | Owner |
|---|---|
| How fast confidence decays with staleness | `memory-model.md` OQ3 — **Core, not governance** |
| How much repetition promotes context into identity | `memory-model.md` OQ2 · `current-session.md` OQ1 — **Core** |
| Whose declaration of fact prevails when two humans disagree | `current-session.md` OQ4 — **Core** |
| At what granularity derivation is recorded | **DM-022** — `data-model.md` |
| Whether player identity survives a club transfer | **DM-018** — `data-model.md` |
| How Recording Authority and the tombstone are persisted | **DM-025 — resolved.** A dedicated `RecordingAssertion` structure, one per `(subject, club)`, that is also its own L4 tombstone ([`data-model.md`](../architecture/data-model.md) §2.4b) |
| Legal or regulatory obligation | A later layer over this policy, never a substitute for it |

---

_This document is the complete governance policy of Atlas on memory. It resolves G1. It inherits Atlas DNA and the Intelligence Core and may not contradict either; where it appears to, this document is defective. It changes by explicit recorded amendment, and by ADR where the Core would be touched._
