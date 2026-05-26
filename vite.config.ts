import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

/** GitHub Actions ส่ง VITE_BASE_PATH เช่น `/repo/` ; ว่างหรือ `/` = รากโดเมน */
function viteBase(): string {
  const env = process.env.VITE_BASE_PATH
  if (env === undefined || env === '' || env === '/') return '/'
  const trimmed = env.replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

// https://vite.dev/config/
export default defineConfig({
  base: viteBase(),
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'logo1.svg'],
      manifest: {
        name: 'Spring Sort Quiz',
        short_name: 'Quiz',
        description: 'ควิซลานสปริง — เล่นด้วยการแตะบนหน้าจอสัมผัส',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'any',
        start_url: '/',
        scope: '/',
        lang: 'th',
        dir: 'ltr',
        icons: [
          {
            src: '/logo1.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/logo1.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        categories: ['games', 'education'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webp}'],
        navigateFallback: 'index.html',
        /** อย่า fallback SPA สำหรับ PDF — ไม่งั้น iframe โหลด React แล้วขึ้น "No routes matched" */
        navigateFallbackDenylist: [/^\/api/, /\.pdf$/i],
        /** โหลด PDF จาก network ก่อน — ลดปัญหา preview ค้าง/ผิดหลัง sync ไฟล์ */
        runtimeCaching: [
          {
            urlPattern: /\/health-product-pdfs\/.*\.pdf(\?.*)?$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'health-product-pdfs',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            urlPattern: /\/ecatalogue-.*\.pdf(\?.*)?$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'catalogue-pdfs',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            urlPattern: /\/ebooklet\.pdf(\?.*)?$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ebooklet-pdf',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    host: true,
  },
})
