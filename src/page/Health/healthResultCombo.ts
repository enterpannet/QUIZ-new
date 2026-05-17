import {
  HEALTH_CATEGORY_QUERY_KEY,
  type HealthCategoryId,
} from './healthCategorySelection'
import { HEALTH_GOAL_QUERY_KEY, type HealthGoalId } from './healthGoalSelection'

export type HealthResultComboKey = `${HealthGoalId}__${HealthCategoryId}`

export function toHealthComboKey(
  goal: HealthGoalId,
  category: HealthCategoryId,
): HealthResultComboKey {
  return `${goal}__${category}`
}

/** ถ้ามา STEP 3 โดยไม่มี goal จาก STEP 2 ยังให้เปิดได้ — result จะบอกว่าขาดคีย์ */
export function buildHealthResultHref(goal: HealthGoalId | null, category: HealthCategoryId) {
  const p = new URLSearchParams()
  if (goal) p.set(HEALTH_GOAL_QUERY_KEY, goal)
  p.set(HEALTH_CATEGORY_QUERY_KEY, category)
  return `/health/result?${p}`
}
