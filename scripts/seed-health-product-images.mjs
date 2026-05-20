/**
 * คัดลอกรูป placeholder ไป public/health-product-images/<slug>/001.svg … 025.svg
 * (ตรงคู่กับ PDF — แทนที่ไฟล์จริงได้ทีละชิ้น)
 */
import { mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dir, '..')
const OUT = join(ROOT, 'public', 'health-product-images')
const TEMPLATE = join(ROOT, 'public', 'logo1.svg')

const COMBO_SLUGS = [
  'symptom-management-food',
  'symptom-management-beverages',
  'symptom-management-snacks',
  'nutritional-recovery-food',
  'nutritional-recovery-beverages',
  'nutritional-recovery-snacks',
  'quality-of-life-food',
  'quality-of-life-beverages',
  'quality-of-life-snacks',
]

function pad3(n) {
  return String(n).padStart(3, '0')
}

for (const slug of COMBO_SLUGS) {
  const dir = join(OUT, slug)
  mkdirSync(dir, { recursive: true })
  for (let i = 1; i <= 25; i++) {
    copyFileSync(TEMPLATE, join(dir, `${pad3(i)}.svg`))
  }
}

console.log('Copied placeholder SVGs:', COMBO_SLUGS.length * 25)
