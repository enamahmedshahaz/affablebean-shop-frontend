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
import AddCategory from "../pages/Dashboard/AddCategory";

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
                loader: () => fetch(`http://localhost:5000/category`),
            },
            {
                path: "/dashboard/all-products",
                element: <AllProducts></AllProducts>,
            },
            {
                path: "/dashboard/all-users",
                element: <AllUsers></AllUsers>,
            },
            {
                path: "/dashboard/add-category",
                element: <AddCategory></AddCategory>,
            },
        ]
    },

]);

export default router;