/** คีย์ query ของหน้า /details สำหรับเปิด PDF ในแผงกลางจอ */

export const DETAILS_PDF_URL_QUERY_KEY = 'pdf'
export const DETAILS_PDF_TITLE_QUERY_KEY = 'title'

/**
 * เชื่อมไปที่ /details พร้อมเก็บ context (เช่น goal + category) สำหรับปุ่มกลับ
 */
export function buildDetailsPdfHref(
  pdfUrl: string,
  titleTh: string,
  extras?: Record<string, string | undefined>,
): string {
  const sp = new URLSearchParams()
  for (const [k, raw] of Object.entries(extras ?? {})) {
    if (raw != null && raw !== '') sp.set(k, raw)
  }
  sp.set(DETAILS_PDF_URL_QUERY_KEY, pdfUrl.trim())
  sp.set(DETAILS_PDF_TITLE_QUERY_KEY, titleTh.trim())
  return `/details?${sp.toString()}`
}

/** ป้องกัน iframe/object จาก URL นอกโดเมนหรือพาธผิดรูปแบบ — ระบุเฉพาะ PDF จาก health-product-pdfs */
export function parseSafeEmbeddedHealthPdfPath(rawPdfParam: string | null): string | null {
  const raw = rawPdfParam?.trim()
  if (!raw) return null

  try {
    const decoded = decodeURIComponent(raw)
    const u = new URL(decoded, window.location.origin)
    if (u.origin !== window.location.origin) return null
    const pathname = u.pathname.replace(/\/+/g, '/')
    if (!pathname.endsWith('.pdf')) return null
    if (!pathname.startsWith('/health-product-pdfs/')) return null
    return pathname + (u.search || '')
  } catch {
    return null
  }
}
