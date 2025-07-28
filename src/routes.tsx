import { HomePage, Layout, CardsPage, CardViewPage, SetsPage } from './pages'
import { createBrowserRouter, Navigate } from 'react-router'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/cards',
        element: <CardsPage />,
      },
      {
        path: '/cards/:id',
        element: <CardViewPage />,
      },
      {
        path: '/sets',
        element: <SetsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
