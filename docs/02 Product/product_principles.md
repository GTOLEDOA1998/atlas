# Atlas Product Principles

> **Status:** Product Constitution — the single source of truth for *what Atlas is as a product*.
> **Companion document:** [`development_rules.md`](../10%20Governance/development_rules.md) governs *how* Atlas is built. This document governs *what* Atlas should be and *why*.
> **Audience:** Human contributors, product decision-makers, and AI coding assistants (Claude, Cursor, ChatGPT).
> **Rule of precedence:** When a feature idea, prompt, or request conflicts with these principles, these principles win until they are explicitly amended.

Atlas is an AI-powered platform for **table tennis coaching**. It helps coaches understand their players, analyze play through video, and turn that analysis into structured, adaptive training. This document consolidates the existing Atlas vision into permanent product principles so that every future decision — human or AI — pulls in the same direction.

---

## 1. Product Vision

**Why Atlas exists.** Coaching quality does not scale. A great table tennis coach can only watch so many matches, remember so many patterns, and write so many training plans. The knowledge that separates good players from great ones lives in the coach's head and is spent one athlete at a time. Atlas exists to give that expertise leverage — so a coach's insight reaches more players, more consistently, without diluting quality.

**The problem Atlas solves.** Today, analysis is manual, slow, and inconsistent. Coaches rewatch footage by hand, track progress in notebooks and spreadsheets, and rebuild training plans from memory. Players get feedback late, in fragments, and rarely tied to evidence. Atlas replaces that scattered, effortful loop with a single flow: capture play, understand it, act on it.

**Who Atlas is built for.** Atlas is built for **table tennis coaches** — the decision-makers responsible for player development — and the players they train. It is a professional tool for people who take the sport seriously: club coaches, academies, and serious competitive players. It is not a casual consumer app and not a generic sports gadget.

**Long-term vision.** Atlas becomes the coach's most trusted assistant — the system that watches every session, remembers every pattern, and always has an evidence-backed recommendation ready. Not a replacement for the coach, but an extension of the coach: reliable, tireless, and always working in service of better training and better players.

---

## 2. Product Philosophy

These are the core beliefs that shape every feature.

- **AI assists; it does not decide.** Atlas surfaces analysis, patterns, and recommendations. The coach chooses what to act on. The product is designed around augmenting expert judgment, never overriding it.
- **Coaches remain the decision-makers.** Every recommendation is a proposal, not a command. The coach's authority over their players' development is absolute and must always be visible in the interface.
- **Simplicity over feature overload.** A smaller product that coaches actually use beats a larger one they abandon. We resist the pull to add "just one more" toggle, tab, or setting.
- **Every feature must provide measurable value.** If we cannot articulate the concrete coaching problem a feature solves, it does not ship. Features justify their existence in the coach's real workflow, not in a roadmap.
- **Quality before quantity.** One reliable, trustworthy analysis is worth more than ten noisy ones. Depth and accuracy outrank breadth of features.
- **Evidence over opinion.** Atlas ties what it says to what it saw. Insight is grounded in the player's actual play, not generic advice.

---

## 3. User Experience Principles

Every screen in Atlas should feel like a well-run training session: purposeful, focused, and calm.

**Atlas must always feel:**

- **Fast.** Interactions respond immediately. Nothing important makes the coach wait without reason.
- **Minimal.** Each screen shows what matters for the task at hand and nothing more.
- **Professional.** The product feels like serious equipment for serious coaches — trustworthy and precise.
- **Calm.** No noise, no anxiety, no urgency the coach didn't ask for. The interface is quiet so the coaching can be loud.
- **Focused.** One primary job per screen. The most important action is obvious.
- **Modern.** Clean, current, and comfortable — never dated or clumsy.
- **Premium.** The care in the details signals that the work inside is worth trusting.

**Atlas must never feel like:**

- **Cluttered.** Walls of stats, competing panels, and dense controls.
- **Confusing.** Ambiguous actions, hidden state, or interfaces that require a manual.
- **A corporate dashboard.** Rows of vanity metrics that inform nothing and change nothing.
- **A social network.** Feeds, likes, follower counts, notifications engineered for engagement.
- **Gamified for no reason.** Badges, streaks, and points that don't map to real coaching progress.

---

## 4. Design Principles

The visual language exists to make coaching clarity effortless. Design serves comprehension, not decoration.

