import blueSpring from '../assets/images/SVG/blueSpring.svg'
import circleBlue from '../assets/images/SVG/circleBlue.svg'
import circleGreen from '../assets/images/SVG/circleGreen.svg'
import greenSpring from '../assets/images/SVG/greenSpring.svg'
import SpecialBlue from '../assets/images/SVG/SpecialBlue.svg'
import SpecialGreen from '../assets/images/SVG/SpecialGreen.svg'
import touchHint from '../assets/images/SVG/touch-svgrepo-com.svg'
import { InteractiveSpringImg } from '../components/InteractiveSpringImg'
import { KioskStepHeader } from '../components/KioskStepHeader'
import { KIOSK_STEP_CONTENT_PAD, KIOSK_STEP_HEADER_SECTION } from './kioskStepLayout'
import { Link } from 'react-router-dom'

const page3HeaderCopy = {
  stepLabel: 'STEP 1',
  titleLine1: 'SELECT YOUR',
  titleLine2: 'HEALTH PROFILE',
  description:
    'เลือกสถานะสุขภาพของคุณ วันนี้คุณต้องการดูแลสุขภาพในมุมไหน?',
} as const

const pageShell =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:py-5 max-xl:pb-6 max-xl:md:gap-9 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:py-10 xl:sm:pb-10'

const choiceIconSm =
  'object-contain h-auto w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 2xl:w-40 min-[400px]:h-20 min-[400px]:w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40'

const staggerSlot = 'flex w-full shrink-0 justify-center'

const choiceHeroImg =
  'h-auto w-[7rem] object-contain min-[400px]:w-28 sm:w-[10rem] md:w-[13rem] lg:w-[16rem] xl:w-[18rem] 2xl:w-[17rem]'

const tapHintImgCls =
  'pointer-events-none h-8 w-auto max-w-[4.5rem] object-contain drop-shadow-[0_1px_4px_rgb(212_212_212/0.55)] sm:h-9 md:h-10 lg:h-11 xl:h-12'

export default function Page3() {
  return (
    <div className={`${pageShell} kiosk-enter`}>
      <section
        className={`kiosk-enter-item ${KIOSK_STEP_HEADER_SECTION}`}
        aria-label="หัวข้อ STEP 1"
      >
        <KioskStepHeader
          stepLabel={page3HeaderCopy.stepLabel}
          titleLine1={page3HeaderCopy.titleLine1}
          titleLine2={page3HeaderCopy.titleLine2}
          description={page3HeaderCopy.description}
        />
      </section>

      <div
        className={`kiosk-enter flex min-h-0 w-full flex-1 flex-col items-center gap-5 overflow-x-clip py-2 min-[400px]:gap-6 sm:gap-8 sm:py-4 md:gap-10 md:py-5 lg:gap-12 lg:py-6 ${KIOSK_STEP_CONTENT_PAD}`}
      >
        <div className="kiosk-enter-cols flex w-full max-w-[min(100%,40rem)] flex-row items-stretch justify-center gap-2 px-0.5 min-[390px]:gap-3 min-[400px]:max-w-[min(100%,44rem)] sm:gap-5 md:max-w-3xl md:gap-8 lg:max-w-4xl lg:gap-12 xl:max-w-5xl xl:gap-16 2xl:max-w-6xl 2xl:gap-20">
          <Link
            to="/health/step2"
            className="flex min-h-0 min-w-0 flex-1 touch-manipulation flex-col items-center gap-3 self-stretch rounded-2xl px-2 py-2 text-inherit no-underline [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700 sm:gap-4 sm:px-3 sm:py-3 md:py-4"
            aria-labelledby="page3-option-green-title"
          >
            <div className="spring-float-stagger flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5">
              <div className={staggerSlot}>
                <InteractiveSpringImg src={greenSpring} alt="" className={choiceIconSm} />
              </div>
              <div className={staggerSlot}>
                <InteractiveSpringImg src={circleGreen} alt="" className={choiceIconSm} />
              </div>
              <div className={staggerSlot}>
                <InteractiveSpringImg src={SpecialGreen} alt="" className={choiceHeroImg} />
              </div>
            </div>
            <div id="page3-option-green-title" className="flex flex-col items-center gap-1 text-center text-[#4a4456]">
              <h2 className="font-heading text-sm font-bold leading-tight sm:text-base md:text-lg lg:text-xl">
                <span className="block">Special</span>
                <span className="block">Health Needs</span>
              </h2>
              <p className="font-thai max-w-[15.5rem] text-[0.7rem] leading-snug sm:max-w-[18rem] sm:text-xs md:max-w-none md:text-sm lg:text-base">
                มีภาวะสุขภาพที่ต้องดูแลเป็นพิเศษ
              </p>
            </div>
            <div className="tap-hand-hint mt-auto flex shrink-0 justify-center pt-2 sm:pt-2.5 md:pt-3" aria-hidden>
              <img src={touchHint} alt="" width={512} height={512} draggable={false} className={tapHintImgCls} />
            </div>
          </Link>

          <Link
            to="/special/step2"
            className="flex min-h-0 min-w-0 flex-1 touch-manipulation flex-col items-center gap-3 self-stretch rounded-2xl px-2 py-2 text-inherit no-underline [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700 sm:gap-4 sm:px-3 sm:py-3 md:py-4"
            aria-labelledby="page3-option-blue-title"
          >
            <div className="spring-float-stagger spring-float-stagger--bottom flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5">
              <div className={staggerSlot}>
                <InteractiveSpringImg src={blueSpring} alt="" className={choiceIconSm} />
              </div>
              <div className={staggerSlot}>
                <InteractiveSpringImg src={circleBlue} alt="" className={choiceIconSm} />
              </div>
              <div className={staggerSlot}>
                <InteractiveSpringImg src={SpecialBlue} alt="" className={choiceHeroImg} />
              </div>
            </div>
            <div id="page3-option-blue-title" className="flex flex-col items-center gap-1 text-center text-[#4a4456]">
              <h2 className="font-heading text-sm font-bold leading-tight sm:text-base md:text-lg lg:text-xl">
                <span className="block">Health &</span>
                <span className="block">Wellness Support</span>
              </h2>
              <p className="font-thai max-w-[15.5rem] text-[0.7rem] leading-snug sm:max-w-[18rem] sm:text-xs md:max-w-none md:text-sm lg:text-base">
                ต้องการดูแลสุขภาพและเสริมสุขภาวะ
              </p>
            </div>
            <div className="tap-hand-hint mt-auto flex shrink-0 justify-center pt-2 sm:pt-2.5 md:pt-3" aria-hidden>
              <img src={touchHint} alt="" width={512} height={512} draggable={false} className={tapHintImgCls} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
