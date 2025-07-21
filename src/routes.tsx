import { Home, Layout, Cards, CardView } from './pages'
import { createBrowserRouter, Navigate } from 'react-router'

let routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/cards',
        element: <Cards />,
      },
      {
        path: '/cards/:id',
        element: <CardView />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default routes
