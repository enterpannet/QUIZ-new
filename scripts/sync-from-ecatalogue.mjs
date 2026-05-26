/**
 * อ้างอิง PDF ทั้งหมดจาก E CATALOGUE FA2026 → public/ + healthResultLookup.json
 * รัน: node scripts/sync-from-ecatalogue.mjs
 * กำหนด path อื่น: ECATALOGUE_SRC="D:\\catalogue" node scripts/sync-from-ecatalogue.mjs
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const scripts = path.join(import.meta.dirname)
const node = process.execPath
const env = { ...process.env }

for (const file of ['build-ecatalogue-map.mjs', 'restore-pdfs-from-map.mjs', 'update-lookup-from-map.mjs', 'seed-health-product-images.mjs']) {
  console.log(`\n>>> node scripts/${file}`)
  const r = spawnSync(node, [path.join(scripts, file)], { stdio: 'inherit', env, cwd: path.join(scripts, '..') })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
