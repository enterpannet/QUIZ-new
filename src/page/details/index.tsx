import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HealthResultDownloadQr } from '../../components/HealthResultDownloadQr'
import circleBlueBlank from '../../assets/images/SVG/circleBlueBlank.svg'
import circleGreenBlank from '../../assets/images/SVG/circleGreenBlank.svg'
import { HEALTH_CATEGORY_QUERY_KEY, parseHealthCategoryId } from '../Health/healthCategorySelection'
import { KIOSK_PROFILE_QUERY_KEY, parseKioskCatalogueProfile } from '../Health/healthResultCombo'
import { useKioskQrLanding } from '../../hooks/useKioskQrLanding'
import { trackKioskButton } from '../../lib/kioskMetrics'
import { buildQrDownloadAbsoluteUrl } from '../qr-download/qrDownloadRoute'
import { downloadSinglePdfUrl } from '../healthResultDownload'
import {
  HEALTH_RESULT_FOOTER_ACTIONS_ROW,
  HEALTH_RESULT_FOOTER_BAR,
  HEALTH_RESULT_FOOTER_BUTTON_CLASS,
  HEALTH_RESULT_FOOTER_LINK_CLASS,
  HEALTH_RESULT_FOOTER_MOUNT,
} from '../healthResultNav'
import {
  DETAILS_PDF_TITLE_QUERY_KEY,
  DETAILS_PDF_URL_QUERY_KEY,
  parseSafeEmbeddedHealthPdfPath,
} from './detailsPdfRoute'

const DETAILS_PAGE_SHELL =
  'relative flex min-h-0 w-full flex-1 flex-col overflow-x-clip text-neutral-900'

/** ผลัดสลับวงเขียว/น้ำเงิน — โชว์สีจาก SVG เต็มที่ (ไม่ลดความเข้มด้วย opacity) */
const BACKDROP_TILE_CLASSES =
  'h-[clamp(5rem,min(22vmin,13rem),12rem)] w-[clamp(5rem,min(22vmin,13rem),12rem)] flex-shrink-0 object-contain select-none'
const BACKDROP_TILE_COUNT = 260

function DetailsCircleBlankBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white">
      <div className="flex min-h-[125%] min-w-[118%] -translate-x-[4%] -translate-y-[2%] flex-wrap content-start justify-center gap-0">
        {Array.from({ length: BACKDROP_TILE_COUNT }, (_, i) => (
          <img
            key={i}
            src={i % 2 === 0 ? circleGreenBlank : circleBlueBlank}
            alt=""
            draggable={false}
            className={BACKDROP_TILE_CLASSES}
          />
        ))}
      </div>
    </div>
  )
}

/** พื้นที่ฝัง PDF — จอเล็กใช้ความกว้างเต็มที่ จอใหญ่ (lg+) ขนาด A5 แนวตั้ง 148×210mm */
const pdfCardShell =
  'flex shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xl w-full max-w-[min(100%-0.75rem,24rem)] sm:max-w-lg md:max-w-xl lg:w-[min(148mm,calc((100dvh-11rem)*148/210),calc(100%-1.5rem))] lg:max-w-none lg:border-neutral-300/90'
const pdfCardHeight =
  'h-[min(76dvh,34rem)] sm:h-[min(72dvh,36rem)] md:h-[min(68dvh,38rem)] lg:h-auto lg:aspect-[148/210]'

/** ความกว้างแถบหัว — จอใหญ่ให้เท่ากับการ์ด A5 */
const pdfToolbarRowClass =
  'flex w-full max-w-[min(94%,46rem)] shrink-0 items-center justify-start gap-3 px-1 lg:max-w-[min(148mm,calc((100dvh-11rem)*148/210),calc(100%-1.5rem))] lg:w-[min(148mm,calc((100dvh-11rem)*148/210),calc(100%-1.5rem))]'

