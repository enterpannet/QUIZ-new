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

/** @type {Map<string, string>} */
const srcIndex = new Map()
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full)
    else if (ent.name.toLowerCase().endsWith('.pdf')) srcIndex.set(ent.name, full)
  }
}
if (!fs.existsSync(SRC_ROOT)) {
  console.error('Source not found:', SRC_ROOT)
  process.exit(1)
}
walk(SRC_ROOT)

let ok = 0
let missing = 0
for (const row of mapped) {
  const src = srcIndex.get(row.src)
  const dst = path.join(ROOT, 'public', row.dst.replace(/^\//, ''))
  if (!src) {
    console.warn('MISSING SRC:', row.src, '->', row.dst)
    missing++
    continue
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true })
  fs.copyFileSync(src, dst)
  ok++
}
console.log(`Restored ${ok} product PDFs (${missing} missing)`)

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
