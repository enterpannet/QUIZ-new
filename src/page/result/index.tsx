import { Fragment, useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HealthResultDownloadQr } from '../../components/HealthResultDownloadQr'
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
import { useKioskQrLanding } from '../../hooks/useKioskQrLanding'
import { appendQrSourceToUrl, trackKioskButton } from '../../lib/kioskMetrics'
import { downloadListedPdfsSequentially } from '../healthResultDownload'
import {
  HEALTH_RESULT_FOOTER_ACTIONS_ROW,
  HEALTH_RESULT_FOOTER_BUTTON_CLASS,
  HEALTH_RESULT_FOOTER_LINK_CLASS,
  HEALTH_RESULT_PAGE_SHELL,
} from '../healthResultNav'
import Group from '../../assets/images/SVG/Group.svg'

export default function HealthResultPage() {
  const [searchParams] = useSearchParams()
  useKioskQrLanding('result')

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

  /** ลิงก์เดียวกับหน้านี้ — ใช้ใน QR บนจอใหญ่ (สแกนแล้วเปิดบนมือถือเพื่อดาวน์โหลด) */
  const resultShareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const qs = searchParams.toString()
    return `${window.location.origin}${window.location.pathname}${qs ? `?${qs}` : ''}`
  }, [searchParams])

  const resultQrShareUrl = useMemo(
    () => (resultShareUrl ? appendQrSourceToUrl(resultShareUrl) : ''),
    [resultShareUrl],
  )

  const [downloading, setDownloading] = useState(false)

  const handleDownloadAll = useCallback(async () => {
    if (!entry?.products?.length) return
    setDownloading(true)
    try {
      await downloadListedPdfsSequentially(entry.products, 140, {
        screen: 'result',
        goalId: goalId ?? '',
        categoryId: categoryId ?? '',
      })
    } finally {
      setDownloading(false)
    }
  }, [entry, goalId, categoryId])

  return (
    <div className={`${HEALTH_RESULT_PAGE_SHELL} min-h-0`}>
      <div className="flex max-w-[min(100%,92rem)] flex-1 flex-col items-center gap-5 px-4  text-center md:gap-8 ">
        {entry ? (
          <Fragment>
            <header className="flex flex-col gap-2 md:gap-3">
              <p className="font-heading text-xl font-bold tracking-[0.2em] text-neutral-800/75 md:text-6xl lg:text-8xl">
              YOUR FUTURE <br /> FOOD MATCH
              </p>
            <p className="font-thai text-sm md:text-base lg:text-lg">
              จากคำตอบของคุณระบบได้ตัดเลือกกลุ่มผลิตภัณฑ์ Future Food <br />
              ที่สอดคล้องกับสุขภาพ ไลฟ์สไตล์ และเป่าหมายของคุณ
            </p>
             
            </header>
            
            <section className="w-full self-stretch text-left">
              <HealthResultProductPdfSlider
                products={entry.products}
                detailsPdfLinkExtras={
                  goalId != null && categoryId != null
                    ? {
                        [HEALTH_GOAL_QUERY_KEY]: goalId,
                        [HEALTH_CATEGORY_QUERY_KEY]: categoryId,
                      }
                    : undefined
                }
              />
            </section>

            <img src={Group} alt="" className="mx-auto mt-8 w-full max-w-4xl object-contain px-2" />
          </Fragment>
        ) : (
          <div className="flex flex-col gap-4 text-neutral-900">
            <p className="font-thai text-lg font-bold sm:text-xl">ยังโหลดผลการจับคู่ไม่ได้</p>
            <p className="font-thai text-sm text-neutral-700 sm:text-base">
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

        <div className={`mt-auto ${HEALTH_RESULT_FOOTER_ACTIONS_ROW}`}>
          <Link
            to="/"
            className={HEALTH_RESULT_FOOTER_LINK_CLASS}
            onClick={() => trackKioskButton('sorting_again', { screen: 'result' })}
          >
            Sorting Again
          </Link>

          {entry ? (
            <>
              <button
                type="button"
                className={`${HEALTH_RESULT_FOOTER_BUTTON_CLASS} lg:hidden`}
                disabled={downloading}
                aria-busy={downloading}
                onClick={() => {
                  void handleDownloadAll()
                }}
              >
                {downloading ? 'Downloading…' : 'Download This Result'}
              </button>
              {resultQrShareUrl ? (
                <div className="hidden shrink-0 lg:block">
                  <HealthResultDownloadQr url={resultQrShareUrl} compact placement="result" />
                </div>
              ) : null}
            </>
          ) : null}

          <Link
            to="/end-session"
            className={HEALTH_RESULT_FOOTER_LINK_CLASS}
            onClick={() => trackKioskButton('end_session', { screen: 'result' })}
          >
            End session
          </Link>
        </div>
      </div>
    </div>
  )
}
