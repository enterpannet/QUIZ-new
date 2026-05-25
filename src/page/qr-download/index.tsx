import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { isQrSourceLanding, trackKioskEvent } from '../../lib/kioskMetrics'
import { resolvePdfFetchUrl } from '../../lib/pdfCache'
import { downloadSinglePdfUrl } from '../healthResultDownload'
import {
  parseSafeQrDownloadPdfPath,
  QR_DOWNLOAD_PDF_QUERY_KEY,
  QR_DOWNLOAD_PLACEMENT_KEY,
  type QrDownloadPlacement,
} from './qrDownloadRoute'

type QrDownloadState = 'loading' | 'opened' | 'error'

function parsePlacement(raw: string | null): QrDownloadPlacement | 'unknown' {
  if (raw === 'result' || raw === 'details' || raw === 'end_session') return raw
  return 'unknown'
}

export default function QrDownloadPage() {
  const [searchParams] = useSearchParams()
  const startedRef = useRef(false)
  const [state, setState] = useState<QrDownloadState>('loading')

  const pdfPath = useMemo(
    () => parseSafeQrDownloadPdfPath(searchParams.get(QR_DOWNLOAD_PDF_QUERY_KEY)),
    [searchParams],
  )
  const placement = useMemo(
    () => parsePlacement(searchParams.get(QR_DOWNLOAD_PLACEMENT_KEY)),
    [searchParams],
  )
  const pdfFetchUrl = useMemo(() => resolvePdfFetchUrl(pdfPath), [pdfPath])

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
        source: 'qr',
      })
    }

    const stem =
      decodeURIComponent(pdfPath.split('/').pop() ?? 'document.pdf').replace(/\.pdf$/i, '') || 'document'

    void (async () => {
      const downloaded = await downloadSinglePdfUrl(pdfFetchUrl, stem, {
        screen: placement,
        source: 'qr',
        pdfUrl: pdfPath,
      })

      if (downloaded) {
        setState('opened')
        return
      }

      try {
        window.location.replace(pdfFetchUrl)
        setState('opened')
      } catch {
        setState('error')
      }
    })()
  }, [pdfFetchUrl, pdfPath, placement, searchParams])

  if (state === 'error' || !pdfPath) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="font-thai text-lg font-bold text-neutral-900">ไม่สามารถเปิดไฟล์ PDF ได้</p>
        <p className="font-thai max-w-md text-sm text-neutral-600">
          ลิงก์อาจไม่ถูกต้องหรือหมดอายุ — ลองสแกน QR ใหม่จากหน้าจอ kiosk
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

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-700"
        aria-hidden
      />
      <p className="font-thai text-base font-semibold text-neutral-900">
        {state === 'opened' ? 'กำลังเปิดไฟล์ PDF…' : 'กำลังเตรียมไฟล์ PDF…'}
      </p>
      <p className="font-thai max-w-sm text-sm text-neutral-600">
        {state === 'opened'
          ? 'หากไฟล์ยังไม่เปิด ให้ตรวจสอบการดาวน์โหลดบนมือถือ'
          : 'กรุณารอสักครู่'}
      </p>
    </div>
  )
}
