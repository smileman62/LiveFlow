import type { RouteObject } from 'react-router-dom'
import App from '../App.tsx'

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
]
