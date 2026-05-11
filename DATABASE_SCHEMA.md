# Legacy Database Schema (Extracted from AST_Company.exe)

เอกสารนี้รวบรวมโครงสร้างฐานข้อมูล (Database Schema) ที่ถูกสกัดและวิเคราะห์จากการ Reverse-engineer ชุดคำสั่ง SQL ที่ฝังอยู่ในโปรแกรมระบบขนส่งเดิม (AST_Company.exe) เพื่อใช้เป็นฐานข้อมูลอ้างอิงในการสร้างระบบเวอร์ชันใหม่

**ระบบฐานข้อมูลที่ใช้:** MySQL (ผ่าน ODBC)

> **Last updated:** 2026-05-11 — Claude (cross-verified against CSV exports in /EXCEL)
> คอลัมน์ที่มีเครื่องหมาย `[+NEW]` = เพิ่มจากการตรวจสอบ CSV จริง ไม่ได้มีใน legacy schema เดิม
> คอลัมน์ที่มีเครื่องหมาย `[PENDING]` = ยังไม่ได้ยืนยันจากเจ้าของระบบ

---

## Relationships Overview

```
tbl_job_transport
  ├── truck_plate      FK → tbl_truck.truck_plate
  ├── emp_id           FK → tbl_employee.emp_id
  └── invoice (customer code) FK → tbl_customer_org.org_short_name

tbl_fuel
  └── Truck_plate      FK → tbl_truck.truck_plate

tbl_expense
  ├── Truck_Plate      FK → tbl_truck.truck_plate
  └── supplier_id      FK → tbl_supplier.supplier_id

tbl_users
  └── emp_id           FK → tbl_employee.emp_id

tbl_invoice
  └── invoice_no       → referenced by tbl_job_transport.invoice_no (billing link)
```

---

## 1. Transportation & Job Management (ระบบจัดการเที่ยววิ่งรถ)

### `tbl_job_transport` (ข้อมูลเที่ยววิ่งรถ)
ตารางหลักที่บันทึกข้อมูลการขนส่งแต่ละรอบ
*   `job_id` (PK) - รหัสเที่ยววิ่ง
*   `invoice_no` - เลขที่เอกสารแนบ (เลขที่ใบเรียกเก็บเงิน)
*   `invoice` - รหัสลูกค้า (short code เช่น 'NBS', 'PMT') → FK tbl_customer_org.org_short_name
*   `station_loading` - สถานที่ขึ้นสินค้า (ชื่อย่อสถานี)
*   `station_destination` - สถานที่ส่งสินค้า (ชื่อย่อสถานี)
*   `delivery_location` - ชื่อสถานที่ส่งสินค้าเฉพาะ (เช่น 'OCEAN VICTORY', 'mv.yangtze nova') **[+NEW]**
*   `transport_datetime` - วันและเวลาที่ขนส่ง
*   `truck_plate` - ทะเบียนรถที่ใช้งาน → FK tbl_truck.truck_plate
*   `emp_id` - รหัสพนักงาน/คนขับ → FK tbl_employee.emp_id
*   `emp_name` - ชื่อพนักงาน/คนขับ (denormalized, เก็บไว้เพื่อ historical record)
*   `total_freight` - ค่าระวางรวม (บาท)
*   `allowance` - เบี้ยเลี้ยงคนขับ (บาท)
*   `incentive` - ค่า Incentive คนขับ (บาท) แยกจาก allowance **[+NEW]**
*   `charge` - ค่าใช้จ่ายเพิ่มเติม/ค่า Surcharge (บาท) **[+NEW]**
*   `weight` - น้ำหนักสินค้า (ตัน)
*   `min_weight` - น้ำหนักขั้นต่ำที่คิดราคา (ตัน) — NULL ได้ถ้าไม่มีการกำหนด **[+NEW]**
*   `quantity` - จำนวนหน่วย (ชิ้น/กล่อง ฯลฯ) **[+NEW]**
*   `price_type` - ประเภทราคา (เช่น 'Ton')
*   `price_per_unit` - ราคาต่อหน่วย (บาท) **[+NEW]**
*   `price_expense` - ราคาค่าใช้จ่าย **[PENDING - ยังไม่พบใน CSV]**
*   `price_insurance` - ราคาประกันภัย **[PENDING - ยังไม่พบใน CSV]**
*   `flag` - สถานะการลบ/ใช้งาน (1 = Active)

