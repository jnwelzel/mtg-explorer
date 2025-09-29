import { HomePage, Layout, CardsPage, CardViewPage, SetsPage } from './pages'
import { createBrowserRouter, Navigate } from 'react-router'
import { SetViewPage } from './pages/SetViewPage'

export const routesPath = {
  home: '/',
  cards: '/cards',
  cardView: (id: string) => `/cards/${id}`,
  sets: '/sets',
  setView: (code: string) => `/sets/${code}`,
}

export const routes = createBrowserRouter([
  {
    path: routesPath.home,
    element: <HomePage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: routesPath.cards,
        element: <CardsPage />,
      },
      {
        path: routesPath.cardView(':id'),
        element: <CardViewPage />,
      },
      {
        path: routesPath.setView(':code'),
        element: <SetViewPage />,
      },
      {
        path: routesPath.sets,
        element: <SetsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
