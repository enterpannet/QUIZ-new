import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { InteractiveSpringImg } from '../../components/InteractiveSpringImg'
import { KioskStepHeader } from '../../components/KioskStepHeader'

import blueSpringW from '../../assets/images/SVG/blueSpringW.svg'
import Bluemushrooms from '../../assets/images/SVG/Bluemushrooms.svg'
import DrinkBlue from '../../assets/images/SVG/DrinkBlue.svg'
import FoodBlue from '../../assets/images/SVG/FoodBlue.svg'
import SpecialSandFood from '../../assets/images/SVG/SpecialSandFood.svg'
/** ห่วง 4 ชั้น — Beverages ใช้ชุดเดียวกับ Food (เทียบ Health step3 ที่ใช้ Beverages.svg ร่วมกัน) */
import specialSandTowerFour from '../../assets/images/SVG/SpecialSandBeverages.svg'
import SpecialSandDiseasePrevention from '../../assets/images/SVG/SpecialSandDiseasePrevention.svg'
import condimentBlue from '../../assets/images/SVG/condimentBlue.svg'

import {
  HEALTH_GOAL_QUERY_KEY,
  parseHealthGoalId,
} from '../Health/healthGoalSelection'
import type { HealthCategoryId } from '../Health/healthCategorySelection'
import { buildHealthResultHref } from '../Health/healthResultCombo'
import {
  SPECIAL_STEP3_COLUMNS,
  SPECIAL_STEP3_HEADER,
} from './specialStepContent'
import { SPECIAL_SAND_PAGE_SHELL } from './specialStepShell'
import { SpecialEnglishPill } from './SpecialEnglishPill'

const goalTitlePill =
  'flex min-h-[3.5rem] shadow-md shadow-neutral-900/10 w-full items-center justify-center px-4 py-2 text-center text-xs font-bold leading-snug bg-neutral-100/50 rounded-full sm:min-h-[4rem] sm:px-5 sm:text-sm md:min-h-[4.5rem] md:px-6 md:text-base lg:min-h-[5rem] lg:text-lg xl:min-h-[5.25rem] xl:text-xl'

const goalSubtitle =
  'mt-1 max-w-[min(100%,22rem)] text-xs text-center text-neutral-900/90 sm:max-w-none sm:text-sm md:text-base lg:text-lg xl:text-xl'

const goalColumn =
  'flex min-h-0 min-w-0 flex-1 flex-col items-center md:h-full md:max-w-none'

const goalSpringStack =
  'flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 md:flex-1 md:justify-end lg:gap-2'

const imgSpringSm =
  'h-auto w-[4.25rem] object-contain sm:w-20 md:w-24 lg:w-36 xl:w-40 2xl:w-48'

const imgGoalHero =
  'h-auto w-24 object-contain sm:w-[6.75rem] md:w-36 lg:w-52 xl:w-56 2xl:w-64'

const goalTextBlock =
  'w-full shrink-0 touch-manipulation transition-transform duration-150 will-change-transform active:scale-[0.98]'

const SPECIAL_STEP3_PAGE_SHELL = SPECIAL_SAND_PAGE_SHELL.replace(
  'items-stretch',
  'items-center',
)

const goalColumnLink =
  'text-inherit no-underline rounded-xl focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 [-webkit-tap-highlight-color:transparent]'

export default function SpecialStep3() {
  const [searchParams] = useSearchParams()

  const selectedGoal = useMemo(
    () => parseHealthGoalId(searchParams.get(HEALTH_GOAL_QUERY_KEY)),
    [searchParams],
  )

  const resultHref = (category: HealthCategoryId) =>
    buildHealthResultHref(selectedGoal, category)

  return (
    <div className={`${SPECIAL_STEP3_PAGE_SHELL} min-h-0`}>
      <div className="flex w-full shrink-0 justify-center px-1">
        <KioskStepHeader
          stepLabel={SPECIAL_STEP3_HEADER.stepLabel}
          titleLine1={SPECIAL_STEP3_HEADER.titleLine1}
          titleLine2={SPECIAL_STEP3_HEADER.titleLine2}
          description={SPECIAL_STEP3_HEADER.description}
        />
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2 py-10 text-center sm:gap-4 sm:py-18 md:gap-6 md:py-22 lg:gap-8 lg:py-32">
        <div className="health-goal-col-grid mx-auto flex min-h-0 w-full max-w-[min(100%,120rem)] flex-1 flex-row flex-wrap items-start justify-center gap-1 px-1 sm:gap-2 sm:px-2 md:flex-nowrap md:items-stretch md:gap-3 md:px-4 lg:gap-5 lg:px-6 xl:gap-8 xl:px-8">
          {/* Food */}
          <Link
            to={resultHref(SPECIAL_STEP3_COLUMNS[0].category)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP3_COLUMNS[0].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={blueSpringW}
                  alt=""
                  className={`${imgSpringSm} scale-x-[-1] -rotate-15`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={Bluemushrooms} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={SpecialSandFood} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP3_COLUMNS[0].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP3_COLUMNS[0].subtitle}</p>
            </div>
          </Link>
          {/* Seasonings */}
          <Link
            to={resultHref(SPECIAL_STEP3_COLUMNS[1].category)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP3_COLUMNS[1].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg src={blueSpringW} alt="" className={`${imgSpringSm} rotate-12`} />
              </div>
              <div>
                <InteractiveSpringImg src={condimentBlue} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={SpecialSandDiseasePrevention} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP3_COLUMNS[1].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP3_COLUMNS[1].subtitle}</p>
            </div>
          </Link>
          {/* Beverages */}
          <Link
            to={resultHref(SPECIAL_STEP3_COLUMNS[2].category)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP3_COLUMNS[2].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg src={blueSpringW} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={DrinkBlue} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg
                  src={specialSandTowerFour}
                  alt=""
                  className={imgGoalHero}
                />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP3_COLUMNS[2].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP3_COLUMNS[2].subtitle}</p>
            </div>
          </Link>
          {/* Snacks */}
          <Link
            to={resultHref(SPECIAL_STEP3_COLUMNS[3].category)}
            className={`health-goal-column ${goalColumn} ${goalColumnLink}`}
            aria-label={SPECIAL_STEP3_COLUMNS[3].ariaLabel}
          >
            <div className={`${goalSpringStack} spring-float-stagger`}>
              <div>
                <InteractiveSpringImg
                  src={blueSpringW}
                  alt=""
                  className={`${imgSpringSm} rotate-15 scale-x-[-1]`}
                />
              </div>
              <div>
                <InteractiveSpringImg src={FoodBlue} alt="" className={imgSpringSm} />
              </div>
              <div>
                <InteractiveSpringImg src={SpecialSandDiseasePrevention} alt="" className={imgGoalHero} />
              </div>
            </div>
            <div className={goalTextBlock}>
              <SpecialEnglishPill className={goalTitlePill} parts={SPECIAL_STEP3_COLUMNS[3].pillParts} />
              <p className={goalSubtitle}>{SPECIAL_STEP3_COLUMNS[3].subtitle}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
