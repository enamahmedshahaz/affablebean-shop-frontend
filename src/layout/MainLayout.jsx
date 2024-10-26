import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen px-6 my-6">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;