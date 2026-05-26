/**
 * สร้าง scripts/ecatalogue-map.json จากโฟลเดอร์ E CATALOGUE ต้นทาง
 * รัน: node scripts/build-ecatalogue-map.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const SRC_ROOT =
  process.env.ECATALOGUE_SRC ??
  'C:\\Users\\admin\\Downloads\\E CATALOGUE_FA2026-20260525T030835Z-3-001\\E CATALOGUE_FA2026'

const OUT = path.join(import.meta.dirname, 'ecatalogue-map.json')

/** @type {Record<string, string>} */
const TOP_GOAL = {
  'Medical Food': 'symptom-management',
  'Personalised Food': 'nutritional-recovery',
}

function resolveCategory(folderName) {
  const u = folderName.toUpperCase()
  if (u.startsWith('FOOD')) return 'food'
  if (u.startsWith('BEVERAGES')) return 'beverages'
  if (u.startsWith('SEASONINGS')) return 'seasonings'
  if (u.startsWith('SNACKS')) return 'snacks'
  return null
}

/** (dragged).pdf = 1, (dragged) 2.pdf = 2, … */
function draggedSortKey(fileName) {
  const m = fileName.match(/\(dragged\)(?: (\d+))?\.pdf$/i)
  if (!m) return 9999
  return m[1] ? Number.parseInt(m[1], 10) : 1
}

function padNum(n) {
  return String(n).padStart(3, '0')
}

/** @type {Array<{goal:string,category:string,num:number,src:string,srcRel:string,dst:string}>} */
const rows = []

if (!fs.existsSync(SRC_ROOT)) {
  console.error('Source not found:', SRC_ROOT)
  process.exit(1)
}

for (const top of fs.readdirSync(SRC_ROOT, { withFileTypes: true })) {
  if (!top.isDirectory()) continue
  const goal = TOP_GOAL[top.name]
  if (!goal) continue

  const topPath = path.join(SRC_ROOT, top.name)
  for (const catDir of fs.readdirSync(topPath, { withFileTypes: true })) {
    if (!catDir.isDirectory()) continue
    const category = resolveCategory(catDir.name)
    if (!category) continue

    const pdfs = fs
      .readdirSync(path.join(topPath, catDir.name))
      .filter((f) => f.toLowerCase().endsWith('.pdf'))
      .sort((a, b) => draggedSortKey(a) - draggedSortKey(b))

    pdfs.forEach((src, i) => {
      const num = i + 1
      const srcRel = path.join(top.name, catDir.name, src).replace(/\\/g, '/')
      rows.push({
        goal,
        category,
        num,
        src,
        srcRel,
        dst: `/health-product-pdfs/${goal}-${category}/${padNum(num)}.pdf`,
      })
    })
  }
}

/** quality-of-life ใช้ชุด Personalised Food เดียวกัน */
for (const row of [...rows].filter((r) => r.goal === 'nutritional-recovery')) {
  rows.push({
    ...row,
    goal: 'quality-of-life',
    dst: row.dst.replace('/nutritional-recovery-', '/quality-of-life-'),
  })
}

fs.writeFileSync(OUT, `${JSON.stringify(rows, null, 2)}\n`)

const counts = {}
for (const r of rows) {
  const k = `${r.goal}__${r.category}`
  counts[k] = (counts[k] ?? 0) + 1
}
console.log('Wrote', OUT)
for (const [k, n] of Object.entries(counts).sort()) console.log(`  ${k}: ${n}`)