### `tbl_bl_job_transport` (ข้อมูล Billing/History)
โครงสร้างคล้าย `tbl_job_transport` ใช้สำหรับบันทึกประวัติการเรียกเก็บเงิน หรือสถานะการตรวจสอบ
*   `invoice_no` - เลขที่เอกสาร
*   `invoice` - รหัสลูกค้า
*   `status` - สถานะ (เช่น 'Checked')

---

## 2. Invoicing & Finance (ระบบบัญชี และ ใบแจ้งหนี้)

### `tbl_invoice` (ใบแจ้งหนี้)
*   `invoice_no` (PK) - เลขที่ใบแจ้งหนี้
*   `invoice` - รหัสอ้างอิงใบแจ้งหนี้
*   `att_invoice` - ไฟล์แนบ/เอกสารอ้างอิง
*   `create_date` - วันที่สร้าง
*   `remark` - หมายเหตุ
*   `sum_invoice` - ยอดรวมใบแจ้งหนี้
*   `sum_weight` - น้ำหนักรวม
*   `bl_payment` - ยอดการชำระ
*   `check_no` - หมายเลขเช็ค
*   `flag` - สถานะ (1 = Active)

### `tbl_expense` (ค่าใช้จ่าย)
*   `exp_code` (PK) - รหัสค่าใช้จ่าย
*   `issued_date` - วันที่ออกเอกสาร
*   `payment_no` - เลขที่การจ่ายเงิน
*   `att_no` - หมายเลขเอกสารแนบ
*   `exp_type` - ประเภทค่าใช้จ่าย
*   `supplier_id` - รหัสซัพพลายเออร์ → FK tbl_supplier.supplier_id
*   `company` - บริษัท
*   `Truck_Plate` - ทะเบียนรถที่เกิดค่าใช้จ่าย → FK tbl_truck.truck_plate
*   `total_expense` - ยอดค่าใช้จ่ายรวม
*   `exp_pcs` - จำนวนชิ้น/รายการ
*   `exp_prices` - ราคาค่าใช้จ่าย

---

## 3. Fuel Management (ระบบน้ำมันเชื้อเพลิง)

### `tbl_fuel_import` (การนำเข้าน้ำมันเข้าสถานี)
*   `fuel_no` (PK) - รหัสบิลน้ำมัน
*   `station` - สถานีน้ำมัน (เช่น 1, 2)
*   `quantity` - ปริมาณที่นำเข้า
*   `date_import` - วันที่นำเข้าน้ำมัน
*   `flag` - สถานะ

### `tbl_fuel` (การจ่าย/เติมน้ำมัน)
*   `pure_id` (PK) - รหัสรายการเติมน้ำมัน
*   `fuel_no` - หมายเลขการเติม
*   `Truck_plate` - ป้ายทะเบียนรถ → FK tbl_truck.truck_plate
*   `driver_name` - ชื่อคนขับรถ
*   `owner` - เจ้าของรถ
*   `pure_datetime_in` - วันและเวลาที่เติมน้ำมัน
*   `station` - สถานีที่เติม
*   `distance` - ระยะทาง (เลขไมล์)
*   `total_capacity` - ปริมาณที่เติม
*   `price_liter` - ราคาต่อลิตร
*   `flag` - สถานะ

---

## 4. Master Data (ข้อมูลหลัก)

### `tbl_truck` (ข้อมูลรถบรรทุก)
*   `truck_plate` (PK) - ป้ายทะเบียนรถหัวลาก
*   `truck_tail_plate` - ป้ายทะเบียนหางลาก
*   `truck_owner` - เจ้าของรถ
*   `truck_type` - ประเภทรถบรรทุก
*   `Flag` - สถานะใช้งาน

