import {
  E_BOOKLET_PDF_URL,
  E_CATALOGUE_MEDICAL_FOOD_PDF_URL,
  E_CATALOGUE_PERSONALISED_FOOD_PDF_URL,
} from '../healthResultNav'
import {
  KIOSK_METRICS_SOURCE_KEY,
  KIOSK_METRICS_SOURCE_NFC,
  KIOSK_METRICS_SOURCE_QR,
  type KioskDownloadSource,
} from '../../lib/kioskMetrics'

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

export function buildRemoteDownloadHref(
  pdfPath: string,
  placement: QrDownloadPlacement,
  source: KioskDownloadSource,
): string {
  const sp = new URLSearchParams()
  sp.set(QR_DOWNLOAD_PDF_QUERY_KEY, pdfPath.trim())
  sp.set(QR_DOWNLOAD_PLACEMENT_KEY, placement)
  sp.set(KIOSK_METRICS_SOURCE_KEY, source)
  return `/qr/download?${sp.toString()}`
}

export function buildQrDownloadHref(pdfPath: string, placement: QrDownloadPlacement): string {
  return buildRemoteDownloadHref(pdfPath, placement, KIOSK_METRICS_SOURCE_QR)
}

export function buildNfcDownloadHref(pdfPath: string, placement: QrDownloadPlacement): string {
  return buildRemoteDownloadHref(pdfPath, placement, KIOSK_METRICS_SOURCE_NFC)
}

const DEFAULT_KIOSK_PUBLIC_ORIGIN = 'https://quiz.d2km.online'

/** Origin สำหรับ QR/NFC — ไม่ใช้ localhost ตอน dev บนเครื่อง kiosk */
export function resolveKioskPublicOrigin(): string {
  const raw = import.meta.env.VITE_KIOSK_PUBLIC_ORIGIN?.trim()
  if (raw) {
    try {
      return new URL(raw).origin
    } catch {
      /* ใช้ค่า default */
    }
  }
  return DEFAULT_KIOSK_PUBLIC_ORIGIN
}

function kioskPublicBaseUrl(): string {
  const origin = resolveKioskPublicOrigin()
  const basePath = import.meta.env.BASE_URL || '/'
  return basePath.endsWith('/') ? `${origin}${basePath}` : `${origin}${basePath}/`
}

function toAbsoluteAppUrl(relativeHref: string): string {
  const relativePath = relativeHref.startsWith('/') ? relativeHref.slice(1) : relativeHref
  return new URL(relativePath, kioskPublicBaseUrl()).href
}

/** URL เต็มสำหรับใส่ใน QR — สแกนแล้วเข้า SPA route ไม่ชน static file + query */
export function buildQrDownloadAbsoluteUrl(
  pdfPath: string,
  placement: QrDownloadPlacement,
): string {
  return toAbsoluteAppUrl(buildQrDownloadHref(pdfPath, placement))
}

/** URL เต็มสำหรับเขียนลง NFC tag — โหลด PDF + track src=nfc */
export function buildNfcDownloadAbsoluteUrl(
  pdfPath: string,
  placement: QrDownloadPlacement,
): string {
  return toAbsoluteAppUrl(buildNfcDownloadHref(pdfPath, placement))
}

/** E-booklet บน NFC (end session) — production URL ตัวอย่าง */
export function buildEbookletNfcDownloadAbsoluteUrl(): string {
  if (typeof window === 'undefined') {
    return buildNfcDownloadHref(E_BOOKLET_PDF_URL, 'end_session')
  }
  return buildNfcDownloadAbsoluteUrl(E_BOOKLET_PDF_URL, 'end_session')
}
