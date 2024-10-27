import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { FaStar } from "react-icons/fa";


const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetching the 4 latest products from backend
    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axiosPublic.get("/product");
                setProducts(response.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching new arrivals:", error);
            }
        };
        fetchNewArrivals();
    }, []);

    return (
        <div className="my-12 px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Newly Arrived Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-lg p-4 relative">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="py-4 text-center">
                            <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                            <p className="text-green-700 font-bold text-xl">${product.price}</p>
                            <div className="flex justify-center items-center space-x-1 text-yellow-500">
                                <span className="ml-1 text-sm text-gray-500">{product.rating} </span>  <FaStar />

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
