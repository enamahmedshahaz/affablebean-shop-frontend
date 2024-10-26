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
        ]
    },

    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "/dashboard/all-categories",
                element: <AllCategories></AllCategories>,
            },
            {
                path: "/dashboard/all-products",
                element: <AllProducts></AllProducts>,
            },
            {
                path: "/dashboard/all-users",
                element: <AllUsers></AllUsers>
            },
        ]
    },

]);

export default router;