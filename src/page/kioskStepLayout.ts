/** padding แนวนอนสำหรับเนื้อหา step (Health / Special) — หัวข้ออยู่นอก padding ให้แถบ EN เต็มจอ */
export const KIOSK_STEP_CONTENT_PAD =
  'max-xl:px-3 max-xl:sm:px-4 max-xl:md:px-5 max-xl:lg:px-6 xl:px-4 xl:sm:px-6'

/** wrapper หัวข้อ STEP — เต็มความกว้างจอ */
export const KIOSK_STEP_HEADER_SECTION =
  'w-full shrink-0 py-2 text-center sm:py-2.5 md:py-3'

/** พื้นหลังแถบหัวข้อ EN สองบรรทัด */
export const KIOSK_TITLE_BAND_CLASS =
  'w-full bg-yellow-400 py-2 sm:py-2.5 md:py-3'

/** Group.svg ตกแต่งชิดล่าง — โปร่งจาง ไม่แย่งสายตาเนื้อหา */
export const KIOSK_STEP_GROUP_IMG_CLASS =
  'h-auto w-full max-h-[min(40vh,22rem)] max-w-none object-contain object-bottom opacity-[0.12] sm:max-h-[min(42vh,24rem)] sm:opacity-[0.14] md:max-h-[min(44vh,26rem)] md:opacity-[0.16]'

/** สัดส่วน hero ห่วงทราย — ใช้กับ priority เพื่อโหลดก่อนบนเน็ตช้า */
export const KIOSK_HERO_IMG_INTRINSIC = { width: 389, height: 598 } as const