### `tbl_customer_org` (ข้อมูลองค์กร/ลูกค้า)
*   `org_short_name` (PK) - ชื่อย่อองค์กร (ใช้เป็น FK จาก tbl_job_transport.invoice)
*   `org_name` - ชื่อองค์กรเต็ม
*   `org_owner` - เจ้าขององค์กร/ผู้ติดต่อ
*   `per_name` - ชื่อบุคคลที่เกี่ยวข้อง
*   `org_status` - สถานะ (เช่น 'Working')
*   `flag` - สถานะ

### `tbl_customer_per` (ข้อมูลลูกค้าบุคคล)
*   `per_id` (PK) - รหัสบุคคล
*   `per_name` - ชื่อลูกค้า
*   `start_date` - วันที่เริ่ม
*   `end_date` - วันที่สิ้นสุด

### `tbl_inventory` (ระบบสินค้าคงคลัง)
*   `inv_id` (PK) - รหัสสินค้า
*   `inv_name` - ชื่อสินค้า
*   `inv_type` - ประเภทสินค้า
*   `inv_pcs_case` - จำนวนชิ้นต่อลัง
*   `inv_detail` - รายละเอียด
*   `unit` - หน่วยนับ

### `tbl_purchaseorder` (เอกสารสั่งซื้อ)
*   `PR_No` (PK) - เลขที่ขอสั่งซื้อ
*   `po_no` - เลขที่ใบสั่งซื้อ
*   `flag` - สถานะ

---

## 5. New Tables (ตารางใหม่ที่เพิ่มสำหรับ VERSION_2026)

### `tbl_employee` (ข้อมูลพนักงาน/คนขับ) **[+NEW]**
ตารางนี้จำเป็นเพราะ tbl_job_transport.emp_id ไม่มีตารางรับในระบบเดิม
*   `emp_id` (PK) - รหัสพนักงาน
*   `emp_name` - ชื่อพนักงาน
*   `emp_type` - ประเภท (เช่น 'driver', 'staff')
*   `flag` - สถานะ (1 = Active)

### `tbl_supplier` (ข้อมูลซัพพลายเออร์) **[+NEW]**
ตารางนี้จำเป็นเพราะ tbl_expense.supplier_id ไม่มีตารางรับในระบบเดิม
*   `supplier_id` (PK) - รหัสซัพพลายเออร์
*   `supplier_name` - ชื่อซัพพลายเออร์
*   `flag` - สถานะ (1 = Active)

### `tbl_users` (ผู้ใช้งานระบบ) **[+NEW]**
ตารางสำหรับ Authentication — ไม่มีในระบบเดิม (desktop ไม่มี login)
*   `user_id` (PK, AUTO_INCREMENT) - รหัสผู้ใช้
*   `username` (UNIQUE) - ชื่อผู้ใช้
*   `password_hash` - รหัสผ่าน (bcrypt)
*   `role` - สิทธิ์ ('admin', 'dispatcher', 'executive', 'viewer')
*   `emp_id` - FK → tbl_employee.emp_id (NULL ได้สำหรับ admin ที่ไม่ใช่พนักงาน)
*   `flag` - สถานะ (1 = Active)

---

> **Note for AI Agent:**
> - คอลัมน์ `[+NEW]` ได้รับการ approve จากเจ้าของระบบแล้ว (2026-05-11)
> - คอลัมน์ `[PENDING]` (`price_expense`, `price_insurance`) ให้คงไว้ก่อน รอยืนยัน
> - ชื่อคอลัมน์ case อาจไม่ consistent (เช่น `Truck_Plate` vs `truck_plate`) — ให้ normalize เป็น snake_case ทั้งหมดเมื่อสร้าง Prisma schema
> - `flag = 1` คือ Active ทุกตาราง (soft delete pattern)
