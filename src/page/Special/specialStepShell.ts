import { KIOSK_STEP_CONTENT_PAD } from '../kioskStepLayout'

/** พื้นโทนฟ้าอ่อน — ใช้เลเยอร์แยกเมื่อมี Group.svg ทับ */
export const SPECIAL_SAND_BACKGROUND = 'bg-[#c9e6fc]'

const SPECIAL_STEP_SHELL_LAYOUT =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip text-neutral-900 max-xl:gap-3 max-xl:py-2 max-xl:pb-3 max-xl:md:gap-5 max-xl:md:py-4 max-xl:md:pb-5 max-xl:lg:gap-6 max-xl:lg:py-4 max-xl:lg:pb-6 xl:gap-4 xl:py-3 xl:pb-5 xl:sm:gap-5 xl:sm:py-5 xl:sm:pb-6'

/** พื้นโทนฟ้าอ่อน — layout ไม่มี padding แนวนอน */
export const SPECIAL_SAND_SHELL_BASE = `${SPECIAL_STEP_SHELL_LAYOUT} ${SPECIAL_SAND_BACKGROUND}`

export { KIOSK_STEP_CONTENT_PAD as SPECIAL_SAND_CONTENT_PAD }

/** shell + padding รวม */
export const SPECIAL_SAND_PAGE_SHELL = `${SPECIAL_SAND_SHELL_BASE} ${KIOSK_STEP_CONTENT_PAD}`
