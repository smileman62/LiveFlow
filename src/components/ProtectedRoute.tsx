import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

function ProtectedRoute() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    const params = new URLSearchParams()
    const next = `${location.pathname}${location.search}`
    if (next && next !== '/login') {
      params.set('next', next)
    }
    const to = params.toString() ? `/login?${params}` : '/login'
    return <Navigate to={to} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
