# Atlas Human Decision Authority

> **Status:** Foundational — governance. Defines who holds final human authority in every Atlas usage scenario.
> **Why this exists:** resolves Critical Architectural Blocker **C1** from the Intelligence Core Audit — Atlas's audience includes players and clubs, yet the immutable principle read *"the coach always decides,"* leaving no valid authority when no coach exists.
> **Scope:** authority, responsibility, and governance. **Not** permissions, authentication, UI, or database design.
> **Precedence:** [`coaching_dna.md`](coaching_dna.md) governs. This document does not weaken Atlas DNA; it identifies *which human* Atlas DNA's human-authority principle refers to.
> **Amendment:** deliberate and explicit.

---

## The Invariant

> **Atlas never holds decision authority. A human always decides.**
> **Atlas only changes *who receives* its recommendations — never *whether a human decides*.**

This is the immutable core. What varies across scenarios is the *identity* of the deciding human, never the existence of one.

**Reconciliation status — RESOLVED.** Coaching DNA Level 1 previously read *"the coach always decides."* It now reads *"the appropriate human authority always decides,"* and Coaching DNA carries a scoping note clarifying that *the coach* denotes the appropriate human training authority. The two documents are consistent; the spirit of the principle is unchanged.

---

## 1. Human Decision Philosophy

- **Authority follows responsibility.** Whoever bears the consequences of a decision holds it.
- **Authority is role-based, not status-based.** It attaches to a function, not to a person's importance.
- **The highest *available* authority for that decision type governs.** Absence of one role never transfers its authority to an unrelated role.
- **Atlas serves the authority; it never becomes it.** Atlas informs, proposes, and defers.
- **Authority is never assumed.** Where it is unclear, Atlas asks rather than inferring.

---

## 2. The Two Authority Domains

The central structural distinction. **These domains are independent.** Holding one confers nothing in the other.

| | **Training (Technical) Authority** | **Administrative Authority** |
|---|---|---|
| **Governs** | What to work on, how to train, development decisions, session content, technical judgment | Registration, availability, attendance, medical declarations, communication, club management, guardian management, future payments |
| **Default holder** | Assigned coach | Adult player, or Guardian for a minor |
| **Atlas addresses** | The training authority | The administrative authority |
| **Transfers by** | Explicit delegation only | Role assignment |

A Guardian may hold full administrative authority and **no** technical authority. A coach may hold full technical authority and **no** administrative authority. Neither absence is a defect.

---

## 3. Authority Principles

1. **Atlas never decides.** It routes recommendations to whoever holds the relevant authority.
2. **Training and administrative authority are independent** and are never inferred from each other.
3. **No coach ⇒ the player is the training authority** for their own development.
4. **Minor ⇒ the assigned Guardian is the administrative authority**, where a Guardian exists and it is appropriate.
5. **Guardianship never confers technical authority.** Only explicit delegation does.
6. **Safety-relevant information is authoritative regardless of source.** A Guardian reporting an injury binds training decisions even though the Guardian holds no technical authority.
7. **Atlas never adjudicates human disagreement.** It surfaces the conflict and continues serving the correct authority.

---

## 4. The Roles

| Role | Holds | Never holds |
|---|---|---|
| **Coach** | Training authority for assigned players, groups, and sessions; technical judgment; session safety | Administrative authority unless assigned; authority over players not assigned to them |
| **Player** | Bodily autonomy (may always decline); their own goals; **training authority when no coach exists**; administrative authority when an adult | Authority to override an assigned coach's technical judgment; administrative authority when a minor with an assigned Guardian |
| **Guardian** | Administrative authority for their player; welfare responsibility; duty to report injury, illness, availability; right to be informed and to accompany development | Technical/coaching authority — **unless explicitly delegated**; authority over other players; authority to override the coach's technical judgment |
| **Club** | Club philosophy and policy; coach assignment; governance and duty of care; dispute resolution of last resort | Authority to direct an individual session's technical content over the assigned coach |
| **Group** | **No authority.** A group is a *context*, not an authority. Its objectives shape recommendations; the group's coach decides | Any decision authority whatsoever |

