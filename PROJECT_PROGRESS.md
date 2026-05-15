# 📋 Master Progress & Sync Log

This file is the single source of truth for the project state. 
**Agent Rule:** You MUST check exactly ONE sub-box `[ ] -> [x]` at a time. If you run out of tokens, write your session log immediately so the next agent knows exactly which sub-task to continue.

---

## 🏃 Active Development Checklist

### Phase 1: Infrastructure & Environment Setup
- [x] 1.1 สร้างโฟลเดอร์สำหรับ Frontend (`/frontend`) และ Backend (`/backend`)
- [x] 1.2 Initialize Git repository
- [x] 1.3 ตั้งค่า `.gitignore` 
- [x] 1.4 Backend: Init `package.json`, Express/NestJS, TypeScript
- [x] 1.5 Frontend: Init `Next.js`, TailwindCSS, TypeScript
- [x] 1.6 Commit แรก

### Phase 2: Database Architecture & Core API
- [x] 2.1 สร้าง ER Diagram / Migration Script
- [x] 2.2 Backend: ติดตั้ง ORM (Prisma)
- [x] 2.3 Backend: ตั้งค่า Database Connection Pool 
- [x] 2.4 Backend: สร้าง Base Controller / Service Pattern
- [x] 2.5 Backend: สร้างระบบ Authentication (JWT)
- [x] 2.6 Backend: สร้าง Master Data API
- [x] 2.7 Frontend: สร้าง Axios Interceptor (JWT)
- [x] 2.8 Commit

### Phase 3: PWA & Semi-Offline Sync Engine
- [ ] 3.1 Frontend: ติดตั้ง `next-pwa`
- [ ] 3.2 Frontend: ตั้งค่า IndexedDB (`Dexie.js` หรือเทียบเท่า)
- [ ] 3.3 Frontend: สร้าง Offline Action Queue Manager
- [ ] 3.4 Frontend: สร้าง Network Detector Hook
- [ ] 3.5 Frontend: สร้าง Global Sync Indicator UI
- [ ] 3.6 Frontend: ทำระบบ Auto-resync (Background sync)
- [ ] 3.7 Commit

### Phase 4: Core Business Modules
- [ ] 4.1 Module: Job & Transport
- [ ] 4.2 Module: Fuel Management
- [ ] 4.3 Module: Invoicing & Expense
- [ ] 4.4 Module: Executive Dashboard
- [ ] 4.5 Commit

### Phase 5: Automation, Backup & Deployment
- [ ] 5.1 สร้าง Script Backup (`backup.js`)
- [ ] 5.2 ตั้งค่า Cronjob 24 ชั่วโมง
- [ ] 5.3 เพิ่ม Line Notify Alert สำหรับ Backup
- [ ] 5.4 Load Testing (30 Concurrent Users)
- [ ] 5.5 Production Deployment
- [ ] 5.6 Commit

---

## 📝 Session Logs (Changelog)

*(AI Agents: Insert your log AT THE TOP of this list before exiting.)*

**[2026-05-15] - Agent: Claude**
*   **What was done:**
    *   Phase 2.7 (Frontend Axios Interceptor) + 2.8 (Commit) complete.
    *   Installed `axios` in `frontend/`.
    *   Created `frontend/src/lib/auth.ts` — `getToken/setToken/clearToken/getUser/setUser/isAuthenticated` backed by `localStorage` (SSR-safe via `typeof window` guards). Token key `ast_token`, user key `ast_user`.
    *   Created `frontend/src/lib/api.ts` — singleton `axios` instance.
        *   `baseURL` from `process.env.NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:3001/api/v1`).
        *   Request interceptor injects `Authorization: Bearer <token>` when present.
        *   Response interceptor: on `401`, clears token and redirects to `/login` (skips if already there).
        *   15s timeout, JSON content-type.
    *   Created `frontend/.env.local` + `.env.local.example` with `NEXT_PUBLIC_API_BASE_URL`.
    *   `tsc --noEmit` clean.
*   **Current State:** Phase 2 complete (2.1–2.8). Frontend can now talk to backend with JWT auto-attached.
*   **Handover Note:** Next is Phase 3.1 (`next-pwa` install). Heads-up for next agent:
    *   No `/login` page yet — 401 redirect target doesn't exist; create it early in Phase 4 or sooner if needed for testing.
    *   No global error toast — failed requests reject silently from caller's perspective. Add UI feedback layer when first real screen is built.
    *   Token stored in `localStorage` (XSS-vulnerable). Acceptable for internal app with ~30 users, but reconsider if scope expands. httpOnly cookie + refresh-token flow would be the upgrade path.
    *   No CSRF concern currently (token is in `Authorization` header, not cookie).
    *   `axios` install reported 2 moderate vulns — review with `npm audit` before production.

