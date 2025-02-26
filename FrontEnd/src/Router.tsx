import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/Home.page';
import { DetailedProductsPage } from '@/pages/DetailedProducts.Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <DetailedProductsPage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
