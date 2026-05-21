import {
  HEALTH_SAND_BACKGROUND,
  HEALTH_SAND_CONTENT_PAD,
  HEALTH_SAND_SHELL_BASE,
} from './healthStepShell'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import {
  KIOSK_HERO_IMG_INTRINSIC,
  KIOSK_STEP_GROUP_IMG_CLASS,
  KIOSK_STEP_HEADER_SECTION,
  KIOSK_TITLE_BAND_CLASS,
} from '../kioskStepLayout'
import { Link } from 'react-router-dom'
import {
  HEALTH_GOAL_QUERY_KEY,
  type HealthGoalId,
} from './healthGoalSelection'
import greenSpringW from '../../assets/images/SVG/greenSpringW.svg'
import circleGreen from '../../assets/images/SVG/circleGreen.svg'
import page2towel from '../../assets/images/SVG/page2towel.svg'
import greenSpring from '../../assets/images/SVG/greenSpring.svg'
import greenSpringWDS from '../../assets/images/SVG/greenSpringWDS.svg'
import Beverages from '../../assets/images/SVG/Beverages.svg'
import Group from '../../assets/images/SVG/Group.svg'

/** ป้ายหัวข้อคอลัมน์ — โตตาม breakpoint (ไม่ใส่ bg ตรงนี้ ให้กำหนดสีต่อคอลัมน์) */
const goalTitlePill =
  'font-thai flex min-h-[3.5rem] shadow-md shadow-neutral-900/10 w-full items-center justify-center px-4 py-2 text-center text-xs font-bold leading-snug rounded-full sm:min-h-[4rem] sm:px-5 sm:text-sm md:min-h-[4.5rem] md:px-6 md:text-base lg:min-h-[5rem] lg:text-lg xl:min-h-[5.25rem] xl:text-xl'

const goalTitlePillYellow = `${goalTitlePill} bg-yellow-400`

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


/** นำทางไป step3 พร้อม ?goal= — ค่า slug สัมพันธ์กับ healthGoalSelection.ts */
function healthStep3Href(goal: HealthGoalId) {
  const p = new URLSearchParams({ [HEALTH_GOAL_QUERY_KEY]: goal })
  return `/health/step3?${p.toString()}`
}

const goalColumnLink =
  'text-inherit no-underline rounded-xl focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 [-webkit-tap-highlight-color:transparent]'

/** shell ไม่ใส่พื้นหลัง — แยกเลเยอร์ให้ Group อยู่เหนือ gradient */
const HEALTH_STEP2_PAGE_SHELL = HEALTH_SAND_SHELL_BASE.replace(
  'items-stretch',
  'items-center',
)
  .replace(HEALTH_SAND_BACKGROUND, '')
  .replace('overflow-x-clip', 'overflow-x-clip overflow-y-visible')

const healthStep2SandBg =
  `pointer-events-none absolute inset-0 z-0 ${HEALTH_SAND_BACKGROUND}`

/** Group.svg ชิดล่าง — เหนือพื้นทราย ใต้เนื้อหา ไม่ clip */
const healthStep2GroupBg =
  'pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-center'


export default function HealthStep2() {
  return (
    <div className={`relative isolate ${HEALTH_STEP2_PAGE_SHELL} min-h-0`}>
      <div aria-hidden className={healthStep2SandBg} />
      <div aria-hidden className={healthStep2GroupBg}>
        <img src={Group} alt="" className={KIOSK_STEP_GROUP_IMG_CLASS} />
      </div>

      <section
        className={`relative z-10 ${KIOSK_STEP_HEADER_SECTION}`}
        aria-label="หัวข้อ STEP 2"
      >
        <KioskStepHeader
          stepLabel="STEP 2"
          titleLine1="SELECT YOUR"
          titleLine2="HEALTH GOAL"
          description="เลือกเป้าหมายสุขภาพที่ต้องการดูแล เป้าหมายหลักของคุณคืออะไร?"
          titleBandClassName={KIOSK_TITLE_BAND_CLASS}
        />
      </section>
      <div
        className={`relative z-10 flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22 lg:gap-8 lg:py-32 ${HEALTH_SAND_CONTENT_PAD}`}
      >

        <div className='health-goal-col-grid mx-auto flex min-h-0 w-full max-w-[min(100%,92rem)] flex-1 flex-row items-start gap-1 px-1 sm:gap-2 sm:px-2 md:items-stretch md:gap-5 md:px-4 lg:gap-8 lg:px-6 xl:gap-12 xl:px-8'>
          <Link
            to={healthStep3Href('symptom-management')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Symptom Management — ไปขั้นถัดไป"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={greenSpringW}
                  alt=""
                  className={`${imgSpringSm} scale-x-[-1]`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={circleGreen} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={page2towel}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillYellow}>
                Symptom
                <br />
                Management
              </p>
              <p className={goalSubtitle}>ควบคุมอาการและลดภาวะแทรกซ้อน</p>
            </div>
          </Link>
          <Link
            to={healthStep3Href('nutritional-recovery')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Nutritional Recovery — ไปขั้นถัดไป"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={greenSpring}
                  alt=""
                  className={`${imgSpringSm} rotate-10`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={greenSpringWDS} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={Beverages}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillYellow}>
                Nutritional
                <br />
                Recovery
              </p>
              <p className={goalSubtitle}>ฟื้นฟูร่างกาย และภาวะโภชนาการ</p>
            </div>
          </Link>
          <Link
            to={healthStep3Href('quality-of-life')}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label="Quality of Life Support — ไปขั้นถัดไป"
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg src={greenSpringW} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={circleGreen} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={Beverages}
                  alt=""
                  className={imgGoalHero}
                  priority
                  {...KIOSK_HERO_IMG_INTRINSIC}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePillYellow}>
                Quality of
                <br />
                Life Support
              </p>
              <p className={goalSubtitle}>เสริมคุณภาพชีวิต</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
