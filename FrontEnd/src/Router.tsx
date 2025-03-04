import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HomePage } from "@/pages/Home.page";
const DetailedProductsPage = lazy(
  () => import("@/pages/DetailedProducts.Page"),
);
const CheckOutPage = lazy(() => import("@/pages/CheckOut.Page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: `/product/:productTitle`,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DetailedProductsPage />,
      </Suspense>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CheckOutPage />,
      </Suspense>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
