import fs from 'node:fs'

const lookupPath = 'src/data/healthResultLookup.json'
const mapPath = 'scripts/ecatalogue-map.json'
const lookup = JSON.parse(fs.readFileSync(lookupPath, 'utf8'))
const mapped = JSON.parse(fs.readFileSync(mapPath, 'utf8'))

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

/** @type {Record<string, typeof mapped>} */
const byKey = {}
for (const row of mapped) {
  const key = `${row.goal}__${row.category}`
  ;(byKey[key] ??= []).push(row)
}
for (const rows of Object.values(byKey)) rows.sort((a, b) => a.num - b.num)

for (const [key, rows] of Object.entries(byKey)) {
  const [goal, category] = key.split('__')
  const total = rows.length
  const base = lookup[key]
  const catTh = categoryTh[category]
  const goalTh = goalTitle[goal]
  lookup[key] = {
    title: base?.title ?? `${goalTh} × ${catTh}`,
    summaryTh: base?.summaryTh ?? `แคตตาล็อก E CATALOG FA2026 — ${goalTh} × ${catTh}`,
    tips: base?.tips ?? ['เลือกดูรายละเอียดจากแคตตาล็อก'],
    products: rows.map((r, i) => ({
      titleTh: `แคตตาล็อก ${i + 1}/${total} — ${goalTh} × ${catTh}`,
      pdfUrl: r.dst,
    })),
  }
}

fs.writeFileSync(lookupPath, `${JSON.stringify(lookup, null, 2)}\n`)
for (const [key, rows] of Object.entries(byKey).sort()) {
  console.log(`${key}: ${rows.length}`)
}
