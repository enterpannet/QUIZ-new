import { KioskNavbar } from '../src/components/KioskNavbar'
import Page1 from './page/page1'

function App() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <KioskNavbar />
      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-clip">
        <Page1 />
      </main>
    </div>
  )
}

export default App
