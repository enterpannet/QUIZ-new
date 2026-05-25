import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  KIOSK_HERO_IMG_INTRINSIC,
  KIOSK_STEP_GROUP_IMG_CLASS,
  KIOSK_STEP_HEADER_SECTION,
} from '../kioskStepLayout'
import {
  HEALTH_SAND_CONTENT_PAD,
  HEALTH_YELLOW_BACKGROUND,
  HEALTH_YELLOW_SHELL_BASE,
  HEALTH_YELLOW_TITLE_BAND_CLASS,
} from './healthStepShell'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import greenSpringW from '../../assets/images/SVG/greenSpringW.svg'
import greenSpring from '../../assets/images/SVG/greenSpring.svg'
import page3towel from '../../assets/images/SVG/page3towel.svg'
import Greenmushrooms from '../../assets/images/SVG/Greenmushrooms.svg'
import DrinkGreen from '../../assets/images/SVG/DrinkGreen.svg'
import FoodGreen from '../../assets/images/SVG/FoodGreen.svg'
import condimentGreen from '../../assets/images/SVG/condimentGreen.svg'
import Group from '../../assets/images/SVG/Group.svg'
import {
  HEALTH_GOAL_QUERY_KEY,
  parseHealthGoalId,
} from './healthGoalSelection'
import type { HealthCategoryId } from './healthCategorySelection'
import { buildHealthResultHref } from './healthResultCombo'
/** ป้ายหัวข้อคอลัมน์ — โตตาม breakpoint (ไม่ใส่ bg ตรงนี้ ให้กำหนดสีต่อคอลัมน์) */
const goalTitlePill =
  'font-thai flex min-h-[3.5rem] shadow-md shadow-neutral-900/10 w-full items-center justify-center px-4 py-2 text-center text-xs font-bold leading-snug rounded-full sm:min-h-[4rem] sm:px-5 sm:text-sm md:min-h-[4.5rem] md:px-6 md:text-base lg:min-h-[5rem] lg:text-lg xl:min-h-[5.25rem] xl:text-xl'

const goalTitlePillAccent = `${goalTitlePill} bg-[#badc4b]`

const goalSubtitle =
  'mt-1 max-w-[min(100%,22rem)] text-xs text-center text-neutral-900/90 sm:max-w-none sm:text-sm md:text-base lg:text-lg xl:text-xl'

/** คอลัมน์ — มือถือจัดชิดขอบล่างแถวให้ป้ายระดับเดียวกัน; md+ ยืดเต็มความสูง */
const goalColumn =
  'flex min-h-0 min-w-0 flex-1 flex-col items-center md:h-full md:max-w-none'

const goalSpringStack =
  'flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 md:flex-1 md:justify-end lg:gap-2'

/** สปริงเล็ก */
const imgSpringSm =
  'h-auto w-[4.25rem] object-contain sm:w-20 md:w-24 lg:w-36 xl:w-40 2xl:w-48'

/** ไอคอนตัวใหญ่คอลัมน์ */
const imgGoalHero =
  'h-auto w-24 max-w-full object-contain object-center sm:w-[6.75rem] md:w-36 lg:w-52 xl:w-56 2xl:w-64'


/** กลุ่มป้าย — แตะแล้วย่อเล็กน้อย (ทำง用品กับแอนิเมชันเข้า) */
const goalTextBlock =
  'w-full shrink-0 touch-manipulation transition-transform duration-150 will-change-transform active:scale-[0.98]'


/** shell ไม่ใส่พื้นหลัง — แยกเลเยอร์ให้ Group อยู่เหนือพื้นเหลือง */
const HEALTH_STEP3_PAGE_SHELL = HEALTH_YELLOW_SHELL_BASE.replace(
  'items-stretch',
  'items-center',
)
  .replace(HEALTH_YELLOW_BACKGROUND, '')
  .replace('overflow-x-clip', 'overflow-x-clip overflow-y-visible')

