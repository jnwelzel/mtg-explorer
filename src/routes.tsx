import { HomePage, Layout, CardsPage, CardViewPage, SetsPage } from './pages'
import { createBrowserRouter, Navigate } from 'react-router'
import { SetViewPage } from './pages/SetViewPage'

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
        path: '/sets/:code',
        element: <SetViewPage />,
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
