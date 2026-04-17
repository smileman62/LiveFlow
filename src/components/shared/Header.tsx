import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Header() {
  const location = useLocation()
  const { user } = useAuth()
  const isService = location.pathname.startsWith('/service')

  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6">
        <Link
          to={isService ? '/service' : '/'}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-sm font-extrabold text-white">
            LF
          </div>
          <span className="text-lg font-bold text-slate-900">Live Flow</span>
        </Link>

        {isService ? (
          <p className="max-w-[min(100%,14rem)] truncate text-right text-sm text-slate-600 sm:max-w-none">
            <span className="font-semibold text-slate-900">
              {user?.displayName ?? '회원'}
            </span>
            님, 환영합니다
          </p>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:px-5"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:px-5"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
