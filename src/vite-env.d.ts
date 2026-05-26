/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_KIOSK_METRICS_ENDPOINT?: string
  /** Origin สำหรับ QR/NFC — ค่าเริ่มต้น https://quiz.d2km.online */
  readonly VITE_KIOSK_PUBLIC_ORIGIN?: string
  readonly VITE_BASE_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
