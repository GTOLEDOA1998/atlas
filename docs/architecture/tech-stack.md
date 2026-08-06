# Atlas Tech Stack

> **Status:** Architectural — the technology choices Atlas is built on, and why.
> **Owns:** which technologies are used at each layer, the reasoning behind each choice, and the current implementation status of each.
> **Inherits:** [`development-rules.md`](../constitution/development-rules.md) — technology choices are fixed unless explicitly approved.
> **Does not own:** how features are structured (`development-rules.md` §1, Feature First) · what is persisted ([`data-model.md`](data-model.md)) · domain structure ([`product-architecture.md`](product-architecture.md)).
> **Amendment:** explicit Product Owner approval. Adding or removing a technology is an architectural decision, not an implementation detail.
> **Note:** this document supersedes an earlier duplicate that described the UI layer as built on Radix and the authentication layer as lacking server-side validation. Both were stale.

---

# Frontend

Atlas Table Tennis AI is built on **Next.js** with **TypeScript**, styled with **Tailwind CSS**, and composed using **shadcn/ui**.

**Next.js** provides the application framework for Atlas Table Tennis AI. It supports server-side rendering, static generation, and API routes within a single codebase, which keeps the product fast, SEO-friendly where needed, and straightforward to deploy. For a platform that combines dashboards, coaching interfaces, and AI-driven interactions, Next.js offers the routing, data-fetching patterns, and performance optimizations required without splitting the project across multiple frontend and backend repositories.

**TypeScript** enforces type safety across the entire frontend and shared interfaces. Atlas Table Tennis AI handles structured data—player profiles, session history, coaching plans, and AI-generated insights—where correctness matters. TypeScript reduces runtime errors, improves maintainability as the product grows, and makes collaboration between contributors more reliable.

**Tailwind CSS** enables a consistent, responsive design system with utility-first styling. This approach keeps the UI cohesive across coaching views, analytics screens, and administrative panels while allowing rapid iteration. Tailwind pairs well with component-based architecture and avoids the overhead of maintaining large custom stylesheets.

**shadcn/ui** supplies accessible, composable UI components, built in this project on **Base UI** primitives (`@base-ui/react`). Rather than importing a rigid component library, shadcn/ui gives Atlas Table Tennis AI full ownership of its UI code—components live in the project and can be customized to match the product's professional identity. This balance of speed and control is ideal for a business-facing platform that must feel polished without sacrificing flexibility.

Together, these choices produce a modern, maintainable frontend that supports both interactive AI experiences and data-rich operational views.

# Backend

The backend for Atlas Table Tennis AI is primarily powered by **Next.js** server capabilities and **Supabase**.

**Next.js** API routes and server actions handle application logic that should not run in the browser: validating requests, orchestrating AI calls, enforcing authorization, and coordinating data access. Keeping this logic within the Next.js application reduces architectural complexity and aligns frontend and backend contracts through shared TypeScript types.

**Supabase** serves as the backend platform for data access, real-time features, authentication integration, and server-side utilities such as row-level security and storage. Supabase provides a managed layer over **PostgreSQL**, exposing a secure API that Atlas Table Tennis AI can call from both server and client contexts where appropriate. This eliminates the need to build and maintain custom backend infrastructure for common platform concerns.

This combination keeps the backend lean: Next.js handles product-specific orchestration, while Supabase handles persistence, auth, and platform services. The result is faster development, fewer moving parts, and a clear separation between application logic and infrastructure.

# Database

**PostgreSQL**, managed through **Supabase**, is the primary database for Atlas Table Tennis AI.

PostgreSQL was selected because Atlas Table Tennis AI requires a reliable relational data model. The platform stores interconnected entities—users, organizations, players, training sessions, performance metrics, coaching content, and AI interaction history—that benefit from structured schemas, foreign keys, and transactional integrity. PostgreSQL handles complex queries, aggregations, and reporting needs that arise in coaching and business analytics use cases.

Supabase adds operational value on top of PostgreSQL: managed hosting, automatic backups, connection pooling, and integrated APIs. Row-level security policies allow Atlas Table Tennis AI to enforce multi-tenant access at the database layer, ensuring that each business or user only accesses data they are authorized to see.

PostgreSQL's maturity, extensibility, and compatibility with Supabase make it the right foundation for a platform that must scale in data volume and organizational complexity over time.

# Authentication

Authentication for Atlas Table Tennis AI is handled by **Supabase Auth**, integrated with the **Next.js** application.

Supabase Auth provides email and password login, magic links, OAuth providers, and session management without requiring a custom authentication system. For a business platform, this reduces security risk and development overhead while supporting standard enterprise login expectations.

**Current implementation status:** sessions are held in **cookies** via `@supabase/ssr`, and are validated **server-side** in `src/proxy.ts` before any protected route renders. The proxy refreshes tokens and rewrites the rotated cookies onto the response; it calls `getUser()`, which revalidates the token against Supabase, never `getSession()`, whose payload comes straight from the cookie and can be forged. Client-side route guards remain as a second layer that also covers sessions expiring mid-navigation. Password recovery and the PKCE email callback are implemented. *(Delivered in Sprint 1; see [`work/roadmap.md`](../work/roadmap.md).)*

