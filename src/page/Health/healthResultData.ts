import healthResultLookup from '../../data/healthResultLookup.json'

export type HealthResultProductPdf = {
  titleTh: string
  pdfUrl: string
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
