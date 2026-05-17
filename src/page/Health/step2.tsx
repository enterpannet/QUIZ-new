import { HEALTH_SAND_PAGE_SHELL } from './healthStepShell'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import { Link } from 'react-router-dom'
import {
  HEALTH_GOAL_QUERY_KEY,
  type HealthGoalId,
} from './healthGoalSelection'
import greenSpringW from '../../assets/images/SVG/greenSpringW.svg'
import circleGreen from '../../assets/images/SVG/circleGreen.svg'
import SymptomManagement from '../../assets/images/SVG/SymptomManagement.svg'
import greenSpring from '../../assets/images/SVG/greenSpring.svg'
import greenSpringWDS from '../../assets/images/SVG/greenSpringWDS.svg'
import Beverages from '../../assets/images/SVG/Beverages.svg'

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


/** นำทางไป step3 พร้อม ?goal= — ค่า slug สัมพันธ์กับ healthGoalSelection.ts */
function healthStep3Href(goal: HealthGoalId) {
  const p = new URLSearchParams({ [HEALTH_GOAL_QUERY_KEY]: goal })
  return `/health/step3?${p.toString()}`
}

const goalColumnLink =
  'text-inherit no-underline rounded-xl focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 [-webkit-tap-highlight-color:transparent]'

const HEALTH_STEP2_PAGE_SHELL = HEALTH_SAND_PAGE_SHELL.replace(
  'items-stretch',
  'items-center',
)

export default function HealthStep2() {
  return (
    <div className={`${HEALTH_STEP2_PAGE_SHELL} min-h-0`}>
      <div className="flex w-full shrink-0 justify-center px-1">
        <KioskStepHeader
          stepLabel="STEP 2"
          titleLine1="SELECT YOUR"
          titleLine2="HEALTH GOAL"
          description="เลือกเป้าหมายสุขภาพที่ต้องการดุแล เป้าหมายหลักของคุณคืออะไร?"
        />
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22  lg:gap-8 lg:py-32">

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
                  src={SymptomManagement}
                  alt=""
                  className={imgGoalHero}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePill}>
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
                <InteractiveSpringImg src={Beverages} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePill}>
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
                <InteractiveSpringImg src={Beverages} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <p className={goalTitlePill}>
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
