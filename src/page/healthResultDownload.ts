import type { KioskMetricMeta } from '../lib/kioskMetrics'
import { trackKioskEvent } from '../lib/kioskMetrics'
import type { HealthResultProductPdf } from './Health/healthResultData'

function suggestedFilenameFromPdfUrl(pdfUrl: string, fallbackBase: string) {
  const pathPart = decodeURIComponent(new URL(pdfUrl, window.location.origin).pathname.split('/').pop() ?? '')
  if (pathPart.endsWith('.pdf')) return pathPart
  return `${fallbackBase}.pdf`
}

async function readResponseBlob(
  res: Response,
  onProgress?: (percent: number) => void,
): Promise<Blob | null> {
  const total = Number(res.headers.get('Content-Length')) || 0
  const type = res.headers.get('Content-Type') ?? 'application/pdf'

  if (!res.body || total <= 0) {
    onProgress?.(0)
    const blob = await res.blob()
    onProgress?.(100)
    return blob
  }

  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0

  onProgress?.(0)
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    received += value.length
    onProgress?.(Math.min(99, Math.round((received / total) * 100)))
  }

  onProgress?.(100)
  return new Blob(chunks as BlobPart[], { type })
}

function triggerBlobDownload(blob: Blob, fileName: string) {
  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = fileName
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(blobUrl)
}

/** โหลดไฟล์ PDF จาก path/url เดียว (เหมือนปุ่มดาวน์โหลดแต่เลือกเฉพาะไฟล์นี้) */
export async function downloadSinglePdfUrl(
  pdfUrl: string,
  fallbackBase = 'document',
  metricsMeta?: KioskMetricMeta,
  onProgress?: (percent: number) => void,
): Promise<boolean> {
  const href = pdfUrl.trim()
  if (!href) return false
  try {
    const res = await fetch(href)
    if (!res.ok) return false
    const blob = await readResponseBlob(res, onProgress)
    if (!blob) return false
    const fileName = suggestedFilenameFromPdfUrl(href, fallbackBase)
    triggerBlobDownload(blob, fileName)
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
