/** คีย์ query สำหรับระบุว่าเปิดจาก QR / NFC */
export const KIOSK_METRICS_SOURCE_KEY = 'src'
export const KIOSK_METRICS_SOURCE_QR = 'qr'
export const KIOSK_METRICS_SOURCE_NFC = 'nfc'

export type KioskDownloadSource = typeof KIOSK_METRICS_SOURCE_QR | typeof KIOSK_METRICS_SOURCE_NFC

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
  | 'nfc_landing'

type StoredEvent = {
  event: string
  ts: number
  path: string
  meta?: Record<string, string | number | boolean>
}

type ServerEvent = StoredEvent & {
  sessionId: string
}

type MetricsStore = {
  sessionId: string
  counts: Record<string, number>
  recent: StoredEvent[]
}

const STORAGE_KEY = 'kiosk-metrics-v1'
const PENDING_KEY = 'kiosk-metrics-pending-v1'
const MAX_RECENT = 50
const MAX_PENDING = 500

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

function envString(name: string): string | undefined {
  const v = import.meta.env[name]
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

function metricsEndpoint(): string | undefined {
  return envString('VITE_KIOSK_METRICS_ENDPOINT')
}

function loadStore(): MetricsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { sessionId: crypto.randomUUID(), counts: {}, recent: [] }
    }
    const parsed = JSON.parse(raw) as Partial<MetricsStore>
    return {
      sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : crypto.randomUUID(),
      counts: parsed.counts && typeof parsed.counts === 'object' ? parsed.counts : {},
      recent: Array.isArray(parsed.recent) ? parsed.recent.slice(-MAX_RECENT) : [],
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

function loadPending(): ServerEvent[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ServerEvent[]
    return Array.isArray(parsed) ? parsed.slice(-MAX_PENDING) : []
  } catch {
    return []
  }
}

function savePending(rows: ServerEvent[]) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(rows.slice(-MAX_PENDING)))
  } catch {
    /* ignore */
  }
}

function countKey(event: KioskMetricEventName, meta?: KioskMetricMeta): string {
  if (event === 'button_click' && meta?.buttonId != null) {
    return `button_click:${String(meta.buttonId)}`
  }
  if (event === 'product_open') {
    if (meta?.pdfUrl != null) return `product_open:${String(meta.pdfUrl)}`
    if (meta?.titleTh != null) return `product_open:${String(meta.titleTh)}`
    if (meta?.productIndex != null) return `product_open:${String(meta.productIndex)}`
  }
  return event
}

function toServerEvent(row: StoredEvent, sessionId: string): ServerEvent {
  return { ...row, sessionId }
}

async function postEvents(rows: ServerEvent[]): Promise<boolean> {
  const endpoint = metricsEndpoint()
  if (!endpoint || !rows.length) return false

  const payload = rows.map((r) => ({
    sessionId: r.sessionId,
    event: r.event,
    ts: r.ts,
    path: r.path,
    meta: r.meta,
  }))

  const body = JSON.stringify(payload.length === 1 ? payload[0] : payload)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
    return res.ok
  } catch {
    return false
  }
}

async function flushPending() {
  const pending = loadPending()
  if (!pending.length) return

  const ok = await postEvents(pending)
  if (ok) savePending([])
}

function enqueuePending(row: ServerEvent) {
  const pending = loadPending()
  pending.push(row)
  savePending(pending)
}

async function sendToServer(row: StoredEvent, sessionId: string) {
  if (!metricsEndpoint()) return

  const serverRow = toServerEvent(row, sessionId)
  const ok = await postEvents([serverRow])
  if (!ok) enqueuePending(serverRow)
  else void flushPending()
}

/** เพิ่ม src=qr|nfc ใน URL ที่ใส่ใน QR / NFC tag */
export function appendDownloadSourceToUrl(url: string, source: KioskDownloadSource): string {
  try {
    const u = new URL(url, window.location.origin)
    u.searchParams.set(KIOSK_METRICS_SOURCE_KEY, source)
    return u.toString()
  } catch {
    return url
  }
}

/** @deprecated ใช้ appendDownloadSourceToUrl(url, 'qr') */
export function appendQrSourceToUrl(url: string): string {
  return appendDownloadSourceToUrl(url, KIOSK_METRICS_SOURCE_QR)
}

export function parseDownloadSource(searchParams: URLSearchParams): KioskDownloadSource | null {
  const raw = searchParams.get(KIOSK_METRICS_SOURCE_KEY)
  if (raw === KIOSK_METRICS_SOURCE_QR || raw === KIOSK_METRICS_SOURCE_NFC) return raw
  return null
}

export function isQrSourceLanding(searchParams: URLSearchParams): boolean {
  return searchParams.get(KIOSK_METRICS_SOURCE_KEY) === KIOSK_METRICS_SOURCE_QR
}

export function isNfcSourceLanding(searchParams: URLSearchParams): boolean {
  return searchParams.get(KIOSK_METRICS_SOURCE_KEY) === KIOSK_METRICS_SOURCE_NFC
}

export function isRemoteDownloadLanding(searchParams: URLSearchParams): boolean {
  return isQrSourceLanding(searchParams) || isNfcSourceLanding(searchParams)
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
  void sendToServer(row, store.sessionId)
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
    localStorage.removeItem(PENDING_KEY)
  } catch {
    /* ignore */
  }
}

export function exportKioskMetricsJson(): string {
  return JSON.stringify(
    { ...getKioskMetricsSnapshot(), pending: loadPending() },
    null,
    2,
  )
}

declare global {
  interface Window {
    __kioskMetrics?: {
      snapshot: typeof getKioskMetricsSnapshot
      exportJson: typeof exportKioskMetricsJson
      clear: typeof clearKioskMetrics
      flush: () => Promise<void>
    }
  }
}

if (typeof window !== 'undefined') {
  window.__kioskMetrics = {
    snapshot: getKioskMetricsSnapshot,
    exportJson: exportKioskMetricsJson,
    clear: clearKioskMetrics,
    flush: flushPending,
  }

  window.addEventListener('online', () => {
    void flushPending()
  })
}
