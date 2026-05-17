import { useCallback, useEffect, useRef, useState } from 'react'
import type { HealthResultProductPdf } from '../page/Health/healthResultData'

type Props = { products: HealthResultProductPdf[] }

const sliderBtn =
  'flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-neutral-400 bg-white text-xl font-semibold leading-none text-neutral-900 shadow-sm transition-[opacity,background-color] active:bg-neutral-100 disabled:pointer-events-none disabled:opacity-30 sm:size-12 sm:text-2xl'

export function HealthResultProductPdfSlider({ products }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const settleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [viewportW, setViewportW] = useState(0)
  const [active, setActive] = useState(0)

  const clampIndex = useCallback(
    (i: number) => Math.min(products.length - 1, Math.max(0, i)),
    [products.length],
  )

  const syncViewport = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setViewportW(Math.max(1, Math.round(el.clientWidth)))
  }, [])

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el || products.length === 0) return
    const w = Math.max(1, Math.round(el.clientWidth))
    setViewportW(w)
    setActive(Math.min(products.length - 1, Math.max(0, Math.round(el.scrollLeft / w))))
  }, [products.length])

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = scrollerRef.current
      if (!el) return
      const idx = clampIndex(i)
      const w = Math.max(1, Math.round(el.clientWidth))
      el.scrollTo({ left: idx * w, behavior: 'smooth' })
    },
    [clampIndex],
  )

  useEffect(() => {
    syncViewport()
  }, [products.length, syncViewport])

  useEffect(() => {
    setActive((a) => clampIndex(a))
  }, [products.length, clampIndex])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const ro = new ResizeObserver(syncViewport)
    ro.observe(el)

    const onScroll = () => {
      if (settleRef.current) clearTimeout(settleRef.current)
      settleRef.current = setTimeout(() => {
        settleRef.current = undefined
        syncActiveFromScroll()
      }, 64)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', syncActiveFromScroll)

    syncActiveFromScroll()

    return () => {
      if (settleRef.current) clearTimeout(settleRef.current)
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', syncActiveFromScroll)
    }
  }, [syncViewport, syncActiveFromScroll])

  if (products.length === 0) return null

  const slideW = viewportW || undefined

  const goPrev = () => {
    const next = clampIndex(active - 1)
    setActive(next)
    scrollToIndex(next)
  }

  const goNext = () => {
    const next = clampIndex(active + 1)
    setActive(next)
    scrollToIndex(next)
  }

  return (
    <div className="w-full rounded-lg border border-neutral-200/80 bg-white/60 pb-4 pt-1">
      <div
        ref={scrollerRef}
        role="region"
        aria-label="รายการสินค้า PDF เลื่อนแนวนอน"
        className="-webkit-overflow-scrolling-touch flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p, i) => (
          <div
            key={i}
            className="shrink-0 snap-start py-3"
            style={slideW !== undefined ? { width: slideW } : { width: '100%', minWidth: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
          >
            <a
              href={p.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto flex min-h-[7.75rem] w-[calc(100%-1.5rem)] max-w-none flex-col justify-center gap-2 rounded-xl border border-neutral-200/95 bg-neutral-50/90 px-4 py-5 text-center no-underline shadow-sm transition-colors active:bg-neutral-100/90 sm:min-h-[8rem]"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-neutral-500 sm:text-xs">
                {i + 1} / {products.length}
              </span>
              <span className="font-semibold leading-snug text-neutral-950 sm:text-lg">{p.titleTh}</span>
              <span className="text-sm text-neutral-600">แตะเพื่อเปิด PDF →</span>
            </a>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 px-4 pt-1">
        <button type="button" className={sliderBtn} aria-label="การ์ดก่อนหน้า" disabled={active === 0} onClick={goPrev}>
          ‹
        </button>
        <span className="min-w-[4.5rem] text-center text-sm font-semibold text-neutral-800 tabular-nums sm:text-base">
          {active + 1}/{products.length}
        </span>
        <button
          type="button"
          className={sliderBtn}
          aria-label="การ์ดถัดไป"
          disabled={active >= products.length - 1}
          onClick={goNext}
        >
          ›
        </button>
      </div>
    </div>
  )
}
