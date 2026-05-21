import { KioskSpringBackdropBand, KioskSpringBandBottom, KioskSpringBandTop } from '../components/KioskSpringBandRows'
import { Link } from 'react-router-dom'
const pageShell =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'

/** ข้อความกลางหน้า 2 — แก้ copy ได้ที่นี่ (โครงเดียวกับหน้า 1) */
const middleFrameLines = [
  'READY TO SORT YOUR FUTURE FOOD MACTH?',
  'Discover Medical & Personalised Food',
  'solutions designed for your lifestyle and health goals in just 3 simple steps.',
  'ค้นหาอาหารแห่งอนาคตที่เหมาะกับคุณ',
  'สำรวจความต้องการด้านสุขภาพของคุณ ผ่าน 3 ขั้นตอนง่ายๆ',
  'เพื่อค้นพบผลิตภัณฑ์ อาหารทางการแพทย์ และอาหารเฉพาะบุคคล ที่ตอบโจทย์คุณมากที่สุด',
] as const

export default function Page2() {
  return (
    <div className={`${pageShell} kiosk-enter`}>
      <div className="kiosk-enter-item">
        <KioskSpringBandTop />
      </div>
      <div
        className="kiosk-enter-item relative isolate w-full overflow-hidden rounded-2xl bg-neutral-100 pb-4 max-xl:rounded-xl max-xl:pb-3 max-xl:md:min-h-[clamp(14rem,36vh,24rem)] max-xl:lg:min-h-[clamp(16rem,40vh,27rem)] max-xl:md:pb-7 max-xl:lg:pb-9 xl:sm:pb-5"
        aria-label="ลานเกมควิซ หน้า 2"
      >
        <Link
          to="/page3"
          className="absolute inset-0 z-[30] touch-manipulation rounded-2xl max-xl:rounded-xl focus-visible:z-[55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700"
          aria-label="แตะเพื่อไปหน้าถัดไป — หน้า 3"
        />
        <div className="kiosk-enter-lines pointer-events-none absolute inset-0 z-50 flex max-h-full min-h-0 flex-col items-center justify-center gap-y-1 overflow-y-auto overscroll-contain px-3 py-2 text-center text-neutral-800 [text-shadow:0_1px_0_rgb(255_255_255/0.4),0_0_14px_rgb(245_245_245/0.9)] [scrollbar-width:thin] max-xl:gap-y-1 max-xl:px-3 max-xl:py-2 max-xl:sm:gap-y-1.5 max-xl:sm:px-4 max-xl:md:gap-y-1.5 max-xl:md:px-5 max-xl:md:py-3 max-xl:lg:gap-y-2 max-xl:lg:px-6 min-[1080px]:max-xl:gap-y-2 min-[1080px]:max-xl:px-6 xl:gap-y-1 xl:px-5 xl:sm:px-6">
          <p className="font-heading mx-auto w-full max-w-[min(100%,100vw-1.75rem)] min-w-0 truncate font-bold leading-[1.08] tracking-tight text-[clamp(0.4375rem,1.5vmin+0.28rem,1.28rem)] min-[1080px]:leading-[1.06] min-[1080px]:text-[clamp(0.5625rem,1.68vmax+0.42rem,3rem)] xl:leading-[1.06] xl:text-[clamp(0.5625rem,1.72vmax+0.44rem,3.1875rem)] 2xl:leading-[1.1] 2xl:text-[clamp(0.5625rem,1.92vmax+0.48rem,3.375rem)]">{middleFrameLines[0]}</p>
          <p className="font-heading mx-auto w-full max-w-[min(100%,100vw-1.75rem)] min-w-0 truncate font-bold leading-snug text-[clamp(0.4375rem,1vmin+0.34rem,1.1rem)] min-[1080px]:text-[clamp(0.5625rem,1.2vmax+0.48rem,2.375rem)] xl:text-[clamp(0.5625rem,1.24vmax+0.5rem,2.5rem)] 2xl:text-[clamp(0.5625rem,1.32vmax+0.5rem,2.75rem)]">{middleFrameLines[1]}</p>
          <p className="font-heading mx-auto w-full max-w-[min(100%,42rem)] text-balance break-words font-semibold leading-snug text-[clamp(0.53125rem,0.82vmin+0.36rem,0.98rem)] min-[1080px]:text-[clamp(0.6875rem,0.9vmax+0.52rem,2rem)] xl:text-[clamp(0.6875rem,0.94vmax+0.54rem,2.125rem)] 2xl:text-[clamp(0.6875rem,0.93vmax+0.54rem,2.125rem)]">{middleFrameLines[2]}</p>
          <hr aria-hidden className="mx-auto my-1.5 block h-0 w-[min(14rem,calc(100%-5rem))] shrink-0 border-0 border-t-[clamp(2px,0.7vw,5px)] border-solid border-neutral-700 max-xl:my-1.5 max-xl:w-[min(11rem,calc(100%-2rem))] max-xl:border-t-[2px] max-xl:md:my-2 max-xl:lg:my-2.5 max-xl:lg:w-[min(13rem,calc(100%-3rem))] max-xl:lg:border-t-[3px] min-[1080px]:max-xl:my-2 min-[1080px]:max-xl:border-t-[clamp(4px,0.38vmax,7px)] xl:my-2 xl:border-t-[clamp(4px,0.42vmax,7px)] xl:sm:my-2.5 2xl:my-2.5 2xl:border-t-[clamp(5px,0.45vmax,8px)] xl:md:w-[min(18rem,calc(100%-8rem))]" />
          <p className="font-thai mx-auto w-full max-w-[min(100%,42rem)] text-balance break-words font-semibold leading-snug text-[clamp(0.53125rem,0.68vmin+0.38rem,0.95rem)] min-[1080px]:text-[clamp(0.6875rem,0.76vmax+0.52rem,1.625rem)] xl:text-[clamp(0.6875rem,0.8vmax+0.54rem,1.75rem)] 2xl:text-[clamp(0.6875rem,0.79vmax+0.54rem,1.75rem)]">{middleFrameLines[3]}</p>
          <p className="font-thai mx-auto w-full max-w-[min(100%,42rem)] text-balance break-words font-semibold leading-snug text-[clamp(0.53125rem,0.68vmin+0.38rem,0.95rem)] min-[1080px]:text-[clamp(0.6875rem,0.76vmax+0.52rem,1.625rem)] xl:text-[clamp(0.6875rem,0.8vmax+0.54rem,1.75rem)] 2xl:text-[clamp(0.6875rem,0.79vmax+0.54rem,1.75rem)]">{middleFrameLines[4]}</p>
          <p className="font-thai mx-auto w-full max-w-[min(100%,42rem)] text-balance break-words font-semibold leading-snug text-[clamp(0.53125rem,0.65vmin+0.38rem,0.9rem)] min-[1080px]:text-[clamp(0.6875rem,0.72vmax+0.52rem,1.5rem)] xl:text-[clamp(0.6875rem,0.76vmax+0.54rem,1.5625rem)] 2xl:text-[clamp(0.6875rem,0.73vmax+0.54rem,1.5625rem)]">{middleFrameLines[5]}</p>
        </div>
        <KioskSpringBackdropBand />
      </div>
      <div className="kiosk-enter-item">
        <KioskSpringBandBottom />
      </div>
    </div>
  )
}
