import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  clearKioskMetrics,
  exportKioskMetricsJson,
  getKioskMetricsSnapshot,
} from '../../lib/kioskMetrics'

const EVENT_LABELS: Record<string, string> = {
  page_view: 'เปิดหน้า',
  button_click: 'กดปุ่ม',
  download_result_all: 'ดาวน์โหลดผลทั้งหมด',
  download_single: 'ดาวน์โหลด PDF เดียว',
  download_ebooklet: 'ดาวน์โหลด E-Booklet',
  product_open: 'เปิดการ์ดสินค้า',
  qr_display: 'แสดง QR',
  qr_expand: 'ขยาย QR',
  qr_landing: 'เปิดจากสแกน QR',
  nfc_landing: 'เปิดจากแตะ NFC',
}

function formatTs(ts: number) {
  try {
    return new Date(ts).toLocaleString('th-TH')
  } catch {
    return String(ts)
  }
}

export default function KioskStatsPage() {
  const [tick, setTick] = useState(0)
  const snapshot = useMemo(() => getKioskMetricsSnapshot(), [tick])

  const sortedCounts = useMemo(
    () => Object.entries(snapshot.counts).sort((a, b) => b[1] - a[1]),
    [snapshot.counts],
  )

  const refresh = useCallback(() => setTick((n) => n + 1), [])

  const handleExport = useCallback(() => {
    const json = exportKioskMetricsJson()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kiosk-metrics-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  const handleClear = useCallback(() => {
    if (!window.confirm('ล้างสถิติทั้งหมดบนเครื่องนี้?')) return
    clearKioskMetrics()
    refresh()
  }, [refresh])

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-4 py-8 text-neutral-900">
      <header className="mb-6 space-y-2">
        <h1 className="font-heading text-2xl font-bold">Kiosk metrics</h1>
        <p className="text-sm text-neutral-600">
          สรุปจาก localStorage บนเครื่องนี้ — session{' '}
          <code className="rounded bg-neutral-200 px-1 text-xs">{snapshot.sessionId.slice(0, 8)}…</code>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={refresh}
            className="rounded-full border border-neutral-400 bg-white px-4 py-2 text-sm font-semibold"
          >
            รีเฟรช
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-full border border-neutral-400 bg-white px-4 py-2 text-sm font-semibold"
          >
            ส่งออก JSON
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-900"
          >
            ล้างข้อมูล
          </button>
          <Link to="/" className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white no-underline">
            กลับหน้าแรก
          </Link>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">จำนวนรวม</h2>
        {sortedCounts.length === 0 ? (
          <p className="text-sm text-neutral-600">ยังไม่มีเหตุการณ์</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="py-2 pr-4">เหตุการณ์</th>
                <th className="py-2 text-right">ครั้ง</th>
              </tr>
            </thead>
            <tbody>
              {sortedCounts.map(([key, count]) => {
                const [base, suffix] = key.includes(':') ? key.split(':', 2) : [key, '']
                const label = EVENT_LABELS[base] ?? base
                return (
                  <tr key={key} className="border-b border-neutral-200/80">
                    <td className="py-2 pr-4">
                      {label}
                      {suffix ? (
                        <span className="ml-1 text-neutral-600">
                          <code className="text-xs">{suffix}</code>
                        </span>
                      ) : null}
                    </td>
                    <td className="py-2 text-right font-semibold tabular-nums">{count}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">เหตุการณ์ล่าสุด ({snapshot.recent.length})</h2>
        <ul className="space-y-2 text-xs">
          {[...snapshot.recent].reverse().slice(0, 40).map((row, i) => (
            <li key={`${row.ts}-${i}`} className="rounded-lg border border-neutral-200 bg-white px-3 py-2">
              <span className="font-semibold">{EVENT_LABELS[row.event] ?? row.event}</span>
              <span className="text-neutral-500"> · {formatTs(row.ts)}</span>
              <div className="mt-0.5 truncate text-neutral-600">{row.path}</div>
              {row.meta ? (
                <pre className="mt-1 overflow-x-auto text-[10px] text-neutral-500">
                  {JSON.stringify(row.meta)}
                </pre>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
