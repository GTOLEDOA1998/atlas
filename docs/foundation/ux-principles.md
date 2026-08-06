# Atlas UX Principles

> **Status:** Foundational — how Atlas must **behave** toward the person using it.
> **Why this exists:** [`product-principles.md`](../constitution/product-principles.md) §3 owns how Atlas must *feel* (fast, minimal, professional, calm, focused) and §4 owns its *visual language* (spacing, typography, colour, hierarchy, cards, icons, motion). Neither states what the interface must **do** to earn those adjectives. This document does, as testable behaviour with worked good/bad pairs.
> **Owns:** the ten behavioural principles, their good/bad practice pairs, their objective tests, and the order in which they resolve when they compete.
> **Inherits:** [`product-principles.md`](../constitution/product-principles.md) §3–§4 · [`product-architecture.md`](../architecture/product-architecture.md).
> **Does not own:** the feeling vocabulary and the visual language (`product-principles.md` §3–§4), components and layout (`product-architecture.md` Part VIII), the anti-goals (`product-principles.md` §12).
> **The user:** a table tennis coach, courtside, under time pressure, whose attention belongs on a player.
> **Amendment:** deliberate and explicit.

---

## The governing test

> **A coach should be able to open Atlas, understand their day in seconds, and know exactly where to go next.**

Every principle below is a way of not failing that test. Where two principles appear to conflict, the one that better serves a coach under time pressure wins.

---

# U1 · Minimize cognitive load

**The principle.** The coach arrives with their attention already committed. The interface must not ask them to hold anything in their head, hunt across screens, or make decisions the product should have made.

**Why.** Cognitive load spent on the software is cognitive load not spent on the athlete. That is a direct cost to the product's entire purpose.

| ✅ Good | ❌ Bad |
|---|---|
| One primary job per screen, and the most important action is unmistakably the most prominent | A screen with four equally weighted panels and no obvious entry point |
| Atlas works well by default; the coach configures players and training, not software | A settings screen that grew because decisions were deferred to the user |
| Seven sidebar destinations, scannable at a glance | Fourteen destinations, which stop being scanned and start being read |
| Sensible defaults with a visible way to change them | A required choice on first use, before the coach knows enough to choose |

**Test:** can a coach state, in one sentence, what this screen is for?

---

# U2 · Show only what is actionable

**The principle.** Surface what requires a decision now. Everything else lives one deliberate step away — reachable, never in the way.

**Why.** Information that cannot be acted on is noise that hides information that can. This is why the Dashboard answers exactly one question and why aggregate metrics are forbidden on it.

| ✅ Good | ❌ Bad |
|---|---|
| Three players needing attention, each with one sentence of reasoning | A row of stat tiles: total players, videos this month, sessions logged |
| Historical detail one click away from the player profile | Every metric a player has ever produced, on one screen |
| Deferred items shown as deferred, with the reason | Deferred items hidden, leaving the coach unable to judge what was raised |
| An empty section that says what will appear here and when | An empty section rendering as a blank panel |

**Test:** for every element, what decision does it help make? If there is no answer, remove it.

---

# U3 · Always explain a recommendation

**The principle.** Every recommendation arrives with its reasoning, its evidence, and its confidence. Evidence is reachable from the claim, not buried.

**Why.** A coach who cannot verify a claim cannot responsibly act on it — and one who acts anyway has outsourced judgment. *A recommendation that cannot be questioned, understood, or overruled is a failure, no matter how correct it is.*

| ✅ Good | ❌ Bad |
|---|---|
| "Contact point is late on backhand against topspin" — with the clips, the metric, and a confidence level | "Backhand needs work" |
| Confidence stated plainly, and thin evidence reading as thin | Uniform presentation regardless of how well-supported the claim is |
| A visible note that alternatives exist, with a way to see them | One explanation presented as the only one |
| A three-year-old interpretation visibly marked as stale | A stale interpretation rendered identically to yesterday's — lying by omission |
| "This rested on material that has since been removed" | Silently continuing to show a conclusion whose evidence was deleted |

**Test:** can the coach reach the footage that produced this claim in one action?

---

# U4 · Never show an unexplained empty screen

**The principle.** Emptiness is a state with content, not an absence of content. Every empty view says what belongs here, why it is empty, and what the single next step is.

**Why.** Every new coach starts empty and many never see a populated view. **The empty state is the most-seen screen in the product** and is designed first, not last.

| ✅ Good | ❌ Bad |
|---|---|
| "No hay análisis todavía. Sube tu primer vídeo." with one action | A blank panel under a heading |
| An unbuilt section stating what it will do and when it arrives | A section that renders nothing, indistinguishable from a bug |
| Exactly one action in an empty state | Three competing calls to action, so none is the next step |
| A distinct treatment for *nothing yet*, *nothing matching your filter*, and *something failed* | One generic "no data" for all three |

**Test:** does an empty screen ever look like a broken screen?

---

# U5 · Preserve the continuity of work

**The principle.** The coach is doing one long job across many sessions. The interface should hold their place, not restart them.

**Why.** Coaching is longitudinal by nature. An interface that forgets forces the coach to rebuild context that the product already has — the exact work Atlas exists to remove.

| ✅ Good | ❌ Bad |
|---|---|
| Signing in lands on what needs attention today | Landing on a generic welcome screen |
| A protected page opened while signed out returns there after signing in | Being dumped on the dashboard, having lost the destination |
| A persistent shell where only the content region changes | Full-page transitions that lose scroll position and context |
| The player being worked on stays selected across sections | Re-selecting the player on every screen |
| Long work continues in the background with visible state | A modal that blocks the app until processing finishes |

