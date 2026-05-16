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

const springImg =
  'mx-auto block h-28 w-full max-w-[min(100%,12rem)] max-h-[min(38vw,13rem)] object-contain sm:h-32 md:h-40 lg:h-44 lg:max-w-[14rem]'

const springRowGrid =
  'grid w-full max-w-[100vw] grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-5 lg:gap-x-8'

const springCell =
  'flex min-h-0 min-w-0 flex-col items-center justify-start gap-3'

const pageShell =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start gap-6 overflow-x-clip bg-white px-4 py-6 pb-8 text-neutral-900 sm:gap-8 sm:px-6 sm:py-10 sm:pb-10'

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
        className="relative isolate w-full overflow-hidden rounded-2xl bg-white/88 pb-4 sm:pb-5"
        aria-label="ลานเกมควิซ"
      >
        <div className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-1 px-4 text-center font-medium leading-snug text-[#4a4456] [text-shadow:0_1px_0_rgb(255_255_255/0.92),0_0_24px_rgb(255_255_255/0.75)] sm:gap-1.5 sm:px-6 sm:text-lg md:text-xl">
          <p className="text-7xl font-bold">{middleFrameLines[0]}</p>
          <p className="text-4xl font-bold">{middleFrameLines[1]}</p>
          <hr
            aria-hidden
            className="mx-auto my-3 block h-0 w-[min(14rem,calc(100%-5rem))] shrink-0 border-0 border-t-[5px] border-solid border-[#4a4456] sm:my-3.5 md:w-[min(18rem,calc(100%-8rem))]"
          />
          <p className="text-3xl font-bold">{middleFrameLines[2]}</p>
        </div>
        <div className={`${springRowGrid} relative z-0 px-3 py-4 sm:px-5 sm:py-5 opacity-10`}>
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
