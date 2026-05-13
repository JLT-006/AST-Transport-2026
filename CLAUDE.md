# CLAUDE.md — AST Transport Management System (VERSION_2026)

Claude Code อ่านไฟล์นี้อัตโนมัติ ทุก session ต้องทำตาม checklist นี้ก่อนเริ่มงาน

---

## ⚡ Agent Initialization (ทำทุกครั้งก่อนเริ่ม)

1. อ่าน `PROJECT_PROGRESS.md` — ดูว่าหยุดที่ task ไหน
2. อ่าน `AI_PROJECT_CONTEXT.md` — rules และ cross-agent protocol
3. อ่าน `DATABASE_SCHEMA.md` — schema ล่าสุด (อัปเดตแล้ว ใช้อันนี้เป็น source of truth)
4. Pull ล่าสุดก่อนเสมอ: `git pull origin master`
5. แจ้ง user ว่ากำลังอยู่ที่ task ไหน และขอ confirm ก่อนเริ่ม

---

## 📌 Project Summary

| | |
|---|---|
| **ระบบ** | AST Transportation Management System |
| **เป้าหมาย** | Rebuild VB desktop app → Modern Web App |
| **GitHub** | https://github.com/JLT-006/AST-Transport-2026.git |
| **Branch** | `master` |
| **Frontend** | `./frontend` — Next.js (App Router) + TailwindCSS + TypeScript |
| **Backend** | `./backend` — Express + mysql2 + TypeScript |
| **Database** | MySQL (online server) |
| **Users** | ~30 concurrent |

---

## 📋 Current Phase Status

ดูรายละเอียดที่ `PROJECT_PROGRESS.md` — ข้อมูลสดกว่าเสมอ

**Phase 1:** ✅ Done  
**Phase 2:** ⏳ Not started (next task: 2.1 — Prisma migration script)  
**Phase 3–5:** ⏳ Not started  

> ⚠️ Backend foundation ยังไม่สมบูรณ์: ไม่มี `tsconfig.json`, ไม่มี `src/index.ts`, ไม่มี dev script — ต้อง fix ก่อน Phase 2.1

---

## 🔧 Development Rules

- **ภาษา:** Code/variables = English, UI/user-facing text = Thai
- **Directory:** เขียนโค้ดใน `VERSION_2026/` เท่านั้น
- **ก่อนจบ session:** อัปเดต `PROJECT_PROGRESS.md` ทุกครั้ง แล้ว push
- **Commit แล้ว push:** `git push origin master` ทุกครั้งที่เสร็จ task
- **Token Efficiency (Caveman Mode):** ตอบกลับแบบ "caveman" เสมอ (สั้น, ตรงประเด็น, ตัดคำฟุ่มเฟือย) เพื่อประหยัด Token ขาออกสูงสุด

---

## 🗄️ Database Quick Reference

Schema เต็มอยู่ใน `DATABASE_SCHEMA.md` — ตารางหลัก:

| Table | ใช้สำหรับ |
|---|---|
| `tbl_job_transport` | เที่ยววิ่งรถ (main table) |
| `tbl_invoice` | ใบแจ้งหนี้ |
| `tbl_expense` | ค่าใช้จ่าย |
| `tbl_fuel` / `tbl_fuel_import` | น้ำมัน |
| `tbl_truck` | ข้อมูลรถ |
| `tbl_customer_org` | ลูกค้า (org) |
| `tbl_employee` | พนักงาน/คนขับ *(new)* |
| `tbl_supplier` | ซัพพลายเออร์ *(new)* |
| `tbl_users` | Login/Auth *(new)* |

- `flag = 1` = Active (soft delete ทุกตาราง)
- Normalize column names เป็น `snake_case` เมื่อสร้าง Prisma schema

---

## 🤝 Cross-Agent Protocol

โปรเจกต์นี้ใช้ทั้ง **Claude** (เครื่องนี้) และ **Gemini** (เครื่องอื่น)  
State ทั้งหมด sync ผ่าน Git — ห้าม assume ว่ารู้ context จาก session ก่อน

```
git pull origin master   # ก่อนเริ่มงานทุกครั้ง
git push origin master   # หลังเสร็จงานทุกครั้ง
```
