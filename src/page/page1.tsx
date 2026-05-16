import blueSpring from '../assets/images/SVG/blueSpring.svg'
import greenSpring from '../assets/images/SVG/greenSpring.svg'
import circleGreen from '../assets/images/SVG/circleGreen.svg'
import greenSpringWhite from '../assets/images/SVG/greenSpringW.svg'
import mushroomGreen from '../assets/images/SVG/mushroomGreen.svg'
import circleBlue from '../assets/images/SVG/circleBlue.svg'
import greenSpringWhiteDarkBlue from '../assets/images/SVG/greenSpringWDBlueBottom.svg'
import greenSpringWD from '../assets/images/SVG/greenSpringWD.svg'
import Bluemushroom from '../assets/images/SVG/blueMushroom.svg'
import blueSpringWD from '../assets/images/SVG/blueSpringWD.svg'
import circleGreenBlank from '../assets/images/SVG/circleGreenBlank.svg'
import circleBlueBlank from '../assets/images/SVG/circleBlueBlank.svg'
import { InteractiveSpringImg } from '../components/InteractiveSpringImg'

/** จอใหญ่ (xl+): เทียบเท่าชุดเดิม — ไม่เปลี่ยน. ด้านล่าง xl ย่อให้ครบ 5 คอลัมน์; md/lg เหมาะ iPad/tablet portrait–landscape */
const springImg =
  'mx-auto block h-28 w-full max-w-[min(100%,12rem)] max-h-[min(38vw,13rem)] object-contain max-xl:!h-[3.875rem] max-xl:!max-w-[min(100%,17.5vw)] max-xl:!max-h-[29vmin] max-xl:sm:!h-[4.5rem] max-xl:sm:!max-w-[min(100%,17vw)] max-xl:md:!h-[7rem] max-xl:md:!max-w-[min(100%,13.75vw)] max-xl:md:!max-h-[38vmin] max-xl:lg:!h-[9.25rem] max-xl:lg:!max-w-[min(100%,12.5rem)] max-xl:lg:!max-h-[none] sm:h-32 md:h-40 lg:h-44 lg:max-w-[14rem]'

/** เสมอ 5 คอลัมน์ — ระยะซอยบนจอแคบ, จอ xl+ เหมือนเดิม */
const springRowGrid =
  'grid w-full max-w-[100vw] grid-cols-5 max-xl:gap-x-2 max-xl:gap-y-5 max-xl:sm:gap-x-2.5 max-xl:md:gap-x-3 max-xl:md:gap-y-9 max-xl:lg:gap-x-5 max-xl:lg:gap-y-11 xl:gap-x-4 xl:gap-y-8 xl:sm:gap-x-6 xl:lg:gap-x-8'

const springCell =
  'flex min-h-0 min-w-0 flex-col items-center justify-start gap-2 max-xl:sm:gap-2.5 max-xl:md:gap-4 max-xl:lg:gap-5 xl:gap-3'

const pageShell =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip bg-white text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'

/** ข้อความบนกรอบด้านกลาง — แก้เป็น copy จริงได้ตามต้องการ */
const middleFrameLines = [
  'SPRING SORT GAME',
  'Find Your Future Food Match',
  'ค้นหาอาหารแห่งอนาคตที่เหมาะกับคุณ',
] as const

