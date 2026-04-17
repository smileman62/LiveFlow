import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import ServiceLayout from '../layouts/ServiceLayout'
import BroadcastPrepPage from '../pages/service/BroadcastPrepPage'
import MultiChannelPage from '../pages/service/MultiChannelPage'
import PostBroadcastAnalysisPage from '../pages/service/PostBroadcastAnalysisPage'
import SalesDashboardPage from '../pages/service/SalesDashboardPage'

/**
 * App 레이아웃(path '/')의 자식으로만 사용하세요.
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
          element: <BroadcastPrepPage />,
        },
        {
          path: 'multi-channel',
          element: <MultiChannelPage />,
        },
        {
          path: 'sales-dashboard',
          element: <SalesDashboardPage />,
        },
        {
          path: 'post-analysis',
          element: <PostBroadcastAnalysisPage />,
        },
      ],
    },
  ],
}
