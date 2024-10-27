// UserReviews.js
import { useState } from "react";

const reviews = [
    {
        id: 1,
        name: "Alice Johnson",
        photo: "https://randomuser.me/api/portraits/women/10.jpg",
        comment: "Great service and quality! Will definitely come back.",
        rating: 5,
    },
    {
        id: 2,
        name: "Bob Smith",
        photo: "https://randomuser.me/api/portraits/men/12.jpg",
        comment: "Fresh products and quick delivery. Highly recommend!",
        rating: 4,
    },
    {
        id: 3,
        name: "Cathy Brown",
        photo: "https://randomuser.me/api/portraits/women/20.jpg",
        comment: "Very friendly service and top-notch vegetables.",
        rating: 5,
    },
    {
        id: 4,
        name: "David Wilson",
        photo: "https://randomuser.me/api/portraits/men/14.jpg",
        comment: "Good selection, but delivery was slightly delayed.",
        rating: 4,
    },
    {
        id: 5,
        name: "Emma Thompson",
        photo: "https://randomuser.me/api/portraits/women/18.jpg",
        comment: "Excellent quality and great prices. I love it here!",
        rating: 5,
    },
];

const UserReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleReviews = 3;

    // Determine the indices for the visible reviews
    const visibleIndices = Array.from(
        { length: visibleReviews },
        (_, i) => (currentIndex + i) % reviews.length
    );

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % reviews.length);
    };

    return (
        <div className="w-full py-10 px-4 bg-gray-100 relative">
            
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
                Customer Reviews
            </h2>

            {/* Reviews container */}
            <div className="flex space-x-6 justify-center items-center">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="text-2xl font-bold text-gray-500 hover:text-green-600"
                >
                    &larr;
                </button>

                {/* Review Cards */}
                <div className="flex space-x-4 overflow-hidden">
                    {visibleIndices.map((index) => {
                        const review = reviews[index];
                        return (
                            <div
                                key={review.id}
                                className="bg-white p-6 rounded-lg shadow-lg text-center w-72 flex-shrink-0"
                            >
                                <img
                                    src={review.photo}
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {review.name}
                                </h3>
                                <p className="text-gray-600 mb-3 italic">"{review.comment}"</p>
                                <div className="flex justify-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i}>
                                            {i < review.rating ? (
                                                <span className="text-yellow-400">★</span>
                                            ) : (
                                                <span className="text-gray-300">★</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="text-2xl font-bold text-gray-500 hover:text-green-600"
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default UserReviews;
