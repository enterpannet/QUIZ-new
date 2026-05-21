/** คีย์ query สำหรับระบุว่าเปิดหน้าจากการสแกน QR */
export const KIOSK_METRICS_SOURCE_KEY = 'src'
export const KIOSK_METRICS_SOURCE_QR = 'qr'

export type KioskMetricMeta = Record<string, string | number | boolean | undefined>

export type KioskMetricEventName =
  | 'page_view'
  | 'button_click'
  | 'download_result_all'
  | 'download_single'
  | 'download_ebooklet'
  | 'product_open'
  | 'qr_display'
  | 'qr_expand'
  | 'qr_landing'

type StoredEvent = {
  event: string
  ts: number
  path: string
  meta?: Record<string, string | number | boolean>
}

type MetricsStore = {
  sessionId: string
  counts: Record<string, number>
  recent: StoredEvent[]
}

const STORAGE_KEY = 'kiosk-metrics-v1'
const MAX_RECENT = 300

function cleanMeta(meta?: KioskMetricMeta): Record<string, string | number | boolean> | undefined {
  if (!meta) return undefined
  const out: Record<string, string | number | boolean> = {}
  for (const [k, v] of Object.entries(meta)) {
    if (v !== undefined) out[k] = v
  }
  return Object.keys(out).length ? out : undefined
}

function currentPath(): string {
  return `${window.location.pathname}${window.location.search}`
}

function loadStore(): MetricsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        sessionId: crypto.randomUUID(),
        counts: {},
        recent: [],
      }
    }
    const parsed = JSON.parse(raw) as Partial<MetricsStore>
    return {
      sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : crypto.randomUUID(),
      counts: parsed.counts && typeof parsed.counts === 'object' ? parsed.counts : {},
      recent: Array.isArray(parsed.recent) ? parsed.recent : [],
    }
  } catch {
    return { sessionId: crypto.randomUUID(), counts: {}, recent: [] }
  }
}

function saveStore(store: MetricsStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    /* quota / private mode */
  }
}

function countKey(event: KioskMetricEventName, meta?: KioskMetricMeta): string {
  if (event === 'button_click' && meta?.buttonId != null) {
    return `button_click:${String(meta.buttonId)}`
  }
  if (event === 'product_open' && meta?.productIndex != null) {
    return `product_open:${String(meta.productIndex)}`
  }
  return event
}

function metricsEndpoint(): string | undefined {
  const v = import.meta.env.VITE_KIOSK_METRICS_ENDPOINT
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

async function postToEndpoint(payload: StoredEvent & { sessionId: string }) {
  const endpoint = metricsEndpoint()
  if (!endpoint) return

  const body = JSON.stringify(payload)
  try {
    if (navigator.sendBeacon) {
      const ok = navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))
      if (ok) return
    }
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
  } catch {
    /* offline kiosk */
  }
}

/** เพิ่ม src=qr ใน URL ที่ใส่ใน QR — ใช้นับการเปิดหลังสแกน */
export function appendQrSourceToUrl(url: string): string {
  try {
    const u = new URL(url, window.location.origin)
    u.searchParams.set(KIOSK_METRICS_SOURCE_KEY, KIOSK_METRICS_SOURCE_QR)
    return u.toString()
  } catch {
    return url
  }
}

export function isQrSourceLanding(searchParams: URLSearchParams): boolean {
  return searchParams.get(KIOSK_METRICS_SOURCE_KEY) === KIOSK_METRICS_SOURCE_QR
}

export function trackKioskEvent(event: KioskMetricEventName, meta?: KioskMetricMeta) {
  if (typeof window === 'undefined') return

  const path = currentPath()
  const cleaned = cleanMeta(meta)
  const store = loadStore()
  const key = countKey(event, meta)
  store.counts[key] = (store.counts[key] ?? 0) + 1
  const row: StoredEvent = { event, ts: Date.now(), path, meta: cleaned }
  store.recent.push(row)
  if (store.recent.length > MAX_RECENT) {
    store.recent = store.recent.slice(-MAX_RECENT)
  }
  saveStore(store)
  void postToEndpoint({ ...row, sessionId: store.sessionId })
}

export function trackKioskButton(buttonId: string, meta?: KioskMetricMeta) {
  trackKioskEvent('button_click', { buttonId, ...meta })
}

export function getKioskMetricsSnapshot(): MetricsStore {
  return loadStore()
}

export function clearKioskMetrics() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function exportKioskMetricsJson(): string {
  return JSON.stringify(getKioskMetricsSnapshot(), null, 2)
}

declare global {
  interface Window {
    __kioskMetrics?: {
      snapshot: typeof getKioskMetricsSnapshot
      exportJson: typeof exportKioskMetricsJson
      clear: typeof clearKioskMetrics
    }
  }
}

if (typeof window !== 'undefined') {
  window.__kioskMetrics = {
    snapshot: getKioskMetricsSnapshot,
    exportJson: exportKioskMetricsJson,
    clear: clearKioskMetrics,
  }
}
