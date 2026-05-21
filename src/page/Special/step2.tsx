import { Link } from 'react-router-dom'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import {
  HEALTH_GOAL_QUERY_KEY,
  type HealthGoalId,
} from '../Health/healthGoalSelection'
import { KIOSK_STEP_GROUP_IMG_CLASS, KIOSK_STEP_HEADER_SECTION } from '../kioskStepLayout'
import {
  SPECIAL_SAND_BACKGROUND,
  SPECIAL_SAND_CONTENT_PAD,
  SPECIAL_SAND_SHELL_BASE,
} from './specialStepShell'

import blueSpringW from '../../assets/images/SVG/blueSpringW.svg'
import circleBlue from '../../assets/images/SVG/circleBlue.svg'
import page2towelblue from '../../assets/images/SVG/page2towelblue.svg'
import blueSpring from '../../assets/images/SVG/blueSpring.svg'
import blueSpringWs from '../../assets/images/SVG/blueSpringWs.svg'
import Group from '../../assets/images/SVG/Group.svg'

import {
  SPECIAL_STEP2_COLUMNS,
  SPECIAL_STEP2_HEADER,
} from './specialStepContent'
import { SpecialEnglishPill } from './SpecialEnglishPill'

/** ป้ายหัวข้อคอลัมน์ — โตตาม breakpoint (ไม่ใส่ bg ตรงนี้ ให้กำหนดสีต่อคอลัมน์) */
const goalTitlePill =
  'font-thai flex min-h-[3.5rem] shadow-md shadow-neutral-900/10 w-full items-center justify-center px-4 py-2 text-center text-xs font-bold leading-snug rounded-full sm:min-h-[4rem] sm:px-5 sm:text-sm md:min-h-[4.5rem] md:px-6 md:text-base lg:min-h-[5rem] lg:text-lg xl:min-h-[5.25rem] xl:text-xl'

/** สีพื้นหลังป้ายแต่ละคอลัมน์ — แก้ได้ที่นี่ */
const goalTitlePillCol1 = `${goalTitlePill} bg-yellow-400`
const goalTitlePillCol2 = `${goalTitlePill} bg-yellow-400`
const goalTitlePillCol3 = `${goalTitlePill} bg-yellow-400`

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

const SPECIAL_STEP2_PAGE_SHELL = SPECIAL_SAND_SHELL_BASE.replace(
  'items-stretch',
  'items-center',
)
  .replace(SPECIAL_SAND_BACKGROUND, '')
  .replace('overflow-x-clip', 'overflow-x-clip overflow-y-visible')

const specialStep2SandBg =
  `pointer-events-none absolute inset-0 z-0 ${SPECIAL_SAND_BACKGROUND}`

const specialStep2GroupBg =
  'pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-center'

export default function SpecialStep2() {
  return (
    <div className={`relative isolate ${SPECIAL_STEP2_PAGE_SHELL} min-h-0`}>
      <div aria-hidden className={specialStep2SandBg} />
      <div aria-hidden className={specialStep2GroupBg}>
        <img src={Group} alt="" className={KIOSK_STEP_GROUP_IMG_CLASS} />
      </div>

      <section
        className={`relative z-10 ${KIOSK_STEP_HEADER_SECTION}`}
        aria-label="หัวข้อ Special STEP 2"
      >
        <KioskStepHeader
          stepLabel={SPECIAL_STEP2_HEADER.stepLabel}
          titleLine1={SPECIAL_STEP2_HEADER.titleLine1}
          titleLine2={SPECIAL_STEP2_HEADER.titleLine2}
          description={SPECIAL_STEP2_HEADER.description}
        />
      </section>
      <div
        className={`relative z-10 flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22 lg:gap-8 lg:py-32 ${SPECIAL_SAND_CONTENT_PAD}`}
      >
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
                <InteractiveSpringImg src={page2towelblue} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePillCol1} parts={SPECIAL_STEP2_COLUMNS[0].pillParts} />
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
                <InteractiveSpringImg src={page2towelblue} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePillCol2} parts={SPECIAL_STEP2_COLUMNS[1].pillParts} />
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
                <InteractiveSpringImg src={page2towelblue} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePillCol3} parts={SPECIAL_STEP2_COLUMNS[2].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP2_COLUMNS[2].subtitle}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