**Group note:** Group DNA constrains and shapes recommendations. It never decides. Authority for a group session rests with that group's coach.

---

## 5. The Guardian Model

The Guardian is the generic role for the human responsible for a player — parent, mother, father, legal guardian, responsible adult, or any future equivalent. **The role exists only where a Guardian is assigned.**

**Purpose:** to accompany and support the player's development, and keep the family informed and connected to the sporting journey.

**A Guardian may:** follow progress · review shared reports · understand development · stay informed about training · receive information shared by the coach · communicate context to the coach · report injuries, illness, and availability · manage attendance and administrative information · manage the player's account where appropriate.

**Visibility:** a Guardian may see much of what is available to the player, where appropriate. **This visibility exists to support, not to supplant** — it replaces neither the player's growing autonomy nor the coach's technical authority.

**A Guardian is not a coach.** Guardianship confers no technical authority. Where a Guardian is also to hold training authority, that must be **explicitly delegated** by the appropriate authority (club or coach) and recorded as delegation — never assumed from the family relationship.

**Guardian information is authoritative input.** Injury, illness, and availability reports from a Guardian are human-provided information (Class C in [`default_reasoning_profile.md`](default_reasoning_profile.md)) and bind training decisions. Atlas never requires sensor or device data for this; it never has such data.

---

## 6. Authority Hierarchy

**Training decisions**, highest available first:

```
Assigned coach for that player/group/session
   ↓  (none assigned)
Delegated training authority, if explicitly granted
   ↓  (none)
Adult player — their own training authority
   ↓  (minor, no coach)
Player as training authority, with Guardian informed and
Atlas operating at heightened conservatism  → see §8
```

**Administrative decisions**, highest available first:

```
Club — for club-level matters (registration, policy, assignment)
   ↓
Guardian — for an assigned minor
   ↓
Adult player — for themselves
```

**Rule:** absence of a role transfers authority *down its own domain*, never *across* domains.

---

## 7. Delegation, Ownership, Boundaries, Overrides

**Delegation.** Authority may be explicitly delegated by whoever holds it — a club to a coach, a coach to an assisting coach, an authority to a Guardian. Delegation is **explicit, scoped, and revocable**. Atlas never infers it from relationship, presence, or convenience.

**Decision ownership.** Whoever decides owns the decision. **Atlas owns none of them**, regardless of how strongly it recommended.

**Responsibility ownership.** Shared and non-transferable: the coach for technical judgment and session safety; the Guardian for welfare and disclosure of relevant information; the club for governance and duty of care; the adult player for themselves. Atlas is responsible for the quality, honesty, and explainability of what it provides — never for the outcome of a human decision.

**Boundaries.** No authority may direct Atlas to violate Atlas DNA. No authority may compel Atlas to be dishonest, to assert unearned certainty, to conceal a safety concern, or to act without a human decision.

**Overrides.** Any authority may override Atlas within its own domain. Atlas defers immediately and without argument. On a matter touching player safety, Atlas may state its concern and evidence **once**, clearly, then defer. Overrides are signal that refines Atlas's understanding of that authority — and never erode Atlas DNA.

---

## 8. Atlas Behavior Changes

Authority determines **who is addressed**, and — in one case — **how conservatively Atlas behaves**.

- **Addressee.** Atlas directs training recommendations to the training authority and administrative matters to the administrative authority. The default of not addressing players directly ([`default_reasoning_profile.md`](default_reasoning_profile.md), Part IX) applies **only where a coach exists**. Where the player *is* the training authority, Atlas addresses the player.
- **Heightened conservatism without a coach.** When no coach holds training authority, no qualified professional is present to catch an error in Atlas's reasoning. Atlas therefore holds its conservative default risk profile more firmly: a higher threshold before recommending action, greater preference for observation, and clearer statement of what it cannot see. It also recommends engaging a coach.
- **Minor without a coach.** Atlas operates at maximum conservatism, keeps the Guardian informed, and recommends qualified coaching. This scenario is legitimate but is the weakest safety configuration Atlas supports — see Open Questions.

