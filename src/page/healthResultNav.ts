import type { HealthGoalId } from './Health/healthGoalSelection'
import { KIOSK_STEP_CONTENT_PAD } from './kioskStepLayout'

/** Shell ไม่ใส่ padding แนวนอน — padding บนเท่า Health step, pb ใหญ่กว่าสำหรับฟุตเทอร์ */
export const HEALTH_RESULT_PAGE_SHELL =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:py-2 max-xl:pb-6 max-xl:md:gap-9 max-xl:md:py-4 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:py-4 max-xl:lg:pb-12 xl:gap-6 xl:py-3 xl:pb-4 xl:sm:gap-8 xl:sm:py-5 xl:sm:pb-6'

/** padding แนวนอนเฉพาะเนื้อหากลาง + ฟุตเทอร์ */
export const HEALTH_RESULT_CONTENT_PAD = KIOSK_STEP_CONTENT_PAD

/** ใส่ไฟล์ `public/ebooklet.pdf` เมื่อมีต้นฉบับของ E booklet */
export const E_BOOKLET_PDF_URL = '/ebooklet.pdf'

/** E CATALOG รวม — Medical Food (สีเขียว) จากแคตตาล็อก FA2026 */
export const E_CATALOGUE_MEDICAL_FOOD_PDF_URL = '/ecatalogue-medical-food.pdf'

/** E CATALOG รวม — Personalised Food (สีฟ้า) จากแคตตาล็อก FA2026 */
export const E_CATALOGUE_PERSONALISED_FOOD_PDF_URL = '/ecatalogue-personalised-food.pdf'

/** ไฟล์รวมสำหรับดาวน์โหลดบนหน้า /health/result ตามเป้าหมาย STEP 2 */
export function resolveResultCataloguePdfUrl(goalId: HealthGoalId | null): string | null {
  if (goalId == null) return null
  if (goalId === 'symptom-management') return E_CATALOGUE_MEDICAL_FOOD_PDF_URL
  return E_CATALOGUE_PERSONALISED_FOOD_PDF_URL
}

export function resultCatalogueDownloadFilename(goalId: HealthGoalId): string {
  return goalId === 'symptom-management'
    ? 'ecatalogue-medical-food.pdf'
    : 'ecatalogue-personalised-food.pdf'
}

/** แถบปุ่มด้านล่าง — จอใหญ่ (lg+) ชิดใต้เนื้อหา ไม่ลอยล่างจอ */
export const HEALTH_RESULT_FOOTER_MOUNT =
  'max-lg:mt-auto lg:mt-6 xl:mt-8'

/** แถบปุ่มด้านล่างแบบเดียวกับหน้า /health/result */
export const HEALTH_RESULT_FOOTER_ACTIONS_ROW =
  'flex max-w-[min(100%,48rem)] flex-wrap items-center justify-center gap-3 px-2 pt-4 pb-8 lg:gap-4 lg:pt-3 lg:pb-3 xl:pb-4'

/** กรอบฟุตเทอร์เต็มความกว้าง (หน้า details) */
export const HEALTH_RESULT_FOOTER_BAR =
  'relative z-10 shrink-0 w-full border-t border-neutral-200/95 bg-neutral-100 py-8 lg:py-4 xl:py-5'

/** บล็อกเนื้อหาหลัก — จอเล็กขยายเต็มที่, จอใหญ่ไม่ดันฟุตเทอร์ลงล่าง */
export const HEALTH_RESULT_MAIN_GROW =
  'min-h-0 max-lg:flex-1 lg:flex-none lg:justify-start'

/** พื้นฐานโทนปุ่มฟุตเทอร์ — เหมือนกันทุกปุ่ม (โครงเดียวกับ Sorting Again) */
const HEALTH_RESULT_FOOTER_BTN_VISUAL =
  'font-heading inline-flex min-h-[2.75rem] shrink-0 items-center justify-center rounded-full border border-neutral-700 px-5 py-2 text-center text-sm font-semibold text-neutral-900 transition-opacity active:opacity-80 md:min-h-12 md:text-base'

export const HEALTH_RESULT_FOOTER_LINK_CLASS = `${HEALTH_RESULT_FOOTER_BTN_VISUAL} no-underline`

export const HEALTH_RESULT_FOOTER_BUTTON_CLASS = `${HEALTH_RESULT_FOOTER_BTN_VISUAL} disabled:pointer-events-none disabled:opacity-45`
