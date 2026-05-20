import healthResultLookup from '../../data/healthResultLookup.json'

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

export function getHealthResultEntry(comboKey: string): HealthResultEntry | undefined {
  return HEALTH_RESULT_LOOKUP[comboKey]
}

/** พาธรูปคู่กันกับ PDF: /health-product-pdfs/…/NNN.pdf → /health-product-images/…/NNN.svg */
export function resolveHealthProductImageUrl(product: HealthResultProductPdf): string {
  if (product.imageUrl) return product.imageUrl
  const u = product.pdfUrl.trim()
  if (!u.endsWith('.pdf')) return '/logo1.svg'
  return u.replace('/health-product-pdfs/', '/health-product-images/').replace(/\.pdf$/i, '.svg')
}
