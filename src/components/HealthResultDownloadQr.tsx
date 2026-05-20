import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

type HealthResultDownloadQrProps = {
  url: string
  className?: string
  /** ขนาดเล็กสำหรับแถบปุ่มฟุตเทอร์ — ไม่ดึงความสูงปุ่มข้างๆ */
  compact?: boolean
}

const QR_SIZE = { default: 168, compact: 96 } as const

export function HealthResultDownloadQr({
  url,
  className = '',
  compact = false,
}: HealthResultDownloadQrProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const size = compact ? QR_SIZE.compact : QR_SIZE.default

  useEffect(() => {
    if (!url) {
      setDataUrl(null)
      return
    }
    let cancelled = false
    void QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#171717', light: '#f5f5f5' },
    })
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

  const boxClass = compact ? 'h-24 w-24' : 'h-[10.5rem] w-[10.5rem]'
  const imgPad = compact ? 'rounded-lg p-1' : 'rounded-xl p-1.5'

  return (
    <figure
      className={`flex shrink-0 flex-col items-center ${compact ? 'gap-1' : 'gap-2'} ${className}`.trim()}
      aria-label="สแกน QR เพื่อเปิดผลลัพธ์บนมือถือและดาวน์โหลด"
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt=""
          width={size}
          height={size}
          draggable={false}
          className={`border border-neutral-400 bg-white shadow-sm ${imgPad}`}
        />
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
        {compact ? (
          <>
            <span className="font-semibold text-neutral-800">สแกนดาวน์โหลด</span>
            <span className="block font-normal">มือถือ / แท็บเล็ต</span>
          </>
        ) : (
          <>
            สแกนเพื่อดาวน์โหลด
            <span className="block font-normal text-neutral-700">บนมือถือ / แท็บเล็ต</span>
          </>
        )}
      </figcaption>
    </figure>
  )
}
