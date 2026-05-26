import type { KioskCatalogueProfile } from './healthResultCombo'

/** Medical Food (สีเขียว) ↔ `/health/*` · Personalised Food (สีฟ้า) ↔ `/special/*` */
export const KIOSK_CATALOGUE = {
  medical: {
    profile: 'medical' as const satisfies KioskCatalogueProfile,
    labelEn: 'Medical Food',
    labelTh: 'อาหารทางการแพทย์',
    pathPrefix: '/health',
  },
  personalised: {
    profile: 'personalised' as const satisfies KioskCatalogueProfile,
    labelEn: 'Personalised Food',
    labelTh: 'อาหารเฉพาะบุคคล',
    pathPrefix: '/special',
  },
} as const

export type KioskCatalogueKey = keyof typeof KIOSK_CATALOGUE
