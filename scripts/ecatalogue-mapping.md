# E CATALOGUE FA2026 → Quiz App PDF Mapping

แหล่งไฟล์: `C:\Users\admin\Downloads\E CATALOGUE_FA2026-20260525T030835Z-3-001\E CATALOGUE_FA2026`

## โครงสร้าง Catalogue

| โฟลเดอร์ Catalogue | เส้นทางในแอป | Goal ในแอป |
|---|---|---|
| **Medical Food** | สีเขียว `/health/*` | `symptom-management` เท่านั้น |
| **Personalised Food** | สีฟ้า `/special/*` | `nutritional-recovery`, `quality-of-life` |

## หมวดสินค้า (STEP 3)

| โฟลเดอร์ Catalogue | Category ในแอป |
|---|---|
| `FOOD` / `FOOD 18 Brands` | `food` |
| `BEVERAGES` / `BEVERAGES 16 Brands` | `beverages` |
| `SEASONINGS` / `SEASONINGS 7 Brands` | `seasonings` |
| `SNACKS` / `SNACKS 9 Brands` | `snacks` |

## การตั้งชื่อไฟล์ในโปรเจกต์

```
public/health-product-pdfs/{goal}-{category}/001.pdf …
```

เรียงจาก `(dragged).pdf` → `(dragged) 2.pdf` → … ตามลำดับในโฟลเดอร์ต้นทาง

## จำนวนไฟล์ที่ map แล้ว (ตามที่มีใน Catalogue)

| Goal × Category | ไฟล์ใน Catalogue | → โปรเจกต์ |
|---|---|---|
| symptom-management × food | 4 | `001–004.pdf` |
| symptom-management × beverages | 2 | `001–002.pdf` |
| symptom-management × seasonings | 3 | `001–003.pdf` |
| symptom-management × snacks | 1 | `001.pdf` |
| nutritional-recovery × food | 18 | `001–018.pdf` |
| nutritional-recovery × beverages | 16 | `001–016.pdf` |
| nutritional-recovery × seasonings | 7 | `001–007.pdf` |
| nutritional-recovery × snacks | 9 | `001–009.pdf` |
| quality-of-life × * | เหมือน nutritional-recovery | คัดลอกชุด Personalised Food เดียวกัน |

## E-Catalogue รวม (ดาวน์โหลดหน้า Result)

| ไฟล์ Catalogue | → ในโปรเจกต์ | ใช้เมื่อ goal |
|---|---|---|
| `Medical Food\2505 … Medical Food (สีเขียว).pdf` | `public/ecatalogue-medical-food.pdf` | `symptom-management` |
| `Personalised Food\2505 … Personalised Food (สีฟ้า).pdf` | `public/ecatalogue-personalised-food.pdf` | `nutritional-recovery`, `quality-of-life` |

ปุ่ม **Download This Result** และ QR บนจอใหญ่ → ดาวน์โหลด/เปิดไฟล์รวมนี้ (ไม่ใช่ PDF รายชิ้นใน slider)

## E-Booklet (หน้า End session)

| ไฟล์ | ใช้เป็น |
|---|---|
| `public/ebooklet.pdf` | E-Booklet แยกต่างหาก (ยังไม่ auto-map จาก catalogue) |

## รายละเอียดไฟล์ต้นทาง → ปลายทาง

ดูใน `scripts/ecatalogue-map.json` (สร้างอัตโนมัติเมื่อรันสคริปต์ copy)
