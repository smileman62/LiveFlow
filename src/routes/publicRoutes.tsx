import type { RouteObject } from 'react-router-dom'
import App from '../App.tsx'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]
