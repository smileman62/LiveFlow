import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

const isAuthenticated = false

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    children: [
      {
        path: '/dashboard',
        element: <div>Protected Dashboard (placeholder)</div>,
      },
    ],
  },
]
