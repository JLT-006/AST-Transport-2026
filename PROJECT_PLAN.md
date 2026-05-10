# 👑 Master Project Roadmap: AST Transport Management System (Web App)

> **"A world-class project manager doesn't just plan for success; they plan to mitigate every possible failure."**
> เอกสารนี้คือแผนที่นำทางระดับ Masterpiece สำหรับ AI Agent ทุกตัว เพื่อให้การส่งไม้ต่อเป็นไปอย่างสมบูรณ์แบบ ไร้รอยต่อ แม้จะต้องหยุดชะงักกลางคัน

## 📌 1. Project PM Guidelines (กฎการทำงานสำหรับ AI Agent)
1. **Micro-Stepping:** ทำงานทีละขั้นตอนเล็กๆ เช็คโค้ดให้มั่นใจก่อนติ๊กถูกใน `PROJECT_PROGRESS.md` อย่าข้ามขั้นตอน
2. **State Recovery:** หากเริ่ม Session ใหม่ ให้ดูที่ `PROJECT_PROGRESS.md` ทันทีว่าหยุดที่ไหน
3. **Risk First:** ก่อนเริ่มโค้ดในแต่ละ Phase ให้อ่านความเสี่ยง (Risks) และใช้วิธีป้องกัน (Mitigation) ตามที่ระบุไว้

---

## 🚀 Phase 1: Infrastructure & Environment Setup
**เป้าหมาย:** สร้างโครงสร้างโปรเจกต์พื้นฐานที่แข็งแกร่ง รองรับการสเกล

*   **สิ่งที่ต้องการ:** Node.js environment, Git Repo, Next.js Boilerplate, TailwindCSS, โครงสร้าง Folder ที่จัดระเบียบแบบ Feature-based
*   **⚠️ ความเสี่ยง (Risks):** Dependency conflicts (เวอร์ชันชนกัน), ลืมตั้งค่า `.gitignore` ทำให้ไฟล์ขยะขึ้น Github
*   **🛡️ การจัดการความเสี่ยง (Mitigation):** ล็อคเวอร์ชันของ npm packages (ใช้ `package-lock.json`), สร้าง `.gitignore` ก่อน commit แรกเสมอ

### Checklist:
- [ ] 1.1 สร้างโฟลเดอร์สำหรับ Frontend (`/frontend`) และ Backend (`/backend`)
- [ ] 1.2 Initialize Git repository ในโฟลเดอร์ `VERSION_2026`
- [ ] 1.3 ตั้งค่า `.gitignore` (node_modules, .env, build files)
- [ ] 1.4 Backend: Init `package.json` และติดตั้ง Express/NestJS พร้อม TypeScript
- [ ] 1.5 Frontend: รัน `npx create-next-app` พร้อมตั้งค่า TailwindCSS และ TypeScript
- [ ] 1.6 Commit แรก: "chore: initial project structure"

---

## 💾 Phase 2: Database Architecture & Core API (Concurrency Focus)
**เป้าหมาย:** สร้างฐานข้อมูล MySQL และ API ที่รองรับคน 30 คนพร้อมกันโดยระบบไม่ล่ม

*   **สิ่งที่ต้องการ:** Database Schema Script, ORM (เช่น Prisma หรือ TypeORM), Connection Pool, JWT Auth
*   **⚠️ ความเสี่ยง (Risks):** Data Collision (ข้อมูลเซฟทับกัน), Connection หลุดเมื่อคนใช้เยอะ
*   **🛡️ การจัดการความเสี่ยง (Mitigation):** ตั้งค่า Database Connection Pool Max = 50, ทุกการบันทึกข้อมูลต้องใช้ `Transaction (BEGIN...COMMIT)`, ใช้ Optimistic Locking

### Checklist:
- [ ] 2.1 ออกแบบ ER Diagram / สร้าง Migration Script จาก `DATABASE_SCHEMA.md`
- [ ] 2.2 Backend: ติดตั้ง ORM (เช่น Prisma) และสร้าง Model
- [ ] 2.3 Backend: ตั้งค่า Database Connection Pool 
- [ ] 2.4 Backend: สร้าง Base Controller / Service Pattern
- [ ] 2.5 Backend: สร้างระบบ Authentication (Login/JWT)
- [ ] 2.6 Backend: สร้าง Master Data API (รถบรรทุก, พนักงาน, ลูกค้า)
- [ ] 2.7 Frontend: สร้างระบบ Axios Interceptor เพื่อแนบ JWT Token
- [ ] 2.8 Commit: "feat: database layer and core auth API"

---

