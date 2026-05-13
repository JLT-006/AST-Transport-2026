# AI PROJECT CONTEXT: AST TRANSPORTATION MANAGEMENT SYSTEM (VERSION 2026)

This document provides context and guidelines for any AI agent (Gemini, Claude, etc.) or developer working on the `VERSION_2026` of the AST Transportation Management System. Please read this thoroughly before generating any code.

## 1. [PROJECT_OBJECTIVE]
Rebuild and modernize a legacy VB/Desktop application into a **Modern Web Application**. 
The system operates online (company web server) and requires daily local backups. This project uses a **Cross-Agent Workflow** via GitHub, meaning different AI agents on different machines will collaborate on this codebase. 

## 2. [CORE_ARCHITECTURE]
*   **Frontend:** React / Next.js (TailwindCSS for styling)
*   **Backend:** Node.js (or similar modern API framework)
*   **Database:** MySQL (Hosted online on the company web server)
*   **Data Safety:** A local script will download/pull backup dumps from the online DB every 24 hours.
*   **GitHub Repository:** https://github.com/JLT-006/AST-Transport-2026.git
    *   Remote name: `origin`, branch: `master`
    *   Sync command: `git pull origin master` (ก่อนเริ่มงานทุกครั้ง), `git push origin master` (หลังเสร็จ)

## 3. [FILE_REFERENCES]
Whenever you start a session, you MUST read the following files:
1.  `DATABASE_SCHEMA.md` - Legacy database table structures.
2.  `PROJECT_PLAN.md` - The architectural roadmap and development phases.
3.  `PROJECT_PROGRESS.md` - The checklist of what has been done and what needs to be done next.

## 4. [DEVELOPMENT_RULES & CROSS-AGENT PROTOCOL]
1.  **Isolation:** All code for the new version MUST be written strictly within the `d:\AST_Program\VERSION_2026` directory (or the respective Git repository root).
2.  **State Synchronization:** Because this project is developed across multiple machines (Office and Home) using different AI Agents (Claude and Gemini), you MUST rely ONLY on the codebase files to understand the state.
3.  **Mandatory Logging:** **CRITICAL!** Before you finish your turn or session, you MUST update `PROJECT_PROGRESS.md`. Check off completed tasks and write a brief summary of what you implemented in the "Session Logs" section. This ensures the next AI agent knows exactly where to pick up.
4.  **Language:** Code structure and variables should be in English, but User Interfaces (UI) and user-facing text should support Thai as it is targeting local usage.
5.  **Token Efficiency (Caveman Mode):** All AI agents MUST respond using "caveman" style. Drop filler words, pleasantries, and articles. Keep technical substance exact. Use short, terse sentences (e.g., "Fix bug. Update DB. Done.").

---
**Agent Initialization Checklist (Do this every time you load into the project):**
- [ ] Read `PROJECT_PLAN.md` and `PROJECT_PROGRESS.md`.
- [ ] Identify the current active Phase and the next pending task.
- [ ] Ask the User for permission to begin the next task on the checklist.
