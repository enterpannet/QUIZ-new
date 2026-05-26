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

/** Medical Food catalogue — สีเขียว `/health` */
export const MEDICAL_FOOD_GOAL = 'symptom-management' as const satisfies HealthGoalId

/** Personalised Food catalogue — สีฟ้า `/special` (ดู kioskCatalogue.ts) */
export const PERSONALISED_FOOD_GOALS = [
  'nutritional-recovery',
  'quality-of-life',
] as const satisfies readonly HealthGoalId[]

export function isMedicalFoodGoal(goal: HealthGoalId | null | undefined): goal is typeof MEDICAL_FOOD_GOAL {
  return goal === MEDICAL_FOOD_GOAL
}

export function isPersonalisedFoodGoal(
  goal: HealthGoalId | null | undefined,
): goal is (typeof PERSONALISED_FOOD_GOALS)[number] {
  return goal != null && (PERSONALISED_FOOD_GOALS as readonly string[]).includes(goal)
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
