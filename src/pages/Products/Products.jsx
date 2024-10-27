import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaStar } from "react-icons/fa";

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const location = useLocation();

    const initialCategory = location.state?.selectedCategory || 'all';  // Get product data if available

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // Fetch products and categories

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosPublic.get("/category"); // Replace with your category API endpoint
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await axiosPublic.get("/product"); // Replace with your products API endpoint
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCategories();
        fetchProducts();

    }, []);

    // Filtered products by category
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((product) => product.category_id === selectedCategory);

    return (
        <div className="px-4 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Our Products</h2>

            <div className="flex justify-end mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered w-1/2 md:w-1/4 lg:w-1/6"
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (

                    <Link to={`/products/${product._id}`} key={product._id} className="relative block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-green-600 font-bold">${product.price}</p>
                            <div className="flex items-center mt-2 space-x-1 text-yellow-500">
                                <span className="ml-1 text-sm text-gray-500">{product.rating}</span>  <FaStar />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