Following the Next.js 16 rename, the server-side entry point is `proxy.ts`, not `middleware.ts`.

**PostgreSQL** row-level security works in conjunction with Supabase Auth so that access control is enforced consistently—from the application layer down to the database. Because UI-level checks are convenience rather than security, row-level security remains the authoritative enforcement boundary.

This approach gives Atlas Table Tennis AI production-ready authentication with minimal custom infrastructure, allowing the team to focus on product features rather than identity management.

# AI Layer

The AI capabilities of Atlas Table Tennis AI are powered by **OpenAI**, orchestrated through **Next.js** server-side logic.

OpenAI provides the language and reasoning models that drive Atlas Table Tennis AI's coaching intelligence: analyzing player context, generating personalized guidance, summarizing session performance, supporting operational workflows, and responding within defined business roles. OpenAI was selected for its model quality, reliability, and mature API—essential for a product where AI output directly influences user decisions and business outcomes.

All AI requests are processed on the server, not in the browser. This protects API credentials, allows request validation and logging, and ensures that prompts include only authorized context. The AI layer is treated as a service within the platform architecture—not as a standalone chatbot—so responses are tied to structured workflows, player data, and business rules.

Atlas Table Tennis AI applies prompt design, context assembly, and output validation as part of its server orchestration layer. This keeps AI behavior accountable, consistent with the platform's philosophy of AI as a capable employee rather than an open-ended conversational tool.

# Deployment

Atlas Table Tennis AI is deployed on **Vercel**, with source control and collaboration managed through **GitHub**.

**Vercel** is the natural deployment platform for Next.js applications. It provides optimized builds, global edge delivery, preview deployments for every pull request, environment variable management, and seamless integration with the Next.js runtime. For a product that must remain fast, available, and easy to iterate on, Vercel reduces operational burden while supporting production-grade performance.

**GitHub** serves as the single source of truth for code, documentation, and change history. Pull requests, code review, and branch-based workflows ensure that updates to Atlas Table Tennis AI are traceable and deliberate. GitHub integrates directly with Vercel to trigger automatic deployments on merge, creating a reliable pipeline from development to production.

**Supabase** hosts the database, authentication, and related backend services independently of Vercel, which keeps concerns separated: Vercel runs the application; Supabase runs persistent platform services. Environment-specific configuration connects the two securely in development, staging, and production.

This deployment model supports rapid iteration without sacrificing stability—critical for an AI product that will evolve frequently as models, features, and customer needs change.

# Project Structure

Atlas Table Tennis AI follows a monorepo-style layout within a single Next.js application, organized by responsibility rather than by technology alone.

The **application layer** contains routes, pages, and layouts that define user-facing experiences—coaching dashboards, player management, session tracking, and administrative views.

The **components layer** houses reusable UI built with shadcn/ui and Tailwind CSS, divided into shared primitives and feature-specific compositions.

The **server layer** contains API routes, server actions, and service modules responsible for business logic, AI orchestration, and Supabase interactions. Keeping server-only code isolated prevents accidental exposure of secrets or unauthorized data access.

The **lib layer** includes shared utilities, type definitions, Supabase client configuration, and helpers used across the application.

The **docs layer** (within the broader Atlas repository) holds vision, architecture, product, and business documentation separate from application code—ensuring that product decisions and technical decisions remain documented and accessible.

This structure supports clarity as the team grows: contributors can locate frontend, backend, and AI concerns quickly without navigating a fragmented codebase. It also aligns with the Atlas platform principle of professional organization—code and documentation evolve together.

# Design Principles

The technical architecture of Atlas Table Tennis AI is guided by principles that support long-term product quality and business trust.

**Simplicity over sprawl.** The stack is intentionally small. Each technology has a clear role. Avoiding unnecessary services reduces cost, failure points, and cognitive load for the team.

**Type safety end to end.** TypeScript spans the frontend, server logic, and shared data contracts. Strong typing is a form of documentation and a guardrail against regressions.

**Security by default.** Authentication, authorization, and AI requests are handled server-side. Database access is protected through Supabase row-level security. Secrets never reach the client.

**AI as infrastructure, not interface.** The AI layer supports defined product workflows—coaching, analysis, operations—not unstructured chat. Architecture decisions reinforce accountability and context-aware behavior.

**Separation of concerns.** Vercel runs the app. Supabase manages data and auth. OpenAI provides intelligence. GitHub manages change. Each system does what it does best.

**Documentation-driven development.** Architecture, vision, and product decisions live in the repository alongside code. This keeps Atlas Table Tennis AI aligned with the broader Atlas platform mission as both evolve.

**Deploy early, iterate often.** Preview deployments and a managed stack allow the team to validate features quickly, gather feedback, and improve without heavy release overhead.

These principles ensure that Atlas Table Tennis AI is built not only to launch, but to grow—as a dependable, professional coaching intelligence platform for the coaches, clubs, and players it serves.
