import type { RouteObject } from 'react-router-dom'
import App from '../App.tsx'
import HomePage from '../pages/HomePage'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]
