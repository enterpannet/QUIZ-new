import { Fragment, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  HEALTH_CATEGORY_LABELS,
  HEALTH_CATEGORY_QUERY_KEY,
  parseHealthCategoryId,
} from '../Health/healthCategorySelection'
import {
  HEALTH_GOAL_QUERY_KEY,
  parseHealthGoalId,
} from '../Health/healthGoalSelection'
import { HealthResultProductPdfSlider } from '../../components/HealthResultProductPdfSlider'
import { getHealthResultEntry } from '../Health/healthResultData'
import { toHealthComboKey } from '../Health/healthResultCombo'

const RESULT_PAGE_SHELL =
  'flex w-full max-w-none flex-1 flex-col items-center justify-start overflow-x-clip bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'

function step3BackHref(goalId: ReturnType<typeof parseHealthGoalId>) {
  if (goalId == null) return '/health/step3'
  return `/health/step3?${new URLSearchParams({ [HEALTH_GOAL_QUERY_KEY]: goalId })}`
}

export default function HealthResultPage() {
  const [searchParams] = useSearchParams()

  const parsed = useMemo(() => {
    const goalId = parseHealthGoalId(searchParams.get(HEALTH_GOAL_QUERY_KEY))
    const categoryId = parseHealthCategoryId(searchParams.get(HEALTH_CATEGORY_QUERY_KEY))
    let entry = undefined as ReturnType<typeof getHealthResultEntry>
    if (goalId != null && categoryId != null) {
      entry = getHealthResultEntry(toHealthComboKey(goalId, categoryId))
    }
    return { goalId, categoryId, entry }
  }, [searchParams])

  const { goalId, categoryId, entry } = parsed

  return (
    <div className={`${RESULT_PAGE_SHELL} min-h-0`}>
      <div className="flex max-w-[min(100%,48rem)] flex-1 flex-col items-center gap-5 px-4 py-10 text-center md:gap-8 md:py-14">
        {entry ? (
          <Fragment>
            <header className="flex flex-col gap-2 md:gap-3">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] text-neutral-800/75 sm:text-xs">
              YOUR FUTURE <br /> FOOD MATCH
              </p>
            
             
            </header>
            
            <section className="w-full self-stretch text-left">
              <h2 className="mb-2 text-sm font-bold tracking-wide text-neutral-900 sm:text-base">
                สินค้าในกลุ่มนี้ (สไลด์ครั้งละหนึ่ง PDF — {entry.products.length} รายการ)
              </h2>
              <HealthResultProductPdfSlider products={entry.products} />
            </section>
            <section className="w-full self-stretch text-left">
              <h2 className="mb-2 text-sm font-bold tracking-wide text-neutral-900 sm:text-base">
                เคล็ดลับ
              </h2>
              <ul className="list-inside list-disc space-y-2 text-sm text-neutral-800 sm:text-base">
                {entry.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          </Fragment>
        ) : (
          <div className="flex flex-col gap-4 text-neutral-900">
            <p className="text-lg font-bold sm:text-xl">ยังโหลดผลการจับคู่ไม่ได้</p>
            <p className="text-sm text-neutral-700 sm:text-base">
              ควรเข้ามาพร้อมพารามิเตอร์{' '}
              <code className="rounded bg-neutral-200/90 px-1">{HEALTH_GOAL_QUERY_KEY}</code> จาก STEP 2 และ{' '}
              <code className="rounded bg-neutral-200/90 px-1">{HEALTH_CATEGORY_QUERY_KEY}</code> จาก STEP 3{' '}
              (รูปแบบคีย์ใน JSON เช่น{' '}
              <code className="rounded bg-neutral-200/90 px-1 text-xs">
                {`${HEALTH_GOAL_QUERY_KEY}? + category`}
              </code>
              ).
            </p>
            {!goalId && categoryId ? (
              <p className="text-sm text-amber-900/90">
                พบเฉพาะหมวด &quot;{HEALTH_CATEGORY_LABELS[categoryId].titleTh}&quot; — กลับ STEP 2 เพื่อส่งเป้าหมาย
              </p>
            ) : null}
            {goalId && !categoryId ? (
              <p className="text-sm text-amber-900/90">
                พบเฉพาะเป้า — ยังไม่ได้เลือกหมวดจาก STEP 3
              </p>
            ) : null}
          </div>
        )}

        <div className="mt-auto flex flex-wrap justify-center gap-3 pt-6">
          <Link
            to={step3BackHref(goalId)}
            className="rounded-full border border-neutral-700 px-5 py-2 text-sm font-semibold text-neutral-900 no-underline transition-opacity active:opacity-80 md:text-base"
          >
            ← กลับ STEP 3
          </Link>
          <Link
            to="/health/step2"
            className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-50 no-underline transition-opacity active:opacity-85 md:text-base"
          >
            เลือกเป้าหมายใหม่
          </Link>
        </div>
      </div>
    </div>
  )
}
