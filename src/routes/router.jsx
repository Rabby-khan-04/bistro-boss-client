import Main from "@/layouts/Main";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Shop from "@/pages/Shop";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/Dashboard";
import Cart from "@/pages/Dashboard/Cart";
import UserHome from "@/pages/Dashboard/UserHome";
import Reservation from "@/pages/Dashboard/Reservation";
import PaymentHistory from "@/pages/Dashboard/PaymentHistory";
import AddReview from "@/pages/Dashboard/AddReview";
import MyOrders from "@/pages/Dashboard/MyOrders";
import Users from "@/pages/Dashboard/Users";
import AdminRoute from "./AdminRoute";
import AdminHome from "@/pages/Dashboard/AdminHome";
import AddProduct from "@/pages/Dashboard/AddProduct";
import ManageOrder from "@/pages/Dashboard/ManageOrder";
import ManageProduct from "@/pages/Dashboard/ManageProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "home",
        element: <UserHome />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "add-review",
        element: <AddReview />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "manage-product",
        element: (
          <AdminRoute>
            <ManageProduct />
          </AdminRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <AdminRoute>
            <ManageOrder />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
