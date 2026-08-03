# Atlas Development Rules

> **Status:** Constitution — single source of truth for how Atlas is built.
> **Audience:** Human contributors and AI coding assistants (Claude, Cursor, ChatGPT).
> **Rule of precedence:** When any instruction, prompt, or habit conflicts with this document, this document wins until it is explicitly amended.

This is the development constitution of the Atlas project. It defines how we build, how AI assistants must behave, what "done" means, and what must never happen without explicit approval. Read it before writing code. Follow it while writing code. Return to it during review.

---

## 1. Project Philosophy

Atlas is a professional, business-facing AI platform. The codebase is expected to live and grow for years, so how we build matters as much as what we build.

- **Built incrementally.** Atlas grows one deliberate step at a time. We ship small, verified increments rather than large speculative rewrites. Progress is a sequence of complete, reviewed pieces.
- **Simplicity over premature abstraction.** Write the simplest code that solves the current, real problem. Do not add layers, generics, config options, or "flexibility" for requirements that do not yet exist. Abstraction is earned by repetition and proven need, not anticipated.
- **Long-term maintainability.** Optimize for the next person to read the code — including your future self and the next AI assistant. Clarity, consistency, and predictability outrank cleverness and micro-optimization.
- **Feature First architecture.** Code is organized by feature, not by technical type. A feature owns its components, hooks, services, types, constants, and errors, and exposes a clean public surface.

**Feature First in practice** — the `auth` feature is the reference implementation:

```
src/features/auth/
  AuthContext.tsx          # context definition
  AuthProvider.tsx         # provider + session wiring
  auth.service.ts          # Supabase calls (thin wrappers)
  auth.constants.ts        # route + config constants
  auth.types.ts            # shared types
  auth.errors.ts           # error → friendly message mapping
  useAuth.ts               # context consumer hook
  hooks/                   # feature hooks (useLogin, useRegister)
  components/              # feature UI (LoginForm, ProtectedRoute, ...)
  index.ts                 # public barrel — the feature's API
```

New features follow this same shape. Cross-feature usage goes through the feature's `index.ts` barrel, not through deep internal paths.

---

## 2. Development Rules

These rules are non-negotiable defaults. They keep changes safe, scoped, and reviewable.

- **Never modify architecture without explicit approval.** Folder layout, the Feature First model, data flow, and technology choices are fixed unless a human explicitly approves a change.
- **Never refactor outside the scope of the requested task.** If the task is "add a login form," do not also rename variables in unrelated files or restructure a working component.
- **Never touch unrelated files.** A change should modify only the files required by the task. Incidental edits to files outside the task's scope are not allowed.
- **One feature per sprint.** Each sprint delivers a single, coherent feature or improvement. Do not bundle unrelated work.
- **Every sprint ends with a review.** No sprint is complete without a self review followed by a human review (see §5).
- **Small commits.** Commit in small, logically complete units. Avoid large "everything at once" commits.
- **Clear commit messages.** State what changed and why, not just "fix" or "update" (see §6).
- **Readability over clever code.** If a reviewer has to pause to decode a line, rewrite it plainly.

**Scope discipline example:**

> **Task:** "Add friendly error messages to the login form."
>
> ✅ Allowed: edit the login form and the shared error-message helper it uses.
> ❌ Not allowed: also rename the register hook, reorganize the components folder, or upgrade a dependency "while you're in there."

---

## 3. AI Assistant Rules

AI assistants are contributors and are held to the same standard as human contributors — with extra emphasis on restraint, because AI can generate large changes quickly.

- **Read existing code before implementing.** Inspect the affected files and the surrounding feature first. Understand the current patterns before adding to them.
- **Reuse existing patterns.** Match the naming, structure, styling, and error-handling conventions already present. New code should look like it was written by the same hand as the code around it.
- **Avoid duplicate logic unless abstraction is clearly justified.** Prefer reusing an existing helper, hook, or service. Do not copy-paste logic; do not invent an abstraction until duplication is real and proven.
- **Never rewrite working code without reason.** If code works and is in scope, leave its structure alone unless the task requires the change. State the reason when a rewrite is genuinely necessary.
- **Explain major design decisions.** When a choice has architectural or trade-off implications, briefly explain the plan and the reasoning before or alongside implementation.
- **Keep responses concise when implementing.** Deliver the change and a short, factual summary. Do not pad with restated requirements, exhaustive option surveys, or narration of work not done.
- **Respect the boundaries in §8.** When a task appears to require a forbidden action, stop and ask instead of proceeding.

**Good AI behavior example:**

> "I read `RegisterForm.tsx` and `LoginForm.tsx`. Login already uses `getAuthErrorMessage(error)`; Register still renders raw `error.message`. I'll make Register use the same helper so both forms behave identically. One helper, no new abstraction."

---

## 4. Code Quality

Quality is measured against these dimensions. They apply to every change.

