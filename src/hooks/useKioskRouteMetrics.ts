import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackKioskEvent } from '../lib/kioskMetrics'

/** บันทึก page_view ทุกครั้งที่เปลี่ยน route */
export function useKioskRouteMetrics() {
  const location = useLocation()
  const lastRef = useRef<string | null>(null)

  useEffect(() => {
    const key = `${location.pathname}${location.search}`
    if (lastRef.current === key) return
    lastRef.current = key
    trackKioskEvent('page_view', { pathname: location.pathname })
  }, [location.pathname, location.search])
}
