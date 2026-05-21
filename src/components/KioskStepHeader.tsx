import { KIOSK_TITLE_BAND_CLASS } from '../page/kioskStepLayout'

export { KIOSK_TITLE_BAND_CLASS }

type KioskStepHeaderProps = {
  /** เช่น STEP 1, STEP 2 */
  stepLabel: string
  /** หัวข้อบรรทัดแรก (มักเป็น EN uppercase) */
  titleLine1: string
  /** หัวข้อบรรทัดสอง */
  titleLine2: string
  /** คำอธิบายใต้หัวข้อ เช่น ภาษาไทย */
  description: string
  /** ปิดแถบพื้นหลังหัวข้อ EN */
  hideTitleBand?: boolean
  /** พื้นหลังแถบหัวข้อ EN (hex) — แทน class เริ่มต้น */
  titleBandBg?: string
  /** class แถบหัวข้อ — ค่าเริ่มต้น KIOSK_TITLE_BAND_CLASS */
  titleBandClassName?: string
  /** ซ่อนป้าย STEP (เช่น หน้า result) */
  hideStepLabel?: boolean
}

const headerWrap =
  'flex w-full max-w-none flex-col items-center gap-1.5 text-center sm:gap-2 md:gap-2.5'

/** แถบหัวข้อเต็มความกว้างของ wrapper (คู่กับ PAGE_HEADER_BAND_BLEED ที่หน้า page3) */
const titleBandShell =
  'flex w-full min-w-0 shrink-0 flex-col items-center justify-center text-center'

const titleBandInner =
  'mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-4 py-2 text-center sm:max-w-3xl sm:py-2.5 md:max-w-3xl md:py-3 lg:max-w-4xl'

const stepBadgeCls =
  'font-heading text-[0.65rem] font-bold tracking-[0.22em] text-[#4a4456]/75 min-[400px]:text-xs sm:text-sm md:text-base'

const titleCls =
  'font-heading w-full text-center text-balance text-lg font-bold leading-[1.12] tracking-tight text-[#4a4456] min-[400px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[clamp(1.875rem,3.2vmax+0.35rem,3.25rem)] 2xl:text-[clamp(2rem,3.4vmax+0.4rem,3.5rem)]'

const descCls =
  'font-thai text-pretty max-w-[min(100%,22rem)] px-1 text-xs leading-snug text-[#4a4456] min-[400px]:max-w-[min(100%,26rem)] min-[400px]:text-sm sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg lg:text-xl'

export function KioskStepHeader({
  stepLabel,
  titleLine1,
  titleLine2,
  description,
  hideTitleBand = false,
  titleBandBg,
  titleBandClassName = KIOSK_TITLE_BAND_CLASS,
  hideStepLabel = false,
}: KioskStepHeaderProps) {
  const titleBlock = (
    <h1 className={titleCls}>
      <span className="block">{titleLine1}</span>
      <span className="block">{titleLine2}</span>
    </h1>
  )

  const showTitleBand = !hideTitleBand

  return (
    <header className={headerWrap}>
      {hideStepLabel ? null : <p className={stepBadgeCls}>{stepLabel}</p>}
      {showTitleBand ? (
        <div
          className={`${titleBandShell} ${titleBandClassName}`.trim()}
          style={titleBandBg ? { backgroundColor: titleBandBg } : undefined}
        >
          <div className={titleBandInner}>{titleBlock}</div>
        </div>
      ) : (
        titleBlock
      )}
      <p className={descCls}>{description}</p>
    </header>
  )
}
