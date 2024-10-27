import { Link, useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const handleClickCategory = (selectedCategory) => {
        navigate("products", { state: { selectedCategory } });
    }

    return (
        <div className="w-full px-4 py-6 relative">

            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
                Our Product Categories
            </h2>
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
                    <div className="hover:shadow-2xl" onClick={() => handleClickCategory(category._id)} key={category._id}>
                        <div className="w-64 flex-shrink-0 rounded-lg shadow-lg overflow-hidden relative group">
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="bg-white p-4 text-center">
                                <div className="text-green-600 font-semibold">{category.name}</div>
                            </div>
                        </div>
                    </div>
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