- **Spacing.** Generous whitespace. Breathing room is a feature — it creates calm and directs attention. Crowding is a bug.
- **Typography.** Clear hierarchy through type. Headings orient, body text informs, numbers read cleanly at a glance. Legible over stylish.
- **Colors.** Restrained and purposeful. A calm, professional base palette; color reserved to signal meaning — priority, status, warning — never applied for flourish.
- **Hierarchy.** Every screen answers "what matters most here?" before anything else. The most important element is unmistakably the most prominent.
- **Cards.** Information is grouped into clean, self-contained cards. Each card is one idea, scannable and complete.
- **Icons.** Functional and consistent. Icons clarify meaning and aid recognition; they are never ornamental filler.
- **Motion.** Subtle and meaningful. Motion communicates state and continuity (loading, transitions, confirmation). No animation exists purely to impress.
- **Responsiveness.** Mobile-first and reliable on the devices coaches actually use — courtside on a phone or tablet, reviewing later on a laptop. The experience adapts without breaking.

**Desired emotional impact:** a coach opening Atlas should feel *in control and clear-headed* — the sense of walking into an organized gym where everything is where it should be and the next step is obvious.

---

## 5. AI Principles

AI is the engine of Atlas, but it operates within firm boundaries. It is a capable assistant on the coaching staff — accountable, honest, and always subordinate to the coach's judgment.

**AI must:**

- **Explain.** Every insight comes with its reasoning and its evidence. The coach can always see *why* Atlas said what it said.
- **Teach.** AI helps the coach and player understand, not just receive verdicts. It raises coaching capability over time.
- **Recommend.** AI proposes concrete next steps — drills, focus areas, adjustments — framed as suggestions the coach can accept, modify, or reject.
- **Prioritize.** AI helps separate what matters now from what can wait, so the coach's attention lands where it counts.

**AI must never:**

- **Replace human judgment.** The coach decides. Atlas informs the decision; it does not make it.
- **Pretend certainty.** When confidence is limited, Atlas says so. It never dresses a guess as a fact. Honest uncertainty is more valuable than false precision.
- **Hide its reasoning.** No black-box verdicts. If Atlas cannot explain it, Atlas should not assert it.

---

## 6. Dashboard Principles

*This section describes the Dashboard's purpose, not its implementation.*

The Dashboard is the coach's starting point — the first answer to "what needs my attention today?" Its job is orientation, not exhaustive reporting.

- **What deserves attention.** Players who need action, recent analyses ready for review, and clear next steps. The Dashboard surfaces *what changed* and *what to do about it*.
- **What should be hidden.** Everything that does not require a decision right now. Historical detail, secondary metrics, and rarely-used tools live one deliberate step away — reachable, but never in the way.
- **How priorities are shown.** By prominence and order, not by volume. The most important item is the most visible. Priority is expressed through hierarchy and clear signals, not by showing more.
- **What it must never become.** A vanity wall of numbers. If a metric does not help the coach decide or act, it does not belong on the Dashboard.

The Dashboard succeeds when a coach can open it, understand their day in seconds, and know exactly where to go next.

---

## 7. Player Management Principles

Coaches interact with players constantly, so this must be the most fluid part of Atlas.

- **Minimize clicks.** Common actions — finding a player, opening their history, starting an analysis — should take as few steps as possible. Every unnecessary click is friction the coach pays repeatedly.
- **Intuitive by default.** Finding and working with a player should require no thought about the interface. The structure should match how coaches already think about their roster.
- **The player is the unit.** A player's profile is the natural home for their history, analyses, and training — one coherent place, not data scattered across sections.
- **Fast to navigate.** Moving between players and between a player's sections should feel instant and obvious.

Player management is plumbing done right: invisible when it works, and it must always work.

---

## 8. Video Principles

Video is how play enters Atlas. Getting footage in must feel effortless, because a coach juggling a session will not fight the tool.

- **Effortless upload.** Uploading a video should be quick, forgiving, and obvious — ideally a couple of taps from courtside on the device already in the coach's hand.
- **Clear workflow.** The path is always visible: capture or select the video → attach it to the right player → hand it to Atlas for analysis. The coach always knows what happens next.
- **Honest feedback.** Upload and processing progress are shown plainly. The coach is never left wondering whether it worked.
- **Forgiving.** The workflow tolerates real conditions — imperfect footage, interruptions, retries — without punishing the coach.

If uploading video ever feels like a chore, the rest of Atlas never gets used.

---

## 9. Analysis Principles

Analysis is where Atlas earns trust. Results must be understood at a glance and usable in the moment.

- **Visual first.** Findings are shown visually before they are shown as text or tables. A coach should grasp the takeaway from the shape of the thing, not by reading a report.
- **Actionable.** Every analysis points toward *what to do*, not just *what happened*. Description without direction is incomplete.
- **Easy to understand.** Results speak the coach's language, not the model's. No jargon, no raw scores without meaning.
- **Useful during real training.** Analysis is designed to be consulted courtside, mid-session — quick to read, quick to apply. It fits the pace of coaching, not the pace of report-reading.
- **Grounded in evidence.** Findings connect back to the footage they came from, so the coach can verify and trust them.

An analysis that a coach cannot use during training has failed, no matter how sophisticated it is.

