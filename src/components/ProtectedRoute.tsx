import { Navigate, Outlet, useLocation } from 'react-router-dom'

type ProtectedRouteProps = {
  isAuthenticated: boolean
}

function ProtectedRoute({ isAuthenticated }: ProtectedRouteProps) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
