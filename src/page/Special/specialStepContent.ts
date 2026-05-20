import type { HealthCategoryId } from '../Health/healthCategorySelection'
import type { HealthGoalId } from '../Health/healthGoalSelection'

/** ปุ่มหัวข้อป้าย: หนึ่งหรือสองบรรทัด (อังกฤษตามดีไซน์ kiosk) */
export type SpecialPillEn = readonly [string] | readonly [string, string]

/** STEP 2 — ให้เข้ากับม็อก: SELECT YOUR HEALTH GOAL (+ ภาษาไทย) */
export const SPECIAL_STEP2_HEADER = {
  stepLabel: 'STEP 2',
  titleLine1: 'SELECT YOUR',
  titleLine2: 'HEALTH GOAL',
  description:
    'เลือกเป้าหมายสุขภาพที่ต้องการดูแล เป้าหมายหลักของคุณคืออะไร?',
} as const

/** เรียงคอลัมน์ ซ้าย→ขวา — `goal` ยังเชื่อมโยงผลจาก JSON เดิม */
export type SpecialStep2ColumnCopy = {
  goal: HealthGoalId
  ariaLabel: string
  pillParts: SpecialPillEn
  subtitle: string
}

export const SPECIAL_STEP2_COLUMNS: readonly SpecialStep2ColumnCopy[] = [
  {
    goal: 'symptom-management',
    ariaLabel: 'Disease Prevention — ไปขั้นถัดไป',
    pillParts: ['Disease', 'Prevention'],
    subtitle: 'ป้องกันและลดความเสี่ยง',
  },
  {
    goal: 'nutritional-recovery',
    ariaLabel: 'Performance Support — ไปขั้นถัดไป',
    pillParts: ['Performance', 'Support'],
    subtitle: 'เสริมประสิทธิภาพ',
  },
  {
    goal: 'quality-of-life',
    ariaLabel: 'Long-term Wellness — ไปขั้นถัดไป',
    pillParts: ['Long-term', 'Wellness'],
    subtitle: 'ดูแลสุขภาพอย่างยั่งยืน',
  },
] as const

/** STEP 3 — SELECT YOUR PRODUCT CATEGORY */
export const SPECIAL_STEP3_HEADER = {
  stepLabel: 'STEP 3',
  titleLine1: 'SELECT YOUR',
  titleLine2: 'PRODUCT CATEGORY',
  description:
    'เลือกกลุ่มผลิตภัณฑ์ที่สนใจ คุณกำลังมองหาผลิตภัณฑ์ประเภทใด?',
} as const

export type SpecialStep3ColumnCopy = {
  category: HealthCategoryId
  ariaLabel: string
  pillParts: SpecialPillEn
  subtitle: string
}

/** เรียง 4 คอลัมน์ตามม็อก: Food → Seasonings → Beverages → Snacks */
export const SPECIAL_STEP3_COLUMNS: readonly SpecialStep3ColumnCopy[] = [
  {
    category: 'food',
    ariaLabel: 'Food — ดูผลลัพธ์',
    pillParts: ['Food'],
    subtitle: 'อาหาร',
  },
  {
    category: 'seasonings',
    ariaLabel: 'Seasonings — ดูผลลัพธ์',
    pillParts: ['Seasonings'],
    subtitle: 'เครื่องปรุง',
  },
  {
    category: 'beverages',
    ariaLabel: 'Beverages — ดูผลลัพธ์',
    pillParts: ['Beverages'],
    subtitle: 'เครื่องดื่ม',
  },
  {
    category: 'snacks',
    ariaLabel: 'Snacks — ดูผลลัพธ์',
    pillParts: ['Snacks'],
    subtitle: 'ขนมทานเล่น',
  },
] as const
