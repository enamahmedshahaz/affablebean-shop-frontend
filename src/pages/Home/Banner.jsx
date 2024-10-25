import logoTextImg from "../../assets/image/logoText.png"
import beanStackImg from "../../assets/image/stalk.png"
import logo from "../../assets/logo/logo.png"

const Banner = () => {
    return (
        <div className="hero bg-green-50 rounded-md">
            <div className="hero-content flex-col lg:flex-row-reverse">
                
                <div className="p-10">
                    <img
                        src={logo}
                        className="max-w-sm absolute" />
                    <img
                        src={beanStackImg}
                        className="max-w-xl relative top-10 left-5" />
                </div>

                <div>
                    <img
                        src={logoTextImg}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <p className="py-6">

                        Welcome to the online home of the Affable Bean Green Grocer. Enjoy browsing and learning more about our unique home delivery service bringing you fresh organic produce, dairy, meats, breads and other delicious and healthy items to your doorstep.

                    </p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
            </div>
        </div>
    );
};

export default Banner;