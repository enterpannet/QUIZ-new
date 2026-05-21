import logo2 from '../assets/images/SVG/logo2.svg'
import logo3 from '../assets/images/SVG/logo3.svg'

/** ความสูงแถบคงที่ — รูปเต็มความสูงภายใน */
const NAVBAR_FIXED_H =
  'h-[4.5rem] sm:h-[5.25rem] md:h-[6.25rem] lg:h-[6.75rem] xl:h-[7.5rem]'

const LOGO_IN_BAR = 'h-full max-h-full w-auto object-contain'

export function KioskNavbar() {
  return (
    <header
      className={`flex shrink-0 items-center justify-between gap-1.5 border-b border-neutral-200 bg-white px-2 py-0 sm:gap-2 sm:px-3 md:gap-2.5 md:px-4 ${NAVBAR_FIXED_H}`}
      role="banner"
    >
      <div className="flex h-full min-w-0 flex-1 items-center justify-start overflow-hidden">
        <img
          src="/logo1.svg"
          alt=""
          width={400}
          height={100}
          decoding="async"
          loading="eager"
          className={`kiosk-spring-img ${LOGO_IN_BAR} max-w-[min(88vw,520px)] object-left`}
        />
      </div>
      <div className="flex h-full shrink-0 items-center justify-end gap-1.5 overflow-hidden sm:gap-2 md:gap-3">
        <img
          src={logo2}
          alt=""
          width={400}
          height={100}
          decoding="async"
          loading="eager"
          className={`kiosk-spring-img ${LOGO_IN_BAR} max-w-[min(34vw,240px)] sm:max-w-[min(38vw,260px)] md:max-w-[min(40vw,280px)]`}
        />
        <img
          src={logo3}
          alt=""
          width={400}
          height={100}
          decoding="async"
          loading="eager"
          className={`kiosk-spring-img ${LOGO_IN_BAR} max-w-[min(34vw,240px)] sm:max-w-[min(38vw,260px)] md:max-w-[min(40vw,280px)]`}
        />
      </div>
    </header>
  )
}
