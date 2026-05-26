import {
  HEALTH_CATEGORY_QUERY_KEY,
  type HealthCategoryId,
} from './healthCategorySelection'
import { MEDICAL_FOOD_GOAL, type HealthGoalId } from './healthGoalSelection'

export type HealthResultComboKey = `${HealthGoalId}__${HealthCategoryId}`

/** Medical Food สีเขียว `/health` · Personalised Food สีฟ้า `/special` */
export const KIOSK_PROFILE_QUERY_KEY = 'profile' as const
export type KioskCatalogueProfile = 'medical' | 'personalised'

/** JSON slug ชุด Personalised Food (สีฟ้า) */
export const PERSONALISED_LOOKUP_GOAL = 'nutritional-recovery' as const satisfies HealthGoalId

export function toHealthComboKey(
  goal: HealthGoalId,
  category: HealthCategoryId,
): HealthResultComboKey {
  return `${goal}__${category}`
}

export function parseKioskCatalogueProfile(
  raw: string | null | undefined,
): KioskCatalogueProfile | null {
  if (raw === 'medical' || raw === 'personalised') return raw
  return null
}

/** profile → slug ใน healthResultLookup.json (STEP 2 ไม่ใช่ key) */
export function resolveProductLookupGoal(
  profile: KioskCatalogueProfile | null,
): HealthGoalId | null {
  if (profile === 'medical') return MEDICAL_FOOD_GOAL
  if (profile === 'personalised') return PERSONALISED_LOOKUP_GOAL
  return null
}

/** Key หลัก: สี (profile) × หมวด STEP 3 (category) */
export function toHealthResultComboKey(
  profile: KioskCatalogueProfile | null,
  category: HealthCategoryId,
): HealthResultComboKey | null {
  const lookupGoal = resolveProductLookupGoal(profile)
  if (!lookupGoal) return null
  return toHealthComboKey(lookupGoal, category)
}

export function buildHealthResultHref(
  category: HealthCategoryId,
  profile: KioskCatalogueProfile,
) {
  const p = new URLSearchParams()
  p.set(HEALTH_CATEGORY_QUERY_KEY, category)
  p.set(KIOSK_PROFILE_QUERY_KEY, profile)
  return `/health/result?${p}`
}