## ⚡ Phase 3: PWA & Semi-Offline Sync Engine
**เป้าหมาย:** ระบบต้องทำงานต่อได้เมื่อเน็ตหลุด และ Auto-Resync เมื่อเน็ตมา

*   **สิ่งที่ต้องการ:** Progressive Web App (PWA) config, IndexedDB (เช่น Dexie.js), Background Sync Service Worker, Sync UI Indicator
*   **⚠️ ความเสี่ยง (Risks):** ข้อมูล Sync ชนกัน (Sync Conflicts), State ในหน้าจอไม่ตรงกับ Database, คิวคำสั่งล้น
*   **🛡️ การจัดการความเสี่ยง (Mitigation):** ระบุ Timestamp ทุก Action หากเน็ตมาให้ Sync ตามลำดับเวลา (FIFO), ทำ Toast Notification แถบสีชัดเจน (แดง=ออฟไลน์, เหลือง=กำลังซิงค์, เขียว=ซิงค์สำเร็จ)

### Checklist:
- [ ] 3.1 Frontend: ติดตั้ง next-pwa เพื่อเปิดใช้งาน Service Worker
- [ ] 3.2 Frontend: ติดตั้งและตั้งค่า IndexedDB (เช่น Dexie.js หรือ Redux Persist)
- [ ] 3.3 Frontend: สร้าง Offline Action Queue Manager (เก็บคำสั่ง POST/PUT ลงเครื่อง)
- [ ] 3.4 Frontend: สร้าง Network Detector Hook (ดักจับ event online/offline)
- [ ] 3.5 Frontend: สร้าง Global Sync Indicator UI (Toast/แถบสถานะ)
- [ ] 3.6 Frontend: ทำระบบ Auto-resync เมื่อ Event online ทำงาน
- [ ] 3.7 Commit: "feat: pwa and semi-offline sync engine"

---

## 🏗️ Phase 4: Core Business Modules (หน้าต่างการทำงานหลัก)
**เป้าหมาย:** สร้างหน้าจอและฟังก์ชั่นสำหรับผู้ใช้ (งานขนส่ง, น้ำมัน, ค่าใช้จ่าย)

*   **สิ่งที่ต้องการ:** UI Form สำหรับคีย์ข้อมูล, API Endpoint
*   **⚠️ ความเสี่ยง (Risks):** Business Logic ผิดพลาดจากระบบเดิม (VB), Validation ไม่รัดกุมทำให้ DB พัง
*   **🛡️ การจัดการความเสี่ยง (Mitigation):** ทำ Frontend Validation (เช่น Zod/Yup) ให้แน่นหนา, ค่อยๆ ทำทีละ Module และเทส Offline mode ทันทีที่ทำเสร็จ

### Checklist:
- [ ] 4.1 Module: Job & Transport (ฟอร์มบันทึกเที่ยววิ่ง + ผูก Offline Queue)
- [ ] 4.2 Module: Fuel Management (จัดการน้ำมัน)
- [ ] 4.3 Module: Invoicing & Expense (ใบแจ้งหนี้ และค่าใช้จ่าย)
- [ ] 4.4 Module: Executive Dashboard (กราฟและสรุปยอด)
- [ ] 4.5 Commit: "feat: core business modules"

---

## 🛡️ Phase 5: Automation, Backup & Deployment
**เป้าหมาย:** สคริปต์ Backup ดึงข้อมูลอัตโนมัติ และนำระบบขึ้น Production

*   **สิ่งที่ต้องการ:** Node.js/Bash Cronjob script, Server Deployment config
*   **⚠️ ความเสี่ยง (Risks):** Script Backup ทำงานพลาดแล้วไม่มีใครรู้, ฐานข้อมูลขนาดใหญ่ทำให้ดึง Backup นาน
*   **🛡️ การจัดการความเสี่ยง (Mitigation):** ทำระบบ Line Notify หรือ Email แจ้งเตือนหาก Backup ล้มเหลว (Try/Catch)

### Checklist:
- [ ] 5.1 สร้าง Script Backup `backup.js` ดึง SQL Dump จาก Online ลง Local 
- [ ] 5.2 ตั้งค่า Cronjob ให้รัน Script ทุก 24 ชั่วโมง
- [ ] 5.3 เพิ่ม Line Notify Alert เมื่อ Backup สำเร็จ หรือ ล้มเหลว
- [ ] 5.4 Load Testing: จำลองยิง API 30 Concurrent requests
- [ ] 5.5 Production Deployment
- [ ] 5.6 Commit: "chore: backup script and production readiness"
