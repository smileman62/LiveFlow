import type { RouteObject } from 'react-router-dom'
import App from '../App.tsx'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import { authenticatedRouteBranch } from './protectedRoutes'

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
      {
        path: 'signup',
        element: <SignupPage />,
      },
      authenticatedRouteBranch,
    ],
  },
]
