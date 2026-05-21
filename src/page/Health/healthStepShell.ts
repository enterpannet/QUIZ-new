import { KIOSK_STEP_CONTENT_PAD, KIOSK_TITLE_BAND_CLASS } from '../kioskStepLayout'

/** แถบหัวข้อ EN บนพื้นเหลือง — สลับกับพื้นหลัง (เขียวทราย) */
export const HEALTH_YELLOW_TITLE_BAND_CLASS = KIOSK_TITLE_BAND_CLASS.replace(
  'bg-yellow-400',
  'bg-[#badc4b]/75',
)

/** พื้นหลังทรายเขียว — ใช้เลเยอร์แยกเมื่อมีกราฟิกทับ (เช่น Health step2) */
export const HEALTH_SAND_BACKGROUND =
  'bg-[radial-gradient(ellipse_100%_36%_at_50%_-4%,rgb(253_247_222)_0%,rgba(253,247,222,0.35)_26%,transparent_38%),linear-gradient(166deg,rgb(219_226_146)_0%,rgb(200_216_106)_22%,rgb(187_219_12)_52%,rgb(157_173_52)_82%,rgb(138_154_42)_100%)]'

/** พื้นหลังเหลือง — Health step3 */
export const HEALTH_YELLOW_BACKGROUND = 'bg-yellow-400'

const HEALTH_STEP_SHELL_LAYOUT =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip text-neutral-900 max-xl:gap-3 max-xl:py-2 max-xl:pb-3 max-xl:md:gap-5 max-xl:md:py-4 max-xl:md:pb-5 max-xl:lg:gap-6 max-xl:lg:py-4 max-xl:lg:pb-6 xl:gap-4 xl:py-3 xl:pb-5 xl:sm:gap-5 xl:sm:py-5 xl:sm:pb-6'

/** พื้นหลังทราย + layout ไม่มี padding แนวนอน — ให้แถบหัวข้อ EN เต็มจอได้ */
export const HEALTH_SAND_SHELL_BASE = `${HEALTH_STEP_SHELL_LAYOUT} ${HEALTH_SAND_BACKGROUND}`

/** พื้นเหลือง + layout เดียวกับ step ทราย — Health step3 */
export const HEALTH_YELLOW_SHELL_BASE = `${HEALTH_STEP_SHELL_LAYOUT} ${HEALTH_YELLOW_BACKGROUND}`

export { KIOSK_STEP_CONTENT_PAD as HEALTH_SAND_CONTENT_PAD }

/** shell + padding รวม (ถ้าต้องการแบบเดิมทั้งหน้า) */
export const HEALTH_SAND_PAGE_SHELL = `${HEALTH_SAND_SHELL_BASE} ${KIOSK_STEP_CONTENT_PAD}`
