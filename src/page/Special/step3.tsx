const pageShell =
  'flex w-full max-w-none flex-1 flex-col items-stretch justify-start overflow-x-clip bg-[#bbdb0c] text-neutral-900 max-xl:gap-5 max-xl:px-3 max-xl:py-5 max-xl:pb-6 max-xl:sm:px-4 max-xl:md:gap-9 max-xl:md:px-5 max-xl:md:py-8 max-xl:md:pb-10 max-xl:lg:gap-10 max-xl:lg:px-6 max-xl:lg:py-10 max-xl:lg:pb-12 xl:gap-6 xl:px-4 xl:py-6 xl:pb-8 xl:sm:gap-8 xl:sm:px-6 xl:sm:py-10 xl:sm:pb-10'

export default function SpecialStep3() {
  return (
    <div className={pageShell}>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-8 text-center">
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl md:text-3xl">
          Special — Step 3
        </h1>
        <p className="max-w-md text-sm text-neutral-800 sm:text-base">
          หน้า placeholder — ใส่เนื้อหาถัดไปได้ที่นี่
        </p>
      </div>
    </div>
  )
}