const healthStep3YellowBg =
  `pointer-events-none absolute inset-0 z-0 ${HEALTH_YELLOW_BACKGROUND}`

/** Group.svg ชิดล่าง — เหนือพื้นเหลือง ใต้เนื้อหา */
const healthStep3GroupBg =
  'pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-center'


const goalColumnLink =
  'text-inherit no-underline rounded-xl focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 [-webkit-tap-highlight-color:transparent]'

export default function HealthStep3() {
  const [searchParams] = useSearchParams()

  const selectedGoal = useMemo(
    () => parseHealthGoalId(searchParams.get(HEALTH_GOAL_QUERY_KEY)),
    [searchParams],
  )

  const resultHref = (category: HealthCategoryId) =>
    buildHealthResultHref(selectedGoal, category)

  return (
    <div className={`relative isolate ${HEALTH_STEP3_PAGE_SHELL} min-h-0`}>
      <div aria-hidden className={healthStep3YellowBg} />
      <div aria-hidden className={healthStep3GroupBg}>
        <img src={Group} alt="" className={KIOSK_STEP_GROUP_IMG_CLASS} />
      </div>

      <section
        className={`relative z-10 ${KIOSK_STEP_HEADER_SECTION}`}
        aria-label="หัวข้อ STEP 3"
      >
        <KioskStepHeader
          stepLabel="STEP 3"
          titleLine1="SELECT YOUR"
          titleLine2="HEALTH CATEGORY"
          description="เลือกกลุ่มผลิตภัณฑ์ที่สนใจ คุณกำลังมองหาผลิตภัณฑ์สุขภาพประเภทใด?"
          titleBandClassName={HEALTH_YELLOW_TITLE_BAND_CLASS}
        />
      </section>
      <div
        className={`relative z-10 flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22 lg:gap-8 lg:py-32 ${HEALTH_SAND_CONTENT_PAD}`}
      >

        <div className="health-goal-col-grid mx-auto flex min-h-0 w-full max-w-[min(100%,120rem)] flex-1 flex-row flex-wrap items-start justify-center gap-1 px-1 sm:gap-2 sm:px-2 md:flex-nowrap md:items-stretch md:gap-3 md:px-4 lg:gap-5 lg:px-6 xl:gap-8 xl:px-8">
          {/* Food */}
          <Link
            to={resultHref('food')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Food — ดูผลลัพธ์"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={greenSpringW}
                  alt=""
                  className={`${imgSpringSm} scale-x-[-1] -rotate-15`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={Greenmushrooms} alt="" className={`${imgSpringSm}`} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={page3towel}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillAccent}>Food</p>
              <p className={goalSubtitle}>อาหาร</p>
            </div>
          </Link>
          {/* Seasonings */}
          <Link
            to={resultHref('seasonings')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Seasonings — ดูผลลัพธ์"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg src={greenSpringW} alt="" className={`${imgSpringSm} rotate-12`} />
              </div>
              <div>
                <InteractiveSpringImg src={condimentGreen} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={page3towel}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillAccent}>Seasonings</p>
              <p className={goalSubtitle}>เครื่องปรุง</p>
            </div>
          </Link>
          {/* Beverages */}
          <Link
            to={resultHref('beverages')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Beverages — ดูผลลัพธ์"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={greenSpring}
                  alt=""
                  className={`${imgSpringSm}`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={DrinkGreen} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={page3towel}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillAccent}>Beverages</p>
              <p className={goalSubtitle}>เครื่องดื่ม</p>
            </div>
          </Link>
          {/* Snacks */}
          <Link
            to={resultHref('snacks')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Snacks — ดูผลลัพธ์"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg src={greenSpringW} alt="" className={`${imgSpringSm} rotate-15 scale-x-[-1]`} />
              </div>
              <div>
                <InteractiveSpringImg src={FoodGreen} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={page3towel}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillAccent}>Snacks</p>
              <p className={goalSubtitle}>ขนมทานเล่น</p>
            </div>
          </Link>
        </div>      </div>
    </div>
  )
}
