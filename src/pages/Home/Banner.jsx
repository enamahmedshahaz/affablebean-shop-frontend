import { Link } from "react-router-dom";
import logoTextImg from "../../assets/image/logoText.png";
import beanStackImg from "../../assets/image/stalk.png";
import logo from "../../assets/logo/logo.png";

const Banner = () => {
    return (
        <div className="hero bg-green-50 rounded-md">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="p-10 relative">
                    <img
                        src={logo}
                        className="max-w-sm absolute top-0 left-0"
                        alt="Affable Bean Logo"
                    />
                    <img
                        src={beanStackImg}
                        className="max-w-xl relative top-10 left-5"
                        alt="Green Bean Stalk"
                    />
                </div>

                <div>
                    <img
                        src={logoTextImg}
                        className="max-w-sm rounded-lg shadow-2xl mb-4"
                        alt="Affable Bean Text Logo"
                    />
                    <p className="py-6 text-lg text-gray-700">
                        Welcome to the online home of the Affable Bean Green Grocer. Enjoy browsing and learning more about our unique home delivery service bringing you fresh organic produce, dairy, meats, breads, and other delicious and healthy items to your doorstep.
                    </p>
                    <Link to="/products">
                        <button className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-colors">
                            View All Products
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
