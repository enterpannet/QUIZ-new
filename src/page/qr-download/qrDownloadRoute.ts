import {
  E_BOOKLET_PDF_URL,
  E_CATALOGUE_MEDICAL_FOOD_PDF_URL,
  E_CATALOGUE_PERSONALISED_FOOD_PDF_URL,
} from '../healthResultNav'
import { KIOSK_METRICS_SOURCE_KEY, KIOSK_METRICS_SOURCE_QR } from '../../lib/kioskMetrics'

export const QR_DOWNLOAD_PDF_QUERY_KEY = 'pdf'
export const QR_DOWNLOAD_PLACEMENT_KEY = 'placement'

export type QrDownloadPlacement = 'result' | 'details' | 'end_session'

const ALLOWED_EXACT_PDF_PATHS = new Set([
  E_CATALOGUE_MEDICAL_FOOD_PDF_URL,
  E_CATALOGUE_PERSONALISED_FOOD_PDF_URL,
  E_BOOKLET_PDF_URL,
])

/** อนุญาตเฉพาะ PDF ใน public ที่แอปรู้จัก — กัน open redirect */
export function parseSafeQrDownloadPdfPath(rawPdfParam: string | null): string | null {
  const raw = rawPdfParam?.trim()
  if (!raw) return null

  try {
    const decoded = decodeURIComponent(raw)
    const u = new URL(decoded, window.location.origin)
    if (u.origin !== window.location.origin) return null
    const pathname = u.pathname.replace(/\/+/g, '/')
    if (!pathname.endsWith('.pdf')) return null
    if (ALLOWED_EXACT_PDF_PATHS.has(pathname)) return pathname
    if (pathname.startsWith('/health-product-pdfs/')) return pathname
    return null
  } catch {
    return null
  }
}

export function buildQrDownloadHref(pdfPath: string, placement: QrDownloadPlacement): string {
  const sp = new URLSearchParams()
  sp.set(QR_DOWNLOAD_PDF_QUERY_KEY, pdfPath.trim())
  sp.set(QR_DOWNLOAD_PLACEMENT_KEY, placement)
  sp.set(KIOSK_METRICS_SOURCE_KEY, KIOSK_METRICS_SOURCE_QR)
  return `/qr/download?${sp.toString()}`
}

/** URL เต็มสำหรับใส่ใน QR — สแกนแล้วเข้า SPA route ไม่ชน static file + query */
export function buildQrDownloadAbsoluteUrl(
  pdfPath: string,
  placement: QrDownloadPlacement,
): string {
  const relative = buildQrDownloadHref(pdfPath, placement)
  const relativePath = relative.startsWith('/') ? relative.slice(1) : relative
  return new URL(relativePath, `${window.location.origin}${import.meta.env.BASE_URL}`).href
}
