/** Shell ครอบเนื้อหาหน้าผลการจับคู่ / จบเซสชัน — ให้ภาพรวมเดียวกัน */
export const HEALTH_RESULT_PAGE_SHELL =
  'flex w-full max-w-none flex-1 flex-col items-center justify-start overflow-x-clip bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'

/** ใส่ไฟล์ `public/ebooklet.pdf` เมื่อมีต้นฉบับของ E booklet */
export const E_BOOKLET_PDF_URL = '/ebooklet.pdf'

/** แถบปุ่มด้านล่างแบบเดียวกับหน้า /health/result */
export const HEALTH_RESULT_FOOTER_ACTIONS_ROW =
  'flex max-w-[min(100%,48rem)] flex-wrap items-center justify-center gap-3 px-2 pt-4 pb-8'

/** พื้นฐานโทนปุ่มฟุตเทอร์ — เหมือนกันทุกปุ่ม (โครงเดียวกับ Sorting Again) */
const HEALTH_RESULT_FOOTER_BTN_VISUAL =
  'inline-flex min-h-[2.75rem] shrink-0 items-center justify-center rounded-full border border-neutral-700 px-5 py-2 text-center text-sm font-semibold text-neutral-900 transition-opacity active:opacity-80 md:min-h-12 md:text-base'

export const HEALTH_RESULT_FOOTER_LINK_CLASS = `${HEALTH_RESULT_FOOTER_BTN_VISUAL} no-underline`

export const HEALTH_RESULT_FOOTER_BUTTON_CLASS = `${HEALTH_RESULT_FOOTER_BTN_VISUAL} disabled:pointer-events-none disabled:opacity-45`
