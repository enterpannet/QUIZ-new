import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isQrSourceLanding, trackKioskEvent } from '../lib/kioskMetrics'

/** นับครั้งเดียวต่อ mount เมื่อเปิดจาก QR (มี query src=qr) */
export function useKioskQrLanding(screen: 'result' | 'details') {
  const [searchParams] = useSearchParams()
  const doneRef = useRef(false)

  useEffect(() => {
    if (doneRef.current) return
    if (!isQrSourceLanding(searchParams)) return
    doneRef.current = true
    trackKioskEvent('qr_landing', { screen })
  }, [searchParams, screen])
}
