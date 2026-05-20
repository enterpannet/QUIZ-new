import blueSpring from '../assets/images/SVG/blueSpring.svg'
import greenSpring from '../assets/images/SVG/greenSpring.svg'
import circleGreen from '../assets/images/SVG/circleGreen.svg'
import greenSpringWhite from '../assets/images/SVG/greenSpringW.svg'
import mushroomGreen from '../assets/images/SVG/mushroomGreen.svg'
import circleBlue from '../assets/images/SVG/circleBlue.svg'
import greenSpringWhiteDarkBlue from '../assets/images/SVG/greenSpringWDBlueBottom.svg'
import greenSpringWD from '../assets/images/SVG/greenSpringWD.svg'
import Bluemushroom from '../assets/images/SVG/Bluemushroom.svg'
import blueSpringWD from '../assets/images/SVG/blueSpringWD.svg'
import circleGreenBlank from '../assets/images/SVG/circleGreenBlank.svg'
import circleBlueBlank from '../assets/images/SVG/circleBlueBlank.svg'
import { InteractiveSpringImg } from './InteractiveSpringImg'
import { springCell, springImg, springRowGrid } from './springBandLayout'

/** แถบสปริงซ้อนหลายเลเยอร์ด้านบน (หน้า 1 / หน้า 2 เหมือนกัน) */
export function KioskSpringBandTop() {
  return (
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
  )
}

/** แถบสปริงด้านล่าง + animation ชุด bottom */
export function KioskSpringBandBottom() {
  return (
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
  )
}

const kioskSpringBackdropGridClass =
  `${springRowGrid} relative z-0 px-2 py-3 max-xl:sm:px-3 max-xl:md:py-10 max-xl:md:min-h-[clamp(11rem,32vh,20rem)] max-xl:md:px-4 max-xl:lg:min-h-[clamp(12rem,34vh,22rem)] max-xl:lg:px-5 max-xl:lg:py-12 xl:px-3 xl:py-4 xl:min-h-0 xl:sm:px-5 xl:sm:py-5 opacity-10`

/** กริดสปริงพื้นหลังจางภายในการ์ดกลาง (หน้า 1 และ หน้า 2) */
export function KioskSpringBackdropBand() {
  return (
    <div className={kioskSpringBackdropGridClass}>
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
  )
}
