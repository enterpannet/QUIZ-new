import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  KIOSK_METRICS_SOURCE_NFC,
  KIOSK_METRICS_SOURCE_QR,
  isNfcSourceLanding,
  isQrSourceLanding,
  parseDownloadSource,
  trackKioskEvent,
} from '../../lib/kioskMetrics'
import { resolvePdfFetchUrl } from '../../lib/pdfCache'
import { downloadSinglePdfUrl } from '../healthResultDownload'
import {
  parseSafeQrDownloadPdfPath,
  QR_DOWNLOAD_PDF_QUERY_KEY,
  QR_DOWNLOAD_PLACEMENT_KEY,
  type QrDownloadPlacement,
} from './qrDownloadRoute'

type QrDownloadState = 'loading' | 'done' | 'error'

const CLOSE_DELAY_MS = 700

function parsePlacement(raw: string | null): QrDownloadPlacement | 'unknown' {
  if (raw === 'result' || raw === 'details' || raw === 'end_session') return raw
  return 'unknown'
}

function tryClosePage() {
  window.close()
  window.setTimeout(() => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }
    window.location.replace('about:blank')
  }, 300)
}

export default function QrDownloadPage() {
  const [searchParams] = useSearchParams()
  const startedRef = useRef(false)
  const closeTimerRef = useRef<number | null>(null)
  const [state, setState] = useState<QrDownloadState>('loading')
  const [progress, setProgress] = useState(0)

  const pdfPath = useMemo(
    () => parseSafeQrDownloadPdfPath(searchParams.get(QR_DOWNLOAD_PDF_QUERY_KEY)),
    [searchParams],
  )
  const placement = useMemo(
    () => parsePlacement(searchParams.get(QR_DOWNLOAD_PLACEMENT_KEY)),
    [searchParams],
  )
  const downloadSource = useMemo(
    () => parseDownloadSource(searchParams),
    [searchParams],
  )
  const pdfFetchUrl = useMemo(() => resolvePdfFetchUrl(pdfPath), [pdfPath])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current != null) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (startedRef.current) return
    if (!pdfPath || !pdfFetchUrl) {
      setState('error')
      return
    }

    startedRef.current = true

    if (isQrSourceLanding(searchParams)) {
      trackKioskEvent('qr_landing', {
        screen: placement,
        pdfUrl: pdfPath,
        source: KIOSK_METRICS_SOURCE_QR,
      })
    } else if (isNfcSourceLanding(searchParams)) {
      trackKioskEvent('nfc_landing', {
        screen: placement,
        pdfUrl: pdfPath,
        source: KIOSK_METRICS_SOURCE_NFC,
      })
    }

    const metricsSource = downloadSource ?? KIOSK_METRICS_SOURCE_QR

    const stem =
      decodeURIComponent(pdfPath.split('/').pop() ?? 'document.pdf').replace(/\.pdf$/i, '') || 'document'

    const finishAndClose = () => {
      setProgress(100)
      setState('done')
      closeTimerRef.current = window.setTimeout(() => {
        tryClosePage()
      }, CLOSE_DELAY_MS)
    }

    void (async () => {
      const downloaded = await downloadSinglePdfUrl(
        pdfFetchUrl,
        stem,
        {
          screen: placement,
          source: metricsSource,
          pdfUrl: pdfPath,
        },
        setProgress,
      )

      if (downloaded) {
        finishAndClose()
        return
      }

      try {
        window.location.replace(pdfFetchUrl)
      } catch {
        setState('error')
      }
    })()
  }, [downloadSource, pdfFetchUrl, pdfPath, placement, searchParams])

  if (state === 'error' || !pdfPath) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="font-thai text-lg font-bold text-neutral-900">ไม่สามารถเปิดไฟล์ PDF ได้</p>
        <p className="font-thai max-w-md text-sm text-neutral-600">
          ลิงก์อาจไม่ถูกต้องหรือหมดอายุ — ลองสแกน QR / แตะ NFC ใหม่จากหน้าจอ kiosk
        </p>
        <Link
          to="/"
          className="font-thai text-sm font-semibold text-neutral-800 underline underline-offset-4"
        >
          กลับหน้าแรก
        </Link>
      </div>
    )
  }

  const progressLabel = state === 'done' ? '100%' : `${progress}%`

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="w-full max-w-xs space-y-2">
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="ความคืบหน้าการดาวน์โหลด"
        >
          <div
            className="h-full rounded-full bg-neutral-800 transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-heading text-sm font-semibold tabular-nums text-neutral-800">{progressLabel}</p>
      </div>

      <p className="font-thai text-base font-semibold text-neutral-900">
        {state === 'done' ? 'ดาวน์โหลดเสร็จแล้ว' : 'กำลังดาวน์โหลด PDF…'}
      </p>
      <p className="font-thai max-w-sm text-sm text-neutral-600">
        {state === 'done' ? 'กำลังปิดหน้านี้…' : 'กรุณารอสักครู่'}
      </p>
    </div>
  )
}
