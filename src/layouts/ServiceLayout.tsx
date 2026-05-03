import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

const SIDEBAR_W = 'w-[200px]'
const SIDEBAR_MARGIN = 'ml-[200px]'

const navItems = [
  {
    to: '/service',
    label: '방송 준비',
    end: true,
    icon: IconClipboard,
  },
  {
    to: '/service/multi-channel',
    label: '실시간 방송 및 분석',
    end: false,
    icon: IconChart,
  },
  {
    to: '/service/sales-dashboard',
    label: '판매 대시보드',
    end: false,
    icon: IconCart,
  },
  {
    to: '/service/post-analysis',
    label: '방송 후 분석',
    end: false,
    icon: IconDocument,
  },
] as const

function ServiceLayout() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  const displayName = user?.displayName?.trim() || '사용자'

  return (
    <div className="relative flex min-h-dvh flex-1 bg-[#f9fafb]">
      <aside
        className={`fixed top-0 left-0 z-40 flex h-dvh ${SIDEBAR_W} flex-col border-r border-slate-800/80 bg-slate-950 text-slate-300 shadow-xl`}
      >
        <div className="shrink-0 border-b border-slate-800/80 px-3 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-orange-400 text-sm font-bold text-white shadow-md">
              LF
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold tracking-tight text-white">Live Flow</p>
              <p className="truncate text-[10px] text-slate-500">Analytics</p>
            </div>
          </div>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2">
          {navItems.map(({ to, label, end, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition',
                  isActive
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-900/40'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0 opacity-90" />
              <span className="min-w-0 leading-snug">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 space-y-2 border-t border-slate-800/80 p-2">
          <div className="rounded-xl bg-linear-to-br from-violet-600 to-indigo-700 p-3 shadow-lg">
            <p className="text-xs font-semibold text-white">방송 후 리포트</p>
            <p className="mt-1 text-[10px] leading-relaxed text-violet-100/90">
              방송 종료 후 성과를 한 장으로 정리해 보세요.
            </p>
            <button
              type="button"
              onClick={() => navigate('/service/post-analysis')}
              className="mt-2.5 w-full rounded-lg bg-white/15 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              리포트 보기
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-800/60">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">
              {displayName.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">{displayName}</p>
              <p className="text-[10px] text-slate-500">프로필</p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-900/50 px-2.5 py-2 text-[12px] font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            로그아웃
          </button>
        </div>
      </aside>
      <div
        className={`${SIDEBAR_MARGIN} flex min-h-dvh min-w-0 flex-1 flex-col overflow-hidden`}
      >
        <Outlet />
      </div>
    </div>
  )
}

function IconClipboard({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
      />
    </svg>
  )
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  )
}

function IconCart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  )
}

function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  )
}

export default ServiceLayout
