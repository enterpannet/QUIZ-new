import type { SpecialPillEn } from './specialStepContent'

/** ข้อความอังกฤษใน pill ของ Special — 1 หรือ 2 บรรทัด */
export function SpecialEnglishPill({ className, parts }: { className: string; parts: SpecialPillEn }) {
  if (parts.length === 2) {
    return (
      <p className={`font-heading ${className}`}>
        {parts[0]}
        <br />
        {parts[1]}
      </p>
    )
  }
  return <p className={`font-heading ${className}`}>{parts[0]}</p>
}
