import { useEffect } from 'react'
import { warmPdfCache, warmPdfCacheBatch } from '../lib/pdfCache'
import { getAllHealthProductPdfPaths } from '../page/Health/healthResultData'
import {
  E_BOOKLET_PDF_URL,
  E_CATALOGUE_MEDICAL_FOOD_PDF_URL,
  E_CATALOGUE_PERSONALISED_FOOD_PDF_URL,
} from '../page/healthResultNav'

let kioskLibraryWarmStarted = false

/** prefetch PDF ทั้งหมดลง SW cache หลัง idle — kiosk เปิดครั้งถัดไปโหลดเร็วขึ้น */
export function useKioskPdfCacheWarm() {
  useEffect(() => {
    if (kioskLibraryWarmStarted) return
    kioskLibraryWarmStarted = true

    const run = () => {
      warmPdfCache(E_CATALOGUE_MEDICAL_FOOD_PDF_URL)
      warmPdfCache(E_CATALOGUE_PERSONALISED_FOOD_PDF_URL)
      warmPdfCache(E_BOOKLET_PDF_URL)
      void warmPdfCacheBatch(getAllHealthProductPdfPaths(), { concurrency: 4 })
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 12_000 })
      return () => window.cancelIdleCallback(id)
    }

    const id = window.setTimeout(run, 2_000)
    return () => window.clearTimeout(id)
  }, [])
}
