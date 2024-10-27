import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useLoggedInUserInfo from "../../hooks/useLoggedInUserInfo";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ProductDetails = () => {
    const product = useLoaderData();
    const [loggedInUserInfo] = useLoggedInUserInfo(); // Custom hook to get logged-in user
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const axiosPublic = useAxiosPublic();
    
    // Function to handle "Buy Now" click
    const handleBuyNow = () => {
        setIsModalOpen(true);
    };

    // Function to handle purchase submission
    const handlePurchase = async () => {
        const purchaseData = {
            productId: product._id,
            productName: product.name,
            price: product.price,
            buyerName: loggedInUserInfo.firstName,
            buyerEmail: loggedInUserInfo.email,
            phone
        };

        try {
            const response = await axiosPublic.post("/purchase", purchaseData);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Purchase Successful",
                    text: "Thank you for your purchase!",
                    timer: 1500,
                    showConfirmButton: false
                });
                setIsModalOpen(false);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Purchase Failed",
                text: "Something went wrong. Please try again later."
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <img src={product.imageUrl} alt={product.name} className="w-full h-72 object-cover rounded-lg" />
            <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
            <p className="mt-2 text-gray-600">Rating: {product.rating} ⭐</p>
            <p className="mt-2 text-green-600 font-semibold">Price: ${product.price}</p>
            <button onClick={handleBuyNow} className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg">
                Buy Now
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h3 className="text-lg font-semibold">Confirm Purchase</h3>
                        <p className="mt-2">Name: {loggedInUserInfo.firstName}</p>
                        <p>Email: {loggedInUserInfo.email}</p>
                        <label className="mt-4 block">Phone Number:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border px-2 py-1 rounded w-full mt-1"
                        />
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 text-gray-600">Cancel</button>
                            <button onClick={handlePurchase} className="bg-green-500 text-white px-4 py-2 rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
