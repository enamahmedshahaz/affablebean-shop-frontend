import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons

const Categories = () => {
    const axiosPublic = useAxiosPublic();
    const [categories, setCategories] = useState([]);
    const sliderRef = useRef(null); // Reference to the slider container

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosPublic.get("/category"); // Replace with your API endpoint
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Scroll functions
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full px-4 py-6 relative">
            <h2 className="text-3xl font-bold uppercase text-green-700">Shop by Categories</h2>

            {/* Left Arrow */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
                <FaArrowLeft />
            </button>

            {/* Slider Container */}
            <div ref={sliderRef} className="flex space-x-4 py-4 overflow-hidden scroll-smooth">
                {categories.map((category) => (
                    <Link className="hover:shadow-2xl" to={`/product?categoryId=${category._id}`} key={category._id}>
                        <div className="w-64 flex-shrink-0 rounded-lg shadow-lg overflow-hidden relative group">
                            <img
                                src={category.imageUrl} // Add image URL in category object
                                alt={category.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="bg-white p-4 text-center">
                                <div className="text-green-600 font-semibold">{category.name}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Categories;
