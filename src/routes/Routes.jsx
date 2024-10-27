import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AllCategories from "../pages/Dashboard/AllCategories";
import AllProducts from "../pages/Dashboard/AllProducts";
import AllUsers from "../pages/Dashboard/AllUsers";
import AddProduct from "../pages/Dashboard/AddProduct";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Profile from "../pages/Dashboard/Profile";
import ViewOrders from "../pages/Dashboard/ViewOrders";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/products",
                element: <Products></Products>,
            },
            {
                path: "/products/:id",
                element: <PrivateRoutes> <ProductDetails></ProductDetails></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`),
            },
        ]
    },

    {
        path: "/dashboard",
        element: <PrivateRoutes>  <DashboardLayout></DashboardLayout> </PrivateRoutes>,
        children: [
            {
                path: "/dashboard",
                element: <Profile></Profile>,
            },
            {
                path: "/dashboard/all-categories",
                element: <AdminRoutes><AllCategories></AllCategories> </AdminRoutes>,
                loader: () => fetch(`http://localhost:5000/category`),
            },
            {
                path: "/dashboard/all-products",
                element: <AdminRoutes> <AllProducts></AllProducts> </AdminRoutes>,
            },
            {
                path: "/dashboard/add-product",
                element: <AdminRoutes> <AddProduct></AddProduct> </AdminRoutes>,
            },
            {
                path: "/dashboard/all-users",
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>,
            },
            {
                path: "/dashboard/view-orders",
                element: <ViewOrders></ViewOrders>,
            },
        ]
    },

]);

export default router;