import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-sm font-extrabold text-white">
            LF
          </div>
          <span className="text-lg font-bold text-slate-900">Live Flow</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
