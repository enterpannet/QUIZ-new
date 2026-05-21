import { Link } from 'react-router-dom'
import Group from '../../assets/images/SVG/Group.svg'
import { E_BOOKLET_PDF_URL, HEALTH_RESULT_PAGE_SHELL } from '../healthResultNav'

/** ดึงรูปกราฟิกเต็มความกว้าง viewport — หักลบ px ข้างของ HEALTH_RESULT_PAGE_SHELL */
const END_SESSION_GROUP_BLEED =
  'w-full max-w-none shrink-0 self-stretch -mx-3 max-xl:sm:-mx-4 max-xl:md:-mx-5 max-xl:lg:-mx-6 xl:-mx-4 xl:sm:-mx-6'

const END_SESSION_GROUP_IMG =
  'block h-[clamp(12rem,32vh,24rem)] w-full max-w-none object-contain object-bottom sm:h-[clamp(14rem,36vh,28rem)] md:h-[clamp(16rem,40vh,32rem)] xl:h-[clamp(18rem,44vh,36rem)] 2xl:h-[clamp(20rem,48vh,40rem)]'

/** ปุ่มสีเหลืองโค้งมน — ตามม็อกหน้า End session; ใหญ่ตาม breakpoint จอ kiosk */
const END_SESSION_CTA_BTN =
  'font-heading inline-flex min-h-[2.875rem] min-w-[min(100%,13rem)] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#ffdd33] px-6 py-2.5 text-center text-sm font-bold leading-tight text-neutral-800 shadow-none transition-opacity active:opacity-85 md:min-h-[3.125rem] md:min-w-[14rem] md:px-8 md:text-base xl:min-h-[3.375rem] xl:min-w-[15.75rem] xl:px-10 xl:text-lg 2xl:min-h-[3.75rem] 2xl:min-w-[18rem] 2xl:px-12 2xl:text-xl'

export default function EndSessionPage() {
  return (
    <div className={`relative ${HEALTH_RESULT_PAGE_SHELL} min-h-0`}>
      {/* texture: noise overlay ใสบนพื้นเทาอ่อน — ประมาณพื้นในภาพ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 isolate opacity-[0.14] mix-blend-multiply dark:opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative flex min-h-0 flex-1 flex-col text-center">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-xl space-y-5 text-neutral-900 sm:max-w-[36rem] sm:space-y-6 lg:max-w-[40rem] xl:max-w-[48rem] xl:space-y-7 2xl:max-w-[56rem] 2xl:space-y-8">
          <section className="space-y-3 md:space-y-4 xl:space-y-5">
            <h1 className="font-heading text-balance text-xl font-bold leading-snug md:text-[1.625rem] xl:text-[1.875rem] xl:leading-snug 2xl:text-[2.125rem] text-blue-500">
              <span className="block text-center text-3xl font-bold">Thank you</span> <span className="block text-center text-2xl font-bold">for discovering your Future Food Match</span>
            </h1>
            <p className="font-heading text-balance text-sm font-normal leading-relaxed text-neutral-800 md:text-base xl:text-lg xl:leading-relaxed 2xl:text-xl">
              We hope your results help you discover new Medical & Personalised Food solutions tailored to your needs and
              inspire new opportunities for the future of food and business
            </p>
          </section>

          <hr className="mx-auto my-7 w-28 border-0 border-t border-solid border-neutral-400 sm:my-8 xl:my-9 xl:w-32 2xl:my-10 2xl:w-36" />

          <section className="space-y-3 md:space-y-4 xl:space-y-5">
            <h2 className="font-thai text-balance text-xl font-bold leading-snug md:text-[1.625rem] xl:text-[1.875rem] xl:leading-snug 2xl:text-[2.125rem]">
              ขอบคุณที่ร่วมค้นหา Future Food Match ของคุณ
            </h2>
            <p className="font-thai text-balance text-lg font-normal leading-relaxed text-neutral-800 md:text-lg xl:text-lg xl:leading-relaxed 2xl:text-xl">
              สำรวจความต้องการด้านสุขภาพของคุณ ผ่าน 3 ขั้นตอนง่าย ๆ เพื่อค้นพบผลิตภัณฑ์ อาหารทางการแพทย์และอาหารเฉพาะบุคคล
              ที่ตอบโจทย์คุณมากที่สุด
            </p>
          </section>

          <div className="flex flex-wrap items-stretch justify-center gap-4 pt-4 xl:gap-5 xl:pt-6 2xl:gap-6 2xl:pt-8">
            <Link to="/" className={`${END_SESSION_CTA_BTN} no-underline`}>
              Sorting Again
            </Link>
            <a
              href={E_BOOKLET_PDF_URL}
              download="ebooklet.pdf"
              className={`${END_SESSION_CTA_BTN} flex-col no-underline`}
            >
              <span className="flex flex-col items-center gap-0 leading-tight">
                <span>Download</span>
                <span>E - Booklet</span>
              </span>
            </a>
          </div>

          <footer className="space-y-2 pt-4 text-xs font-normal leading-relaxed text-neutral-700 md:text-sm xl:space-y-2.5 xl:pt-5 xl:text-base 2xl:space-y-3 2xl:pt-6 2xl:text-lg">
            <p className="font-heading text-balance">
              You can also explore more products in the Future Food E-Booklet.
            </p>
            <p className="font-thai text-balance">
              คุณสามารถดูข้อมูลผลิตภัณฑ์เพิ่มเติมได้ใน Future Food E-Booklet
            </p>
          </footer>
        </div>
        </div>

        <div className={`${END_SESSION_GROUP_BLEED}`}>
          <img src={Group} alt="" className={END_SESSION_GROUP_IMG} />
        </div>
      </div>
    </div>
  )
}
