import healthResultLookup from '../../data/healthResultLookup.json'
import { HEALTH_CATEGORY_LABELS } from './healthCategorySelection'

export type HealthResultProductPdf = {
  titleTh: string
  pdfUrl: string
  /** ถ้าไม่ใส่จะได้จาก resolveHealthProductImageUrl() จาก pdfUrl */
  imageUrl?: string
}

export type HealthResultEntry = {
  title: string
  summaryTh: string
  products: HealthResultProductPdf[]
  tips: string[]
}

export type HealthResultLookupMap = Record<string, HealthResultEntry>

export const HEALTH_RESULT_LOOKUP =
  healthResultLookup as unknown as HealthResultLookupMap

function deriveSeasoningsFromFoodEntry(base: HealthResultEntry): HealthResultEntry {
  const seasoningTh = HEALTH_CATEGORY_LABELS.seasonings.titleTh
  const [lhs] = base.title.split(/\s*×\s*/)
  return {
    ...base,
    title: lhs ? `${lhs} × ${seasoningTh}` : `${base.title} × ${seasoningTh}`,
    summaryTh: base.summaryTh
      .replaceAll('ผลิตภัณฑ์ประเภทอาหาร', 'ผลิตภัณฑ์ประเภทเครื่องปรุง')
      .replaceAll('ประเภทอาหาร', 'ประเภทเครื่องปรุง'),
  }
}

export function getHealthResultEntry(comboKey: string): HealthResultEntry | undefined {
  const direct = HEALTH_RESULT_LOOKUP[comboKey]
  if (direct) return direct

  /** ชุด JSON มีแค่ food/beverages/snacks — เครื่องปรุงชั่วคราวอิงเมนูเดียวกับอาหาร */
  const m = /^(.+)__seasonings$/u.exec(comboKey)
  if (!m?.[1]) return undefined
  const food = HEALTH_RESULT_LOOKUP[`${m[1]}__food`]
  if (!food) return undefined
  return deriveSeasoningsFromFoodEntry(food)
}

/** พาธรูปคู่กันกับ PDF: /health-product-pdfs/…/NNN.pdf → /health-product-images/…/NNN.svg */
export function resolveHealthProductImageUrl(product: HealthResultProductPdf): string {
  if (product.imageUrl) return product.imageUrl
  const u = product.pdfUrl.trim()
  if (!u.endsWith('.pdf')) return '/logo1.svg'
  return u.replace('/health-product-pdfs/', '/health-product-images/').replace(/\.pdf$/i, '.svg')
}

/** รายการ PDF สินค้าไม่ซ้ำจาก lookup — ใช้ prefetch ลง Service Worker cache */
export function getAllHealthProductPdfPaths(): string[] {
  const seen = new Set<string>()
  for (const entry of Object.values(HEALTH_RESULT_LOOKUP)) {
    for (const product of entry.products) {
      const path = product.pdfUrl.trim().split('#')[0]
      if (path.endsWith('.pdf')) seen.add(path)
    }
  }
  return [...seen]
}
