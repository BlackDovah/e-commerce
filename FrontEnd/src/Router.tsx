import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/Home.page";
import { DetailedProductsPage } from "@/pages/DetailedProducts.Page";
import { CheckOutPage } from "@/pages/CheckOut.Page";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: `/product/:productTitle`,
    element: <DetailedProductsPage />,
  },
  {
    path: "/checkout",
    element: <CheckOutPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
