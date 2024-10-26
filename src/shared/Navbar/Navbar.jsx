import { useEffect, useState } from "react";

import logo from "../../assets/logo/logo.png"
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {

    const [theme, setTheme] = useState("light");
    const { user, signOutUser } = useAuth();


    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);


    const navLinks = <>
        <li>
            <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
            <NavLink to={"/products"}>All products</NavLink>
        </li>
        <li>
            <NavLink to={"/login"}>Login</NavLink>
        </li>
        <li>
            <NavLink to={"/register"}>Register</NavLink>
        </li>
    </>;


    return (

        <div>
            <div className="navbar bg-gradient-to-r from-green-100 via-green-200 to-green-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            ☰
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-green-50 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    {/* Site Name and logo */}
                    <a className="flex btn btn-ghost">
                        <img className="w-10" src={logo}></img>
                        <p className="text-xl">AffableBean</p>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>

                </div>

                <div className="navbar-center">
                    {/* Theme Toggle Button */}
                    <button className="btn btn-circle btn-sm" onClick={toggleTheme} title="Toggle Theme">
                        {theme === "dark" ? "🌞" : "🌜"}
                    </button>
                </div>

                <div className="navbar-end">

                    {
                        user &&
                        <>
                            <div className="dropdown dropdown-end">

                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User photo"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-green-50 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a href="">Dashboard</a>
                                    </li>
                                    <li> <a>Profile</a ></li>
                                    <li> <a>Logout</a> </li>
                                </ul>
                            </div>
                        </>

                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;