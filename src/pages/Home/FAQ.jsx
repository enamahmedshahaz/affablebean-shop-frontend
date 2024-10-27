import { useState } from "react";

const FAQ = () => {
    const faqs = [
        {
            question: "What is AffableBean?",
            answer: "AffableBean is an online green grocer where you can buy fresh produce, meats, dairy, and other groceries."
        },
        {
            question: "How do I place an order?",
            answer: "Simply browse our categories, add items to your cart, and proceed to checkout to complete your purchase."
        },
        {
            question: "What payment methods are available?",
            answer: "We accept credit/debit cards, net banking, and various online payment wallets."
        },
        {
            question: "Do you offer home delivery?",
            answer: "Yes, we provide home delivery services for all orders within our serviceable areas."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is placed, you will receive a tracking ID to monitor your delivery status."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 my-10">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300">
                    <button
                        className="w-full text-left py-4 font-semibold text-lg flex justify-between items-center"
                        onClick={() => toggleAccordion(index)}
                    >
                        <span>{faq.question}</span>
                        <span>{openIndex === index ? "-" : "+"}</span>
                    </button>
                    {openIndex === index && (
                        <div className="p-4 text-gray-700">
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