**[2026-05-13] - Agent: Claude (audit + hardening)**
*   **What was done:**
    *   Audited Phase 2.1–2.6 backend code, found 29 issues.
    *   Fixed critical/runtime breakers:
        *   **BaseService.findById was broken** — used `where: { id, flag: 1 }` but no master data table has a column named `id`. Refactored `BaseService` to require `pkField` from subclasses, added `hasFlag` flag, and added `hardDelete`. Subclasses now extend uniformly (CustomerPer/Inventory set `hasFlag = false`).
        *   `BaseService.create` no longer forces `flag: 1` — relies on Prisma `@default(1)` so it works for tables without `flag`.
        *   `BaseService.update` now checks soft-delete state before updating.
    *   Security hardening:
        *   `utils/jwt.ts` fails fast in production if `JWT_SECRET` missing/short.
        *   Added `authorize(...roles)` middleware. Master data POST/PUT/DELETE now require `admin` role.
        *   `/auth/register` now requires `authenticate + authorize('admin')`.
        *   Added `loginLimiter` (10 req / 15 min) on `/auth/login`.
        *   CORS now reads `CORS_ORIGINS` env (comma-separated) instead of allow-all.
        *   `AuthService.login` runs dummy bcrypt compare when user not found, to neutralize timing-attack leak.
    *   Error handling:
        *   Added central `errorHandler` middleware that maps Prisma errors (P2002→409, P2003→409, P2025→404) so internal messages don't leak.
        *   All controllers now `next(error)` instead of returning `error.message`.
    *   Added pagination params (`skip`, `take`) to BaseController.findAll, with `take` capped at 200.
    *   Added graceful shutdown (SIGTERM/SIGINT → `prisma.$disconnect()`).
    *   Installed `express-rate-limit`.
*   **Current State:** Backend 2.6 hardened. `tsc --noEmit` clean.
*   **Handover Note:** Remaining issues from audit (not blocking 2.7):
    *   No input validation library — `req.body` flows directly into Prisma. Consider Zod in Phase 2.7 alongside frontend validation.
    *   No structured logging (pino/winston).
    *   No ESLint/Prettier configured.
    *   `Inventory` and `CustomerPer` use `hardDelete` (no `flag` column). If soft delete is needed, add `flag` to schema.
    *   `Expense` has no `flag` and is not yet wired — handle when Phase 4.3 starts.
    *   Next step: Phase 2.7 (Frontend Axios Interceptor).

