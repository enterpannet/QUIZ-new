import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HEALTH_SAND_PAGE_SHELL } from './healthStepShell'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import greenSpringW from '../../assets/images/SVG/greenSpringW.svg'
import greenSpring from '../../assets/images/SVG/greenSpring.svg'
import Beverages from '../../assets/images/SVG/Beverages.svg'
import Greenmushrooms from '../../assets/images/SVG/Greenmushrooms.svg'
import DrinkGreen from '../../assets/images/SVG/DrinkGreen.svg'
import FoodGreen from '../../assets/images/SVG/FoodGreen.svg'
import {
  HEALTH_GOAL_QUERY_KEY,
  parseHealthGoalId,
} from './healthGoalSelection'
import type { HealthCategoryId } from './healthCategorySelection'
import { buildHealthResultHref } from './healthResultCombo'
/** ป้ายหัวข้อคอลัมน์ — โตตาม breakpoint */
const goalTitlePill =
  'flex min-h-[3.5rem] shadow-md shadow-neutral-900/10 w-full items-center justify-center px-4 py-2 text-center text-xs font-bold leading-snug bg-neutral-100/50 rounded-full sm:min-h-[4rem] sm:px-5 sm:text-sm md:min-h-[4.5rem] md:px-6 md:text-base lg:min-h-[5rem] lg:text-lg xl:min-h-[5.25rem] xl:text-xl'

const goalSubtitle =
  'mt-1 max-w-[min(100%,22rem)] text-xs text-center text-neutral-900/90 sm:max-w-none sm:text-sm md:text-base lg:text-lg xl:text-xl'

/** คอลัมน์ — มือถือจัดชิดขอบล่างแถวให้ป้ายระดับเดียวกัน; md+ ยืดเต็มความสูง */
const goalColumn =
  'flex min-h-0 min-w-0 flex-1 flex-col items-center md:h-full'

const goalSpringStack =
  'flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 md:flex-1 md:justify-end lg:gap-2'

/** สปริงเล็ก */
const imgSpringSm =
  'h-auto w-[4.25rem] object-contain sm:w-20 md:w-24 lg:w-36 xl:w-40 2xl:w-48'

/** ไอคอนตัวใหญ่คอลัมน์ */
const imgGoalHero =
  'h-auto w-24 object-contain sm:w-[6.75rem] md:w-36 lg:w-52 xl:w-56 2xl:w-64'

/** กลุ่มป้าย — แตะแล้วย่อเล็กน้อย (ทำง用品กับแอนิเมชันเข้า) */
const goalTextBlock =
  'w-full shrink-0 touch-manipulation transition-transform duration-150 will-change-transform active:scale-[0.98]'


/** พื้นทราย — จัดคอลัมน์หลักให้อยู่กลางแนวนอน (ไม่ใช้ items-stretch ที่ดึงบล็อกให้เต็มความกว้างจนดูไม่กึ่งกลาง) */
const HEALTH_STEP3_PAGE_SHELL = HEALTH_SAND_PAGE_SHELL.replace(
  'items-stretch',
  'items-center',
)

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
    <div className={`${HEALTH_STEP3_PAGE_SHELL} min-h-0`}>
      <div className="flex w-full shrink-0 justify-center px-1">
        <KioskStepHeader
          stepLabel="STEP 3"
          titleLine1="SELECT YOUR"
          titleLine2="HEALTH CATEGORY"
          description='เลือกกลุ่มผลิตภัณฑ์ที่สนใจ คุณกำลังมองหาผลิตภัณฑ์สุขภาพประเภทใด?'
        />
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22  lg:gap-8 lg:py-32">

        <div className='health-goal-col-grid mx-auto flex min-h-0 w-full max-w-[min(100%,92rem)] flex-1 flex-row items-start gap-1 px-1 sm:gap-2 sm:px-2 md:items-stretch md:gap-5 md:px-4 lg:gap-8 lg:px-6 xl:gap-12 xl:px-8'>
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
                  src={Beverages}
                  alt=""
                  className={imgGoalHero}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePill}>
               Food
              </p>
              <p className={goalSubtitle}>อาหาร</p>
            </div>
          </Link>
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
                <InteractiveSpringImg src={Beverages} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePill}>
               Beverages
              </p>
              <p className={goalSubtitle}>เครื่องดื่ม</p>
            </div>
          </Link>
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
                <InteractiveSpringImg src={Beverages} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePill}>
                Snacks
              </p>
              <p className={goalSubtitle}>ขนมทานเล่น</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