export default function Page1() {
  return (
    <div className={pageShell}>
      {/* รูปด้านบน */}
      <div className={`${springRowGrid} spring-float-stagger`}>
        <div className={springCell}>
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={circleGreen} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={greenSpringWhite} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={greenSpringWhite} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={mushroomGreen} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={greenSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={circleBlue} alt="" className={springImg} />
          <InteractiveSpringImg src={greenSpring} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={greenSpringWhite} alt="" className={springImg} />
          <InteractiveSpringImg src={circleBlue} alt="" className={springImg} />
        </div>
      </div>
      {/* รูปด้านกลาง — กรอบโปร่งเล็กน้อย + ข้อความซ้อนหน้าสุดตามขอบกรอบ */}
      <div
        className="relative isolate w-full overflow-hidden rounded-2xl bg-white/88 pb-4 max-xl:rounded-xl max-xl:pb-3 max-xl:md:min-h-[clamp(14rem,36vh,24rem)] max-xl:lg:min-h-[clamp(16rem,40vh,27rem)] max-xl:md:pb-7 max-xl:lg:pb-9 xl:sm:pb-5"
        aria-label="ลานเกมควิซ"
      >
        <div
          className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-1 px-2 text-center text-sm font-medium leading-snug text-[#4a4456] [text-shadow:0_1px_0_rgb(255_255_255/0.92),0_0_24px_rgb(255_255_255/0.75)] max-xl:gap-1 max-xl:py-3 max-xl:sm:gap-1.5 max-xl:sm:px-4 max-xl:sm:text-base max-xl:md:gap-2 max-xl:md:py-8 max-xl:md:px-5 max-xl:md:text-lg max-xl:lg:gap-2.5 max-xl:lg:py-11 max-xl:lg:px-6 max-xl:lg:text-xl xl:gap-1 xl:px-4 xl:text-inherit xl:sm:gap-1.5 xl:sm:px-6 xl:sm:text-lg xl:md:text-xl"
        >
          <p className="font-bold max-xl:text-xl max-xl:sm:text-3xl max-xl:md:text-[2.375rem] max-xl:lg:text-6xl xl:text-7xl">
            {middleFrameLines[0]}
          </p>
          <p className="font-bold max-xl:text-sm max-xl:sm:text-lg max-xl:md:text-2xl max-xl:lg:text-[2rem] xl:text-4xl">
            {middleFrameLines[1]}
          </p>
          <hr
            aria-hidden
            className="mx-auto block h-0 w-[min(14rem,calc(100%-5rem))] shrink-0 border-0 border-t-[clamp(3px,0.85vw,5px)] border-solid border-[#4a4456] max-xl:my-2 max-xl:w-[min(11rem,calc(100%-2rem))] max-xl:border-t-[3px] max-xl:md:my-3.5 max-xl:lg:my-5 max-xl:lg:w-[min(13rem,calc(100%-3rem))] max-xl:lg:border-t-4 xl:my-3 xl:border-t-[5px] xl:sm:my-3.5 xl:md:w-[min(18rem,calc(100%-8rem))]"
          />
          <p className="font-bold max-xl:text-xs max-xl:sm:text-base max-xl:md:text-xl max-xl:lg:text-[1.65rem] xl:text-3xl">
            {middleFrameLines[2]}
          </p>
        </div>
        <div className={`${springRowGrid} relative z-0 px-2 py-3 max-xl:sm:px-3 max-xl:md:py-10 max-xl:md:min-h-[clamp(11rem,32vh,20rem)] max-xl:md:px-4 max-xl:lg:min-h-[clamp(12rem,34vh,22rem)] max-xl:lg:px-5 max-xl:lg:py-12 xl:px-3 xl:py-4 xl:min-h-0 xl:sm:px-5 xl:sm:py-5 opacity-10`}>
          <div className={springCell}>
            <img src={circleGreenBlank} alt="" className={springImg} />
            <img src={blueSpring} alt="" className={springImg} />
          </div>
          <div className={springCell}>
            <img src={greenSpringWhiteDarkBlue} alt="" className={springImg} />
            <img src={circleBlueBlank} alt="" className={springImg} />
          </div>
          <div className={springCell}>
            <img src={circleGreenBlank} alt="" className={springImg} />
            <img src={greenSpringWhite} alt="" className={springImg} />
          </div>
          <div className={springCell}>
            <img src={circleGreenBlank} alt="" className={springImg} />
            <img src={blueSpring} alt="" className={springImg} />
          </div>
          <div className={springCell}>
            <img src={blueSpring} alt="" className={springImg} />
            <img src={circleGreenBlank} alt="" className={springImg} />
          </div>
        </div>
      </div>
      {/* รูปด้านล่าง */}
      <div className={`${springRowGrid} spring-float-stagger spring-float-stagger--bottom`}>
        <div className={springCell}>
          <InteractiveSpringImg src={greenSpringWD} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={circleGreen} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={Bluemushroom} alt="" className={springImg} />
          <InteractiveSpringImg src={greenSpringWhiteDarkBlue} alt="" className={springImg} />
          <InteractiveSpringImg src={greenSpringWhite} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={blueSpringWD} alt="" className={springImg} />
          <InteractiveSpringImg src={circleGreen} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={greenSpringWhite} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
          <InteractiveSpringImg src={circleGreen} alt="" className={springImg} />
        </div>
        <div className={springCell}>
          <InteractiveSpringImg src={circleBlue} alt="" className={springImg} />
          <InteractiveSpringImg src={greenSpringWD} alt="" className={springImg} />
          <InteractiveSpringImg src={blueSpring} alt="" className={springImg} />
        </div>
      </div>
    </div>
  )
}