- **Accessibility.** UI must be usable with assistive technology. Use semantic elements and labels; associate inputs with `<label htmlFor>`; expose state with `aria-*` (e.g. `aria-invalid`, `aria-busy`, `role="alert"`, `role="status"` + `aria-live="polite"` for transient status). Mobile-first, responsive layouts.
- **Type safety.** Strong, explicit TypeScript. No `any` as an escape hatch. Model real shapes with interfaces and types; let the compiler enforce contracts across the feature.
- **Error handling.** Handle failures deliberately. Surface user-facing errors through the feature's error mapping (e.g. `getAuthErrorMessage`) rather than raw provider strings. Never silently swallow an error that the user or caller needs to know about.
- **Consistent naming.** Follow existing conventions: components `PascalCase`, hooks `useCamelCase`, constants `UPPER_SNAKE_CASE`, files aligned with the pattern already used in the feature. Names describe intent.
- **Component size.** Keep components focused. A component that handles UI should delegate business logic to a hook or service. If a component grows unwieldy, that is a signal to extract logic — not to add complexity inline.
- **Folder organization.** Respect Feature First. Feature code lives under `src/features/<feature>`. Shared, generic building blocks live in shared locations (`components/ui`, `lib`). Do not scatter feature logic across the tree.
- **Reusability.** Prefer reusing existing components, hooks, and utilities. Build for reuse only when reuse is real — a shared primitive should serve genuine, existing consumers.

**Separation-of-concerns example:** a form component renders and validates input; a hook (`useLogin`) owns the async call and loading/error state; a service (`auth.service`) wraps the external provider. UI stays declarative; logic stays testable.

---

## 5. Sprint Workflow

Every sprint follows the same cycle. No steps are skipped.

```
Planning
   ↓
Implementation
   ↓
Self review
   ↓
Human review
   ↓
Fixes
   ↓
Commit
   ↓
Next sprint
```

- **Planning.** Clarify the requirements and scope. Identify affected files. State the approach and any design decisions before writing code.
- **Implementation.** Build the single feature for the sprint, following §2–§4. Stay strictly within scope.
- **Self review.** Re-read the changed files. Verify internal consistency, naming, types, accessibility, and error handling. Confirm nothing out of scope was touched.
- **Human review.** A human reviews the change against the requirements and this document. Feedback is expected and normal.
- **Fixes.** Apply review feedback precisely — only what was raised, nothing more.
- **Commit.** Commit the completed, reviewed work in small, clear units (see §6). Only commit when the Definition of Done (§7) is met.
- **Next sprint.** Start the next single feature with a clean baseline.

---

## 6. Git Rules

Version history is part of the product. Keep it clean and honest.

- **Small commits.** Each commit is a small, logically complete change.
- **One purpose per commit.** Do not mix unrelated changes. A commit answers one question: "what one thing did this do?"
- **Clear commit messages.** Explain what changed and why. Imperative mood, specific subject.
- **Never commit broken code.** The main branch must always build and run. Do not commit code that is known to be broken, half-finished, or failing.

**Commit message examples:**

```
✅ Add friendly error messages to RegisterForm via getAuthErrorMessage
✅ Propagate sign-out errors so LogoutButton only redirects on success
✅ Add role="status" and aria-live to route-guard loading UI

❌ fix
❌ updates
❌ wip stuff + refactor + misc
```

---

## 7. Definition of Done

A sprint is finished **only** when every item below is true:

- [ ] **Requirements completed.** Everything the sprint asked for is implemented — no partial features presented as complete.
- [ ] **No known blocking bugs.** There are no known defects that break the feature or the app.
- [ ] **Code reviewed.** Self review and human review are both done, and feedback is resolved.
- [ ] **Documentation updated if necessary.** If the change affects behavior, structure, or conventions, the relevant docs are updated in the same sprint.
- [ ] **Ready for the next sprint.** The branch builds, runs, and leaves a clean baseline to build on.

If any box is unchecked, the sprint is not done — regardless of how much code was written.

---

## 8. Things AI Must Never Do

These are hard stops. If a task seems to require any of these, **stop and ask for explicit approval** instead of proceeding.

- **Invent requirements.** Do not add features, fields, options, or behavior that were not requested. Build what was asked — no more.
- **Change architecture without approval.** Do not alter the Feature First structure, data flow, or foundational patterns on your own initiative.
- **Add dependencies without justification.** Do not introduce new packages unless clearly justified and approved. Prefer the existing stack and standard library.
- **Rename files without approval.** File and folder names are part of the project's contract and history. Do not rename or move them unprompted.
- **Refactor unrelated code.** Do not "improve" code outside the task's scope, however tempting.
- **Ignore project conventions.** Do not introduce a different style, pattern, or structure than the surrounding code already uses.

**When in doubt:** narrow the scope, state the concern, and ask. A short question is always cheaper than an unwanted change.

---

_This document is the single source of truth for Atlas development. It changes only by explicit, deliberate amendment — never as a side effect of another task._
