/**
 * อัปเดต products ใน healthResultLookup.json จากไฟล์จริงใน public/health-product-pdfs/
 * รัน: node scripts/sync-lookup-from-pdfs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const PDF_ROOT = 'public/health-product-pdfs'
const lookupPath = 'src/data/healthResultLookup.json'

const categoryTh = {
  food: 'อาหาร',
  beverages: 'เครื่องดื่ม',
  seasonings: 'เครื่องปรุง',
  snacks: 'ขนมทานเล่น',
}
const goalTitle = {
  'symptom-management': 'ควบคุมอาการ',
  'nutritional-recovery': 'ฟื้นฟูโภชนาการ',
  'quality-of-life': 'คุณภาพชีวิต',
}

const GOALS = ['symptom-management', 'nutritional-recovery', 'quality-of-life']
const CATEGORIES = ['food', 'beverages', 'seasonings', 'snacks']

const lookup = JSON.parse(fs.readFileSync(lookupPath, 'utf8'))

for (const goal of GOALS) {
  for (const category of CATEGORIES) {
    const slug = `${goal}-${category}`
    const dir = path.join(PDF_ROOT, slug)
    if (!fs.existsSync(dir)) continue

    const pdfs = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.pdf'))
      .sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))

    if (pdfs.length === 0) continue

    const key = `${goal}__${category}`
    const goalTh = goalTitle[goal]
    const catTh = categoryTh[category]
    const base = lookup[key]
    const total = pdfs.length

    lookup[key] = {
      title: base?.title ?? `${goalTh} × ${catTh}`,
      summaryTh: base?.summaryTh ?? `แคตตาล็อก E CATALOG FA2026 — ${goalTh} × ${catTh}`,
      tips: base?.tips ?? ['เลือกดูรายละเอียดจากแคตตาล็อก'],
      products: pdfs.map((file, i) => ({
        titleTh: `แคตตาล็อก ${i + 1}/${total} — ${goalTh} × ${catTh}`,
        pdfUrl: `/health-product-pdfs/${slug}/${file}`,
      })),
    }
    console.log(`${key}: ${total}`)
  }
}

fs.writeFileSync(lookupPath, `${JSON.stringify(lookup, null, 2)}\n`)
