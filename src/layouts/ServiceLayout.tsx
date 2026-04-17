import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { to: '/service', label: '개요', end: true },
  { to: '/service/analytics', label: '데이터 분석', end: false },
  { to: '/service/automation', label: '자동화', end: false },
] as const

function ServiceLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-0 flex-1 bg-slate-50">
      <aside className="flex w-56 shrink-0 flex-col self-stretch border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-4">
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
            서비스
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-auto p-3">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            로그아웃
          </button>
        </div>
      </aside>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default ServiceLayout
