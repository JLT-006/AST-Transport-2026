# Legacy Database Schema (Extracted from AST_Company.exe)

เอกสารนี้รวบรวมโครงสร้างฐานข้อมูล (Database Schema) ที่ถูกสกัดและวิเคราะห์จากการ Reverse-engineer ชุดคำสั่ง SQL ที่ฝังอยู่ในโปรแกรมระบบขนส่งเดิม (AST_Company.exe) เพื่อใช้เป็นฐานข้อมูลอ้างอิงในการสร้างระบบเวอร์ชันใหม่

**ระบบฐานข้อมูลที่ใช้:** MySQL (ผ่าน ODBC)

---

## 1. Transportation & Job Management (ระบบจัดการเที่ยววิ่งรถ)

### `tbl_job_transport` (ข้อมูลเที่ยววิ่งรถ)
ตารางหลักที่บันทึกข้อมูลการขนส่งแต่ละรอบ
*   `job_id` (PK) - รหัสเที่ยววิ่ง
*   `invoice_no` - เลขที่ใบเรียกเก็บเงิน
*   `invoice` - ใบเรียกเก็บเงิน
*   `station_loading` - สถานที่ขึ้นสินค้า
*   `station_destination` - สถานที่ส่งสินค้า
*   `transport_datetime` - วันและเวลาที่ขนส่ง
*   `truck_plate` - ทะเบียนรถที่ใช้งาน
*   `emp_id` - รหัสพนักงาน/คนขับ
*   `emp_name` - ชื่อพนักงาน/คนขับ
*   `total_freight` - ค่าระวางรวม
*   `allowance` - เบี้ยเลี้ยงคนขับ
*   `weight` - น้ำหนักสินค้า
*   `price_type` - ประเภทราคา (เช่น 'Ton')
*   `price_expense` - ราคาค่าใช้จ่าย
*   `price_insurance` - ราคาประกันภัย
*   `flag` - สถานะการลบ/ใช้งาน (1 = Active)

### `tbl_bl_job_transport` (น่าจะเป็นข้อมูล Billing/History)
โครงสร้างคล้าย `tbl_job_transport` แต่อาจใช้สำหรับบันทึกประวัติการเรียกเก็บเงิน หรือสถานะการตรวจสอบ
*   `invoice_no`, `invoice`, `status` (เช่น 'Checked')

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
*   `supplier_id` - รหัสซัพพลายเออร์
*   `company` - บริษัท
*   `Truck_Plate` - ทะเบียนรถที่เกิดค่าใช้จ่าย
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
*   `Truck_plate` - ป้ายทะเบียนรถ
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
*   `org_short_name` - ชื่อย่อองค์กร
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

> **Note for AI Agent:**
> The above schema was reverse-engineered from legacy queries. Data types and exact key constraints (apart from assumed PKs) need to be formally designed when recreating the actual database. Many tables use a `flag` boolean/integer to denote soft deletes.
