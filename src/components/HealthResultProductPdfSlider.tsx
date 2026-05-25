import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import chevronPrev from '../assets/images/SVG/back.svg'
import chevronNext from '../assets/images/SVG/Next.svg'
import { Link } from 'react-router-dom'
import { trackKioskEvent, type KioskMetricMeta } from '../lib/kioskMetrics'
import { buildDetailsPdfHref } from '../page/details/detailsPdfRoute'
import { resolveHealthProductImageUrl, type HealthResultProductPdf } from '../page/Health/healthResultData'

type Props = {
  products: HealthResultProductPdf[]
  /**
   * เมื่อกำหนด การแตะการ์ดจะนำไปหน้า /details และแสดง PDF กลางจอ
   * (แทนการเปิดแท็บใหม่จากลิงก์ตรง)
   */
  detailsPdfLinkExtras?: Record<string, string>
  /** meta เพิ่มเติมสำหรับ event product_open (เช่น screen, goalId) */
  metricsMeta?: KioskMetricMeta
}

/** ควบคุมเลื่อนด้วยแค่รูป SVG (ไม่มีวงปุ่มห่อ) — เก็บ <button> เพื่อ a11y */
const sliderNavHit =
  'inline-flex shrink-0 touch-manipulation items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none outline-offset-4 transition-opacity active:opacity-80 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900'

/** จัดการ์ด: <xl = เลื่อนแนวนอน, ≥xl = ห่อครบจำนวนคอลัมน์ เห็นทั้งหมดโดยไม่ต้องเลื่อน */
const slideSlideClass =
  'w-[calc((100%-0.75rem)/2)] shrink-0 snap-start py-2 sm:w-[calc((100%-2*0.75rem)/3)] lg:w-[calc((100%-3rem)/5)] xl:w-[calc((100%-3rem)/5)] xl:snap-normal'

/** ภาพรองเมื่อเบราว์เซอร์ฝัง PDF เป็น object ไม่ได้ */
function StaticPreviewImage({ src }: { src: string }) {
  const [srcCurrent, setSrcCurrent] = useState(src)

  useEffect(() => {
    setSrcCurrent(src)
  }, [src])

  return (
    <img
      src={srcCurrent}
      alt=""
      decoding="async"
      draggable={false}
      loading="lazy"
      className="pointer-events-none absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
      onError={() => setSrcCurrent('/logo1.svg')}
    />
  )
}

function PdfEmbeddedPreview({
  pdfUrl,
  fallbackSrc,
}: {
  pdfUrl: string
  fallbackSrc: string
}) {
  const src = `${pdfUrl}#toolbar=0&navpanes=0&view=FitH`

  return (
    <div
      data-health-slider-preview
      className="pointer-events-none relative aspect-[5/7] w-full shrink-0 overflow-hidden rounded-t-lg bg-neutral-900/45 sm:rounded-t-xl"
    >
      <p className="pointer-events-none absolute left-2 top-1.5 z-[1] rounded-full bg-neutral-950/70 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm sm:left-3 sm:text-[0.6rem]">
        PDF
      </p>
      <object
        type="application/pdf"
        data={src}
        aria-label="ภาพตัวอย่างจากหน้าแรกของไฟล์ PDF"
        className="pointer-events-none absolute inset-0 h-full w-full border-0"
      >
        <StaticPreviewImage src={fallbackSrc} />
      </object>
    </div>
  )
}

