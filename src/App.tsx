import { Outlet } from 'react-router-dom'
import Header from './components/shared/Header'

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-16 text-slate-900">
        <Outlet />
      </main>
    </>
  )
}

export default App