---

## 10. Training Principles

Atlas closes the loop: analysis becomes better training. This is where insight turns into improvement.

- **Recommendations.** Atlas translates what it found into concrete training proposals — drills and focus areas tied directly to the player's actual needs. Recommendations are specific, evidence-based, and always the coach's to approve.
- **Progression.** Training in Atlas has direction. It builds over time, reflecting where the player has been and where they should go next — not disconnected one-off suggestions.
- **Feedback.** Progress is tracked and reflected back. The coach and player can see whether training is working, closing the loop between effort and result.
- **Adaptability.** As the player changes, the training adapts. Atlas responds to new analysis and real progress, keeping recommendations relevant instead of static.

Training is the payoff of the whole product. Analysis without training is observation; training makes it coaching.

---

## 11. Product Growth Principles

Atlas will grow — but growth must strengthen the product, never dilute it. Every new feature is judged against the whole.

**Every new feature must:**

- **Solve a real problem.** It addresses a concrete need coaches actually have, validated in their real workflow — not a hypothetical or a "nice to have."
- **Integrate naturally.** It fits the existing flow (players → video → analysis → training) rather than bolting on a new silo the coach must learn separately.
- **Preserve simplicity.** It leaves Atlas as easy to use as it was before — or easier. Complexity added in one place is paid for by clarity elsewhere.
- **Avoid increasing cognitive load.** It does not make the coach hold more in their head, hunt through more screens, or make more decisions than before.

Growth is measured by how much more Atlas *does for the coach*, not by how many features it *contains*. When in doubt, we deepen what exists before we add what doesn't.

---

## 12. Things Atlas Will Never Become

These are explicit anti-goals. They are as binding as the principles above. Atlas will never become:

- **A social network.** No feeds, followers, likes, or engagement mechanics. Atlas is a coaching tool, not an attention product.
- **A feature-dumping ground.** We do not add features to look complete or to match competitors. Every addition earns its place (§11).
- **Bloated enterprise software.** No sprawling menus, endless configuration screens, or complexity that requires training to operate.
- **A complex configuration tool.** Atlas should work well by default. Coaches configure players and training, not the software itself.
- **A replacement for coaches.** Atlas will never position itself as the decision-maker. It amplifies coaches; it does not automate them away.
- **A vanity-metrics dashboard.** No numbers for the sake of numbers. If it doesn't drive a coaching decision, it doesn't belong.

If a proposal moves Atlas toward any of these, the proposal is wrong — not the principle.

---

## 13. Decision Filter

Before implementing **any** feature, both humans and AI assistants must run it through this checklist. A feature that cannot honestly pass does not ship.

- [ ] **Does this solve a real user problem?** Can we name the specific coaching problem and the coach who has it?
- [ ] **Does it simplify the workflow?** Does it reduce steps, clicks, or thinking — rather than add them?
- [ ] **Does it respect the Product Philosophy (§2)?** Does AI assist while the coach decides? Is it grounded in evidence?
- [ ] **Would a coach actually use this?** In a real session, under real time pressure — not just in a demo?
- [ ] **Does it increase clarity?** Does it make the product easier to understand, or does it add noise?
- [ ] **Does it integrate naturally?** Does it fit the players → video → analysis → training flow?
- [ ] **Does it preserve simplicity and avoid added cognitive load?** Is Atlas still as easy to use afterward?
- [ ] **Would removing it make the product worse?** If the product is just as good without it, it should not be added.
- [ ] **Does it avoid every anti-goal (§12)?** Does it keep Atlas away from social, bloat, and coach-replacement?

**How to use this filter:** if any answer is "no" or "unclear," stop and reconsider the feature before building it. Passing the filter is a precondition for implementation, not a formality after the fact.

---

## 14. Final Product Statement

**Atlas is the coach's most trusted assistant.**

It watches what a coach cannot always watch, remembers what a coach cannot always remember, and always has an evidence-backed recommendation ready. It turns hours of footage into clear insight, and clear insight into better training.

Atlas exists to make great coaching scale — to let one coach's expertise reach more players, more consistently, without ever losing the coach's judgment at the center.

It is fast, calm, and precise. It shows what matters and hides what doesn't. It explains itself, admits what it doesn't know, and never pretends to be the coach.

Every player it touches should improve. Every coach who uses it should feel more capable, not more managed. Every screen should feel like serious equipment for serious work.

Atlas will stay small in complexity and large in impact. It will grow only by deepening what it does best. It will never become a feed, a dashboard of vanity, or a machine that coaches from the sidelines.

Atlas is where analysis becomes coaching — and where coaches become the best version of themselves for every player they train.

---

_This document is the permanent Product Constitution of Atlas. It changes only by explicit, deliberate amendment — never as a side effect of building a feature._
