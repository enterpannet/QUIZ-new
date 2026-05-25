import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
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
import { trackKioskButton } from '../../lib/kioskMetrics'
import { warmPdfCache, warmPdfCacheBatch } from '../../lib/pdfCache'
import { buildQrDownloadAbsoluteUrl } from '../qr-download/qrDownloadRoute'
import { downloadSinglePdfUrl } from '../healthResultDownload'
import {
  HEALTH_RESULT_FOOTER_ACTIONS_ROW,
  HEALTH_RESULT_FOOTER_BUTTON_CLASS,
  HEALTH_RESULT_CONTENT_PAD,
  HEALTH_RESULT_FOOTER_LINK_CLASS,
  HEALTH_RESULT_FOOTER_MOUNT,
  HEALTH_RESULT_MAIN_GROW,
  HEALTH_RESULT_PAGE_SHELL,
  resolveResultCataloguePdfUrl,
  resultCatalogueDownloadFilename,
} from '../healthResultNav'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import Group from '../../assets/images/SVG/Group.svg'
import { KIOSK_STEP_HEADER_SECTION } from '../kioskStepLayout'

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

  /** QR บนจอใหญ่ — ลิงก์ตรงไป catalogue PDF ให้มือถือเปิด/ดาวน์โหลดได้ */
  const resultQrShareUrl = useMemo(() => {
    const cataloguePath = resolveResultCataloguePdfUrl(goalId)
    if (!cataloguePath) return ''
    return buildQrDownloadAbsoluteUrl(cataloguePath, 'result')
  }, [goalId])

  const [downloading, setDownloading] = useState(false)

  const handleDownloadAll = useCallback(async () => {
    if (goalId == null) return
    const catalogueUrl = resolveResultCataloguePdfUrl(goalId)
    if (!catalogueUrl) return
    setDownloading(true)
    try {
      await downloadSinglePdfUrl(catalogueUrl, resultCatalogueDownloadFilename(goalId), {
        screen: 'result',
        goalId,
        categoryId: categoryId ?? '',
      })
    } finally {
      setDownloading(false)
    }
  }, [goalId, categoryId])

  /** prefetch PDF ของผลนี้ก่อน — object/iframe ไม่เข้า SW cache ต้อง fetch เอง */
  useEffect(() => {
    if (!entry?.products.length) return
    const catalogueUrl = resolveResultCataloguePdfUrl(goalId)
    if (catalogueUrl) warmPdfCache(catalogueUrl)
    void warmPdfCacheBatch(
      entry.products.map((p) => p.pdfUrl),
      { concurrency: 3 },
    )
  }, [entry, goalId])

  return (
    <div className={`${HEALTH_RESULT_PAGE_SHELL} min-h-0`}>
      {entry ? (
        <section
          className={`relative z-10 ${KIOSK_STEP_HEADER_SECTION}`}
          aria-label="หัวข้อผลการจับคู่"
        >
          <KioskStepHeader
            stepLabel=""
            hideStepLabel
            titleLine1="YOUR FUTURE"
            titleLine2="FOOD MATCH"
            description="จากคำตอบของคุณระบบได้ตัดเลือกกลุ่มผลิตภัณฑ์ Future Food ที่สอดคล้องกับสุขภาพ ไลฟ์สไตล์ และเป้าหมายของคุณ"
          />
        </section>
      ) : null}

      <div
        className={`relative z-10 mx-auto flex w-full max-w-[min(100%,92rem)] ${HEALTH_RESULT_MAIN_GROW} flex-col items-center gap-5 text-center md:gap-8 lg:gap-4 ${HEALTH_RESULT_CONTENT_PAD}`}
      >
        {entry ? (
          <Fragment>
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
                metricsMeta={{
                  screen: 'result',
                  ...(goalId != null ? { goalId } : {}),
                  ...(categoryId != null ? { categoryId } : {}),
                }}
              />
            </section>

            <img
              src={Group}
              alt=""
              loading="lazy"
              decoding="async"
              className="mx-auto mt-8 w-full max-w-4xl object-contain px-2 lg:mt-6 xl:mt-7"
            />
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

        <div className={`${HEALTH_RESULT_FOOTER_MOUNT} ${HEALTH_RESULT_FOOTER_ACTIONS_ROW}`}>
          <Link
            to="/"
            className={HEALTH_RESULT_FOOTER_LINK_CLASS}
            onClick={() => trackKioskButton('sorting_again', { screen: 'result' })}
          >
            Sorting Again
          </Link>

          {entry && goalId != null && resolveResultCataloguePdfUrl(goalId) ? (
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
