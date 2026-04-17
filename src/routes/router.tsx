import { createBrowserRouter } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'
import { protectedRoutes } from './protectedRoutes'

const ENABLE_PROTECTED_ROUTES = false

export const appRouter = createBrowserRouter([
  ...publicRoutes,
  ...(ENABLE_PROTECTED_ROUTES ? protectedRoutes : []),
])
