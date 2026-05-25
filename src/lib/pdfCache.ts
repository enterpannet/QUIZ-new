/** path ไป PDF ใน public — fetch ผ่าน Service Worker (CacheFirst) เก็บ cache ก่อน iframe/object โหลด */
export function warmPdfCache(pdfPath: string | null | undefined) {
  if (!pdfPath?.trim()) return
  const path = pdfPath.trim().split('#')[0]
  if (!path.includes('.pdf')) return
  void fetch(path, { credentials: 'same-origin' }).catch(() => {})
}
