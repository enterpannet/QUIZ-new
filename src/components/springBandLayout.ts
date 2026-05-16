/** จอใหญ่ (xl+): เทียบเท่าชุดเดิม — ไม่เปลี่ยน. ด้านล่าง xl ย่อให้ครบ 5 คอลัมน์; md/lg เหมาะ iPad/tablet portrait–landscape */
export const springImg =
  'mx-auto block h-28 w-full max-w-[min(100%,12rem)] max-h-[min(38vw,13rem)] object-contain max-xl:!h-[3.875rem] max-xl:!max-w-[min(100%,17.5vw)] max-xl:!max-h-[29vmin] max-xl:sm:!h-[4.5rem] max-xl:sm:!max-w-[min(100%,17vw)] max-xl:md:!h-[7rem] max-xl:md:!max-w-[min(100%,13.75vw)] max-xl:md:!max-h-[38vmin] max-xl:lg:!h-[9.25rem] max-xl:lg:!max-w-[min(100%,12.5rem)] max-xl:lg:!max-h-[none] sm:h-32 md:h-40 lg:h-44 lg:max-w-[14rem]'

/** เสมอ 5 คอลัมน์ — ระยะซอยบนจอแคบ, จอ xl+ เหมือนเดิม */
export const springRowGrid =
  'grid w-full max-w-[100vw] grid-cols-5 max-xl:gap-x-2 max-xl:gap-y-5 max-xl:sm:gap-x-2.5 max-xl:md:gap-x-3 max-xl:md:gap-y-9 max-xl:lg:gap-x-5 max-xl:lg:gap-y-11 xl:gap-x-4 xl:gap-y-8 xl:sm:gap-x-6 xl:lg:gap-x-8'

export const springCell =
  'flex min-h-0 min-w-0 flex-col items-center justify-start gap-2 max-xl:sm:gap-2.5 max-xl:md:gap-4 max-xl:lg:gap-5 xl:gap-3'
