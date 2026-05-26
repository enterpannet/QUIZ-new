/** iOS/Android ฝัง PDF ใน <object>/<iframe> ไม่ได้ — ใช้รูป preview แทน */
export function canEmbedPdfInline(): boolean {
  if (typeof navigator === 'undefined') return true
  const ua = navigator.userAgent
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (isIOS) return false
  if (/Android/i.test(ua)) return false
  /** จอสัมผัส (มือถือ/แท็บเล็ต) — preview PDF inline มักว่าง */
  if (typeof window.matchMedia === 'function') {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return false
  }
  return true
}
