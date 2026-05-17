/** query: `?category=food` เมื่อเปิดผลจาก step3 */
export const HEALTH_CATEGORY_QUERY_KEY = 'category' as const

export type HealthCategoryId = 'food' | 'beverages' | 'snacks'

const CATEGORY_IDS = new Set<string>(['food', 'beverages', 'snacks'])

export function parseHealthCategoryId(raw: string | null | undefined): HealthCategoryId | null {
  if (raw == null || raw === '') return null
  if (!CATEGORY_IDS.has(raw)) return null
  return raw as HealthCategoryId
}

export const HEALTH_CATEGORY_LABELS: Record<HealthCategoryId, { titleEn: string; titleTh: string }> = {
  food: { titleEn: 'Food', titleTh: 'อาหาร' },
  beverages: { titleEn: 'Beverages', titleTh: 'เครื่องดื่ม' },
  snacks: { titleEn: 'Snacks', titleTh: 'ขนมทานเล่น' },
}
