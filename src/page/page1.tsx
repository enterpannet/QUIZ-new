import touchHint from '../assets/images/SVG/touch-svgrepo-com.svg'
import { KioskSpringBackdropBand, KioskSpringBandBottom, KioskSpringBandTop } from '../components/KioskSpringBandRows'
import { Link } from 'react-router-dom'
const pageShell =

  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'



/** ข้อความบนกรอบด้านกลาง — แก้เป็น copy จริงได้ตามต้องการ */

const middleFrameLines = [

  'SPRING SORT GAME',

  'Find Your Future Food Match',

  'ค้นหาอาหารแห่งอนาคตที่เหมาะกับคุณ',

] as const



export default function Page1() {

  return (

    <div className={pageShell}>

      <KioskSpringBandTop />

      {/* รูปด้านกลาง — กรอบโปร่ง + ข้อความซ้อนหน้า */}

      <div

        className="relative isolate w-full overflow-hidden  bg-neutral-100 pb-4 max-xl:rounded-xl max-xl:pb-3 max-xl:md:min-h-[clamp(14rem,36vh,24rem)] max-xl:lg:min-h-[clamp(16rem,40vh,27rem)] max-xl:md:pb-7 max-xl:lg:pb-9 xl:sm:pb-5 "

        aria-label="ลานเกมควิซ"

      >

        <Link

          to="/page2"

          className="absolute inset-0 z-[30] touch-manipulation  max-xl:rounded-xl focus-visible:z-[55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700"

          aria-label="แตะเพื่อไปหน้าเกม — หน้าถัดไป"

        />

        <div

          className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-1 px-2 text-center text-sm font-medium leading-snug text-neutral-800 [text-shadow:0_1px_0_rgb(255_255_255/0.4),0_0_14px_rgb(245_245_245/0.9)] max-xl:gap-1 max-xl:py-3 max-xl:sm:gap-1.5 max-xl:sm:px-4 max-xl:sm:text-base max-xl:md:gap-2 max-xl:md:py-8 max-xl:md:px-5 max-xl:md:text-lg max-xl:lg:gap-2.5 max-xl:lg:py-11 max-xl:lg:px-6 max-xl:lg:text-xl xl:gap-1 xl:px-4 xl:text-inherit xl:sm:gap-1.5 xl:sm:px-6 xl:sm:text-lg xl:md:text-xl"

        >

          <p className="font-bold max-xl:text-xl max-xl:sm:text-3xl max-xl:md:text-[2.375rem] max-xl:lg:text-6xl xl:text-7xl">

            {middleFrameLines[0]}

          </p>

          <p className="font-bold max-xl:text-sm max-xl:sm:text-lg max-xl:md:text-2xl max-xl:lg:text-[2rem] xl:text-4xl">

            {middleFrameLines[1]}

          </p>

          <hr

            aria-hidden

            className="mx-auto block h-0 w-[min(14rem,calc(100%-5rem))] shrink-0  max-xl:my-2 max-xl:w-[min(11rem,calc(100%-2rem))] max-xl:border-t-[3px] max-xl:md:my-3.5 max-xl:lg:my-5 max-xl:lg:w-[min(13rem,calc(100%-3rem))] max-xl:lg:border-t-4 xl:my-3 xl:border-t-[5px] xl:sm:my-3.5 xl:md:w-[min(18rem,calc(100%-8rem))]"

          />

          <p className="font-bold max-xl:text-xs max-xl:sm:text-base max-xl:md:text-xl max-xl:lg:text-[1.65rem] xl:text-3xl">

            {middleFrameLines[2]}

          </p>

          <div

            className="tap-hand-hint mt-2 flex shrink-0 justify-center max-xl:mt-2.5 max-xl:md:mt-4 max-xl:lg:mt-5 xl:mt-4"

            aria-hidden

          >

            <img

              src={touchHint}

              alt=""

              width={512}

              height={512}

              draggable={false}

              className="pointer-events-none h-10 w-auto max-w-[min(22vw,5.5rem)] object-contain drop-shadow-[0_1px_4px_rgb(212_212_212/0.55)] max-xl:sm:h-12 max-xl:md:h-14 max-xl:lg:h-16 xl:h-[4.5rem]"

            />

          </div>

        </div>

        <KioskSpringBackdropBand />

      </div>

      <KioskSpringBandBottom />

    </div>

  )

}


