import { Outlet } from 'react-router-dom'
import Header from './components/shared/Header'

function App() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-slate-50 pt-16 text-slate-900">
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default App