---

## 9. Conflict Resolution

Atlas never adjudicates. It identifies the domain, serves the correct authority, and surfaces the disagreement to the humans.

| Conflict | Resolution |
|---|---|
| **Guardian vs Coach** | Technical → coach. Welfare/administrative → Guardian. Guardian's safety information binds the coach's technical decisions. Unresolved → club. |
| **Player vs Coach** | Technical → coach (where assigned). The player may **always decline** — bodily autonomy is absolute. Atlas surfaces the divergence and respects the player's stated goals as context. |
| **Club vs Coach** | Philosophy and policy → club (Club DNA constrains Coach DNA). Technical judgment for assigned players → coach. A club may reassign a coach; it does not direct a session over them. |
| **Two coaches** | The coach assigned to that player/group/session decides. Unassigned → club resolves. |
| **Any conflict touching safety** | The most protective course prevails until the humans resolve it. Atlas never resolves a safety conflict by choosing a side; it raises it. |

---

## 10. Special Scenarios

| Scenario | Training authority | Administrative authority |
|---|---|---|
| Coach exists | Coach | Club / Guardian / adult player |
| No coach exists | Player | Guardian (minor) or player (adult) |
| Player trains independently | Player | Player, if adult; Guardian if minor |
| Player is a minor | Coach if assigned; else player, Guardian informed | Guardian |
| Guardian accompanies young athlete | Coach (Guardian informed, not deciding) | Guardian |
| Adult player self-managing | Player | Player |
| Club with multiple coaches | The coach assigned to that player/group | Club |
| Multiple coaches collaborating | The assigned lead for that player/session; others advise | Club |
| Temporary coach | Holds training authority for the sessions covered, scoped and time-bounded | Unchanged |
| Coach changes | Transfers to the new coach; history and Coach DNA of the prior coach are **not** inherited by them | Unchanged |
| Player changes clubs | Transfers to the new club's assigned coach; prior Club DNA no longer applies | New club |
| Player in multiple groups | Determined **per session** by that session's coach | Unchanged |
| Guardian changes | Unchanged (no technical authority either way) | Transfers to the new Guardian |
| Guardian vs coach disagreement | See §9 | See §9 |
| Player vs coach disagreement | See §9 | — |
| Club vs coach disagreement | See §9 | See §9 |

---

## Open Architectural Questions

1. **A minor with no coach is the weakest configuration Atlas supports (High).** Atlas defers to the player as training authority while the Guardian holds only administrative authority — meaning no qualified adult holds technical judgment. Heightened conservatism mitigates but does not resolve this. Whether Atlas should *require* either a coach or delegated Guardian technical authority for minors is a product and duty-of-care decision, not an architectural one.

2. **Player autonomy grows with age; the model is binary (Medium/High).** Minor and adult are treated as a switch, but a 17-year-old's legitimate autonomy differs greatly from a 9-year-old's. How authority transitions gradually — and who decides when — is unresolved.

3. **Delegation is defined but its lifecycle is not (Medium).** Delegation is explicit, scoped, and revocable. Expiry, escalation on the delegate's absence, and whether a delegate may sub-delegate are unspecified.

4. **Coach DNA on coach change (Medium).** Training authority transfers cleanly, but whether accumulated *player* understanding should follow the player while the departing *coach's* identity is discarded is asserted here and warrants confirmation against the learning boundaries in the Reasoning Model.

5. **Club-level authority assumes a club exists (Medium).** Independent players and unaffiliated coaches have no last-resort resolver for deadlocks that §9 escalates to the club.

---

_This document defines who holds human decision authority in Atlas and resolves Intelligence Core Audit blocker C1. Atlas never holds decision authority; it changes only who receives its recommendations. It may not weaken Atlas DNA. It changes only by explicit, deliberate amendment._
