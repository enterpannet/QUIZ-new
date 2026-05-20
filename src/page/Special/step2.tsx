import { Link } from 'react-router-dom'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import {
  HEALTH_GOAL_QUERY_KEY,
  type HealthGoalId,
} from '../Health/healthGoalSelection'
import { SPECIAL_SAND_PAGE_SHELL } from './specialStepShell'

import blueSpringW from '../../assets/images/SVG/blueSpringW.svg'
import circleBlue from '../../assets/images/SVG/circleBlue.svg'
import DiseasePreventionHero from '../../assets/images/SVG/SpecialSandDiseasePrevention.svg'
import PerformanceSupportHero from '../../assets/images/SVG/SpecialSandPerformanceSupport.svg'
import blueSpring from '../../assets/images/SVG/blueSpring.svg'
import blueSpringWs from '../../assets/images/SVG/blueSpringWs.svg'

import {
  SPECIAL_STEP2_COLUMNS,
  SPECIAL_STEP2_HEADER,
} from './specialStepContent'
import { SpecialEnglishPill } from './SpecialEnglishPill'

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

/** กลุ่มป้าย — แตะแล้วย่อเล็กน้อย */
const goalTextBlock =
  'w-full shrink-0 touch-manipulation transition-transform duration-150 will-change-transform active:scale-[0.98]'

function specialStep3Href(goal: HealthGoalId) {
  const p = new URLSearchParams({ [HEALTH_GOAL_QUERY_KEY]: goal })
  return `/special/step3?${p.toString()}`
}

const goalColumnLink =
  'text-inherit no-underline rounded-xl focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 [-webkit-tap-highlight-color:transparent]'

const SPECIAL_STEP2_PAGE_SHELL = SPECIAL_SAND_PAGE_SHELL.replace(
  'items-stretch',
  'items-center',
)

export default function SpecialStep2() {
  return (
    <div className={`${SPECIAL_STEP2_PAGE_SHELL} min-h-0`}>
      <div className="flex w-full shrink-0 justify-center px-1">
        <KioskStepHeader
          stepLabel={SPECIAL_STEP2_HEADER.stepLabel}
          titleLine1={SPECIAL_STEP2_HEADER.titleLine1}
          titleLine2={SPECIAL_STEP2_HEADER.titleLine2}
          description={SPECIAL_STEP2_HEADER.description}
        />
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22 lg:gap-8 lg:py-32">
        <div className="health-goal-col-grid mx-auto flex min-h-0 w-full max-w-[min(100%,92rem)] flex-1 flex-row items-start gap-1 px-1 sm:gap-2 sm:px-2 md:items-stretch md:gap-5 md:px-4 lg:gap-8 lg:px-6 xl:gap-12 xl:px-8">
          <Link
            to={specialStep3Href(SPECIAL_STEP2_COLUMNS[0].goal)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP2_COLUMNS[0].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={blueSpringW}
                  alt=""
                  className={`${imgSpringSm} scale-x-[-1]`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={circleBlue} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={DiseasePreventionHero} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP2_COLUMNS[0].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP2_COLUMNS[0].subtitle}</p>
            </div>
          </Link>
          <Link
            to={specialStep3Href(SPECIAL_STEP2_COLUMNS[1].goal)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP2_COLUMNS[1].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg src={blueSpring} alt="" className={`${imgSpringSm} rotate-10`} />
              </div>
              <div>
                <InteractiveSpringImg src={blueSpringWs} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={PerformanceSupportHero} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP2_COLUMNS[1].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP2_COLUMNS[1].subtitle}</p>
            </div>
          </Link>
          <Link
            to={specialStep3Href(SPECIAL_STEP2_COLUMNS[2].goal)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP2_COLUMNS[2].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={blueSpringW}
                  alt=""
                  className={`${imgSpringSm} scale-x-[-1]`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={circleBlue} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={PerformanceSupportHero} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP2_COLUMNS[2].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP2_COLUMNS[2].subtitle}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