**Test:** after an interruption, how many actions to get back to where they were?

---

# U6 · Be consistent

**The principle.** The same idea looks and behaves the same everywhere. One set of primitives, one spacing system, one meaning per colour.

**Why.** Inconsistency is a tax paid on every screen: each variation is something new to learn, and it quietly signals that nobody is holding the whole. Consistency is what makes a product feel like serious equipment.

| ✅ Good | ❌ Bad |
|---|---|
| One card primitive used everywhere | Three card-like things with different padding and radius |
| Colour reserved for meaning — priority, status, confidence | Colour applied for visual interest |
| Spacing from the design tokens | Arbitrary one-off values because "it looked better" |
| A new screen composed entirely of existing primitives | A new screen introducing its own local styles |

**Test:** could a screen be described entirely in terms of existing primitives? If not, is the new one genuinely needed — or is it drift?

---

# U7 · Be usable by everyone

**The principle.** Accessibility is a correctness requirement, not an enhancement.

**Why.** It is required by the development rules, and separately: much of what accessibility demands — semantic structure, real labels, visible state, keyboard reachability — is what makes an interface legible to *everyone* under pressure.

| ✅ Good | ❌ Bad |
|---|---|
| Semantic elements: real `nav`, `main`, headings in order | A tree of `div`s with visual styling standing in for structure |
| Every input associated with a label | A placeholder used as the label, vanishing on focus |
| State exposed to assistive technology — invalid, busy, current, live status | State conveyed by colour alone |
| Every interaction reachable and operable by keyboard | Controls that only respond to a pointer |
| Touch targets that work on a phone, courtside | Desktop-sized targets on a device used at the table |

**Test:** can the entire flow be completed with a keyboard, and does a screen reader announce what changed?

---

# U8 · Feel fast

**The principle.** Perceived speed is what matters. Respond immediately, show real progress, and never make the coach wait without reason.

**Why.** Courtside, a slow tool is an unused tool. *If uploading video ever feels like a chore, the rest of Atlas never gets used.*

| ✅ Good | ❌ Bad |
|---|---|
| The shell paints immediately; only the content region waits | A full-page loading screen on every navigation |
| Skeletons matching the shape of what is arriving | A spinner with no indication of what is coming |
| Video processing runs in the background with visible state | A blocking wait while analysis runs for minutes |
| Optimistic response to an action, reconciled after | A frozen interface until the server replies |
| Honest, specific progress on upload | An indeterminate bar that reveals nothing |

**Test:** what does the coach see in the first 200ms? If the answer is "nothing", that is the bug.

---

# U9 · Earn trust

**The principle.** The product must be predictable, honest about its state, and forgiving of real conditions.

**Why.** A coach is being asked to accept advice about a developing human being. Trust is the precondition for the product working at all, and it is built by never being caught overstating.

| ✅ Good | ❌ Bad |
|---|---|
| "Datos de ejemplo. Ninguna de estas prioridades procede de un análisis real" | Simulated data presented as though it were measured |
| Errors in the coach's language, with what to do next | A raw provider error string |
| Destructive actions confirmed, and reversible where possible | A one-click delete of a season of history |
| A workflow tolerating imperfect footage, interruptions and retries | A flow that punishes an interruption by discarding the work |
| Saying plainly that today does not suit the standing priority | Forcing a poor fit rather than admitting one |

**Test:** has the interface ever told the coach something it could not support?

---

# U10 · Be transparent about state and reasoning

**The principle.** The coach can always see where things stand, where a claim came from, and what Atlas did on their behalf — which should be nothing consequential.

**Why.** Hidden state is where trust dies. It is also where the coach's authority quietly erodes: an action taken without a visible decision point was taken *for* them.

| ✅ Good | ❌ Bad |
|---|---|
| Accept / modify / reject equally reachable on every proposal | A conclusion with no visible way to reject it |
| A visible processing state on every video | A video that silently sits in an unknown state |
| Provenance shown: observed, declared, or previously reasoned | A coach's statement later presented as Atlas's observation |
| An override recorded and respected next time | The same rejected recommendation re-raised unchanged |
| Nothing consequential happens without a human acting | A plan auto-assigned "to save a click" |

**Test:** can the coach always answer "why am I seeing this, and what happens if I ignore it?"

---

## Resolving conflicts between these principles

They compete in practice. In order:

1. **U7 accessibility** and **U9 trust** never yield. An inaccessible or dishonest interface is broken, not a trade-off.
2. **U3 explanation** beats **U1 cognitive load.** Where a recommendation needs its reasoning, the answer is progressive disclosure, not omission.
3. **U8 perceived speed** beats **U6 consistency** for a specific interaction, provided the inconsistency is deliberate and documented.
4. **U2 actionable only** beats completeness, always.

---

## What Atlas must never feel like

Restated from `product-principles.md` §3 because these are the failure modes this document exists to prevent:

**Cluttered** · **Confusing** · **A corporate dashboard** · **A social network** · **Gamified for no reason**

If a proposal moves the interface toward any of these, the proposal is wrong — not the principle.

---

_This document defines how Atlas must behave toward the person using it. Feeling vocabulary and visual language are owned by `product-principles.md` §3–§4. It changes only by explicit, deliberate amendment._
