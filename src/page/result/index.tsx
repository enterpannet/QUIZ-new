import { Fragment, useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HealthResultDownloadQr } from '../../components/HealthResultDownloadQr'
import {
  HEALTH_CATEGORY_LABELS,
  HEALTH_CATEGORY_QUERY_KEY,
  parseHealthCategoryId,
} from '../Health/healthCategorySelection'
import { HealthResultProductPdfSlider } from '../../components/HealthResultProductPdfSlider'
import { getHealthResultEntry } from '../Health/healthResultData'
import { KIOSK_PROFILE_QUERY_KEY, toHealthResultComboKey, parseKioskCatalogueProfile } from '../Health/healthResultCombo'
import { useKioskQrLanding } from '../../hooks/useKioskQrLanding'
import { trackKioskButton } from '../../lib/kioskMetrics'
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
  resolveCataloguePdfUrlByProfile,
  catalogueDownloadFilenameByProfile,
} from '../healthResultNav'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import Group from '../../assets/images/SVG/Group.svg'
import { KIOSK_STEP_HEADER_SECTION } from '../kioskStepLayout'

export default function HealthResultPage() {
  const [searchParams] = useSearchParams()
  useKioskQrLanding('result')

  const parsed = useMemo(() => {
    const categoryId = parseHealthCategoryId(searchParams.get(HEALTH_CATEGORY_QUERY_KEY))
    const profile = parseKioskCatalogueProfile(searchParams.get(KIOSK_PROFILE_QUERY_KEY))
    let entry = undefined as ReturnType<typeof getHealthResultEntry>
    if (categoryId != null) {
      const comboKey = toHealthResultComboKey(profile, categoryId)
      if (comboKey) entry = getHealthResultEntry(comboKey)
    }
    return { categoryId, profile, entry }
  }, [searchParams])

  const { categoryId, profile, entry } = parsed

  const cataloguePdfUrl = resolveCataloguePdfUrlByProfile(profile)

  /** QR บนจอใหญ่ — ลิงก์ตรงไป catalogue PDF ให้มือถือเปิด/ดาวน์โหลดได้ */
  const resultQrShareUrl = useMemo(() => {
    if (!cataloguePdfUrl) return ''
    return buildQrDownloadAbsoluteUrl(cataloguePdfUrl, 'result')
  }, [cataloguePdfUrl])

  const [downloading, setDownloading] = useState(false)

  const handleDownloadAll = useCallback(async () => {
    if (profile == null || !cataloguePdfUrl) return
    setDownloading(true)
    try {
      await downloadSinglePdfUrl(cataloguePdfUrl, catalogueDownloadFilenameByProfile(profile), {
        screen: 'result',
        goalId: profile,
        categoryId: categoryId ?? '',
      })
    } finally {
      setDownloading(false)
    }
  }, [profile, cataloguePdfUrl, categoryId])

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
                  categoryId != null && profile != null
                    ? {
                        [HEALTH_CATEGORY_QUERY_KEY]: categoryId,
                        [KIOSK_PROFILE_QUERY_KEY]: profile,
                      }
                    : undefined
                }
                metricsMeta={{
                  screen: 'result',
                  ...(profile != null ? { goalId: profile } : {}),
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
              <code className="rounded bg-neutral-200/90 px-1">{HEALTH_CATEGORY_QUERY_KEY}</code> จาก STEP 3 และ{' '}
              <code className="rounded bg-neutral-200/90 px-1">{KIOSK_PROFILE_QUERY_KEY}</code> ตามเส้นทางสี (medical / personalised).
            </p>
            {!profile && categoryId ? (
              <p className="text-sm text-amber-900/90">
                พบเฉพาะหมวด &quot;{HEALTH_CATEGORY_LABELS[categoryId].titleTh}&quot; — ยังไม่ระบุ catalogue profile
              </p>
            ) : null}
            {profile && !categoryId ? (
              <p className="text-sm text-amber-900/90">
                พบเฉพาะเส้นทาง — ยังไม่ได้เลือกหมวดจาก STEP 3
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

          {entry && cataloguePdfUrl ? (
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
