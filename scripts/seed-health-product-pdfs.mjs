/**
 * สร้างไฟล์ PDF ตัวอย่าง (อ่านได้ในเบราว์เซอร์) แล้วคัดลอกไป
 * public/health-product-pdfs/<slug>/001.pdf … 025.pdf
 */
import { mkdirSync, copyFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dir, '..')
const PUBLIC = join(ROOT, 'public', 'health-product-pdfs')

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

function buildMinimalPdf(line) {
  const stream = `BT /F1 11 Tf 72 720 Td (${escapePdfString(line)}) Tj ET\n`
  const streamBytes = new TextEncoder().encode(stream)
  const streamLen = streamBytes.length

  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n'
  const objs = [
    `1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
`,
    `2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
`,
    `3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
`,
    `4 0 obj
<< /Length ${streamLen} >>
stream
${stream}endstream
endobj
`,
    `5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
`,
  ]

  let full = header
  const offs = []
  offs[0] = 0
  for (let i = 0; i < objs.length; i++) {
    offs[i + 1] = full.length
    full += objs[i]
  }

  const xrefOffset = full.length
  let xref = 'xref\n0 6\n'
  xref += '0000000000 65535 f \n'
  for (let n = 1; n <= 5; n++) {
    xref += `${String(offs[n]).padStart(10, '0')} 00000 n \n`
  }
  full += xref
  full += `trailer
<< /Size 6 /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF
`
  return full
}

/** ข้อความ ASCII ล้วนใน () — หลีกเลี่ยง () \\ ในข้อความ */
function escapePdfString(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function pad3(n) {
  return String(n).padStart(3, '0')
}

const templatePath = join(ROOT, 'scripts', 'health-pdf-template.pdf')
writeFileSync(templatePath, buildMinimalPdf('SPRING SORT health product datasheet (placeholder)'), 'latin1')

for (const slug of COMBO_SLUGS) {
  const dir = join(PUBLIC, slug)
  mkdirSync(dir, { recursive: true })
  for (let i = 1; i <= 25; i++) {
    const name = `${pad3(i)}.pdf`
    copyFileSync(templatePath, join(dir, name))
  }
}

console.log('Wrote placeholder PDFs:', COMBO_SLUGS.length * 25, 'files +', templatePath)
