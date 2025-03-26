import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal"; // Ensure path is correct

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!plan) {
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    }
  }, [plan, navigate]);

  const handleConfirmPayment = () => {
    setIsModalOpen(false);
    navigate("/payment-success");
  };

  if (!plan) return <p>Redirecting to home...</p>;

  return (
    <section
      className="py-8 bg-gray-100 dark:bg-gray-800 min-h-screen flex justify-center items-center"
      style={{ backgroundImage: "url('/Login & Register.png')" }}
    >
      <div className="relative bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center transform hover:scale-105 transition-transform duration-500">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full shadow-md text-sm">
          {plan.period}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Checkout</h2>

        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{plan.title}</h3>

        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">{plan.price}</p>

        <ul className="my-6 text-left text-gray-800 dark:text-gray-300 space-y-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          Proceed to Payment
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPayment}
        message={`Are you sure you want to proceed with payment for the ${plan.title} plan?`}
      />
    </section>
  );
}

export default Checkout;