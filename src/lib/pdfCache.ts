/** path ไป PDF ใน public — แปลงให้ตรงกับ VITE_BASE_PATH แล้ว fetch ผ่าน Service Worker (CacheFirst) */
export function resolvePdfFetchUrl(pdfPath: string | null | undefined): string | null {
  if (!pdfPath?.trim()) return null
  const path = pdfPath.trim().split('#')[0]
  if (!/\.pdf(\?.*)?$/i.test(path)) return null
  if (/^https?:\/\//i.test(path)) return path
  const relative = path.startsWith('/') ? path.slice(1) : path
  return new URL(relative, `${window.location.origin}${import.meta.env.BASE_URL}`).href
}

export function warmPdfCache(pdfPath: string | null | undefined) {
  const url = resolvePdfFetchUrl(pdfPath)
  if (!url) return
  void fetch(url, { credentials: 'same-origin' }).catch(() => {})
}

type WarmBatchOptions = {
  /** จำนวน fetch พร้อมกัน — ค่าเริ่มต้น 4 */
  concurrency?: number
}

/** prefetch หลายไฟล์ — ใช้ dedupe แล้ว fetch ทีละกลุ่ม (SW จะเก็บ runtime cache) */
export async function warmPdfCacheBatch(
  pdfPaths: readonly (string | null | undefined)[],
  options: WarmBatchOptions = {},
): Promise<void> {
  const concurrency = Math.max(1, options.concurrency ?? 4)
  const urls = [
    ...new Set(
      pdfPaths.map((p) => resolvePdfFetchUrl(p)).filter((u): u is string => Boolean(u)),
    ),
  ]
  if (urls.length === 0) return

  let index = 0
  async function worker() {
    while (index < urls.length) {
      const i = index++
      try {
        await fetch(urls[i], { credentials: 'same-origin' })
      } catch {
        /* offline / 404 */
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()))
}