export default function DetailsPage() {
  const [searchParams] = useSearchParams()
  useKioskQrLanding('details')

  const [downloading, setDownloading] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(true)

  const pdfRaw = searchParams.get(DETAILS_PDF_URL_QUERY_KEY)
  const pdfPath = useMemo(() => parseSafeEmbeddedHealthPdfPath(pdfRaw), [pdfRaw])
  const pathNoHash = pdfPath ? pdfPath.split('#')[0] : null

  const titleQuoted = searchParams.get(DETAILS_PDF_TITLE_QUERY_KEY) ?? ''
  const titleDisplay = titleQuoted.trim() || 'PDF datasheet'

  const categoryId = parseHealthCategoryId(searchParams.get(HEALTH_CATEGORY_QUERY_KEY))
  const profile = parseKioskCatalogueProfile(searchParams.get(KIOSK_PROFILE_QUERY_KEY))

  const backToResultHref =
    categoryId != null && profile != null
      ? `/health/result?${new URLSearchParams({
          [HEALTH_CATEGORY_QUERY_KEY]: categoryId,
          [KIOSK_PROFILE_QUERY_KEY]: profile,
        })}`
      : '/health/result'

  /** QR บนจอใหญ่ — ลิงก์ตรงไปไฟล์ PDF (เหมือน result/end-session) ให้มือถือเปิด/ดาวน์โหลดได้ */
  const detailsQrShareUrl = useMemo(() => {
    if (!pathNoHash) return ''
    return buildQrDownloadAbsoluteUrl(pathNoHash, 'details')
  }, [pathNoHash])

  const handleDownloadCurrent = useCallback(async () => {
    if (!pathNoHash) return
    const stem =
      decodeURIComponent(pathNoHash.split('/').pop() ?? 'document.pdf').replace(/\.pdf$/i, '') || 'document'
    setDownloading(true)
    try {
      await downloadSinglePdfUrl(pathNoHash, stem, {
        screen: 'details',
        goalId: profile ?? '',
        categoryId: categoryId ?? '',
      })
    } finally {
      setDownloading(false)
    }
  }, [pathNoHash, profile, categoryId])

  const objectSrc =
    pathNoHash != null ? `${pathNoHash}#toolbar=0&navpanes=0&view=Fit` : ''

  useEffect(() => {
    if (!pathNoHash) {
      setPdfLoading(false)
      return
    }

    setPdfLoading(true)
    const timeoutId = window.setTimeout(() => {
      setPdfLoading(false)
    }, 15_000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [pathNoHash])

  const footer = (
    <div className={`${HEALTH_RESULT_FOOTER_BAR} ${HEALTH_RESULT_FOOTER_MOUNT}`}>
      <div className={`mx-auto ${HEALTH_RESULT_FOOTER_ACTIONS_ROW}`}>
        <Link
          to="/"
          className={HEALTH_RESULT_FOOTER_LINK_CLASS}
          onClick={() => trackKioskButton('sorting_again', { screen: 'details' })}
        >
          Sorting Again
        </Link>

        {pathNoHash ? (
          <>
            <button
              type="button"
              className={`${HEALTH_RESULT_FOOTER_BUTTON_CLASS} lg:hidden`}
              disabled={downloading}
              aria-busy={downloading}
              onClick={() => {
                void handleDownloadCurrent()
              }}
            >
              {downloading ? 'Downloading…' : 'Download This Result'}
            </button>
            {detailsQrShareUrl ? (
              <div className="hidden shrink-0 lg:block">
                <HealthResultDownloadQr url={detailsQrShareUrl} compact placement="details" />
              </div>
            ) : null}
          </>
        ) : (
          <button
            type="button"
            className={HEALTH_RESULT_FOOTER_BUTTON_CLASS}
            disabled
          >
            Download This Result
          </button>
        )}

        <Link
          to="/end-session"
          className={HEALTH_RESULT_FOOTER_LINK_CLASS}
          onClick={() => trackKioskButton('end_session', { screen: 'details' })}
        >
          End session
        </Link>
      </div>
    </div>
  )

  const hasPdf = Boolean(pdfPath && pathNoHash)

  return (
    <div className={DETAILS_PAGE_SHELL}>
      <DetailsCircleBlankBackdrop />

      {hasPdf ? (
        <div className="relative z-10 flex min-h-0 max-lg:flex-1 max-lg:justify-center flex-col items-center gap-4 px-3 py-4 sm:gap-5 sm:px-6 sm:py-6 lg:flex-none lg:justify-start lg:gap-5 lg:pb-2 lg:mt-50">
          <div className={pdfToolbarRowClass}>
            <Link
              to={backToResultHref}
              className="font-thai shrink-0 rounded-full border border-neutral-700 bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-900 no-underline shadow-sm transition-opacity active:opacity-80"
            >
              ← กลับไปที่คำตอบของคุณ
            </Link>
          </div>

          <h1 id="details-pdf-heading" className="sr-only">
            {titleDisplay}
          </h1>

          <div className={`${pdfCardShell} ${pdfCardHeight} relative`}>
            {pdfLoading ? (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-50"
                role="status"
                aria-live="polite"
                aria-busy="true"
                aria-label="กำลังโหลด PDF"
              >
                <div
                  className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-700"
                  aria-hidden
                />
                <p className="font-thai text-sm font-medium text-neutral-600">กำลังโหลด PDF…</p>
              </div>
            ) : null}
            <iframe
              key={pathNoHash}
              src={objectSrc}
              title={titleDisplay}
              className={`h-full min-h-0 w-full flex-1 border-0 bg-neutral-50 transition-opacity duration-300 ${pdfLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setPdfLoading(false)}
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <div className="max-w-lg space-y-2">
            <p className="font-thai text-lg font-bold text-neutral-900">ไม่พบไฟล์ที่จะเปิด</p>
            <p className="font-thai text-sm text-neutral-600">
              ลิงก์อาจไม่ถูกต้องหรือหมดเวลา — โปรดกลับไปเลือกการ์ดจากผลการจับคู่ใหม่
            </p>
          </div>
          <Link
            to={backToResultHref}
            className="font-thai text-sm font-semibold text-neutral-800 underline underline-offset-4"
          >
            กลับหน้าผลการจับคู่
          </Link>
        </div>
      )}

      <div
        aria-hidden
        className="min-h-0 w-full shrink grow basis-auto max-lg:max-h-0 lg:min-h-6 lg:max-h-[clamp(1.5rem,7vh,4rem)] xl:max-h-[clamp(2rem,9vh,5rem)]"
      />

      {footer}
    </div>
  )
}
