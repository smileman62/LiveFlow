import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardPage from '../pages/DashboardPage'

const isAuthenticated = true

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]