export function HealthResultProductPdfSlider({ products, detailsPdfLinkExtras, metricsMeta }: Props) {
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const settleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [pdfPreviewMidPx, setPdfPreviewMidPx] = useState<number | null>(null)

  const syncThumbState = useCallback(() => {
    const el = scrollerRef.current
    if (!el || products.length === 0) return

    const sl = el.scrollLeft
    const vw = el.clientWidth
    const sw = el.scrollWidth
    const eps = 2

    setCanPrev(sl > eps)
    setCanNext(sl + vw < sw - eps)
  }, [products.length])

  const onScrollDebounced = useCallback(() => {
    if (settleRef.current) clearTimeout(settleRef.current)
    settleRef.current = setTimeout(() => {
      settleRef.current = undefined
      syncThumbState()
    }, 48)
  }, [syncThumbState])

  useEffect(() => {
    syncThumbState()
  }, [products.length, syncThumbState])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      syncThumbState()
    })
    ro.observe(el)

    const onScroll = () => {
      syncThumbState()
      onScrollDebounced()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', syncThumbState)
    window.addEventListener('resize', syncThumbState)

    syncThumbState()

    return () => {
      if (settleRef.current) clearTimeout(settleRef.current)
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', syncThumbState)
      window.removeEventListener('resize', syncThumbState)
    }
  }, [onScrollDebounced, syncThumbState])

  /** จัดให้ปุ่มอยู่กึ่งความสูงของบล็อกพรีวิว PDF (จากการ์ดซ้ายสุดในรายการ — ความสูงพรีวิวเท่ากันทุกใบ) */
  useLayoutEffect(() => {
    const track = carouselTrackRef.current
    if (!track || products.length === 0) {
      setPdfPreviewMidPx(null)
      return
    }

    const compute = () => {
      const previewEl = track.querySelector<HTMLElement>('[data-health-slider-preview]')
      if (!previewEl) {
        setPdfPreviewMidPx(null)
        return
      }
      const t = track.getBoundingClientRect()
      const p = previewEl.getBoundingClientRect()
      setPdfPreviewMidPx(p.top - t.top + p.height / 2)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(track)
    const preview = track.querySelector<HTMLElement>('[data-health-slider-preview]')
    if (preview) ro.observe(preview)
    window.addEventListener('resize', compute)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [products.length])

  const scrollPage = (delta: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: delta * el.clientWidth, behavior: 'smooth' })
  }

  const goPrev = () => scrollPage(-1)
  const goNext = () => scrollPage(1)

  if (products.length === 0) return null

  const navImgClass = 'pointer-events-none h-24 w-24 select-none sm:h-28 sm:w-28 md:h-32 md:w-32'

  /** ให้ปุ่มอยู่กึ่งความสูงบล็อกพรีวิว PDF; ถ้ายังวัดพิกัดไม่ทันให้ชิดกึ่งกลางแนวตั้งของแถบชั่วคราว */
  const navVertStyle =
    pdfPreviewMidPx !== null ? ({ top: pdfPreviewMidPx, transform: 'translateY(-50%)' } as const) : ({ top: '50%', transform: 'translateY(-50%)' } as const)

  return (
    <div className="relative w-full overflow-visible">
      <div ref={carouselTrackRef} className="relative px-1 pb-3 pt-3 sm:px-2 xl:py-3">
        <button
          type="button"
          className={`${sliderNavHit} pointer-events-auto absolute left-0 z-30 max-xl:-translate-x-0.5 sm:max-xl:-translate-x-1 xl:hidden`}
          style={navVertStyle}
          aria-label="เลื่อนย้อนหนึ่งหน้าจอ"
          disabled={!canPrev}
          onClick={goPrev}
        >
          <img src={chevronPrev} alt="" className={navImgClass} draggable={false} aria-hidden />
        </button>
        <button
          type="button"
          className={`${sliderNavHit} pointer-events-auto absolute right-0 z-30 max-xl:translate-x-0.5 sm:max-xl:translate-x-1 xl:hidden`}
          style={navVertStyle}
          aria-label="เลื่อนหน้าจอถัดไป"
          disabled={!canNext}
          onClick={goNext}
        >
          <img src={chevronNext} alt="" className={navImgClass} draggable={false} aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          role="region"
          aria-label="เลื่อนดูสินค้าหลายการ์ดพร้อมกัน ภาพตัวอย่างจาก PDF"
          className="-webkit-overflow-scrolling-touch flex min-h-0 min-w-0 w-full gap-3 py-2 max-xl:flex-nowrap max-xl:snap-x max-xl:snap-mandatory max-xl:overflow-x-auto max-xl:scroll-smooth max-xl:[scrollbar-width:none] max-xl:[&::-webkit-scrollbar]:hidden xl:flex-wrap xl:snap-normal xl:overflow-visible"
        >
          {products.map((p, i) => {
            const cardClass =
              'flex h-full min-h-0 cursor-pointer touch-manipulation flex-col overflow-hidden rounded-lg border-0 bg-transparent text-center text-inherit no-underline outline-offset-[-2px] [-webkit-tap-highlight-color:transparent] transition-opacity active:opacity-90 focus-visible:z-[2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900 sm:rounded-xl'

            const body = (
              <PdfEmbeddedPreview pdfUrl={p.pdfUrl} fallbackSrc={resolveHealthProductImageUrl(p)} />
            )

            const label = `แตะเพื่อดู datasheet — ${p.titleTh}`

            return (
              <div key={i} className={slideSlideClass}>
                {detailsPdfLinkExtras != null ? (
                  <Link
                    to={buildDetailsPdfHref(p.pdfUrl, p.titleTh, detailsPdfLinkExtras)}
                    aria-label={label}
                    className={cardClass}
                    onClick={() =>
                      trackKioskEvent('product_open', {
                        productIndex: i,
                        titleTh: p.titleTh,
                        pdfUrl: p.pdfUrl,
                        ...metricsMeta,
                      })
                    }
                  >
                    {body}
                  </Link>
                ) : (
                  <a
                    href={p.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`เปิด datasheet ในแท็บใหม่ — ${p.titleTh}`}
                    className={cardClass}
                  >
                    {body}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p className="sr-only">
        หน้าจอเล็กถึงกลางมีปุ่มเลื่อนที่ขอบซ้ายขวา จัดกึ่งความสูงของพื้นที่พรีวิว PDF ของการ์ดในแถบเลื่อน จอขนาด xl ขึ้นไปเรียงการ์ดครบโดยไม่ต้องเลื่อนซ้ายขวา
      </p>
    </div>
  )
}
