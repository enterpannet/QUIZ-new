import { useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode'

type HealthResultDownloadQrProps = {
  url: string
  className?: string
  /** ขนาดเล็กสำหรับแถบปุ่มฟุตเทอร์ — ไม่ดึงความสูงปุ่มข้างๆ */
  compact?: boolean
}

const QR_SIZE = { default: 168, compact: 96, expanded: 280 } as const

const QR_OPTIONS = {
  margin: 1,
  errorCorrectionLevel: 'M' as const,
  color: { dark: '#171717', light: '#f5f5f5' },
}

async function qrToDataUrl(url: string, width: number) {
  return QRCode.toDataURL(url, { ...QR_OPTIONS, width })
}

export function HealthResultDownloadQr({
  url,
  className = '',
  compact = false,
}: HealthResultDownloadQrProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [expandedDataUrl, setExpandedDataUrl] = useState<string | null>(null)
  const size = compact ? QR_SIZE.compact : QR_SIZE.default

  useEffect(() => {
    if (!url) {
      setDataUrl(null)
      return
    }
    let cancelled = false
    void qrToDataUrl(url, size)
      .then((data) => {
        if (!cancelled) setDataUrl(data)
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null)
      })
    return () => {
      cancelled = true
    }
  }, [url, size])

  useEffect(() => {
    if (!expanded || !url) {
      setExpandedDataUrl(null)
      return
    }
    let cancelled = false
    void qrToDataUrl(url, QR_SIZE.expanded)
      .then((data) => {
        if (!cancelled) setExpandedDataUrl(data)
      })
      .catch(() => {
        if (!cancelled) setExpandedDataUrl(null)
      })
    return () => {
      cancelled = true
    }
  }, [expanded, url])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  const closeExpanded = useCallback(() => setExpanded(false), [])

  const boxClass = compact ? 'h-24 w-24' : 'h-[10.5rem] w-[10.5rem]'
  const imgPad = compact ? 'rounded-lg p-1' : 'rounded-xl p-1.5'

  const caption = compact ? (
    <>
      <span className="font-semibold text-neutral-800">สแกนดาวน์โหลด</span>
      <span className="block font-normal">มือถือ / แท็บเล็ต</span>
      {dataUrl ? <span className="mt-0.5 block text-neutral-600">แตะ QR เพื่อขยาย</span> : null}
    </>
  ) : (
    <>
      สแกนเพื่อดาวน์โหลด
      <span className="block font-normal text-neutral-700">บนมือถือ / แท็บเล็ต</span>
      {dataUrl ? <span className="mt-0.5 block font-normal text-neutral-600">แตะ QR เพื่อขยาย</span> : null}
    </>
  )

  return (
    <>
      <figure
        className={`flex shrink-0 flex-col items-center ${compact ? 'gap-1' : 'gap-2'} ${className}`.trim()}
      >
        {dataUrl ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="cursor-pointer rounded-lg border-0 bg-transparent p-0 transition-shadow hover:ring-2 hover:ring-neutral-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
            aria-label="ขยาย QR code เพื่อสแกน"
          >
            <img
              src={dataUrl}
              alt=""
              width={size}
              height={size}
              draggable={false}
              className={`block border border-neutral-400 bg-white shadow-sm ${imgPad}`}
            />
          </button>
        ) : (
          <div
            className={`flex items-center justify-center border border-dashed border-neutral-400 bg-neutral-200/60 ${boxClass} ${compact ? 'rounded-lg' : 'rounded-xl'}`}
            aria-hidden
          >
            <span className="text-[10px] text-neutral-600 md:text-xs">กำลังสร้าง QR…</span>
          </div>
        )}
        <figcaption
          className={
            compact
              ? 'max-w-[6.5rem] text-center text-[10px] leading-tight text-neutral-700'
              : 'max-w-[11rem] text-center text-xs font-semibold leading-snug text-neutral-800 md:text-sm'
          }
        >
          {caption}
        </figcaption>
      </figure>

      {expanded ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="health-result-qr-expanded-title"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-neutral-900/55 p-4 backdrop-blur-[2px]"
          onClick={closeExpanded}
        >
          <div
            className="flex max-w-[min(100%,22rem)] flex-col items-center gap-4 rounded-2xl border border-neutral-300 bg-neutral-100 px-6 py-6 shadow-2xl sm:max-w-none sm:px-8 sm:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              id="health-result-qr-expanded-title"
              className="text-center text-base font-bold text-neutral-900 sm:text-lg"
            >
              สแกนเพื่อดาวน์โหลดบนมือถือ / แท็บเล็ต
            </p>
            {expandedDataUrl ? (
              <img
                src={expandedDataUrl}
                alt=""
                width={QR_SIZE.expanded}
                height={QR_SIZE.expanded}
                draggable={false}
                className="rounded-xl border border-neutral-400 bg-white p-2 shadow-md"
              />
            ) : (
              <div
                className="flex h-[17.5rem] w-[17.5rem] items-center justify-center rounded-xl border border-dashed border-neutral-400 bg-white"
                aria-hidden
              >
                <span className="text-sm text-neutral-600">กำลังสร้าง QR…</span>
              </div>
            )}
            <button
              type="button"
              onClick={closeExpanded}
              className="inline-flex min-h-[2.75rem] shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-white px-6 py-2 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90 active:opacity-80"
            >
              ปิด
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
