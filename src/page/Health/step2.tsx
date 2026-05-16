import { HEALTH_SAND_PAGE_SHELL } from './healthStepShell'
import { KioskStepHeader } from '../../components/KioskStepHeader'
import greenSpringW from '../../assets/images/SVG/greenSpringW.svg'
import circleGreen from '../../assets/images/SVG/circleGreen.svg'
import SymptomManagement from '../../assets/images/SVG/SymptomManagement.svg'
import greenSpring from '../../assets/images/SVG/greenSpring.svg'
import greenSpringWDS from '../../assets/images/SVG/greenSpringWDS.svg'
import Beverages from '../../assets/images/SVG/Beverages.svg'

/** ป้ายหัวข้อคอลัมน์ — ความสูงขั้นต่ำคงที่ให้ทั้งสามกรอบเท่ากัน */
const goalTitlePill =
  'flex min-h-[3.5rem] w-full items-center justify-center px-4 py-2 text-center text-xs font-bold leading-snug bg-neutral-100/50 rounded-full'

const goalSubtitle = 'mt-1 text-xs text-center text-neutral-900/90'

const pageShell =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip bg-neutral-100 text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'


/** คอลัมน์เป้าหมาย — รูปชิดขอบล่างของพื้นที่ยืดได้ เพื่อให้ป้ายข้อความเรียงระดับเดียวกัน */


export default function HealthStep2() {
  return (
    <div className={HEALTH_SAND_PAGE_SHELL + pageShell}>
         <KioskStepHeader
          stepLabel="STEP 2"
          titleLine1="SELECT YOUR"
          titleLine2="HEALTH GOAL"
          description="เลือกเป้าหมายสุขภาพที่ต้องการดุแล เป้าหมายหลักของคุณคืออะไร?"
        />
      <div className="flex flex-1 flex-col items-center justify-center gap-2  py-3 text-center sm:py-4">
     
        <div className='flex flex-row items-center justify-center gap-0.5'>
          <div className='flex flex-col items-center justify-center flex-1'>
            <div><img src={greenSpringW} alt="greenSpringW" className='w-18 h-auto scale-x-[-1]' /></div>
            <div><img src={circleGreen} alt="circleGreen" className='w-18 h-auto' /></div>
            <div><img src={SymptomManagement} alt="SymptomManagement" className='w-24 h-auto' /></div>
            <div className='w-full'>
              <p className={goalTitlePill}>
                Symptom
                <br />
                Management
              </p>
              <p className={goalSubtitle}>ควบคุมอาการและลดภาวะแทรกซ้อน</p>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center flex-1'>
            <div><img src={greenSpring} alt="greenSpring" className='w-18 h-auto rotate-10' /></div>
            <div><img src={greenSpringWDS} alt="greenSpringWDS" className='w-18 h-auto' /></div>
            <div><img src={Beverages} alt="Beverages" className='w-24 h-auto' /></div>
            <div className='w-full'>
              <p className={goalTitlePill}>
                Nutritional
                <br />
                Recovery
              </p>
              <p className={goalSubtitle}>ฟื้นฟูร่างกาย และภาวะโภชนาการ</p>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center flex-1'>
            <div><img src={greenSpringW} alt="greenSpringW" className='w-18 h-auto' /></div>
            <div><img src={circleGreen} alt="circleGreen" className='w-18 h-auto' /></div>
            <div><img src={Beverages} alt="Beverages" className='w-24 h-auto' /></div>
            <div className='w-full'>
              <p className={goalTitlePill}>
                Quality of
                <br />
                Life Support
              </p>
              <p className={goalSubtitle}>เสริมคุณภาพชีวิต <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
          </div>
         
         
        </div>
      </div>
    </div>
  )
}
