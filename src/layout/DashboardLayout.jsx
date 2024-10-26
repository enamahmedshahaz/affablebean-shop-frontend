import { Link, NavLink, Outlet } from "react-router-dom";


const DashboardLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}

                    Welcome to dashboard

                    <label htmlFor="my-drawer-2" className="btn text-white bg-green-400 drawer-button lg:hidden">
                        Show Menus
                    </label>

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink to={"/dashboard/all-users"}>All Users</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/dashboard/all-categories"}>All Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/dashboard/all-products"}>All Products</NavLink>
                        </li>
                        <li>
                            <Link to={"/"}>Back to Home</Link>
                        </li>
                        <li>
                            <Link to={"/logout"}>Logout</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;