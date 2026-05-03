import { Outlet } from 'react-router-dom'

function App() {
  return (
    <main className="flex min-h-dvh flex-col bg-transparent text-slate-900">
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </main>
  )
}

export default App
