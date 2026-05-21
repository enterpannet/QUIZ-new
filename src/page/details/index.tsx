import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HealthResultDownloadQr } from '../../components/HealthResultDownloadQr'
import circleBlueBlank from '../../assets/images/SVG/circleBlueBlank.svg'
import circleGreenBlank from '../../assets/images/SVG/circleGreenBlank.svg'
import { HEALTH_CATEGORY_QUERY_KEY, parseHealthCategoryId } from '../Health/healthCategorySelection'
import { HEALTH_GOAL_QUERY_KEY, parseHealthGoalId } from '../Health/healthGoalSelection'
import { useKioskQrLanding } from '../../hooks/useKioskQrLanding'
import { appendQrSourceToUrl, trackKioskButton } from '../../lib/kioskMetrics'
import { downloadSinglePdfUrl } from '../healthResultDownload'
import {
  HEALTH_RESULT_FOOTER_ACTIONS_ROW,
  HEALTH_RESULT_FOOTER_BUTTON_CLASS,
  HEALTH_RESULT_FOOTER_LINK_CLASS,
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

/** พื้นที่ฝัง PDF: โมบายเลยใช้หน้าจอเกือบเต็ม จอใหญ่ย่อกลับกลาง (ไม่กินเต็มพื้นที่ความสูง) */
const pdfCardShell =
  'flex w-full max-w-[min(100%-0.75rem,24rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[min(94%,42rem)] xl:border-neutral-300/90 2xl:max-w-[min(94%,46rem)]'
const pdfCardHeight =
  'h-[min(76dvh,34rem)] sm:h-[min(72dvh,36rem)] md:h-[min(68dvh,38rem)] xl:h-[min(52vh,32rem)] 2xl:h-[min(48vh,34rem)]'

export default function DetailsPage() {
  const [searchParams] = useSearchParams()
  useKioskQrLanding('details')

  const [downloading, setDownloading] = useState(false)

  const pdfRaw = searchParams.get(DETAILS_PDF_URL_QUERY_KEY)
  const pdfPath = useMemo(() => parseSafeEmbeddedHealthPdfPath(pdfRaw), [pdfRaw])
  const pathNoHash = pdfPath ? pdfPath.split('#')[0] : null

  const titleQuoted = searchParams.get(DETAILS_PDF_TITLE_QUERY_KEY) ?? ''
  const titleDisplay = titleQuoted.trim() || 'PDF datasheet'

  const goalId = parseHealthGoalId(searchParams.get(HEALTH_GOAL_QUERY_KEY))
  const categoryId = parseHealthCategoryId(searchParams.get(HEALTH_CATEGORY_QUERY_KEY))

  const backToResultHref =
    goalId != null && categoryId != null
      ? `/health/result?${new URLSearchParams({
          [HEALTH_GOAL_QUERY_KEY]: goalId,
          [HEALTH_CATEGORY_QUERY_KEY]: categoryId,
        })}`
      : '/health/result'

  const fullOpenUrl = useMemo(() => {
    if (!pathNoHash) return ''
    const pathForAbsolute = pathNoHash.startsWith('/') ? pathNoHash : `/${pathNoHash}`
    return `${window.location.origin}${pathForAbsolute}`
  }, [pathNoHash])

  /** ลิงก์หน้า details ปัจจุบัน — QR บนจอใหญ่ให้สแกนเปิดบนมือถือแล้วดาวน์โหลด */
  const detailsShareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const qs = searchParams.toString()
    return `${window.location.origin}${window.location.pathname}${qs ? `?${qs}` : ''}`
  }, [searchParams])

  const detailsQrShareUrl = useMemo(
    () => (detailsShareUrl ? appendQrSourceToUrl(detailsShareUrl) : ''),
    [detailsShareUrl],
  )

  const handleDownloadCurrent = useCallback(async () => {
    if (!pathNoHash) return
    const stem =
      decodeURIComponent(pathNoHash.split('/').pop() ?? 'document.pdf').replace(/\.pdf$/i, '') || 'document'
    setDownloading(true)
    try {
      await downloadSinglePdfUrl(pathNoHash, stem, {
        screen: 'details',
        goalId: goalId ?? '',
        categoryId: categoryId ?? '',
      })
    } finally {
      setDownloading(false)
    }
  }, [pathNoHash, goalId, categoryId])

  const objectSrc =
    pathNoHash != null ? `${pathNoHash}#toolbar=0&navpanes=0&view=FitH` : ''

  const footer = (
    <div className="relative z-10 mt-auto shrink-0 w-full border-t border-neutral-200/95 bg-neutral-100 py-8">
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
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-3 py-6 sm:px-6 lg:gap-7 lg:py-10">
          <h1 id="details-pdf-heading" className="sr-only">
            {titleDisplay}
          </h1>

          <div className={`${pdfCardShell} ${pdfCardHeight}`}>
            <object
              type="application/pdf"
              data={objectSrc}
              title={titleDisplay}
              className="h-full min-h-0 w-full flex-1 bg-neutral-50"
            >
              <div className="flex h-full min-h-[10rem] flex-col items-center justify-center gap-3 bg-neutral-100 p-8 text-center text-neutral-900">
                <p className="font-thai max-w-xs text-sm">เบราว์เซอร์เปิดไฟล์ภายในไม่ได้</p>
                <a
                  href={fullOpenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-thai rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white no-underline"
                >
                  เปิด PDF ในแท็บใหม่
                </a>
              </div>
            </object>
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

      {footer}
    </div>
  )
}
