import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

registerSW({ immediate: true })

const root = document.getElementById('root')
if (!root) throw new Error('missing #root')

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)