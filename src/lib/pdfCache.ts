/** path ไป PDF ใน public — แปลงให้ตรงกับ VITE_BASE_PATH */
export function resolvePdfFetchUrl(pdfPath: string | null | undefined): string | null {
  if (!pdfPath?.trim()) return null
  const path = pdfPath.trim().split('#')[0]
  if (!/\.pdf(\?.*)?$/i.test(path)) return null
  if (/^https?:\/\//i.test(path)) return path
  const relative = path.startsWith('/') ? path.slice(1) : path
  return new URL(relative, `${window.location.origin}${import.meta.env.BASE_URL}`).href
}
