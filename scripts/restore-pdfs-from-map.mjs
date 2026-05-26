import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(import.meta.dirname, '..')
const SRC_ROOT =
  process.env.ECATALOGUE_SRC ??
  'C:\\Users\\admin\\Downloads\\E CATALOGUE_FA2026-20260525T030835Z-3-001\\E CATALOGUE_FA2026'
const mapPath = path.join(ROOT, 'scripts', 'ecatalogue-map.json')
let mapText = fs.readFileSync(mapPath, 'utf8')
if (mapText.charCodeAt(0) === 0xfeff) mapText = mapText.slice(1)
const mapped = JSON.parse(mapText)

if (!fs.existsSync(SRC_ROOT)) {
  console.error('Source not found:', SRC_ROOT)
  process.exit(1)
}

/** @type {Map<string, string>} basename → full path (fallback เก่า) */
const srcIndex = new Map()
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full)
    else if (ent.name.toLowerCase().endsWith('.pdf')) srcIndex.set(ent.name, full)
  }
}
walk(SRC_ROOT)

function resolveSrc(row) {
  if (row.srcRel) {
    const rel = row.srcRel.replace(/\//g, path.sep)
    const full = path.join(SRC_ROOT, rel)
    if (fs.existsSync(full)) return full
  }
  return srcIndex.get(row.src) ?? null
}

/** @type {Map<string, Set<string>>} */
const expectedByDir = new Map()

let ok = 0
let missing = 0
for (const row of mapped) {
  const src = resolveSrc(row)
  const dst = path.join(ROOT, 'public', row.dst.replace(/^\//, ''))
  const dstDir = path.dirname(dst)
  const dstBase = path.basename(dst)

  if (!expectedByDir.has(dstDir)) expectedByDir.set(dstDir, new Set())
  expectedByDir.get(dstDir).add(dstBase)

  if (!src) {
    console.warn('MISSING SRC:', row.srcRel ?? row.src, '->', row.dst)
    missing++
    continue
  }
  fs.mkdirSync(dstDir, { recursive: true })
  fs.copyFileSync(src, dst)
  ok++
}
console.log(`Restored ${ok} product PDFs (${missing} missing)`)

/** ลบ PDF ในโฟลเดอร์ปลายทางที่ไม่อยู่ใน map (เช่น seed เก่า) */
let removed = 0
for (const [dir, expected] of expectedByDir) {
  if (!fs.existsSync(dir)) continue
  for (const f of fs.readdirSync(dir)) {
    if (!f.toLowerCase().endsWith('.pdf')) continue
    if (!expected.has(f)) {
      fs.unlinkSync(path.join(dir, f))
      removed++
      console.log('Removed stale:', path.relative(path.join(ROOT, 'public'), path.join(dir, f)))
    }
  }
}
if (removed) console.log(`Removed ${removed} stale PDF(s)`)

for (const [label, sub] of [
  ['ecatalogue-medical-food.pdf', 'Medical Food'],
  ['ecatalogue-personalised-food.pdf', 'Personalised Food'],
]) {
  const dir = path.join(SRC_ROOT, sub)
  const combined = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .map((f) => path.join(dir, f))
    .sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0]
  if (!combined) {
    console.warn('No combined catalogue in', dir)
    continue
  }
  const dst = path.join(ROOT, 'public', label)
  fs.copyFileSync(combined, dst)
  console.log(`Restored ${label}: ${(fs.statSync(dst).size / 1024 / 1024).toFixed(1)} MB`)
}
