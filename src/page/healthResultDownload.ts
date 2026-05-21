import type { KioskMetricMeta } from '../lib/kioskMetrics'
import { trackKioskEvent } from '../lib/kioskMetrics'
import type { HealthResultProductPdf } from './Health/healthResultData'

function suggestedFilenameFromPdfUrl(pdfUrl: string, fallbackBase: string) {
  const pathPart = decodeURIComponent(new URL(pdfUrl, window.location.origin).pathname.split('/').pop() ?? '')
  if (pathPart.endsWith('.pdf')) return pathPart
  return `${fallbackBase}.pdf`
}

/** โหลดไฟล์ PDF จาก path/url เดียว (เหมือนปุ่มดาวน์โหลดแต่เลือกเฉพาะไฟล์นี้) */
export async function downloadSinglePdfUrl(
  pdfUrl: string,
  fallbackBase = 'document',
  metricsMeta?: KioskMetricMeta,
): Promise<boolean> {
  const href = pdfUrl.trim()
  if (!href) return false
  try {
    const res = await fetch(href)
    if (!res.ok) return false
    const blob = await res.blob()
    const fileName = suggestedFilenameFromPdfUrl(href, fallbackBase)
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = fileName
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
    trackKioskEvent('download_single', { pdfUrl: href, fileName, ...metricsMeta })
    return true
  } catch {
    return false
  }
}

/** ดาวน์โหลดทุกรายการตามแถบ (คั่นหน่วงเล็กน้อย เพื่อลดโอกาสถูกบล็อก) */
export async function downloadListedPdfsSequentially(
  products: readonly HealthResultProductPdf[],
  staggerMs = 140,
  metricsMeta?: KioskMetricMeta,
) {
  const list = products.filter((p) => p.pdfUrl?.trim())
  if (list.length) {
    trackKioskEvent('download_result_all', { productCount: list.length, ...metricsMeta })
  }
  for (let i = 0; i < products.length; i++) {
    const pdfUrl = products[i]?.pdfUrl
    if (!pdfUrl?.trim()) continue
    await downloadSinglePdfUrl(pdfUrl, `sheet-${String(i + 1).padStart(2, '0')}`)
    if (staggerMs > 0 && i < products.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, staggerMs))
    }
  }
}