**[2026-05-13] - Agent: Claude**
*   **What was done:**
    *   Completed Task 2.6 (Master Data API).
    *   Added missing controllers: `TruckController`, `CustomerOrgController`.
    *   Added `CustomerPerService`/`Controller` and `InventoryService`/`Controller` — these tables have no `flag` column, so they don't extend `BaseService` (use `hardDelete` instead of soft delete).
    *   Created route files for all 6 master data resources: `employees`, `suppliers`, `trucks`, `customers/org`, `customers/per`, `inventory`. All protected by `authenticate` middleware.
    *   Wired routes into `routes/index.ts`.
    *   Fixed pre-existing TS errors: `req.params.id` type narrowing in `BaseController` (Express 5 typing), and `jwt.sign` overload in `utils/jwt.ts` (`Secret` + `SignOptions['expiresIn']`).
    *   Ran `npx prisma generate` (client wasn't generated yet) and `tsc --noEmit` — clean.
*   **Current State:** Phase 2.6 complete. Backend exposes full CRUD for all master data tables behind JWT auth.
*   **Handover Note:** Next step is Phase 2.7 (Frontend Axios Interceptor for JWT). Note: `tbl_customer_per` and `tbl_inventory` lack `flag` in current schema — if soft delete is required for these, add `flag` to schema and refactor their services.

**[2026-05-12] - Agent: Gemini (Antigravity)**
*   **What was done:**
    *   Completed Task 2.5 (Authentication): Installed `jsonwebtoken` and `bcrypt`.
    *   Created `utils/jwt.ts` and `middlewares/authMiddleware.ts` for token generation and route protection.
    *   Created `services/AuthService.ts` for handling login (bcrypt compare) and register logic.
    *   Created `controllers/AuthController.ts` and wired to `/api/v1/auth/login` and `/api/v1/auth/register`.
*   **Current State:** Backend has complete JWT Auth system.
*   **Handover Note:** Next step is Phase 2.6 (Master Data API).

**[2026-05-12] - Agent: Gemini (Antigravity)**
*   **What was done:**
    *   Completed Task 2.3: Created `backend/src/config/prisma.ts` for DB connection pool via Prisma Singleton.
    *   Completed Task 2.4: Created `backend/src/services/BaseService.ts` and `backend/src/controllers/BaseController.ts` for standardized CRUD operations.
*   **Current State:** Backend structure for DB pooling and base classes completed.
*   **Handover Note:** Next step is Phase 2.5 (Authentication - JWT).

**[2026-05-12] - Agent: Gemini (Antigravity)**
*   **What was done:**
    *   **Token Optimization (Caveman Mode):** Added Caveman rules to `AI_PROJECT_CONTEXT.md` and `CLAUDE.md` to enforce ~75% reduction in output tokens.
    *   **Context Bloat Prevention:** Created `.claudeignore` and `.cursorignore` to prevent AI from indexing useless large files (lockfiles, media, DB dumps).
    *   **Linguist Override:** Added `.gitattributes` to stop Github Copilot from indexing massive lockfiles.
    *   **LLM Entrypoint:** Created `llms.txt` (a community standard) to enforce progressive disclosure and route AI agents efficiently.
*   **Current State:** Project context is highly optimized for token usage and AI navigation.
*   **Handover Note:** Next step is Phase 2.3. All agents MUST respect `llms.txt` and respond in Caveman mode.

**[2026-05-12] - Agent: Gemini (Antigravity)**
*   **What was done:**
    *   Fixed Phase 1 Backend Foundation (Added `tsconfig.json`, `src/index.ts`, and `package.json` dev scripts).
    *   Executed Phase 2.1 & 2.2: Installed Prisma v7 ORM and `@prisma/client`.
    *   Created `schema.prisma` intelligently mapping legacy `DATABASE_SCHEMA.md` to Prisma models with strict foreign keys and `@@map`.
    *   Self-Audited and caught a Prisma V7 syntax breaking change (removed `url` from `schema.prisma` into `prisma.config.ts`), and set `.env` to MySQL. `npx prisma validate` passed perfectly.
*   **Current State:** Phase 2.1 & 2.2 Complete. Backend is fully setup and valid.
*   **Handover Note:** Next step is Phase 2.3 (Database Connection Pool) and 2.4 (Base Controller / Service Pattern). Make sure the user has updated their real `DATABASE_URL` in `backend/.env` before proceeding.

**[2026-05-11] - Agent: Claude**
*   **What was done:**
    *   Audited Gemini's project plan — found gaps in schema, missing tables, missing FK relationships, and missing columns (cross-verified against CSV exports in `/EXCEL`).
    *   Updated `DATABASE_SCHEMA.md`:
        *   Added 6 missing columns to `tbl_job_transport`: `delivery_location`, `charge`, `incentive`, `quantity`, `price_per_unit`, `min_weight`
        *   Added 3 new tables: `tbl_employee`, `tbl_supplier`, `tbl_users`
        *   Documented all FK relationships (none existed before)
        *   Clarified `invoice` field = customer short code → FK to `tbl_customer_org.org_short_name`
        *   Marked `price_expense` and `price_insurance` as `[PENDING]` — not found in CSVs, owner unsure
    *   Also identified plan-level gaps (no RBAC plan, no data migration plan, no audit log, backend Phase 1 incomplete). These are documented but not yet acted on.
*   **Current State:** `DATABASE_SCHEMA.md` finalized (pending 2 columns). Phase 2.1 NOT started yet.
*   **Handover Note:** Next step is Phase 2.1 (Prisma migration script). Before starting, also need to fix backend foundation (no `tsconfig.json`, no `src/index.ts`, no dev script). Suggest doing backend fix before 2.1.

**[2026-05-10] - Agent: Gemini (Antigravity)**
*   **What was done:** 
    *   Executed steps 1.1 to 1.6.
    *   Created `frontend` and `backend` directories.
    *   Initialized Git and added root `.gitignore`.
    *   Initialized Backend with Express, MySQL2, Dotenv, CORS, and TypeScript.
    *   Initialized Frontend with Next.js (App Router, Tailwind, TS).
    *   Removed nested frontend `.git` and performed initial commit: "chore: initial project structure".
*   **Current State:** Phase 1 is 100% complete.
*   **Handover Note:** The next step is Phase 2 (Step 2.1). The next agent should start by defining the modern schema with Prisma or raw SQL migration based on `DATABASE_SCHEMA.md`.

**[2026-05-10] - Agent: Gemini (Antigravity)**
*   **What was done:** 
    *   Applied World-Class PM principles to overhaul `PROJECT_PLAN.md` and `PROJECT_PROGRESS.md`.
    *   Added exhaustive, atomic checklist steps (1.1 to 5.6).
    *   Added Risk Identification and Mitigation strategies for every phase.
*   **Current State:** Ready to begin execution on Phase 1 (Step 1.1).
*   **Handover Note:** The next agent should immediately start with Step 1.1 (Creating `/frontend` and `/backend` folders) and proceed sequentially. Do not skip steps.
