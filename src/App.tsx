import { Route, Routes } from 'react-router-dom'
import { KioskNavbar } from './components/KioskNavbar'
import HealthStep2 from './page/Health/step2'
import HealthStep3 from './page/Health/step3'
import HealthResultPage from './page/result'
import SpecialStep2 from './page/Special/step2'
import SpecialStep3 from './page/Special/step3'
import Page1 from './page/page1'
import Page2 from './page/page2'
import Page3 from './page/page3'

function App() {
  return (
    <div className="flex min-h-0 flex-1 touch-manipulation flex-col bg-neutral-100 [-webkit-overflow-scrolling:touch] [-webkit-touch-callout:none] select-none">
      <KioskNavbar />
      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-clip ">
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/health/step2" element={<HealthStep2 />} />
          <Route path="/health/step3" element={<HealthStep3 />} />
          <Route path="/health/result" element={<HealthResultPage />} />
          <Route path="/special/step2" element={<SpecialStep2 />} />
          <Route path="/special/step3" element={<SpecialStep3 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
