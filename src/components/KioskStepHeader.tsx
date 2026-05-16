type KioskStepHeaderProps = {
  /** เช่น STEP 1, STEP 2 */
  stepLabel: string
  /** หัวข้อบรรทัดแรก (มักเป็น EN uppercase) */
  titleLine1: string
  /** หัวข้อบรรทัดสอง */
  titleLine2: string
  /** คำอธิบายใต้หัวข้อ เช่น ภาษาไทย */
  description: string
}

const headerWrap =
  'flex max-w-2xl flex-col items-center gap-1.5 text-center sm:gap-2 md:max-w-3xl md:gap-2.5 lg:max-w-4xl'

const stepBadgeCls =
  'text-[0.65rem] font-bold tracking-[0.22em] text-[#4a4456]/75 min-[400px]:text-xs sm:text-sm md:text-base'

const titleCls =
  'text-balance text-lg font-bold leading-[1.12] tracking-tight text-[#4a4456] min-[400px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[clamp(1.875rem,3.2vmax+0.35rem,3.25rem)] 2xl:text-[clamp(2rem,3.4vmax+0.4rem,3.5rem)]'

const descCls =
  'text-pretty max-w-[min(100%,22rem)] px-1 text-xs leading-snug text-[#4a4456] min-[400px]:max-w-[min(100%,26rem)] min-[400px]:text-sm sm:max-w-xl sm:text-base md:max-w-2xl md:text-lg lg:text-xl'

export function KioskStepHeader({
  stepLabel,
  titleLine1,
  titleLine2,
  description,
}: KioskStepHeaderProps) {
  return (
    <header className={headerWrap}>
      <p className={stepBadgeCls}>{stepLabel}</p>
      <h1 className={titleCls}>
        <span className="block">{titleLine1}</span>
        <span className="block">{titleLine2}</span>
      </h1>
      <p className={descCls}>{description}</p>
    </header>
  )
}
