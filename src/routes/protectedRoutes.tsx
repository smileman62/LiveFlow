import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ServiceLayout from '../layouts/ServiceLayout'
import ServiceAnalyticsPage from '../pages/service/ServiceAnalyticsPage'
import ServiceAutomationPage from '../pages/service/ServiceAutomationPage'
import ServiceOverviewPage from '../pages/service/ServiceOverviewPage'

/**
 * App 레이아웃(path '/')의 자식으로만 사용하세요.
 * path는 절대 경로가 아닌 상대 경로(service, analytics …)입니다.
 */
export const authenticatedRouteBranch: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    {
      path: 'service',
      element: <ServiceLayout />,
      children: [
        {
          index: true,
          element: <ServiceOverviewPage />,
        },
        {
          path: 'analytics',
          element: <ServiceAnalyticsPage />,
        },
        {
          path: 'automation',
          element: <ServiceAutomationPage />,
        },
      ],
    },
  ],
}
