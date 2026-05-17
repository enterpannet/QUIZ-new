/** คีย์ query string เช่น `/health/step3?goal=symptom-management` */
export const HEALTH_GOAL_QUERY_KEY = 'goal' as const

/** ค่าที่ใช้ส่งข้าม step / ค้นหา — อย่าเปลี่ยนสตริงพ้นจากกลุ่มนี้ถ้ามีลิงก์หรือข้อมูลเก่าอ้างอยู่ */
export type HealthGoalId =
  | 'symptom-management'
  | 'nutritional-recovery'
  | 'quality-of-life'

const GOAL_IDS = new Set<string>([
  'symptom-management',
  'nutritional-recovery',
  'quality-of-life',
])

export function parseHealthGoalId(raw: string | null | undefined): HealthGoalId | null {
  if (raw == null || raw === '') return null
  if (!GOAL_IDS.has(raw)) return null
  return raw as HealthGoalId
}

export const HEALTH_GOAL_META: Record<
  HealthGoalId,
  { titleEn: string; titleTh: string; searchKey: string }
> = {
  'symptom-management': {
    titleEn: 'Symptom Management',
    titleTh: 'ควบคุมอาการและลดภาวะแทรกซ้อน',
    searchKey: 'symptom-management',
  },
  'nutritional-recovery': {
    titleEn: 'Nutritional Recovery',
    titleTh: 'ฟื้นฟูร่างกาย และภาวะโภชนาการ',
    searchKey: 'nutritional-recovery',
  },
  'quality-of-life': {
    titleEn: 'Quality of Life Support',
    titleTh: 'เสริมคุณภาพชีวิต',
    searchKey: 'quality-of-life',
  },
}
