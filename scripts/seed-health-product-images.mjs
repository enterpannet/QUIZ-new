/**
 * สร้าง placeholder SVG คู่กับทุก PDF ใน public/health-product-pdfs/
 * รัน: node scripts/seed-health-product-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(import.meta.dirname, '..')
const PDF_ROOT = path.join(ROOT, 'public', 'health-product-pdfs')
const OUT_ROOT = path.join(ROOT, 'public', 'health-product-images')
const TEMPLATE = path.join(ROOT, 'public', 'logo1.svg')

if (!fs.existsSync(TEMPLATE)) {
  console.error('Missing template:', TEMPLATE)
  process.exit(1)
}

let total = 0
for (const slugDir of fs.readdirSync(PDF_ROOT, { withFileTypes: true })) {
  if (!slugDir.isDirectory()) continue
  const slug = slugDir.name
  const pdfDir = path.join(PDF_ROOT, slug)
  const pdfs = fs
    .readdirSync(pdfDir)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))

  if (pdfs.length === 0) continue

  const outDir = path.join(OUT_ROOT, slug)
  fs.mkdirSync(outDir, { recursive: true })

  for (const pdf of pdfs) {
    const stem = pdf.replace(/\.pdf$/i, '.svg')
    fs.copyFileSync(TEMPLATE, path.join(outDir, stem))
    total++
  }
  console.log(`${slug}: ${pdfs.length}`)
}

console.log(`Synced ${total} preview SVG(s)`)
